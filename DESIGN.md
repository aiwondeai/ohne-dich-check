# Der Ohne-dich-Check

## One-line summary

Ein dreiminütiger Self-Audit für Founder und Agenturinhaber, der sichtbar macht, wie stark Wissen, Entscheidungen und operative Abläufe noch an ihnen persönlich hängen.

## Problem / purpose

Viele Unternehmen nutzen Tools und einzelne Automationen, bleiben aber organisatorisch an einer Person hängen. Der Check übersetzt diese diffuse Abhängigkeit in eine verständliche Diagnose und empfiehlt einen konkreten ersten System-Hebel.

## Product philosophy

- Keine generische „AI Readiness“.
- Keine erfundene Wissenschaftlichkeit.
- Erst eine brauchbare Diagnose, dann ein Angebot.
- Die Auswertung muss bereits ohne Sales Call nützlich sein.
- Mechanik des Autopilot-Checks adaptieren, Copy, Modell und Branding vollständig eigenständig halten.

## Target user

Founder, Agenturinhaber und kleine Führungsteams, bei denen Wissen, Entscheidungen, Marketing oder operative Ausführung noch stark an Einzelpersonen hängen.

## Primary user flow

1. Nutzer versteht die Kernfrage in wenigen Sekunden.
2. Nutzer beantwortet 12 Fragen in 6 Bereichen.
3. Der Check berechnet einen transparenten heuristischen Score.
4. Nutzer sieht Gesamtlage, größten Engpass, sechs Bereichswerte und einen empfohlenen ersten Workflow.
5. Nutzer kann das Ergebnis teilen, drucken oder Falko mit vorausgefülltem Ergebnis kontaktieren.

## Diagnostic dimensions

1. Wissen & Standards
2. Entscheidungen
3. Marketing-System
4. Kommunikation & Übergaben
5. Operative Ausführung
6. AI & Automation

Je Bereich gibt es zwei Fragen mit 0–3 Punkten. Maximum: 36 Punkte. Die Prozentzahl dient nur der Lesbarkeit; der Check wird ausdrücklich als operative Heuristik bezeichnet.

## Result tiers

- 0–30: Du bist das Betriebssystem.
- 31–55: Das Unternehmen läuft – solange du mitsteuerst.
- 56–75: Strukturen greifen, aber Ausnahmen ziehen dich zurück.
- 76–100: Dein Unternehmen arbeitet ohne Dauerzugriff auf dich.

Bei gleichem Tiefstwert priorisiert die Diagnose Entscheidungen, Ausführung, Wissen, Kommunikation, Marketing und zuletzt AI & Automation. Das verhindert, dass ein Tool-Thema vor einem grundlegenden Führungs- oder Prozessengpass empfohlen wird.

## MVP features

- Responsive statische Website
- 12-Fragen-State-Machine
- Tastaturbedienbare Antwortbuttons
- Fortschritt und Zurück-Navigation
- Lokales Resume via `localStorage`
- Stateless Ergebniscode in der URL, ohne PII
- Personalisierte Diagnose und Bereichsbalken
- Share-, Print- und Neustart-Funktion
- Vorausgefüllte Kontakt-Mail an `info@aiwon.de`
- Keine Analytics, Cookies oder extern gespeicherten Antworten

## Visual system

Angelehnt an die bestehende Falko-Treptau-Visitenkarte:

- fast schwarzer Hintergrund
- warmes Off-White
- große, enge Sans-Serif-Headlines
- kleine Mono-/Uppercase-Metadaten
- sehr reduzierter Cobalt-Akzent
- großzügige Leerräume, harte Linien statt SaaS-Kartenfriedhof

## Technical shape

- Statisches HTML, CSS und native ES Modules
- Keine Runtime-Dependencies
- Pure Scoring-Funktionen mit Node-Tests
- GitHub Pages Deployment
- Kein Backend im MVP

## Explicit non-goals for v1

- Kein E-Mail-Gate ohne echten Newsletter-/CRM-Provider
- Kein PDF-Generator; Browser-Print reicht zunächst
- Kein Login
- Keine Datenbank
- Keine behauptete wissenschaftliche Validierung
- Keine 1:1-Kopie fremder Fragen, Copy oder Gestaltung

## Success criteria

- Alle 12 Fragen lassen sich mobil und am Desktop vollständig durchlaufen.
- Min-, Max-, Mittel- und Tie-Break-Scoring sind getestet.
- Ergebnislink rekonstruiert den Report ohne personenbezogene Daten.
- Website ist öffentlich erreichbar und das Repo sauber gepusht.
- Der Nutzer versteht in der Auswertung, welchen ersten Workflow er bauen sollte.

## Phase 2 after content validation

- Double-Opt-in und Newsletter-/CRM-Anbindung
- Frage- und Step-Analytics ohne unnötige PII
- Ergebnis-Mail mit dauerhaftem Report-Link
- Eigene Domain, wahrscheinlich `check.falkotreptau.com`
- Kalibrierung des Scorings anhand realer Antworten und Gespräche
