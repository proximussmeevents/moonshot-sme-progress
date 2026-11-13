const copy = {
  nl: {
    title: 'Hoe was jouw Moonshot?', eyebrow: 'EVENTENQUÊTE',
    intro: "Blik terug op de plenaire sessie, de lunch, het Moonshot-spel en de receptie. Wat werkte goed en wat kunnen we verbeteren?",
    contact: ["Jouw gegevens", "Naam", "E-mailadres"],
    meta: '± 3 minuten', language: 'Taal', low: 'Zeer ontevreden', high: 'Zeer tevreden',
    skipped: 'Niet deelgenomen', optional: 'Opmerking (optioneel)',
    submit: 'Verstuur mijn feedback', sending: 'Bezig met versturen…',
    error: 'Versturen is niet gelukt. Je antwoorden staan er nog. Probeer opnieuw.',
    thanks: 'Bedankt voor je feedback!', received: 'Je antwoorden zijn ontvangen.',
    sections: [
      ['Plenaire sessie', 'Hoe tevreden was je over de plenaire sessie?', 'Denk bijvoorbeeld aan de inhoud, de sprekers of het tempo.'],
      ['Lunch', 'Hoe tevreden was je over de lunch?', 'Denk bijvoorbeeld aan het aanbod, de kwaliteit of de organisatie.'],
      ['Moonshot-spel', 'Hoe tevreden was je over het Moonshot-spel in de namiddag?', 'Denk bijvoorbeeld aan de opdrachten, de speluitleg of de timing.'],
      ["Receptie en desserts", "Hoe tevreden was je over de receptie?", "Wat vond je van de receptie en de desserts?"],
    ],
  },
  fr: {
    title: 'Comment as-tu vécu Moonshot ?', eyebrow: 'ENQUÊTE SUR L’ÉVÉNEMENT',
    intro: "Repense à la séance plénière, au déjeuner, au jeu Moonshot et à la réception. Qu’as-tu apprécié et que pourrions-nous améliorer ?",
    contact: ["Tes coordonnées", "Nom", "Adresse e-mail"],
    meta: '± 3 minutes', language: 'Langue', low: 'Très insatisfait·e', high: 'Très satisfait·e',
    skipped: 'Je n’ai pas participé', optional: 'Commentaire (facultatif)',
    submit: 'Envoyer mes réponses', sending: 'Envoi en cours…',
    error: 'L’envoi a échoué. Tes réponses sont toujours là. Réessaie.',
    thanks: 'Merci pour ton retour !', received: 'Tes réponses ont bien été reçues.',
    sections: [
      ['Séance plénière', 'Quel est ton niveau de satisfaction concernant la séance plénière ?', 'Pense par exemple au contenu, aux intervenants ou au rythme.'],
      ['Déjeuner', 'Quel est ton niveau de satisfaction concernant le déjeuner ?', 'Pense par exemple au choix, à la qualité ou à l’organisation.'],
      ['Jeu Moonshot', 'Quel est ton niveau de satisfaction concernant le jeu Moonshot de l’après-midi ?', 'Pense par exemple aux défis, aux consignes ou au temps prévu.'],
      ["Réception et desserts", "Quel est ton niveau de satisfaction concernant la réception ?", "Qu’as-tu pensé de la réception et des desserts ?"],
    ],
  },
  en: {
    title: 'How was your Moonshot?', eyebrow: 'EVENT SURVEY',
    intro: "Think back to the plenary session, lunch, the Moonshot game and the reception. What worked well, and what could we improve?",
    contact: ["Your details", "Name", "Email address"],
    meta: 'About 3 minutes', language: 'Language', low: 'Very dissatisfied', high: 'Very satisfied',
    skipped: 'I didn’t take part', optional: 'Comment (optional)',
    submit: 'Send my feedback', sending: 'Sending…',
    error: 'We couldn’t send your feedback. Your answers are still here. Please try again.',
    thanks: 'Thank you for your feedback!', received: 'We’ve received your answers.',
    sections: [
      ['Plenary session', 'How satisfied were you with the plenary session?', 'You might comment on the content, speakers or pace.'],
      ['Lunch', 'How satisfied were you with lunch?', 'You might comment on the selection, quality or organisation.'],
      ['Moonshot game', 'How satisfied were you with the afternoon Moonshot game?', 'You might comment on the challenges, instructions or timing.'],
      ["Reception and desserts", "How satisfied were you with the reception?", "What did you think of the reception and desserts?"],
    ],
  },
};

