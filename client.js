const copy = {
  en: {
    liveStatus: 'Live data · Google Sheets', heroLead: 'Track your',
    heroIntro: 'See completed missions, earned stars and your team photos in one place.',
    teamAccess: 'Team access', teamLabel: 'Team', codeLabel: 'Team code',
    codePlaceholder: 'Your unique code', loadingTeams: 'Loading teams…', chooseTeam: 'Choose your team…',
    viewProgress: 'View progress', dashboardEyebrow: 'TEAM DASHBOARD', totalStars: 'Total stars',
    missionsLabel: 'Missions', progressLabel: 'Progress', teamPhotos: 'Team photos',
    refresh: 'Refresh', refreshing: 'Refreshing…', updated: 'Updated', leaderboard: 'Leaderboard',
    liveRanking: 'Live ranking', missionsLower: 'missions',
    mission: 'MISSION', pending: 'Still to play', played: 'played', photo: 'photo', photos: 'photos',
    noPhotos: 'No team photos yet.', chooseError: 'Choose your team first.',
    codeError: 'That team code is not correct.', loadError: 'The live data could not be loaded. Please try again shortly.'
  },
  nl: {
    liveStatus: 'Live data · Google Sheets', heroLead: 'Volg jullie',
    heroIntro: 'Bekijk gespeelde missies, verdiende sterren en alle teamfoto’s op één plek.',
    teamAccess: 'Teamtoegang', teamLabel: 'Team', codeLabel: 'Teamcode',
    codePlaceholder: 'Jullie unieke code', loadingTeams: 'Teams laden…', chooseTeam: 'Kies je team…',
    viewProgress: 'Bekijk voortgang', dashboardEyebrow: 'TEAMDASHBOARD', totalStars: 'Totaal sterren',
    missionsLabel: 'Missies', progressLabel: 'Voortgang', teamPhotos: 'Teamfoto’s',
    refresh: 'Vernieuwen', refreshing: 'Vernieuwen…', updated: 'Bijgewerkt', leaderboard: 'Klassement',
    liveRanking: 'Live rangschikking', missionsLower: 'missies',
    mission: 'MISSIE', pending: 'Nog te spelen', played: 'gespeeld', photo: 'foto', photos: 'foto’s',
    noPhotos: 'Nog geen teamfoto’s.', chooseError: 'Kies eerst je team.',
    codeError: 'Die teamcode is niet correct.', loadError: 'De live data kon niet worden geladen. Probeer het zo meteen opnieuw.'
  },
  fr: {
    liveStatus: 'Données en direct · Google Sheets', heroLead: 'Suivez votre',
    heroIntro: 'Retrouvez les missions accomplies, les étoiles gagnées et les photos de votre équipe.',
    teamAccess: 'Accès équipe', teamLabel: 'Équipe', codeLabel: 'Code équipe',
    codePlaceholder: 'Votre code unique', loadingTeams: 'Chargement des équipes…', chooseTeam: 'Choisissez votre équipe…',
    viewProgress: 'Voir la progression', dashboardEyebrow: 'TABLEAU DE BORD', totalStars: 'Total des étoiles',
    missionsLabel: 'Missions', progressLabel: 'Progression', teamPhotos: 'Photos d’équipe',
    refresh: 'Actualiser', refreshing: 'Actualisation…', updated: 'Mis à jour', leaderboard: 'Classement',
    liveRanking: 'Classement en direct', missionsLower: 'missions',
    mission: 'MISSION', pending: 'Encore à jouer', played: 'jouées', photo: 'photo', photos: 'photos',
    noPhotos: 'Pas encore de photos d’équipe.', chooseError: 'Choisissez d’abord votre équipe.',
    codeError: 'Ce code équipe n’est pas correct.', loadError: 'Impossible de charger les données en direct. Réessayez dans un instant.'
  }
};

const translatedMissions = {
  nl: ['Maanlanding', 'Gewichtloos', 'Raketestafette', 'Marshabitat', 'Satellietsignaal', 'Kosmische code', 'Maanwandeling', 'Baanbouwer', 'Sterrennavigator', 'Vluchtleiding', 'Buitenaardse taal', 'Zonnesprint', 'Meteorietafweer', 'Ruimtelab', 'Galactische missie', 'Lanceersequentie', 'Krateruitdaging', 'Diepe ruimte', 'Astropuzzel', 'Laatste grens'],
  fr: ['Alunissage', 'Zéro gravité', 'Relais fusée', 'Habitat martien', 'Signal satellite', 'Code cosmique', 'Marche lunaire', 'Constructeur d’orbite', 'Navigateur stellaire', 'Contrôle de mission', 'Langage extraterrestre', 'Sprint solaire', 'Défense antimétéorite', 'Laboratoire spatial', 'Quête galactique', 'Séquence de lancement', 'Défi du cratère', 'Espace lointain', 'Puzzle astro', 'Ultime frontière']
};

