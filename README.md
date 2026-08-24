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

Der Check läuft ohne Build-Step und ohne Frontend-Runtime-Dependencies. `quiz-data.js` enthält Fragen, Score-Modell, Diagnosen und Result-Code. Die Browser-App liegt in `app.js`. Der optionale Detailreport nutzt den bestehenden Personal-Brand-Tracker als serverseitige Resend-Schnittstelle.

## Datenschutz

- Antworten bleiben im Browser (`localStorage`).
- Ergebnislinks enthalten nur zwölf Punktwerte von 0–3 und keine PII.
- Die Website setzt keine Analytics- oder Marketing-Cookies.
- Score, Reifestufe und größter Engpass erscheinen sofort und anonym.
- Nur beim freiwilligen Detailreport werden Vorname, E-Mail und der PII-freie Resultcode an `https://falkotreptau.com/api/ohne-dich-report` gesendet. Der Report wird transaktional per Resend zugestellt und als Kontakt-Lead mit Quelle `ohne-dich-check` gespeichert.
- Die Report-Anforderung ist keine Newsletter-Einwilligung. Telefon und Firma werden nicht abgefragt.

## Scoring

Zwei Fragen je Bereich, jeweils 0–3 Punkte. Maximum: 36 Rohpunkte, für die Darstellung auf 0–100 normalisiert. Das Modell ist eine operative Heuristik und keine wissenschaftlich validierte Diagnostik.

## Deployment

GitHub Pages veröffentlicht das Frontend direkt aus `main` und dem Repository-Root. Der Report-Endpoint wird aus dem privaten Repo `aiwondeai/falkotreptau-tracker` auf `falkotreptau.com` betrieben.

## Assets und Lizenzen

- Anwendungscode: MIT, siehe `LICENSE`.
- Archivo Black und Outfit: SIL Open Font License 1.1, siehe `assets/fonts/OFL-Archivo-Black.txt` und `assets/fonts/OFL-Outfit.txt`.
- `assets/falko-portrait.webp` und die daraus abgeleitete `assets/og-image.png`: persönliche Markenassets von Falko Treptau, nicht Bestandteil der MIT-Lizenz.
