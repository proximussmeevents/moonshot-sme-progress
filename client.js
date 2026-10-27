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
    timelineEyebrow: 'YOUR FLIGHT PLAN', timelineTitle: 'Your mission journey',
    mission: 'MISSION', round: 'ROUND', location: 'Location', pending: 'Planned', nextMission: 'Next mission', completed: 'Completed', played: 'played', photo: 'photo', photos: 'photos',
    noPhotos: 'No team photos yet.', chooseError: 'Choose your team first.', teamLinkError: 'This team link is not valid.',
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
    timelineEyebrow: 'JULLIE VLUCHTPLAN', timelineTitle: 'Jullie persoonlijke missieroute',
    mission: 'MISSIE', round: 'RONDE', location: 'Locatie', pending: 'Gepland', nextMission: 'Volgende missie', completed: 'Voltooid', played: 'gespeeld', photo: 'foto', photos: 'foto’s',
    noPhotos: 'Nog geen teamfoto’s.', chooseError: 'Kies eerst je team.', teamLinkError: 'Deze teamlink is niet geldig.',
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
    timelineEyebrow: 'VOTRE PLAN DE VOL', timelineTitle: 'Votre parcours de mission',
    mission: 'MISSION', round: 'TOUR', location: 'Lieu', pending: 'Planifiée', nextMission: 'Prochaine mission', completed: 'Terminée', played: 'jouées', photo: 'photo', photos: 'photos',
    noPhotos: 'Pas encore de photos d’équipe.', chooseError: 'Choisissez d’abord votre équipe.', teamLinkError: 'Ce lien d’équipe n’est pas valide.',
    codeError: 'Ce code équipe n’est pas correct.', loadError: 'Impossible de charger les données en direct. Réessayez dans un instant.'
  }
};

