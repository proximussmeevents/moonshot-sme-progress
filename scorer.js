const scoreCopy = {
  en: {
    heroLead: 'Award stars.', heroAccent: 'Capture the mission.', heroIntro: 'Register a team score and add a photo. The dashboard is ready to refresh immediately.',
    scoreTitle: 'Register a score', mission: 'Mission', team: 'Team', stars: 'Stars', photo: 'Add a team photo',
    scoreCardIntro: 'Choose a mission and team, then award stars.', standEyebrow: 'MISSION STATION', scheduleEyebrow: "TODAY'S FLIGHT PLAN",
    scheduleTitle: 'Groups visiting this station', chooseFromTimeline: 'Select a group to award points', refresh: 'Refresh', refreshing: 'Refreshing…',
    visits: 'groups scheduled', completedVisits: 'scored', nextGroup: 'Next group', planned: 'Planned', scoreSaved: 'Score saved',
    awardPoints: 'Award points', adjustScore: 'Adjust score', round: 'Round', selectedTeam: 'Award points to', invalidStand: 'This mission-station link is not valid.',
    photoHint: 'Take a photo or choose one · optional · max. 8 MB', note: 'A new entry for the same team and mission becomes the current score on the dashboard.',
    submit: 'Launch score', preparing: 'Preparing photo…', sending: 'Sending score…', live: 'Live connection · Google Sheets', dashboard: 'Open team dashboard', loading: 'Loading…',
    chooseMission: 'Choose a mission…', chooseTeam: 'Choose a team…', chooseFields: 'Choose a mission and team.', chooseStars: 'Choose a star score.', success: 'Score saved! The dashboard is ready to refresh.',
    loadError: 'The live data could not be loaded.', saveError: 'The score could not be saved.', timeoutError: 'The upload took too long. Check your connection and try again.', photoLarge: 'This photo could not be reduced below 8 MB. Choose a smaller photo.'
  },
  nl: {
    heroLead: 'Geef sterren.', heroAccent: 'Leg de missie vast.', heroIntro: 'Registreer een teamscore en voeg een foto toe. Het dashboard kan meteen vernieuwd worden.',
    scoreTitle: 'Registreer een score', mission: 'Mission', team: 'Team', stars: 'Sterren', photo: 'Voeg een teamfoto toe',
    scoreCardIntro: 'Kies een missie en team en geef daarna sterren.', standEyebrow: 'MISSIEPOST', scheduleEyebrow: 'VLUCHTPLAN VAN VANDAAG',
    scheduleTitle: 'Groepen die langskomen', chooseFromTimeline: 'Kies een groep om punten te geven', refresh: 'Vernieuwen', refreshing: 'Vernieuwen…',
    visits: 'groepen gepland', completedVisits: 'scores ingevuld', nextGroup: 'Volgende groep', planned: 'Gepland', scoreSaved: 'Score opgeslagen',
    awardPoints: 'Geef punten', adjustScore: 'Pas score aan', round: 'Ronde', selectedTeam: 'Geef punten aan', invalidStand: 'Deze link van de missiepost is niet geldig.',
    photoHint: 'Maak een foto of kies er één · optioneel · max. 8 MB', note: 'Een nieuwe invoer voor hetzelfde team en dezelfde missie wordt de actuele score op het dashboard.',
    submit: 'Lanceer score', preparing: 'Foto voorbereiden…', sending: 'Score verzenden…', live: 'Live koppeling · Google Sheets', dashboard: 'Open teamdashboard', loading: 'Laden…',
    chooseMission: 'Kies een missie…', chooseTeam: 'Kies een team…', chooseFields: 'Kies een missie en een team.', chooseStars: 'Kies een aantal sterren.', success: 'Score opgeslagen! Het dashboard kan vernieuwd worden.',
    loadError: 'De live data kon niet worden geladen.', saveError: 'De score kon niet worden opgeslagen.', timeoutError: 'De upload duurde te lang. Controleer je verbinding en probeer opnieuw.', photoLarge: 'Deze foto kon niet kleiner dan 8 MB gemaakt worden. Kies een kleinere foto.'
  },
  fr: {
    heroLead: 'Attribuez des étoiles.', heroAccent: 'Immortalisez la mission.', heroIntro: 'Enregistrez le score d’une équipe et ajoutez une photo. Le tableau de bord peut être actualisé immédiatement.',
    scoreTitle: 'Enregistrer un score', mission: 'Mission', team: 'Équipe', stars: 'Étoiles', photo: 'Ajoutez une photo d’équipe',
    scoreCardIntro: 'Choisissez une mission et une équipe, puis attribuez des étoiles.', standEyebrow: 'POSTE DE MISSION', scheduleEyebrow: 'PLAN DE VOL DU JOUR',
    scheduleTitle: 'Groupes attendus à ce poste', chooseFromTimeline: 'Choisissez un groupe pour attribuer des points', refresh: 'Actualiser', refreshing: 'Actualisation…',
    visits: 'groupes planifiés', completedVisits: 'scores saisis', nextGroup: 'Prochain groupe', planned: 'Planifié', scoreSaved: 'Score enregistré',
    awardPoints: 'Attribuer des points', adjustScore: 'Modifier le score', round: 'Tour', selectedTeam: 'Attribuer des points à', invalidStand: 'Ce lien de poste de mission n’est pas valide.',
    photoHint: 'Prenez une photo ou choisissez-en une · facultatif · max. 8 Mo', note: 'Une nouvelle saisie pour la même équipe et la même mission devient le score actuel du tableau de bord.',
    submit: 'Lancer le score', preparing: 'Préparation de la photo…', sending: 'Envoi du score…', live: 'Connexion directe · Google Sheets', dashboard: 'Ouvrir le tableau de bord', loading: 'Chargement…',
    chooseMission: 'Choisissez une mission…', chooseTeam: 'Choisissez une équipe…', chooseFields: 'Choisissez une mission et une équipe.', chooseStars: 'Choisissez un nombre d’étoiles.', success: 'Score enregistré ! Le tableau de bord peut être actualisé.',
    loadError: 'Impossible de charger les données.', saveError: 'Impossible d’enregistrer le score.', timeoutError: 'L’envoi a pris trop de temps. Vérifiez votre connexion et réessayez.', photoLarge: 'Cette photo n’a pas pu être réduite à moins de 8 Mo. Choisissez une photo plus petite.'
  }
};