const detailQuestions = {
  plenary: [
    ['herbert', 'Hoe beoordeel je de inleiding van Herbert Wijckmans?', 'Comment évalues-tu l’introduction de Herbert Wijckmans ?', 'How would you rate Herbert Wijckmans’s introduction?'],
    ['cmi', 'Hoe beoordeel je de CMI-presentatie van Laurent Lemet?', 'Comment évalues-tu la présentation CMI de Laurent Lemet ?', 'How would you rate Laurent Lemet’s CMI presentation?'],
    ['stijn', 'Hoe beoordeel je de Moonshot-presentatie van Stijn Ilsen?', 'Comment évalues-tu la présentation Moonshot de Stijn Ilsen ?', 'How would you rate Stijn Ilsen’s Moonshot presentation?'],
    ['awards', 'Hoe beoordeel je de Moonshot Awards?', 'Comment évalues-tu les Moonshot Awards ?', 'How would you rate the Moonshot Awards?'],
  ],
  lunch: [
    ['food', 'Hoe tevreden was je over het aanbod en de kwaliteit van de lunch?', 'As-tu apprécié le choix et la qualité du déjeuner ?', 'How satisfied were you with the choice and quality of the food?'],
    ['lunch_organisation', 'Hoe vlot verliep de lunch voor jou?', 'Comment as-tu trouvé l’organisation du déjeuner ?', 'How smoothly did lunch run for you?'],
  ],
  game: [
    ['instructions', 'Hoe duidelijk was de speluitleg?', 'Les consignes du jeu étaient-elles claires ?', 'How clear were the game instructions?'],
    ['challenges', 'Hoe boeiend vond je de opdrachten?', 'As-tu trouvé les défis intéressants ?', 'How engaging were the challenges?'],
    ['timing', 'Hoe beoordeel je de tijd die je kreeg voor het spel?', 'Comment évalues-tu le temps prévu pour le jeu ?', 'How would you rate the time allocated to the game?'],
    ['app', 'Hoe gemakkelijk vond je de Moonshot-app in gebruik?', 'As-tu trouvé l’application Moonshot facile à utiliser ?', 'How easy was the Moonshot app to use?'],
  ],
  reception: [
    ['desserts', 'Hoe tevreden was je over de keuze en kwaliteit van de desserts?', 'As-tu apprécié le choix et la qualité des desserts ?', 'How satisfied were you with the choice and quality of the desserts?'],
  ],
};

const detailCopy = {
  nl: ['Niet meegemaakt of gebruikt', 'Meer over dit onderdeel', 'Optioneel · 1 = laagste score, 5 = hoogste score'],
  fr: ['Non suivi ou non utilisé', 'En détail', 'Facultatif · 1 = note la plus basse, 5 = note la plus haute'],
  en: ['Did not attend or use', 'More about this part', 'Optional · 1 = lowest score, 5 = highest score'],
};

const get = (id) => document.getElementById(id);
const form = get('survey');
const sections = ['plenary', 'lunch', 'game', 'reception'];
const languageButtons = document.querySelectorAll('[data-language]');
const requestedLanguage = new URLSearchParams(location.search).get('lang');
let language = Object.hasOwn(copy, requestedLanguage) ? requestedLanguage : 'nl';
let sending = false;

const starLabels = {nl: ['ster', 'sterren'], fr: ['étoile', 'étoiles'], en: ['star', 'stars']};

function stars(name, required = false) {
  return `<div class="scale">${[1, 2, 3, 4, 5].map(score =>
    `<label class="choice"><input type="radio" name="${name}" value="${score}" ${required ? 'required' : ''}><span aria-hidden="true">★</span></label>`
  ).join('')}</div>`;
}