const state = { data: null, team: null, lang: initialLanguage(), fetchedAt: null };
const els = {
  teamSelect: document.querySelector('#teamSelect'), teamCode: document.querySelector('#teamCode'),
  open: document.querySelector('#openDashboard'), error: document.querySelector('#error'),
  dashboard: document.querySelector('#dashboard'), teamTitle: document.querySelector('#teamTitle'),
  stars: document.querySelector('#totalStars'), played: document.querySelector('#playedCount'),
  total: document.querySelector('#missionTotal'), percent: document.querySelector('#progressPct'),
  bar: document.querySelector('#progressBar'), missionSummary: document.querySelector('#missionSummary'),
  missionGrid: document.querySelector('#missionGrid'), photoCount: document.querySelector('#photoCount'),
  gallery: document.querySelector('#gallery'), leaderboard: document.querySelector('#leaderboard'),
  refresh: document.querySelector('#refreshData'), lastUpdated: document.querySelector('#lastUpdated')
};

function initialLanguage() {
  const saved = localStorage.getItem('moonshot-language');
  if (copy[saved]) return saved;
  const browserLanguage = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return copy[browserLanguage] ? browserLanguage : 'en';
}

function t(key) { return copy[state.lang][key] || copy.en[key] || key; }
function value(row, ...keys) {
  const exact = keys.find((key) => Object.prototype.hasOwnProperty.call(row || {}, key));
  if (exact) return row[exact];
  const normalized = Object.keys(row || {}).find((key) => keys.some((wanted) => clean(key) === clean(wanted)));
  return normalized ? row[normalized] : '';
}
function clean(input) { return String(input ?? '').trim().toLowerCase(); }
function number(input) {
  const parsed = Number(String(input ?? '').replace(',', '.').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}
function truthy(input) { return !['false', 'onwaar', 'faux', 'nee', 'non', 'no', '0'].includes(clean(input)); }
function order(row, fallback) { return number(value(row, 'Volgorde', 'Order', 'Ordre')) || fallback; }
function teamName(row) { return String(value(row, 'Teamnaam', 'Team name', 'Nom de l’équipe', 'Nom de l equipe') || ''); }
function teamCode(row) { return String(value(row, 'Teamcode', 'Team code', 'Code équipe', 'Code equipe') || ''); }
function teamId(row) { return String(value(row, 'Team-ID', 'Team ID', 'ID') || teamName(row)); }

function setLanguage(lang) {
  state.lang = copy[lang] ? lang : 'en';
  localStorage.setItem('moonshot-language', state.lang);
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => { node.placeholder = t(node.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === state.lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  populateTeams();
  if (state.team) renderDashboard();
  renderUpdatedTime();
}

function activeTeams() {
  return (state.data?.teams || []).filter((team) => truthy(value(team, 'Actief', 'Active', 'Actif')))
    .sort((a, b) => order(a, 999) - order(b, 999));
}

function populateTeams() {
  if (!state.data) return;
  const selected = els.teamSelect.value;
  els.teamSelect.replaceChildren();
  const prompt = document.createElement('option');
  prompt.value = '';
  prompt.textContent = t('chooseTeam');
  els.teamSelect.append(prompt);
  activeTeams().forEach((team, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = teamName(team);
    els.teamSelect.append(option);
  });
  if ([...els.teamSelect.options].some((option) => option.value === selected)) els.teamSelect.value = selected;
}

function missionId(row, fallback) {
  const explicit = value(row, 'Missie-ID', 'Mission-ID', 'Mission ID', 'ID');
  const digits = String(explicit || '').match(/\d+/)?.[0];
  return digits ? String(Number(digits)).padStart(2, '0') : String(fallback).padStart(2, '0');
}
function missionName(row, index) {
  const localized = state.lang === 'nl'
    ? value(row, 'Missienaam NL', 'Naam NL')
    : state.lang === 'fr' ? value(row, 'Nom FR', 'Missienaam FR', 'Naam FR') : value(row, 'Mission name EN', 'Name EN');
  const sheetName = value(row, 'Missienaam', 'Mission name', 'Naam', 'Mission', 'Stand / missie');
  return String(localized || sheetName || translatedMissions[state.lang]?.[index] || `${t('mission')} ${index + 1}`);
}
function missions() {
  return (state.data?.missions || []).filter((mission) => truthy(value(mission, 'Actief', 'Active', 'Actif')))
    .sort((a, b) => order(a, 999) - order(b, 999));
}
function normalizeMission(input) { return clean(input).replace(/[^a-z0-9]/g, ''); }
function responseMatchesMission(response, mission, index) {
  const submitted = value(response, 'Stand / missie', 'Missie', 'Mission', 'Poste / mission');
  const candidates = [missionId(mission, index + 1), missionName(mission, index), value(mission, 'Missienaam', 'Mission name', 'Naam', 'Mission')];
  const normalized = normalizeMission(submitted);
  if (candidates.some((candidate) => normalizeMission(candidate) === normalized)) return true;
  const submittedDigits = String(submitted || '').match(/\d+/)?.[0];
  return submittedDigits ? String(Number(submittedDigits)).padStart(2, '0') === missionId(mission, index + 1) : false;
}
function teamResponses(team) {
  const selectedName = clean(teamName(team));
  return (state.data?.responses || []).filter((response) => clean(value(response, 'Teamnaam', 'Team name', 'Nom de l’équipe', 'Nom de l equipe')) === selectedName);
}

function teamProgress(team) {
  const missionList = missions();
  const responses = teamResponses(team);
  const completed = missionList.map((mission, index) => {
    const matches = responses.filter((response) => responseMatchesMission(response, mission, index));
    return { mission, index, response: matches.at(-1) };
  });
  const played = completed.filter((item) => item.response);
  const stars = played.reduce((sum, item) => sum + number(value(item.response, 'Aantal verdiende sterren', 'Sterren', 'Stars', 'Étoiles gagnées', 'Etoiles gagnees')), 0);
  const percentage = missionList.length ? Math.round((played.length / missionList.length) * 100) : 0;
  return { missionList, responses, completed, played, stars, percentage };
}

function renderDashboard() {
  const { missionList, responses, completed, played, stars, percentage } = teamProgress(state.team);

  els.teamTitle.textContent = teamName(state.team);
  els.stars.textContent = String(stars);
  els.played.textContent = String(played.length);
  els.total.textContent = String(missionList.length);
  els.percent.textContent = `${percentage}%`;
  els.bar.style.width = `${percentage}%`;
  els.missionSummary.textContent = `${played.length} / ${missionList.length} ${t('played')}`;
  els.missionGrid.replaceChildren();

  completed.forEach(({ mission, index, response }) => {
    const card = document.createElement('article');
    card.className = `mission${response ? '' : ' pending'}`;
    const label = document.createElement('small');
    label.textContent = `${t('mission')} ${missionId(mission, index + 1)}`;
    const title = document.createElement('h4');
    title.textContent = missionName(mission, index);
    const result = document.createElement('div');
    result.textContent = response ? `${number(value(response, 'Aantal verdiende sterren', 'Sterren', 'Stars', 'Étoiles gagnées', 'Etoiles gagnees'))} ★` : t('pending');
    card.append(label, title, result);
    els.missionGrid.append(card);
  });

  const photos = responses.flatMap((response) => photoUrls(value(response, 'Teamfoto', 'Team photo', 'Photo d’équipe', 'Photo d equipe'))
    .map((url) => ({ url, mission: String(value(response, 'Stand / missie', 'Missie', 'Mission', 'Poste / mission') || '') })));
  els.photoCount.textContent = `${photos.length} ${photos.length === 1 ? t('photo') : t('photos')}`;
  els.gallery.replaceChildren();
  if (!photos.length) {
    const empty = document.createElement('p');
    empty.className = 'emptyState';
    empty.textContent = t('noPhotos');
    els.gallery.append(empty);
  } else {
    photos.forEach(({ url, mission }) => els.gallery.append(photoCard(url, mission)));
  }
  renderLeaderboard();
}

function renderLeaderboard() {
  const ranking = activeTeams().map((team, index) => {
    const progress = teamProgress(team);
    return { team, stars: progress.stars, played: progress.played.length, total: progress.missionList.length, sheetOrder: order(team, index + 1) };
  }).sort((a, b) => b.stars - a.stars || b.played - a.played || a.sheetOrder - b.sheetOrder);

  els.leaderboard.replaceChildren();
  ranking.forEach((entry, index) => {
    const row = document.createElement('li');
    row.className = `leaderboardRow${teamId(entry.team) === teamId(state.team) ? ' current' : ''}`;

    const rank = document.createElement('span');
    rank.className = 'leaderboardRank';
    rank.textContent = index < 3 ? ['🥇', '🥈', '🥉'][index] : String(index + 1);

    const name = document.createElement('strong');
    name.className = 'leaderboardName';
    name.textContent = teamName(entry.team);

    const missionsPlayed = document.createElement('span');
    missionsPlayed.className = 'leaderboardMissions';
    missionsPlayed.textContent = `${entry.played}/${entry.total} ${t('missionsLower')}`;

    const score = document.createElement('strong');
    score.className = 'leaderboardScore';
    score.textContent = `${entry.stars} ★`;

    row.append(rank, name, missionsPlayed, score);
    els.leaderboard.append(row);
  });
}

function photoUrls(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input.flatMap(photoUrls);
  return String(input).split(/[,\n]/).map((url) => url.trim()).filter((url) => /^https?:\/\//i.test(url));
}
function drivePreview(url) {
  const id = url.match(/\/d\/([\w-]+)/)?.[1] || url.match(/[?&]id=([\w-]+)/)?.[1];
  return id ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1200` : url;
}
function photoCard(url, label) {
  const link = document.createElement('a');
  link.className = 'photo';
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  const image = document.createElement('img');
  image.src = drivePreview(url);
  image.alt = label || t('teamPhotos');
  image.loading = 'lazy';
  image.referrerPolicy = 'no-referrer';
  const title = document.createElement('strong');
  title.textContent = label || t('teamPhotos');
  link.append(image, title);
  return link;
}

function showError(key) {
  els.error.textContent = t(key);
  els.error.hidden = false;
}

function renderUpdatedTime() {
  if (!state.fetchedAt) {
    els.lastUpdated.textContent = t('liveStatus');
    return;
  }
  const locale = state.lang === 'nl' ? 'nl-BE' : state.lang === 'fr' ? 'fr-BE' : 'en-GB';
  const time = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(state.fetchedAt));
  els.lastUpdated.textContent = `${t('updated')} ${time}`;
}

async function loadData(manual = false) {
  const label = els.refresh.querySelector('[data-i18n="refresh"]');
  els.refresh.disabled = true;
  els.refresh.classList.toggle('refreshing', manual);
  if (manual) label.textContent = t('refreshing');

  try {
    const data = await window.MoonshotData.load();
    const selectedTeamId = state.team ? teamId(state.team) : null;
    state.data = data;
    state.fetchedAt = data.fetchedAt || new Date().toISOString();
    if (selectedTeamId) state.team = activeTeams().find((team) => teamId(team) === selectedTeamId) || null;
    populateTeams();
    if (state.team) {
      const selectedIndex = activeTeams().findIndex((team) => teamId(team) === teamId(state.team));
      els.teamSelect.value = selectedIndex >= 0 ? String(selectedIndex) : '';
      renderDashboard();
    } else if (!els.dashboard.hidden) {
      els.dashboard.hidden = true;
    }
    renderUpdatedTime();
    els.error.hidden = true;
    els.teamSelect.disabled = false;
    els.open.disabled = false;
  } catch {
    showError('loadError');
  } finally {
    els.refresh.disabled = !state.data;
    els.refresh.classList.remove('refreshing');
    label.textContent = t('refresh');
  }
}

els.open.addEventListener('click', () => {
  const team = activeTeams()[Number(els.teamSelect.value)];
  if (!team || els.teamSelect.value === '') return showError('chooseError');
  if (clean(els.teamCode.value) !== clean(teamCode(team))) return showError('codeError');
  els.error.hidden = true;
  state.team = team;
  renderDashboard();
  els.dashboard.hidden = false;
  els.dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
els.teamCode.addEventListener('keydown', (event) => { if (event.key === 'Enter') els.open.click(); });
els.refresh.addEventListener('click', () => loadData(true));
document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));

setLanguage(state.lang);
loadData();
