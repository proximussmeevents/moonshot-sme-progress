# Moonshot SME Team Progress

Live teamprogress, missies, sterren en teamfoto's voor het Moonshot SME-event.

- Dashboard: https://proximussmeevents.github.io/moonshot-sme-progress/
- Score station: https://proximussmeevents.github.io/moonshot-sme-progress/score/
- Rechtstreekse teamlink: https://proximussmeevents.github.io/moonshot-sme-progress/?team=team-orion (gebruik de unieke Team-ID uit Google Sheets).
- Oorspronkelijke live site: https://moonshot-sme-progress-2026.matthias-versc989465.chatgpt.site/

Deze GitHub Pages-versie leest de publieke eventgegevens rechtstreeks uit de bestaande Google Sheet. Scores worden naar dezelfde Google Apps Script-koppeling verstuurd als op de oorspronkelijke site.

## Synchronisatie

Gesynchroniseerd op 27 oktober 2026 met ChatGPT Site-versie 19, broncommit `b2acc750931ce2bc721db89888b5f9bcdd03b93d`.

De teamdashboards, persoonlijke missieroutes, missieposten met bezoekplanning, teamleden en score-invoer volgen deze bronversie. Voor GitHub Pages worden de vier tabbladen `Teams`, `Missies`, `Missiematrix` en `Formulierreacties 1` rechtstreeks uit Google Sheets gelezen. Een verzonden score wordt pas als opgeslagen getoond nadat een nieuwe overeenkomende rij in Google Sheets is waargenomen.

- Teamlink: `?team=team-orion` of `team/team-orion/`.
- Missiepost: `score/?mission=mission-edge-1` of `stand/mission-edge-1/`.
- Nieuwe teams en missies kunnen de querylinks direct gebruiken; de opgenomen padlinks zijn gegenereerd voor de actuele teams en missies.
