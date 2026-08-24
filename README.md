# Der Ohne-dich-Check

Interaktiver Self-Audit für Founder und Agenturinhaber: 12 Fragen, 6 operative Bereiche, ein transparenter Unabhängigkeits-Score und ein empfohlener erster Workflow.

## Live

https://aiwondeai.github.io/ohne-dich-check/

## Lokal starten

```bash
npm run serve
```

Dann `http://localhost:4173` öffnen.

## Prüfen

```bash
npm run check
```

Der Check läuft ohne Build-Step und ohne Runtime-Dependencies. `quiz-data.js` enthält Fragen, Score-Modell, Diagnosen und Result-Code. Die Browser-App liegt in `app.js`.

## Datenschutz

- Antworten bleiben im Browser (`localStorage`).
- Geteilte Ergebnislinks enthalten nur zwölf Punktwerte von 0–3.
- Die Website setzt keine Analytics- oder Marketing-Cookies.
- Das MVP hat bewusst kein E-Mail-Gate und kein Backend.

## Scoring

Zwei Fragen je Bereich, jeweils 0–3 Punkte. Maximum: 36 Rohpunkte, für die Darstellung auf 0–100 normalisiert. Das Modell ist eine operative Heuristik und keine wissenschaftlich validierte Diagnostik.

## Deployment

GitHub Pages veröffentlicht direkt aus `main` und dem Repository-Root.