const scoreState = { lang: initialScoreLanguage(), data: null, stars: null, photo: null, previewUrl: null, standMissionId: standMissionIdFromPath() };
const scoreEls = {
  form: document.querySelector('#scoreForm'), mission: document.querySelector('#scoreMission'), team: document.querySelector('#scoreTeam'),
  stars: document.querySelector('#scoreStars'), photo: document.querySelector('#scorePhoto'), drop: document.querySelector('#scoreDrop'),
  preview: document.querySelector('#scorePreview'), status: document.querySelector('#scoreStatus'), submit: document.querySelector('#scoreSubmit'),
  hero: document.querySelector('#scoreHero'), workspace: document.querySelector('.scoreWorkspace'), scoreCard: document.querySelector('#scoreCard'),
  scoreTitle: document.querySelector('#scoreTitle'), scoreCardIntro: document.querySelector('#scoreCardIntro'), missionField: document.querySelector('#missionField'),
  standDashboard: document.querySelector('#standDashboard'), standSchedule: document.querySelector('#standSchedule'), standTimeline: document.querySelector('#standTimeline'),
  standMissionTitle: document.querySelector('#standMissionTitle'), standMissionMeta: document.querySelector('#standMissionMeta'), standProgress: document.querySelector('#standProgress'),
  standRefresh: document.querySelector('#standRefresh')
};