const state = { data: null, team: null, lang: initialLanguage(), fetchedAt: null, directTeamId: teamIdFromPath() };
const els = {
  hero: document.querySelector('#siteHero'), teamAccess: document.querySelector('#teamAccess'),
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

function teamIdFromPath() {
  const queryTeam = new URLSearchParams(window.location.search).get('team');
  if (queryTeam) return queryTeam;
  const match = window.location.pathname.match(/\/team\/([^/]+)\/?$/i);
  if (!match) return '';
  try { return decodeURIComponent(match[1]); } catch { return ''; }
}

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
function teamAliases(row) {
  return String(value(row, 'Vorige namen', 'Eerdere namen', 'Previous names', 'Anciens noms') || '')
    .split(/[;,\n]/)
    .map(clean)
    .filter(Boolean);
}

function openTeamDashboard(team, updateUrl = false) {
  state.team = team;
  const id = teamId(team);
  if (updateUrl && id) history.pushState({ teamId: id }, '', new URL(`?team=${encodeURIComponent(id)}`, window.MoonshotData.baseUrl));
  state.directTeamId = id;
  document.body.classList.add('directTeamPage');
  els.hero.hidden = true;
  els.teamAccess.hidden = true;
  document.title = `${teamName(team)} – Moonshot SME`;
  renderDashboard();
  els.dashboard.hidden = false;
}

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
  const seen = new Set();
  return (state.data?.teams || [])
    .filter((team) => truthy(value(team, 'Actief', 'Active', 'Actif')) && clean(teamId(team)) && clean(teamName(team)))
    .sort((a, b) => order(a, 999) - order(b, 999))
    .filter((team) => {
      const id = clean(teamId(team));
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
}

function populateTeams() {
  if (!state.data) return;
  const selected = els.teamSelect.value;
  els.teamSelect.replaceChildren();
  const prompt = document.createElement('option');
  prompt.value = '';
  prompt.textContent = t('chooseTeam');
  els.teamSelect.append(prompt);
  activeTeams().forEach((team) => {
    const option = document.createElement('option');
    option.value = teamId(team);
    option.textContent = teamName(team);
    els.teamSelect.append(option);
  });
  if ([...els.teamSelect.options].some((option) => option.value === selected)) els.teamSelect.value = selected;
}

function missionId(row) {
  return String(value(row, 'Missie-ID', 'Mission-ID', 'Mission ID', 'ID') || '');
}
function missionName(row, index = 0) {
  const localized = state.lang === 'nl'
    ? value(row, 'Missienaam NL', 'Naam NL')
    : state.lang === 'fr' ? value(row, 'Nom FR', 'Missienaam FR', 'Naam FR') : value(row, 'Mission name EN', 'Name EN');
  const sheetName = value(row, 'Missienaam', 'Mission name', 'Naam', 'Mission', 'Stand / missie');
  return String(localized || sheetName || `${t('mission')} ${index + 1}`);
}
function missions() {
  return (state.data?.missions || []).filter((mission) => truthy(value(mission, 'Actief', 'Active', 'Actif')))
    .sort((a, b) => order(a, 999) - order(b, 999));
}
function matrixRows() {
  return (state.data?.matrix || []).filter((row) => truthy(value(row, 'Actief', 'Active', 'Actif')));
}
function assignmentsForTeam(team) {
  const selectedId = clean(teamId(team));
  const selectedName = clean(teamName(team));
  return matrixRows()
    .filter((row) => {
      const rowId = clean(value(row, 'Team-ID', 'Team ID'));
      const rowName = clean(value(row, 'Teamnaam', 'Team name', 'Groep'));
      return (rowId && rowId === selectedId) || (!rowId && rowName === selectedName);
    })
    .sort((a, b) => number(value(a, 'Ronde', 'Round', 'Tour')) - number(value(b, 'Ronde', 'Round', 'Tour')));
}
function missionForAssignment(assignment) {
  const id = clean(value(assignment, 'Missie-ID', 'Mission-ID', 'Mission ID'));
  return missions().find((mission) => clean(missionId(mission)) === id) || assignment;
}
function assignmentRound(assignment, fallback) { return number(value(assignment, 'Ronde', 'Round', 'Tour')) || fallback; }
function assignmentTime(assignment) {
  const start = String(value(assignment, 'Start', 'Starttijd', 'Start time') || '');
  const end = String(value(assignment, 'Einde', 'Eindtijd', 'End time') || '');
  return [start, end].filter(Boolean).join('–');
}
function assignmentLocation(assignment, mission) {
  return String(value(assignment, 'Locatie', 'Location', 'Lieu') || value(mission, 'Locatie', 'Location', 'Lieu') || '');
}
function missionDetails(mission) {
  const num = value(mission, 'Missionnummer') || value(mission, 'Volgorde');
  const zone = value(mission, 'Zone');
  const floor = state.lang === 'nl' ? zone : state.lang === 'fr' ? ({Boven: 'À l’étage', Beneden: 'Rez-de-chaussée'}[zone] || zone) : ({Boven: 'Upstairs', Beneden: 'Downstairs'}[zone] || zone);
  return [`Mission ${String(num).padStart(2, '0')}`, floor].filter(Boolean).join(' · ');
}
function normalizeMission(input) { return clean(input).replace(/[^a-z0-9]/g, ''); }
function responseMatchesMission(response, mission, assignment) {
  const submitted = value(response, 'Stand / missie', 'Missie', 'Mission', 'Poste / mission');
  const candidates = [
    missionId(mission),
    value(assignment, 'Missie-ID', 'Mission-ID', 'Mission ID'),
    missionName(mission),
    value(assignment, 'Missienaam', 'Mission name', 'Naam', 'Mission')
  ];
  const normalized = normalizeMission(submitted);
  return candidates.some((candidate) => candidate && normalizeMission(candidate) === normalized);
}
function teamResponses(team) {
  const acceptedNames = new Set([clean(teamName(team)), ...teamAliases(team)]);
  const selectedId = clean(teamId(team));
  return (state.data?.responses || []).filter((response) => {
    const responseId = clean(value(response, 'Team-ID', 'Team ID', 'ID'));
    const responseName = clean(value(response, 'Teamnaam', 'Team name', 'Nom de l’équipe', 'Nom de l equipe'));
    return (responseId && responseId === selectedId) || acceptedNames.has(responseName);
  });
}

function teamProgress(team) {
  const assignmentList = assignmentsForTeam(team);
  const responses = teamResponses(team);
  const completed = assignmentList.map((assignment, index) => {
    const mission = missionForAssignment(assignment);
    const matches = responses.filter((response) => responseMatchesMission(response, mission, assignment));
    return { mission, assignment, index, response: matches.at(-1) };
  });
  const played = completed.filter((item) => item.response);
  const stars = played.reduce((sum, item) => sum + number(value(item.response, 'Aantal verdiende sterren', 'Sterren', 'Stars', 'Étoiles gagnées', 'Etoiles gagnees')), 0);
  const percentage = assignmentList.length ? Math.round((played.length / assignmentList.length) * 100) : 0;
  return { assignmentList, responses, completed, played, stars, percentage };
}

function renderDashboard() {
  const { assignmentList, responses, completed, played, stars, percentage } = teamProgress(state.team);

  els.teamTitle.textContent = [teamName(state.team), value(state.team, 'Teamtaal')].filter(Boolean).join(' – ');
  let roster = document.querySelector('#teamRoster');
  if (!roster) { roster = document.createElement('details'); roster.id = 'teamRoster'; roster.className = 'teamRoster'; els.teamTitle.after(roster); }
  roster.replaceChildren();
  const members = String(value(state.team, 'Teamleden') || '').split('\n').filter(Boolean);
  roster.hidden = !members.length;
  const summary = document.createElement('summary');
  summary.textContent = `${state.lang === 'nl' ? 'Teamleden' : state.lang === 'fr' ? 'Membres' : 'Team members'} (${members.length})`;
  const list = document.createElement('ul');
  members.forEach(member => { const li = document.createElement('li'); li.textContent = member; list.append(li); });
  roster.append(summary, list);
  els.stars.textContent = String(stars);
  els.played.textContent = String(played.length);
  els.total.textContent = String(assignmentList.length);
  els.percent.textContent = `${percentage}%`;
  els.bar.style.width = `${percentage}%`;
  els.missionSummary.textContent = `${played.length} / ${assignmentList.length} ${t('played')}`;
  els.missionGrid.replaceChildren();
  els.missionGrid.style.setProperty('--timeline-progress', `${percentage}%`);
  els.missionGrid.setAttribute('aria-label', t('timelineTitle'));

  const nextIndex = completed.findIndex((item) => !item.response);

  completed.forEach(({ mission, assignment, index, response }) => {
    const step = document.createElement('li');
    const status = response ? 'completed' : index === nextIndex ? 'next' : 'pending';
    step.className = `missionStep ${status}`;

    const node = document.createElement('span');
    node.className = 'timelineNode';
    node.setAttribute('aria-hidden', 'true');
    node.textContent = String(assignmentRound(assignment, index + 1));

    const card = document.createElement('article');
    card.className = `mission ${status}`;
    const header = document.createElement('div');
    header.className = 'missionHeader';
    const round = document.createElement('small');
    round.className = 'roundBadge';
    round.textContent = `${t('round')} ${assignmentRound(assignment, index + 1)}`;
    const timeBadge = document.createElement('strong');
    timeBadge.className = 'timeBadge';
    const time = assignmentTime(assignment);
    timeBadge.textContent = time;
    header.append(round, timeBadge);
    const title = document.createElement('h4');
    title.textContent = missionName(mission, index);
    const location = document.createElement('p');
    location.className = 'missionMeta';
    location.textContent = `${missionDetails(mission)} · ${assignmentLocation(assignment, mission)}`;
    const result = document.createElement('div');
    result.className = 'missionStatus';
    result.textContent = response
      ? `${number(value(response, 'Aantal verdiende sterren', 'Sterren', 'Stars', 'Étoiles gagnées', 'Etoiles gagnees'))} ★ · ${t('completed')}`
      : index === nextIndex ? t('nextMission') : t('pending');
    card.append(header, title, location, result);
    step.append(card, node);
    els.missionGrid.append(step);
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
    return { team, stars: progress.stars, played: progress.played.length, total: progress.assignmentList.length, sheetOrder: order(team, index + 1) };
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
    if (state.directTeamId && !state.team) {
      const directTeam = activeTeams().find((team) => clean(teamId(team)) === clean(state.directTeamId));
      if (directTeam) openTeamDashboard(directTeam);
      else showError('teamLinkError');
    }
    if (selectedTeamId) state.team = activeTeams().find((team) => teamId(team) === selectedTeamId) || null;
    populateTeams();
    if (state.team) {
      els.teamSelect.value = teamId(state.team);
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
  const team = activeTeams().find((candidate) => clean(teamId(candidate)) === clean(els.teamSelect.value));
  if (!team) return showError('chooseError');
  if (clean(els.teamCode.value) !== clean(teamCode(team))) return showError('codeError');
  els.error.hidden = true;
  openTeamDashboard(team, true);
  els.dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
els.teamCode.addEventListener('keydown', (event) => { if (event.key === 'Enter') els.open.click(); });
els.refresh.addEventListener('click', () => loadData(true));
document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));

setLanguage(state.lang);
loadData();
