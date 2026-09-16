const scoreCopy = {
  en: {
    heroLead: 'Award stars.', heroAccent: 'Capture the mission.', heroIntro: 'Register a team score and add a photo. The dashboard is ready to refresh immediately.',
    scoreTitle: 'Register a score', mission: 'Mission / station', team: 'Team', stars: 'Stars', photo: 'Add a team photo',
    photoHint: 'Take a photo or choose one · optional · max. 8 MB', note: 'A new entry for the same team and mission becomes the current score on the dashboard.',
    submit: 'Launch score', preparing: 'Preparing photo…', sending: 'Sending score…', live: 'Live connection · Google Sheets', dashboard: 'Open team dashboard', loading: 'Loading…',
    chooseMission: 'Choose a mission…', chooseTeam: 'Choose a team…', chooseFields: 'Choose a mission and team.', chooseStars: 'Choose a star score.', success: 'Score saved! The dashboard is ready to refresh.',
    loadError: 'The live data could not be loaded.', saveError: 'The score could not be saved.', timeoutError: 'The upload took too long. Check your connection and try again.', photoLarge: 'This photo could not be reduced below 8 MB. Choose a smaller photo.'
  },
  nl: {
    heroLead: 'Geef sterren.', heroAccent: 'Leg de missie vast.', heroIntro: 'Registreer een teamscore en voeg een foto toe. Het dashboard kan meteen vernieuwd worden.',
    scoreTitle: 'Registreer een score', mission: 'Missie / stand', team: 'Team', stars: 'Sterren', photo: 'Voeg een teamfoto toe',
    photoHint: 'Maak een foto of kies er één · optioneel · max. 8 MB', note: 'Een nieuwe invoer voor hetzelfde team en dezelfde missie wordt de actuele score op het dashboard.',
    submit: 'Lanceer score', preparing: 'Foto voorbereiden…', sending: 'Score verzenden…', live: 'Live koppeling · Google Sheets', dashboard: 'Open teamdashboard', loading: 'Laden…',
    chooseMission: 'Kies een missie…', chooseTeam: 'Kies een team…', chooseFields: 'Kies een missie en een team.', chooseStars: 'Kies een aantal sterren.', success: 'Score opgeslagen! Het dashboard kan vernieuwd worden.',
    loadError: 'De live data kon niet worden geladen.', saveError: 'De score kon niet worden opgeslagen.', timeoutError: 'De upload duurde te lang. Controleer je verbinding en probeer opnieuw.', photoLarge: 'Deze foto kon niet kleiner dan 8 MB gemaakt worden. Kies een kleinere foto.'
  },
  fr: {
    heroLead: 'Attribuez des étoiles.', heroAccent: 'Immortalisez la mission.', heroIntro: 'Enregistrez le score d’une équipe et ajoutez une photo. Le tableau de bord peut être actualisé immédiatement.',
    scoreTitle: 'Enregistrer un score', mission: 'Mission / stand', team: 'Équipe', stars: 'Étoiles', photo: 'Ajoutez une photo d’équipe',
    photoHint: 'Prenez une photo ou choisissez-en une · facultatif · max. 8 Mo', note: 'Une nouvelle saisie pour la même équipe et la même mission devient le score actuel du tableau de bord.',
    submit: 'Lancer le score', preparing: 'Préparation de la photo…', sending: 'Envoi du score…', live: 'Connexion directe · Google Sheets', dashboard: 'Ouvrir le tableau de bord', loading: 'Chargement…',
    chooseMission: 'Choisissez une mission…', chooseTeam: 'Choisissez une équipe…', chooseFields: 'Choisissez une mission et une équipe.', chooseStars: 'Choisissez un nombre d’étoiles.', success: 'Score enregistré ! Le tableau de bord peut être actualisé.',
    loadError: 'Impossible de charger les données.', saveError: 'Impossible d’enregistrer le score.', timeoutError: 'L’envoi a pris trop de temps. Vérifiez votre connexion et réessayez.', photoLarge: 'Cette photo n’a pas pu être réduite à moins de 8 Mo. Choisissez une photo plus petite.'
  }
};

const scoreState = { lang: initialScoreLanguage(), data: null, stars: null, photo: null, previewUrl: null };
const scoreEls = {
  form: document.querySelector('#scoreForm'), mission: document.querySelector('#scoreMission'), team: document.querySelector('#scoreTeam'),
  stars: document.querySelector('#scoreStars'), photo: document.querySelector('#scorePhoto'), drop: document.querySelector('#scoreDrop'),
  preview: document.querySelector('#scorePreview'), status: document.querySelector('#scoreStatus'), submit: document.querySelector('#scoreSubmit')
};