get('questions').innerHTML = `
  <section class="card">
    <h2 id="contact-title"></h2>
    <label class="comment" id="name-label" for="contact-name"></label>
    <input class="contact-input" id="contact-name" name="name" autocomplete="name" maxlength="150" required>
    <label class="comment" id="email-label" for="contact-email"></label>
    <input class="contact-input" id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" required>
  </section>` + sections.map((section, i) => `
  <section class="card">
    <div class="card-heading"><span class="number" aria-hidden="true">0${i + 1}</span><h2 id="${section}-title"></h2></div>
    <fieldset>
      <legend id="${section}-question"></legend>
      ${stars(section, true)}
      <div class="scale-key" aria-hidden="true"><span id="${section}-low"></span><span id="${section}-high"></span></div>
      <label class="skip"><input type="radio" name="${section}" value="0" required><span id="${section}-skip"></span></label>
    </fieldset>
    <div class="details">
      <h3 id="${section}-detail-title"></h3>
      <p id="${section}-detail-help"></p>
      ${detailQuestions[section].map(([key]) => `<fieldset class="detail-row" aria-describedby="${section}-detail-help">
        <legend id="detail-label-${key}"></legend>
        ${stars(key)}
        <label class="skip"><input type="radio" name="${key}" value="0"><span id="detail-skip-${key}"></span></label>
      </fieldset>`).join('')}
    </div>
    <label class="comment" for="${section}-comment" id="${section}-label"></label>
    <textarea name="${section}-comment" id="${section}-comment" rows="2" maxlength="1500"></textarea>
  </section>`).join('');

function render() {
  const t = copy[language];
  ['contact-title', 'name-label', 'email-label'].forEach((id, i) => get(id).textContent = t.contact[i]);
  const [skipped, detailTitle, detailHelp] = detailCopy[language];
  const translation = ['nl', 'fr', 'en'].indexOf(language) + 1;
  document.documentElement.lang = language;
  document.title = 'Moonshot 2026 · ' + t.eyebrow;
  document.querySelector('nav').setAttribute('aria-label', t.language);
  for (const button of languageButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  }
  for (const key of ['title', 'eyebrow', 'intro', 'meta', 'error', 'thanks', 'received']) {
    get(key).textContent = t[key];
  }
  get('submit').textContent = sending ? t.sending : t.submit;
  sections.forEach((section, i) => {
    const [title, question, placeholder] = t.sections[i];
    const labels = {title, question, low:t.low, high:t.high, skip:t.skipped, label:t.optional};
    for (const [key, value] of Object.entries(labels)) get(section + '-' + key).textContent = value;
    get(section + '-comment').placeholder = placeholder;
    get(section + '-detail-title').textContent = detailTitle;
    get(section + '-detail-help').textContent = detailHelp;
    for (const question of detailQuestions[section]) {
      const [key] = question;
      get('detail-label-' + key).textContent = question[translation];
      get('detail-skip-' + key).textContent = skipped;
    }
  });
  for (const input of form.querySelectorAll('.choice input')) {
    const score = Number(input.value);
    const [singular, plural] = starLabels[language];
    const label = score + ' ' + (score === 1 ? singular : plural);
    const endpoint = sections.includes(input.name) ? {1: t.low, 5: t.high}[score] : null;
    input.setAttribute('aria-label', endpoint ? label + ' — ' + endpoint : label);
  }
}

for (const button of languageButtons) {
  button.addEventListener('click', () => {
    language = button.dataset.language;
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
    render();
  });
}

let lastPayload;
let responseId;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending) return;
  const data = new FormData(form);
  const answers = Object.fromEntries(sections.map(section => [section, {
    score: Number(data.get(section)),
    comment: data.get(section + '-comment'),
  }]));
  const details = Object.fromEntries(Object.values(detailQuestions).flat().map(([key]) => {
    const value = data.get(key);
    return [key, value === null ? null : Number(value)];
  }));
  const name = data.get('name').trim();
  const email = data.get('email').trim();
  const payload = JSON.stringify({language, answers, details, name, email});
  if (payload !== lastPayload) responseId = crypto.randomUUID();
  lastPayload = payload;
  sending = true;
  get('submit').disabled = true;
  get('error').hidden = true;
  render();
  try {
    const response = await fetch('https://moonshot-2026-enquete.matthias-versc989465.chatgpt.site/api/responses', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: responseId, language, answers, details, name, email}),
    });
    if (!response.ok) throw new Error('Submission failed');
    form.hidden = true;
    get('success').hidden = false;
    get('success').focus();
  } catch {
    get('error').hidden = false;
  } finally {
    sending = false;
    get('submit').disabled = false;
    render();
  }
});
render();
