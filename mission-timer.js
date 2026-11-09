// Both dates use Belgian winter time. Switch to tomorrow's schedule at midnight.
const rehearsalStart = Date.parse('2026-11-09T13:20:00+01:00');
const eventDay = Date.parse('2026-11-10T00:00:00+01:00');
const eventStart = Date.parse('2026-11-10T13:20:00+01:00');
const minute = 60_000;
const phases = [{ label: 'start', minutes: 10, destinationRound: 1 }];
for (let round = 1; round <= 6; round += 1) {
  phases.push({ label: 'mission', round, minutes: 15, destinationRound: round });
  if (round < 6) phases.push({ label: 'move', minutes: 5, destinationRound: round + 1 });
}

const copy = {
  en: { title: 'Mission timer', waiting: 'Starts at 13:20 (Belgian time)', start: 'Start in', mission: 'Mission', move: 'Move to next mission', end: 'End' },
  nl: { title: 'Missietimer', waiting: 'Start om 13.20 uur (Belgische tijd)', start: 'Start over', mission: 'Mission', move: 'Wisseltijd', end: 'Einde' },
  fr: { title: 'Chrono des missions', waiting: 'Départ à 13 h 20 (heure belge)', start: 'Départ dans', mission: 'Mission', move: 'Passez à la mission suivante', end: 'Fin' }
};

export function timerAt(now) {
  const start = now < eventDay ? rehearsalStart : eventStart;
  if (now < start) return { label: 'waiting', time: null, destinationRound: 1 };
  let end = start;
  for (const phase of phases) {
    end += phase.minutes * minute;
    if (now < end) {
      const seconds = Math.ceil((end - now) / 1000);
      const time = [Math.floor(seconds / 60), seconds % 60]
        .map((value) => String(value).padStart(2, '0')).join(':');
      return { label: phase.label, round: phase.round, destinationRound: phase.destinationRound, time };
    }
  }
  return { label: 'end', time: '00:00' };
}

export function mountMissionTimer(anchor, onTick) {
  const panel = document.createElement('div');
  panel.className = 'missionTimer';
  panel.innerHTML = `
    <div>
      <p class="eyebrow missionTimerTitle"></p>
      <strong class="missionTimerPhase" role="status"></strong>
    </div>
    <span class="missionTimerClock" role="timer"></span>`;
  const title = panel.querySelector('.missionTimerTitle');
  const phase = panel.querySelector('.missionTimerPhase');
  const clock = panel.querySelector('.missionTimerClock');
  anchor.after(panel);

  function render() {
    const labels = copy[document.documentElement.lang] || copy.en;
    const state = timerAt(Date.now());
    const phaseText = [labels[state.label], state.round].filter(Boolean).join(' ');
    if (title.textContent !== labels.title) title.textContent = labels.title;
    if (phase.textContent !== phaseText) phase.textContent = phaseText;
    clock.hidden = state.time === null;
    if (clock.textContent !== (state.time || '')) clock.textContent = state.time || '';
    onTick?.(state.destinationRound);
  }

  render();
  window.setInterval(render, 250);
  document.addEventListener('visibilitychange', render);
  return panel;
}