function initialScoreLanguage() {
  const saved = localStorage.getItem('moonshot-language');
  if (scoreCopy[saved]) return saved;
  const browserLanguage = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return scoreCopy[browserLanguage] ? browserLanguage : 'en';
}
function st(key) { return scoreCopy[scoreState.lang]?.[key] || scoreCopy.en[key] || key; }
function scoreClean(value) { return String(value ?? '').trim().toLowerCase(); }
function scoreValue(row, ...keys) {
  const exact = keys.find((key) => Object.prototype.hasOwnProperty.call(row || {}, key));
  if (exact) return row[exact];
  const normalized = Object.keys(row || {}).find((key) => keys.some((wanted) => scoreClean(key) === scoreClean(wanted)));
  return normalized ? row[normalized] : '';
}
function scoreNumber(value) {
  const parsed = Number(String(value ?? '').replace(',', '.').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}
function scoreTruthy(value) { return !['false', 'onwaar', 'faux', 'nee', 'non', 'no', '0'].includes(scoreClean(value)); }
function scoreOrder(row, fallback) { return scoreNumber(scoreValue(row, 'Volgorde', 'Order', 'Ordre')) || fallback; }
function scoreTeamName(row) { return String(scoreValue(row, 'Teamnaam', 'Team name', 'Nom de l’équipe', 'Nom de l equipe') || ''); }
function scoreTeamId(row) { return String(scoreValue(row, 'Team-ID', 'Team ID', 'ID') || scoreTeamName(row)); }
function scoreMissionId(row, fallback) { return String(scoreValue(row, 'Missie-ID', 'Mission-ID', 'Mission ID', 'ID') || fallback); }
function scoreMissionName(row, index) {
  const localized = scoreState.lang === 'nl'
    ? scoreValue(row, 'Missienaam NL', 'Naam NL')
    : scoreState.lang === 'fr' ? scoreValue(row, 'Nom FR', 'Missienaam FR', 'Naam FR') : scoreValue(row, 'Mission name EN', 'Name EN');
  return String(localized || scoreValue(row, 'Missienaam', 'Mission name', 'Naam', 'Mission', 'Stand / missie') || `${st('mission')} ${index + 1}`);
}
function activeScoreTeams() {
  return (scoreState.data?.teams || []).filter((row) => scoreTruthy(scoreValue(row, 'Actief', 'Active', 'Actif')))
    .sort((a, b) => scoreOrder(a, 999) - scoreOrder(b, 999));
}
function activeScoreMissions() {
  return (scoreState.data?.missions || []).filter((row) => scoreTruthy(scoreValue(row, 'Actief', 'Active', 'Actif')))
    .sort((a, b) => scoreOrder(a, 999) - scoreOrder(b, 999));
}

function setScoreLanguage(lang) {
  scoreState.lang = scoreCopy[lang] ? lang : 'en';
  localStorage.setItem('moonshot-language', scoreState.lang);
  document.documentElement.lang = scoreState.lang;
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = st(node.dataset.i18n); });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === scoreState.lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  if (scoreState.data) populateScoreForm();
}

function scoreOption(value, label) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;
  return option;
}

function populateScoreForm() {
  const savedMission = scoreEls.mission.value || localStorage.getItem('moonshot-scorer-mission') || '';
  const savedTeam = scoreEls.team.value;
  const missions = activeScoreMissions();
  const teams = activeScoreTeams();
  scoreEls.mission.replaceChildren(scoreOption('', st('chooseMission')));
  missions.forEach((mission, index) => scoreEls.mission.append(scoreOption(scoreMissionId(mission, index + 1), `${String(scoreOrder(mission, index + 1)).padStart(2, '0')} · ${scoreMissionName(mission, index)}`)));
  scoreEls.team.replaceChildren(scoreOption('', st('chooseTeam')));
  teams.forEach((team) => scoreEls.team.append(scoreOption(scoreTeamId(team), scoreTeamName(team))));
  if ([...scoreEls.mission.options].some((option) => option.value === savedMission)) scoreEls.mission.value = savedMission;
  if ([...scoreEls.team.options].some((option) => option.value === savedTeam)) scoreEls.team.value = savedTeam;
  scoreEls.mission.disabled = false;
  scoreEls.team.disabled = false;
  scoreEls.submit.disabled = false;
  renderScoreStars();
}

function renderScoreStars() {
  const missions = activeScoreMissions();
  const selected = missions.find((mission, index) => scoreMissionId(mission, index + 1) === scoreEls.mission.value);
  const max = Math.max(1, scoreNumber(scoreValue(selected, 'Maximumsterren', 'Maximum stars', 'Max stars')) || 6);
  scoreState.stars = null;
  scoreEls.stars.replaceChildren();
  for (let stars = 1; stars <= max; stars += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'scoreStar';
    button.textContent = `${stars} ★`;
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', 'false');
    button.addEventListener('click', () => {
      scoreState.stars = stars;
      scoreEls.stars.querySelectorAll('.scoreStar').forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle('selected', active);
        candidate.setAttribute('aria-checked', String(active));
      });
    });
    scoreEls.stars.append(button);
  }
}