function standMissionIdFromPath() {
  const queryMission = new URLSearchParams(window.location.search).get('mission');
  if (queryMission) return queryMission;
  const match = window.location.pathname.match(/\/stand\/([^/]+)\/?$/i);
  if (!match) return '';
  try { return decodeURIComponent(match[1]); } catch { return ''; }
}

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
function scoreTeamLabel(row) { return [scoreTeamName(row), scoreValue(row, 'Teamtaal')].filter(Boolean).join(' – '); }
function scoreTeamId(row) { return String(scoreValue(row, 'Team-ID', 'Team ID', 'ID') || scoreTeamName(row)); }
function scoreTeamAliases(row) {
  return String(scoreValue(row, 'Vorige namen', 'Eerdere namen', 'Previous names', 'Anciens noms') || '')
    .split(/[;,\n]/).map(scoreClean).filter(Boolean);
}
function scoreMissionId(row, fallback) { return String(scoreValue(row, 'Missie-ID', 'Mission-ID', 'Mission ID', 'ID') || fallback); }
function scoreMissionName(row, index) {
  const localized = scoreState.lang === 'nl'
    ? scoreValue(row, 'Missienaam NL', 'Naam NL')
    : scoreState.lang === 'fr' ? scoreValue(row, 'Nom FR', 'Missienaam FR', 'Naam FR') : scoreValue(row, 'Mission name EN', 'Name EN');
  return String(localized || scoreValue(row, 'Missienaam', 'Mission name', 'Naam', 'Mission', 'Stand / missie') || `${st('mission')} ${index + 1}`);
}
function activeScoreTeams() {
  const seen = new Set();
  return (scoreState.data?.teams || [])
    .filter((row) => scoreTruthy(scoreValue(row, 'Actief', 'Active', 'Actif')) && scoreClean(scoreTeamId(row)) && scoreClean(scoreTeamName(row)))
    .sort((a, b) => scoreOrder(a, 999) - scoreOrder(b, 999))
    .filter((row) => {
      const id = scoreClean(scoreTeamId(row));
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
}
function activeScoreMissions() {
  return (scoreState.data?.missions || []).filter((row) => scoreTruthy(scoreValue(row, 'Actief', 'Active', 'Actif')))
    .sort((a, b) => scoreOrder(a, 999) - scoreOrder(b, 999));
}
function activeScoreMatrix() {
  return (scoreState.data?.matrix || []).filter((row) => scoreTruthy(scoreValue(row, 'Actief', 'Active', 'Actif')));
}
function assignedTeamIds(missionId) {
  const normalizedMissionId = scoreClean(missionId);
  return new Set(activeScoreMatrix()
    .filter((row) => scoreClean(scoreValue(row, 'Missie-ID', 'Mission-ID', 'Mission ID')) === normalizedMissionId)
    .map((row) => scoreClean(scoreValue(row, 'Team-ID', 'Team ID')))
    .filter(Boolean));
}
function teamsForMission(missionId) {
  if (!missionId || !activeScoreMatrix().length) return activeScoreTeams();
  const allowed = assignedTeamIds(missionId);
  return activeScoreTeams().filter((team) => allowed.has(scoreClean(scoreTeamId(team))));
}
function scoreMissionLocation(row) {
  const zone = scoreValue(row, 'Zone');
  const floor = scoreState.lang === 'nl' ? zone : scoreState.lang === 'fr' ? ({Boven: 'À l’étage', Beneden: 'Rez-de-chaussée'}[zone] || zone) : ({Boven: 'Upstairs', Beneden: 'Downstairs'}[zone] || zone);
  const num = scoreValue(row, 'Missionnummer') || scoreValue(row, 'Volgorde');
  return [`Mission ${String(num).padStart(2, '0')}`, scoreValue(row, 'Locatie', 'Location', 'Lieu'), floor].filter(Boolean).join(' · ');
}
function standAssignments(missionId) {
  const normalized = scoreClean(missionId);
  return activeScoreMatrix()
    .filter((row) => scoreClean(scoreValue(row, 'Missie-ID', 'Mission-ID', 'Mission ID')) === normalized)
    .sort((a, b) => scoreNumber(scoreValue(a, 'Ronde', 'Round', 'Tour')) - scoreNumber(scoreValue(b, 'Ronde', 'Round', 'Tour')));
}
function standTeamForAssignment(assignment) {
  const id = scoreClean(scoreValue(assignment, 'Team-ID', 'Team ID'));
  const name = scoreClean(scoreValue(assignment, 'Teamnaam', 'Team name', 'Groep'));
  return activeScoreTeams().find((team) => scoreClean(scoreTeamId(team)) === id)
    || activeScoreTeams().find((team) => scoreClean(scoreTeamName(team)) === name)
    || assignment;
}
function scoreNormalizeMission(value) { return scoreClean(value).replace(/[^a-z0-9]/g, ''); }
function responseMatchesStand(response, team, mission) {
  const responseTeamId = scoreClean(scoreValue(response, 'Team-ID', 'Team ID', 'ID'));
  const responseTeamName = scoreClean(scoreValue(response, 'Teamnaam', 'Team name', 'Nom de l’équipe', 'Nom de l equipe'));
  const acceptedNames = new Set([scoreClean(scoreTeamName(team)), ...scoreTeamAliases(team)]);
  const teamMatches = (responseTeamId && responseTeamId === scoreClean(scoreTeamId(team))) || acceptedNames.has(responseTeamName);
  const submittedMission = scoreValue(response, 'Stand / missie', 'Missie', 'Mission', 'Poste / mission');
  const missionMatches = [scoreMissionId(mission, 0), scoreMissionName(mission, 0)]
    .some((candidate) => candidate && scoreNormalizeMission(candidate) === scoreNormalizeMission(submittedMission));
  return teamMatches && missionMatches;
}
function latestStandResponse(team, mission) {
  return (scoreState.data?.responses || []).filter((response) => responseMatchesStand(response, team, mission)).at(-1) || null;
}
function scoreResponseStars(response) {
  return scoreNumber(scoreValue(response, 'Aantal verdiende sterren', 'Sterren', 'Stars', 'Étoiles gagnées', 'Etoiles gagnees'));
}
function assignmentTime(assignment) {
  const start = String(scoreValue(assignment, 'Start', 'Starttijd', 'Start time') || '');
  const end = String(scoreValue(assignment, 'Einde', 'Eindtijd', 'End time') || '');
  return [start, end].filter(Boolean).join('–');
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
  const savedMission = scoreState.standMissionId || scoreEls.mission.value || localStorage.getItem('moonshot-scorer-mission') || '';
  const missions = activeScoreMissions();
  scoreEls.mission.replaceChildren(scoreOption('', st('chooseMission')));
  missions.forEach((mission, index) => {
    const location = scoreMissionLocation(mission);
    const label = `${scoreMissionName(mission, index)}${location ? ` · ${location}` : ''}`;
    scoreEls.mission.append(scoreOption(scoreMissionId(mission, index + 1), label));
  });
  if ([...scoreEls.mission.options].some((option) => option.value === savedMission)) scoreEls.mission.value = savedMission;
  populateScoreTeams();
  scoreEls.mission.disabled = Boolean(scoreState.standMissionId);
  scoreEls.submit.disabled = false;
  renderScoreStars();
  if (scoreState.standMissionId) renderStandDashboard();
}

function populateScoreTeams() {
  const savedTeam = scoreEls.team.value;
  const teams = teamsForMission(scoreEls.mission.value);
  scoreEls.team.replaceChildren(scoreOption('', st('chooseTeam')));
  teams.forEach((team) => scoreEls.team.append(scoreOption(scoreTeamId(team), scoreTeamLabel(team))));
  if ([...scoreEls.team.options].some((option) => option.value === savedTeam)) scoreEls.team.value = savedTeam;
  scoreEls.team.disabled = false;
}

function renderScoreStars(initialStars = null) {
  const missions = activeScoreMissions();
  const selected = missions.find((mission, index) => scoreMissionId(mission, index + 1) === scoreEls.mission.value);
  const max = Math.max(1, scoreNumber(scoreValue(selected, 'Maximumsterren', 'Maximum stars', 'Max stars')) || 6);
  scoreState.stars = Number.isInteger(initialStars) && initialStars >= 1 && initialStars <= max ? initialStars : null;
  scoreEls.stars.replaceChildren();
  for (let stars = 1; stars <= max; stars += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'scoreStar';
    button.textContent = `${stars} ★`;
    button.setAttribute('role', 'radio');
    const selectedStar = stars === scoreState.stars;
    button.classList.toggle('selected', selectedStar);
    button.setAttribute('aria-checked', String(selectedStar));
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

function currentStandMission() {
  return activeScoreMissions().find((mission, index) => scoreClean(scoreMissionId(mission, index + 1)) === scoreClean(scoreState.standMissionId)) || null;
}

function renderStandTimeline(mission) {
  const assignments = standAssignments(scoreState.standMissionId);
  const visits = assignments.map((assignment) => {
    const team = standTeamForAssignment(assignment);
    return { assignment, team, response: latestStandResponse(team, mission) };
  });
  const completed = visits.filter((visit) => visit.response).length;
  const nextIndex = visits.findIndex((visit) => !visit.response);
  scoreEls.standProgress.textContent = `${completed}/${visits.length} ${st('completedVisits')}`;
  scoreEls.standTimeline.replaceChildren();

  visits.forEach(({ assignment, team, response }, index) => {
    const teamId = scoreTeamId(team);
    const item = document.createElement('li');
    item.className = `standVisit${response ? ' completed' : index === nextIndex ? ' next' : ''}${scoreEls.team.value === teamId ? ' selected' : ''}`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'standVisitButton';
    button.setAttribute('aria-pressed', String(scoreEls.team.value === teamId));

    const node = document.createElement('span');
    node.className = 'standVisitNode';
    node.textContent = String(scoreValue(assignment, 'Ronde', 'Round', 'Tour') || index + 1);

    const details = document.createElement('span');
    details.className = 'standVisitDetails';
    const timing = document.createElement('small');
    timing.textContent = `${st('round')} ${scoreValue(assignment, 'Ronde', 'Round', 'Tour') || index + 1} · ${assignmentTime(assignment)}`;
    const name = document.createElement('strong');
    name.textContent = scoreTeamLabel(team);
    const status = document.createElement('span');
    status.className = 'standVisitStatus';
    status.textContent = response ? `${scoreResponseStars(response)} ★ · ${st('scoreSaved')}` : index === nextIndex ? st('nextGroup') : st('planned');
    details.append(timing, name, status);

    const action = document.createElement('span');
    action.className = 'standVisitAction';
    action.textContent = response ? st('adjustScore') : st('awardPoints');
    button.append(node, details, action);
    button.addEventListener('click', () => selectStandTeam(teamId, true));
    item.append(button);
    const members = String(scoreValue(team, 'Teamleden') || '').split('\n').filter(Boolean);
    if (members.length) {
      const roster = document.createElement('details');
      roster.className = 'teamRoster';
      const summary = document.createElement('summary');
      summary.textContent = `${scoreState.lang === 'nl' ? 'Teamleden' : scoreState.lang === 'fr' ? 'Membres' : 'Team members'} (${members.length})`;
      const list = document.createElement('ul');
      members.forEach(member => { const li = document.createElement('li'); li.textContent = member; list.append(li); });
      roster.append(summary, list);
      item.append(roster);
    }
    scoreEls.standTimeline.append(item);
  });
}

function selectStandTeam(teamId, scroll = false) {
  if (![...scoreEls.team.options].some((option) => option.value === teamId)) return;
  scoreEls.team.value = teamId;
  const mission = currentStandMission();
  const team = activeScoreTeams().find((candidate) => scoreTeamId(candidate) === teamId);
  const response = mission && team ? latestStandResponse(team, mission) : null;
  renderScoreStars(response ? scoreResponseStars(response) : null);
  scoreEls.scoreTitle.textContent = team ? `${st('selectedTeam')} ${scoreTeamLabel(team)}` : st('scoreTitle');
  scoreEls.scoreCardIntro.textContent = team ? `${scoreMissionName(mission, 0)} · ${scoreMissionLocation(mission)}` : st('scoreCardIntro');
  clearScoreStatus();
  if (mission) renderStandTimeline(mission);
  if (scroll) scoreEls.scoreCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderStandDashboard() {
  document.body.classList.add('directStandPage');
  scoreEls.hero.hidden = true;
  scoreEls.standDashboard.hidden = false;
  scoreEls.standSchedule.hidden = false;
  scoreEls.missionField.hidden = true;
  const mission = currentStandMission();
  if (!mission) {
    scoreEls.standMissionTitle.textContent = st('invalidStand');
    scoreEls.standMissionMeta.textContent = '';
    scoreEls.standProgress.textContent = '';
    scoreEls.standSchedule.hidden = true;
    scoreEls.scoreCard.hidden = true;
    document.title = `Moonshot SME · ${st('standEyebrow')}`;
    return;
  }

  scoreEls.scoreCard.hidden = false;
  const assignments = standAssignments(scoreState.standMissionId);
  scoreEls.standMissionTitle.textContent = scoreMissionName(mission, 0);
  scoreEls.standMissionMeta.textContent = `${scoreMissionLocation(mission)} · ${assignments.length} ${st('visits')}`;
  document.title = `${scoreMissionName(mission, 0)} – Moonshot SME`;
  renderStandTimeline(mission);
  if (scoreEls.team.value) selectStandTeam(scoreEls.team.value, false);
  else {
    scoreEls.scoreTitle.textContent = st('scoreTitle');
    scoreEls.scoreCardIntro.textContent = st('scoreCardIntro');
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
  populateScoreTeams();
  renderScoreStars();
  clearScoreStatus();
});
scoreEls.team.addEventListener('change', () => {
  if (scoreState.standMissionId && scoreEls.team.value) selectStandTeam(scoreEls.team.value, false);
  else if (scoreState.standMissionId) {
    renderScoreStars();
    scoreEls.scoreTitle.textContent = st('scoreTitle');
    scoreEls.scoreCardIntro.textContent = st('scoreCardIntro');
    const mission = currentStandMission();
    if (mission) renderStandTimeline(mission);
  }
});
scoreEls.standRefresh.addEventListener('click', async () => {
  const selectedTeam = scoreEls.team.value;
  scoreEls.standRefresh.disabled = true;
  scoreEls.standRefresh.classList.add('refreshing');
  scoreEls.standRefresh.querySelector('[data-i18n]').textContent = st('refreshing');
  await loadScoreData();
  if (selectedTeam) selectStandTeam(selectedTeam, false);
  scoreEls.standRefresh.disabled = false;
  scoreEls.standRefresh.classList.remove('refreshing');
  scoreEls.standRefresh.querySelector('[data-i18n]').textContent = st('refresh');
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
    const submittedTeamId = scoreEls.team.value;
    showScoreStatus('info', scoreState.photo ? st('preparing') : st('sending'));
    const photo = await prepareScorePhoto(scoreState.photo);
    scoreEls.submit.textContent = st('sending');
    showScoreStatus('info', st('sending'));
    const controller = new AbortController();
    timeout = window.setTimeout(() => controller.abort(), 90000);
    const responseBeforeSubmit = JSON.stringify(scoreState.data.responses || []);
    const response = await fetch(window.MoonshotData.scoreEndpoint, {
      method: 'POST', mode: 'no-cors', redirect: 'follow', headers: { 'content-type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({ missionId: scoreEls.mission.value, teamId: scoreEls.team.value, stars: scoreState.stars, photo }),
      signal: controller.signal
    });
    if (response.type !== 'opaque' && !response.ok) throw new Error(st('saveError'));
    // An opaque response confirms delivery only. Confirm persistence in the Sheet.
    const submittedTeam = activeScoreTeams().find((team) => scoreTeamId(team) === submittedTeamId);
    const submittedMission = activeScoreMissions().find((mission) => scoreMissionId(mission) === scoreEls.mission.value);
    let confirmed = false;
    for (let attempt = 0; attempt < 12 && !controller.signal.aborted; attempt += 1) {
      if (attempt) await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const updated = await window.MoonshotData.load();
        const previous = scoreState.data;
        scoreState.data = updated;
        const saved = submittedTeam && submittedMission ? latestStandResponse(submittedTeam, submittedMission) : null;
        const newMatchingRow = saved && !(JSON.parse(responseBeforeSubmit)).some((row) => JSON.stringify(row) === JSON.stringify(saved));
        if (newMatchingRow && scoreResponseStars(saved) === scoreState.stars) { confirmed = true; break; }
        scoreState.data = previous;
      } catch { /* Retry a delayed Sheets refresh without submitting again. */ }
    }
    if (!confirmed) throw new Error(st('timeoutError'));
    scoreState.stars = null;
    scoreState.photo = null;
    scoreEls.photo.value = '';
    scoreEls.drop.classList.remove('hasPhoto');
    scoreEls.preview.removeAttribute('src');
    if (scoreState.previewUrl) URL.revokeObjectURL(scoreState.previewUrl);
    scoreState.previewUrl = null;
    if (scoreState.standMissionId) {
      await loadScoreData();
      selectStandTeam(submittedTeamId, false);
      showScoreStatus('success', st('success'), true);
    } else {
      scoreEls.team.value = '';
      renderScoreStars();
      showScoreStatus('success', st('success'), true);
    }
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
