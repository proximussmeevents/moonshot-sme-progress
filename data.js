(() => {
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

  function readTab(tab) {
    return new Promise((resolve, reject) => {
      const callback = `__moonshotGviz${Date.now()}_${requestId += 1}`;
      const script = document.createElement('script');
      const timeout = window.setTimeout(() => finish(new Error('Google Sheets request timed out')), 20000);

      function finish(error, payload) {
        window.clearTimeout(timeout);
        script.remove();
        delete window[callback];
        if (error) reject(error);
        else {
          try { resolve(rowsFromPayload(payload)); }
          catch (parseError) { reject(parseError); }
        }
      }

      window[callback] = (payload) => finish(null, payload);
      script.onerror = () => finish(new Error('Google Sheets request failed'));
      const tqx = encodeURIComponent(`out:json;responseHandler:${callback}`);
      script.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?headers=1&sheet=${encodeURIComponent(tab)}&tqx=${tqx}&_=${Date.now()}`;
      document.head.append(script);
    });
  }

  async function load() {
    const [teams, missions, responses] = await Promise.all([
      readTab('Teams'),
      readTab('Missies'),
      readTab('Formulierreacties 1')
    ]);
    return { teams, missions, responses, fetchedAt: new Date().toISOString() };
  }

  window.MoonshotData = { load, scoreEndpoint: SCORE_ENDPOINT };
})();