function showScoreStatus(kind, message, reveal = false) {
  scoreEls.status.className = `scoreStatus show ${kind}`;
  scoreEls.status.textContent = message;
  if (reveal) scoreEls.status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function clearScoreStatus() { scoreEls.status.className = 'scoreStatus'; scoreEls.status.textContent = ''; }
function readBlobAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error(st('saveError')));
    reader.readAsDataURL(blob);
  });
}
function inferredPhotoMime(file) {
  if (/\.png$/i.test(file.name)) return 'image/png';
  if (/\.webp$/i.test(file.name)) return 'image/webp';
  if (/\.hei[cf]$/i.test(file.name)) return /\.heif$/i.test(file.name) ? 'image/heif' : 'image/heic';
  return 'image/jpeg';
}
function loadScoreImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image decode failed')); };
    image.src = url;
  });
}
function canvasBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
}
async function prepareScorePhoto(file) {
  if (!file) return null;
  if (file.size > 25 * 1024 * 1024) throw new Error(st('photoLarge'));

  try {
    const image = await loadScoreImage(file);
    const maxSide = 1600;
    const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await canvasBlob(canvas);
    if (blob && blob.size <= 8 * 1024 * 1024) {
      return { name: file.name.replace(/\.[^.]+$/, '') + '.jpg', type: 'image/jpeg', data: await readBlobAsDataUrl(blob) };
    }
  } catch {
    // Some mobile HEIC decoders cannot draw to canvas; use the original when it already fits.
  }

  if (file.size > 8 * 1024 * 1024) throw new Error(st('photoLarge'));
  const mime = /^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type) ? file.type : inferredPhotoMime(file);
  const raw = await readBlobAsDataUrl(file);
  const data = raw.replace(/^data:[^;]*;/i, `data:${mime};`);
  return { name: file.name, type: mime, data };
}

async function loadScoreData() {
  try {
    scoreState.data = await window.MoonshotData.load();
    populateScoreForm();
  } catch {
    showScoreStatus('error', st('loadError'));
  }
}

scoreEls.mission.addEventListener('change', () => {
  localStorage.setItem('moonshot-scorer-mission', scoreEls.mission.value);
  renderScoreStars();
  clearScoreStatus();
});
scoreEls.photo.addEventListener('change', () => {
  const file = scoreEls.photo.files[0] || null;
  scoreState.photo = file;
  scoreEls.drop.classList.toggle('hasPhoto', Boolean(file));
  if (scoreState.previewUrl) URL.revokeObjectURL(scoreState.previewUrl);
  scoreState.previewUrl = null;
  if (file) {
    scoreState.previewUrl = URL.createObjectURL(file);
    scoreEls.preview.src = scoreState.previewUrl;
    scoreEls.preview.alt = file.name;
  } else {
    scoreEls.preview.removeAttribute('src');
    scoreEls.preview.alt = '';
  }
});
scoreEls.form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearScoreStatus();
  if (!scoreEls.mission.value || !scoreEls.team.value) {
    const missingField = !scoreEls.mission.value ? scoreEls.mission : scoreEls.team;
    missingField.focus();
    return showScoreStatus('error', st('chooseFields'), true);
  }
  if (!scoreState.stars) return showScoreStatus('error', st('chooseStars'), true);
  scoreEls.submit.disabled = true;
  scoreEls.submit.setAttribute('aria-busy', 'true');
  scoreEls.submit.textContent = scoreState.photo ? st('preparing') : st('sending');
  let timeout;
  try {
    showScoreStatus('info', scoreState.photo ? st('preparing') : st('sending'));
    const photo = await prepareScorePhoto(scoreState.photo);
    scoreEls.submit.textContent = st('sending');
    showScoreStatus('info', st('sending'));
    const controller = new AbortController();
    timeout = window.setTimeout(() => controller.abort(), 90000);
    const response = await fetch(window.MoonshotData.scoreEndpoint, {
      method: 'POST', mode: 'no-cors', redirect: 'follow',
      headers: { 'content-type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({ missionId: scoreEls.mission.value, teamId: scoreEls.team.value, stars: scoreState.stars, photo }),
      signal: controller.signal
    });
    if (response.type !== 'opaque' && !response.ok) throw new Error(st('saveError'));
    showScoreStatus('success', st('success'), true);
    scoreEls.team.value = '';
    scoreState.stars = null;
    scoreState.photo = null;
    scoreEls.photo.value = '';
    scoreEls.drop.classList.remove('hasPhoto');
    scoreEls.preview.removeAttribute('src');
    if (scoreState.previewUrl) URL.revokeObjectURL(scoreState.previewUrl);
    scoreState.previewUrl = null;
    renderScoreStars();
  } catch (error) {
    showScoreStatus('error', error?.name === 'AbortError' ? st('timeoutError') : (error?.message || st('saveError')), true);
  } finally {
    if (timeout) window.clearTimeout(timeout);
    scoreEls.submit.disabled = false;
    scoreEls.submit.removeAttribute('aria-busy');
    scoreEls.submit.textContent = st('submit');
  }
});

document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => setScoreLanguage(button.dataset.lang)));
setScoreLanguage(scoreState.lang);
loadScoreData();
