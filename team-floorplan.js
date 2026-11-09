// Coordinates on the 1450 px PDF render, before cropping to the map.
const booths = {
  1: [0, 167, 584], 2: [1, 938, 415], 3: [1, 756, 327],
  4: [1, 135, 317], 5: [1, 135, 527], 6: [1, 135, 435],
  7: [1, 382, 327], 8: [1, 135, 903], 9: [1, 938, 824],
  10: [1, 135, 657], 11: [1, 285, 327], 12: [1, 377, 824],
  13: [1, 631, 824], 14: [1, 534, 327], 15: [0, 909, 311],
  16: [1, 938, 652], 17: [0, 414, 584], 18: [0, 538, 311],
  19: [0, 167, 311], 20: [0, 661, 584], 21: [0, 579, 795],
  22: [0, 928, 795], 23: [0, 909, 584]
};

const copy = {
  en: { title: 'Floor plan', close: 'Close', floors: ['Ground floor', 'Upstairs'], round: 'Round' },
  nl: { title: 'Zaalplan', close: 'Sluiten', floors: ['Beneden', 'Boven'], round: 'Ronde' },
  fr: { title: 'Plan des salles', close: 'Fermer', floors: ['Rez-de-chaussée', 'À l’étage'], round: 'Tour' }
};

function position(node, x, y) {
  node.style.left = `${(x - 55) / 975 * 100}%`;
  node.style.top = `${(y - 195) / 775 * 100}%`;
}

export function mountTeamFloorplan(timer, getDestination) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'refreshButton teamFloorplanButton';
  button.setAttribute('aria-haspopup', 'dialog');
  timer.append(button);

  const dialog = document.createElement('dialog');
  dialog.className = 'teamFloorplan';
  dialog.setAttribute('aria-labelledby', 'teamFloorplanTitle');
  dialog.innerHTML = `
    <header>
      <h3 id="teamFloorplanTitle"></h3>
      <form method="dialog"><button class="refreshButton" autofocus></button></form>
    </header>
    <p class="teamFloorplanDestination" role="status" hidden></p>
    <div class="teamFloorplanMaps"></div>`;
  timer.after(dialog);

  const title = dialog.querySelector('h3');
  const close = dialog.querySelector('button');
  const destination = dialog.querySelector('.teamFloorplanDestination');
  const maps = dialog.querySelector('.teamFloorplanMaps');
  const decks = [0, 1].map((floor) => {
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    const plan = document.createElement('div');
    plan.className = 'teamFloorplanImage';
    const image = document.createElement('img');
    image.alt = '';
    image.width = 975;
    image.height = 775;
    plan.append(image);
    figure.append(caption, plan);
    maps.append(figure);

    // The live plan puts booth 5 in Mercury and booth 6 in Neptune.
    if (floor === 1) {
      for (const booth of [5, 6]) {
        const [, x, y] = booths[booth];
        const number = document.createElement('span');
        number.className = 'teamFloorplanCorrection';
        number.textContent = booth;
        number.setAttribute('aria-hidden', 'true');
        position(number, x, y);
        plan.append(number);
      }
    }

    const marker = document.createElement('span');
    marker.className = 'teamFloorplanMarker';
    marker.setAttribute('aria-hidden', 'true');
    marker.hidden = true;
    plan.append(marker);
    return { figure, caption, image, marker };
  });

  let currentRound;
  let rendered = '';
  function update(round) {
    currentRound = round;
    const lang = document.documentElement.lang;
    const labels = copy[lang] || copy.en;
    if (button.textContent !== labels.title) button.textContent = labels.title;
    if (!dialog.open) return;

    const target = getDestination(round);
    const point = booths[target?.booth];
    const summary = target && [`${labels.round} ${round}`, target.booth && `Booth ${target.booth}`, target.name, target.location].filter(Boolean).join(' · ');
    const key = JSON.stringify([lang, summary, point]);
    if (key === rendered) return;
    rendered = key;
    title.textContent = labels.title;
    close.textContent = labels.close;
    destination.textContent = summary || '';
    destination.hidden = !summary;

    decks.forEach(({ figure, caption, image, marker }, floor) => {
      figure.hidden = Boolean(point && floor !== point[0]);
      if (!figure.hidden && !image.hasAttribute('src')) {
        image.src = new URL(`./assets/moonshot-deck-0${floor}.jpg`, import.meta.url);
      }
      caption.textContent = `Deck 0${floor} · ${labels.floors[floor]}`;
      marker.hidden = !point || floor !== point[0];
      if (!marker.hidden) {
        marker.textContent = target.booth;
        position(marker, point[1], point[2]);
      }
    });
  }

  button.addEventListener('click', () => {
    dialog.showModal();
    update(currentRound);
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  return update;
}
