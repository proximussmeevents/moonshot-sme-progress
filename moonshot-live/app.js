const $ = (id) => document.getElementById(id);
const liveOrigin = 'https://moonshot-live-photos.matthias-versc989465.chatgpt.site';
let items = [];
let index = -1;
let playing = true;
let front = 'a';
let timer;
let generation = 0;
let busy = false;
let demo = false;
let wake;

function message(text, error = false) {
  $('status').textContent = text;
  $('status').classList.toggle('notice', error);
}

function schedule(delay = Number($('duration').value) * 1000) {
  clearTimeout(timer);
  if (playing && items.length > 1) timer = setTimeout(() => advance(1), delay);
}

function countPosition() {
  $('position').textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
}

async function show(nextIndex) {
  if (!items.length) return;
  clearTimeout(timer);
  const ticket = ++generation;
  index = (nextIndex + items.length) % items.length;
  const item = items[index];
  try {
    const probe = new Image();
    probe.src = item.url;
    await probe.decode();
    if (ticket !== generation) return;
    const next = front === 'a' ? 'b' : 'a';
    $(next).src = item.url;
    $(next).alt = item.name;
    $(next).classList.add('visible');
    $(front).classList.remove('visible');
    front = next;
    $('screen').classList.add('hasphotos');
    countPosition();
    schedule();
  } catch {
    if (ticket !== generation) return;
    message('A photo could not be loaded. The viewer will retry.', true);
    schedule(2000);
  }
}

function setPhotos(photos) {
  const current = items[index]?.id;
  const wasSingle = items.length < 2;
  items = photos;
  index = items.findIndex((item) => item.id === current);
  $('count').textContent = `${items.length} photo${items.length === 1 ? '' : 's'}`;
  if (!items.length) {
    ++generation;
    clearTimeout(timer);
    $('screen').classList.remove('hasphotos');
    $('a').classList.remove('visible');
    $('b').classList.remove('visible');
    $('position').textContent = 'AWAITING PHOTOS';
  } else if (index < 0 || !$('screen').classList.contains('hasphotos')) {
    show(index < 0 ? 0 : index);
  } else {
    countPosition();
    if (wasSingle) schedule();
  }
}

async function scan() {
  if (busy || demo) return;
  busy = true;
  try {
    const response = await fetch(new URL('/api/photos', liveOrigin), {
      cache: 'no-store',
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error('Drive unavailable');
    const photos = await response.json();
    if (demo) return;
    message(photos.length ? 'Connected to Google Drive' : 'Connected to Google Drive · waiting for photos');
    setPhotos(photos);
  } catch {
    if (!demo) message('Google Drive is temporarily unavailable. Retrying automatically.', true);
  } finally {
    busy = false;
  }
}

function advance(direction) {
  if (direction === 1 && $('shuffle').checked && items.length > 1) {
    const offset = 1 + Math.floor(Math.random() * (items.length - 1));
    show(index + offset);
  } else {
    show(index + direction);
  }
}

$('next').onclick = () => advance(1);
$('prev').onclick = () => advance(-1);
$('play').onclick = () => {
  playing = !playing;
  $('play').textContent = playing ? 'Pause' : 'Play';
  schedule();
};
$('duration').onchange = () => schedule();
$('fill').onchange = () => {
  document.querySelectorAll('.photo').forEach((photo) => {
    photo.style.objectFit = $('fill').checked ? 'cover' : 'contain';
  });
};

async function fullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await $('screen').requestFullscreen();
      try { wake = await navigator.wakeLock?.request('screen'); } catch {}
    }
  } catch {
    message('Fullscreen is unavailable in this browser window.', true);
  }
}
$('full').onclick = fullscreen;
$('exit').onclick = () => document.exitFullscreen();
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) wake?.release();
});
document.addEventListener('keydown', (event) => {
  if (['SELECT', 'INPUT', 'BUTTON'].includes(event.target.tagName)) return;
  if (event.code === 'Space') {
    event.preventDefault();
    $('play').click();
  }
  if (event.key === 'ArrowRight') advance(1);
  if (event.key === 'ArrowLeft') advance(-1);
  if (event.key.toLowerCase() === 'f') fullscreen();
});

function sampleSlides() {
  return ['THE NEXT CHAPTER', 'ONE CREW.', 'AIM HIGHER.'].map((title, i) => {
    const color = ['#b180f2', '#729cdf', '#e8a2d1'][i];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000"><defs><radialGradient id="g"><stop stop-color="${color}"/><stop offset="1" stop-color="#231238"/></radialGradient></defs><rect width="1600" height="1000" fill="#0c0815"/><circle cx="${1050 - i * 200}" cy="400" r="400" fill="url(#g)"/><ellipse cx="800" cy="500" rx="700" ry="260" fill="none" stroke="#d6b6ff" stroke-opacity=".3" transform="rotate(-24 800 500)"/><text x="110" y="720" fill="white" font-size="96" font-family="Arial" font-weight="bold">${title}</text><text x="115" y="780" fill="#c7addf" font-size="22" font-family="Arial" letter-spacing="8">SME MOONSHOT / TOGETHER WE GO FURTHER</text></svg>`;
    return { id: `sample-${i}`, name: title, url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) };
  });
}

$('demo').onclick = () => {
  demo = !demo;
  $('demo').textContent = demo ? 'Back to live photos' : 'Preview sample slides';
  $('demolabel').textContent = demo ? 'VISUAL PREVIEW' : '';
  if (demo) {
    message('Sample slides');
    setPhotos(sampleSlides());
  } else {
    setPhotos([]);
    message('Connecting to Google Drive…');
    scan();
  }
};
$('refresh').onclick = () => demo ? $('demo').click() : scan();
setInterval(scan, 15000);
scan();
