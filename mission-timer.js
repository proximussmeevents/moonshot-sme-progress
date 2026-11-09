const eventStart = Date.parse('2026-11-10T13:20:00+01:00');
const minute = 60_000;
const phases = [{ label: 'start', minutes: 10, destinationRound: 1 }];
for (let round = 1; round <= 6; round += 1) {
  phases.push({ label: 'mission', round, minutes: 15, destinationRound: round });
  if (round < 6) phases.push({ label: 'move', minutes: 5, destinationRound: round + 1 });
}

const copy = {
  en: { title: 'Mission timer', start: 'Start in', mission: 'Mission', move: 'Move to next mission', end: 'End' },
  nl: { title: 'Missietimer', start: 'Start over', mission: 'Mission', move: 'Wisseltijd', end: 'Einde' },
  fr: { title: 'Chrono des missions', start: 'Départ dans', mission: 'Mission', move: 'Passez à la mission suivante', end: 'Fin' }
};

export function timerAt(now) {
  let end = eventStart;
  for (const phase of phases) {
    end += phase.minutes * minute;
    if (now < end) {
      const seconds = Math.ceil((end - now) / 1000);
      const hours = Math.floor(seconds / 3600);
      const parts = [Math.floor(seconds / 60) % 60, seconds % 60];
      if (hours > 0) parts.unshift(hours);
      const time = parts.map((value) => String(value).padStart(2, '0')).join(':');
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
    if (clock.textContent !== state.time) clock.textContent = state.time;
    onTick?.(state.destinationRound);
  }

  render();
  window.setInterval(render, 250);
  document.addEventListener('visibilitychange', render);
  return panel;
}
