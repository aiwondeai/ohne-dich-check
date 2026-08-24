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
- Vom Autopilot-Check bleibt ausschließlich das abstrakte Prinzip „kurzer Check → konkrete Diagnose“.
- Keine Übernahme seiner visuellen Zustände, Segment-Fortschritte, Score-Teaser, Report-Komposition, Bereichs-Intros oder Funnel-Dramaturgie.

## Target user

Founder, Agenturinhaber und kleine Führungsteams, bei denen Wissen, Entscheidungen, Marketing oder operative Ausführung noch stark an Einzelpersonen hängen.

## Primary user flow

1. Nutzer versteht die Kernfrage in wenigen Sekunden.
2. Nutzer beantwortet 12 Fragen in 6 Bereichen.
3. Der Check berechnet einen transparenten heuristischen Score.
4. Nutzer sieht sofort und anonym Score, Reifestufe und größten Engpass.
5. Für Vorname + E-Mail erhält der Nutzer den vollständigen Detailreport mit sechs Bereichen, zweitem Engpass, 14-Tage-Workflow und konkreten Schritten per E-Mail und im Browser.
6. Im freigeschalteten Report kann der Nutzer den Report als PDF speichern oder einen Termin anfragen.

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
- Sofortiger Scoring Pass mit Score, Reifestufe und größtem Engpass
- Optionales Detailreport-Gate nur mit Vorname + E-Mail
- Sechs ausgearbeitete Bereichsinterpretationen, zweiter Engpass und 14-Tage-Start
- Transaktionale Zustellung über Tracker + Resend; kein Newsletter-Opt-in
- Print-/PDF-, Termin-Anfrage- und Neustart-Funktion
- Keine Analytics oder Cookies; Antworten bleiben lokal, der Server erhält nur den PII-freien Resultcode

## Visual system

Brand-Quelle ist ausschließlich die aktuelle Website `falkotreptau.com`, nicht der analysierte Autopilot-Funnel.

### Falko Brand-DNA

- strikt monochrom: `#0a0a0a`, Weiß und transparente Weißabstufungen
- Archivo Black als offen lizenzierte Display-Stimme mit ähnlicher Wucht wie Falkos Website, Outfit als Leseschrift
- zentrierte, fast plakative Komposition statt typischer SaaS-Zweispalter
- Falkos schmales Portrait als menschlicher Anker
- Headlines in Versalien mit ruhiger, massiver Präsenz
- große schwarze Atemräume und ein subtiler weißer Radial-Glow
- weiße Pillen-CTAs, feine Linien und runde 18px-Flächen
- Bewegung über Reveal, Unschärfe und kleine räumliche Verschiebungen; keine bunte Produktanimation

### Eigenständige Übersetzung für den Check

- Hero als diagnostisches Brand-Poster: Portrait, Produktname und Kernfrage in einer zentrierten Achse
- Quiz als fokussierter Interviewraum mit großer Fragennummer und listenartigen Antwortzeilen
- Ergebnis als typografischer Befund; kein Dashboard und kein kreisförmiger Standard-Score
- Bereichsauswertung als reduzierte Zeilenliste, nicht als kopierte Funnel-/Report-Struktur
- Blau nur im Falko-Portrait/Verified-Detail, nicht als UI-Farbe

### Avoid list

- keine blaue SaaS-CTA-Farbe
- keine Split-Hero-Karte „Stell dir vor“
- keine Mono-Tech-Ästhetik als dominantes Gestaltungsmittel
- kein kreisförmiges Score-Gauge
- keine drei generischen Feature-Karten
- keine visuelle oder textliche 1:1-Annäherung an `check.the-autopilot.com`

## Technical shape

- Statisches HTML, CSS und native ES Modules
- Keine Runtime-Dependencies
- Pure Scoring-Funktionen mit Node-Tests
- GitHub Pages Deployment
- Bestehender Personal-Brand-Tracker als Report-Endpoint
- Serverseitige Neu-Auswertung des Resultcodes statt Vertrauen in Browserwerte

## Explicit non-goals for v1

- Kein Gate vor Score, Reifestufe und größtem Engpass
- Kein separater PDF-Generator; Browser-Print erzeugt den vierseitigen Report
- Kein Login
- Keine Telefonnummer oder Firma im Report-Gate
- Keine Newsletter-Anmeldung durch die Report-Anforderung
- Keine behauptete wissenschaftliche Validierung
- Keine 1:1-Kopie fremder Fragen, Copy oder Gestaltung

## Success criteria

- Alle 12 Fragen lassen sich mobil und am Desktop vollständig durchlaufen.
- Min-, Max-, Mittel- und Tie-Break-Scoring sind getestet.
- Ergebnislink rekonstruiert den Report ohne personenbezogene Daten.
- Website ist öffentlich erreichbar und das Repo sauber gepusht.
- Der Nutzer versteht in der Auswertung, welchen ersten Workflow er bauen sollte.

## Phase 2 after content validation

- Frage- und Step-Analytics ohne unnötige PII
- Direkter Calendly-CTA, sobald ein funktionierender öffentlicher Booking-Link existiert
- Eigene Domain, wahrscheinlich `check.falkotreptau.com`
- Kalibrierung des Scorings anhand realer Antworten und Gespräche
