(() => {
  const baseUrl = new URL('./', document.currentScript.src);
  const SHEET_ID = '1Gs8KsNr-wRlkGNIOye8-pXZK_lrspB7JLBB-1oUpo6g';
  const SCORE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzYIZm4sQy1qg5V9YRvPGRl40XdlSmsTE4rjpL874bExaN605na-DfOfr0oVt7iKEMJCA/exec';
  let requestId = 0;

  function rowsFromPayload(payload) {
    if (!payload || payload.status === 'error') throw new Error('Google Sheets query failed');
    const table = payload.table || { cols: [], rows: [] };
    const labels = table.cols.map((column, index) => column.label || column.id || `Column ${index + 1}`);
    return (table.rows || []).map((row) => Object.fromEntries(labels.map((label, index) => {
      const cell = row.c?.[index];
      return [label, cell?.f ?? cell?.v ?? ''];
    })));
  }

  function tabUrl(tab, handler) {
    const tqx = encodeURIComponent(`out:json;responseHandler:${handler}`);
    return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?headers=1&sheet=${encodeURIComponent(tab)}&tqx=${tqx}&_=${Date.now()}`;
  }

  async function readTab(tab) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      // Public reads must not depend on the visitor's Google account or cookies.
      const response = await fetch(tabUrl(tab, '__moonshotData'), {
        credentials: 'omit', cache: 'no-store', signal: controller.signal
      });
      if (!response.ok) throw new Error(`Google Sheets HTTP ${response.status}`);
      const text = await response.text();
      const match = text.match(/^\s*(?:\/\*[\s\S]*?\*\/\s*)?__moonshotData\(([\s\S]*)\);?\s*$/);
      if (!match) throw new Error('Unexpected Google Sheets response');
      return rowsFromPayload(JSON.parse(match[1]));
    } catch (error) {
      console.warn(`Moonshot: direct read failed for ${tab}; trying script transport.`, error);
      return readTabScript(tab);
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function readTabScript(tab) {
    return new Promise((resolve, reject) => {
      const callback = `__moonshotGviz${Date.now()}_${requestId += 1}`;
      const script = document.createElement('script');
      let settled = false;
      const timeout = window.setTimeout(() => finish(new Error(`Google Sheets request timed out: ${tab}`)), 20000);

      function finish(error, payload) {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        script.remove();
        // A late response after timeout must not throw a global ReferenceError.
        window[callback] = () => {};
        window.setTimeout(() => { delete window[callback]; }, 60000);
        if (error) reject(error);
        else {
          try { resolve(rowsFromPayload(payload)); }
          catch (parseError) { reject(parseError); }
        }
      }

      window[callback] = (payload) => finish(null, payload);
      script.onerror = () => finish(new Error('Google Sheets request failed'));
      script.crossOrigin = 'anonymous';
      script.src = tabUrl(tab, callback);
      document.head.append(script);
    });
  }

  async function load() {
    const [teams, missions, matrix, responses] = await Promise.all([
      readTab('Teams'),
      readTab('Missies'),
      readTab('Missiematrix'),
      readTab('Formulierreacties 1')
    ]);
    return { teams, missions, matrix, responses, fetchedAt: new Date().toISOString() };
  }

  window.MoonshotData = { load, scoreEndpoint: SCORE_ENDPOINT, baseUrl };
})();
