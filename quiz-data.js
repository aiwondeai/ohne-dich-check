export const MAX_OPTION_SCORE = 3;
export const RESULT_CODE_VERSION = "1";

const options = (...labels) => labels.map((label, score) => ({ label, score }));

export const areas = [
  {
    id: "knowledge",
    number: "01",
    name: "Wissen & Standards",
    shortName: "Wissen",
    prompt: "Ist Wissen auffindbar – oder an Köpfe gebunden?",
    diagnosis: "Wissen ist dein Engpass. Solange Kontext in Köpfen, Chats und einzelnen Dokumenten steckt, bleibt jede Vertretung teuer und langsam.",
    workflow: {
      title: "Lebender Wissens-Workflow",
      description: "Meetings, Entscheidungen und wiederkehrende Abläufe werden automatisch strukturiert, zentral abgelegt und für Team sowie AI auffindbar.",
    },
    actions: [
      "Die zehn häufigsten Rückfragen der letzten vier Wochen sammeln.",
      "Für einen Kernprozess eine zentrale Quelle mit Owner und Aktualisierungsrhythmus festlegen.",
      "Meeting- und Chat-Erkenntnisse automatisch als Entscheidung, SOP oder offene Frage ablegen.",
    ],
    insights: {
      critical: "Wichtiger Kontext ist im Ausfall nicht schnell genug rekonstruierbar. Dokumentation allein reicht nicht; sie braucht einen Owner und einen festen Pflegeweg.",
      developing: "Wissen ist teilweise dokumentiert, aber Aktualität und Verbindlichkeit schwanken. Genau dort entstehen Rückfragen und unnötige Übergabezeit.",
      stable: "Wissen ist grundsätzlich zugänglich und vertretbar. Schütze diesen Stand mit klaren Owners und einem sichtbaren Aktualisierungsrhythmus.",
    },
    questions: [
      {
        text: "Eine wichtige Aufgabe fällt morgen an. Wo findet dein Team das nötige Wissen?",
        options: options(
          "Bei mir. Ohne Rückfrage geht wenig.",
          "Verteilt in Chats, Docs und Köpfen.",
          "Meist dokumentiert, aber nicht verlässlich aktuell.",
          "Zentral, aktuell und für die richtigen Personen auffindbar."
        ),
      },
      {
        text: "Eine Schlüsselperson fällt zwei Wochen aus. Was passiert?",
        options: options(
          "Der Bereich steht.",
          "Vieles wartet oder wird improvisiert.",
          "Das Team kommt durch, aber mit Reibung.",
          "Vertretung und Standards greifen."
        ),
      },
    ],
  },
  {
    id: "decisions",
    number: "02",
    name: "Entscheidungen",
    shortName: "Entscheidungen",
    prompt: "Werden Entscheidungen verteilt – oder bei dir geparkt?",
    diagnosis: "Entscheidungen sammeln sich bei dir. Das kostet nicht nur deine Zeit, sondern bremst das Team genau dann, wenn du nicht verfügbar bist.",
    workflow: {
      title: "Decision-Routing mit klaren Leitplanken",
      description: "Wiederkehrende Entscheidungen bekommen Kriterien, Zuständigkeiten und einen definierten Eskalationsweg – inklusive AI-gestützter Vorbereitung.",
    },
    actions: [
      "Eine Woche lang jede Entscheidung notieren, die unnötig bei dir landet.",
      "Für die häufigsten drei Entscheidungstypen Kriterien und Entscheidungseigner definieren.",
      "Nur echte Ausnahmen eskalieren; Standardfälle mit Kontext und Vorschlag vorbereiten lassen.",
    ],
    insights: {
      critical: "Zu viele Standardentscheidungen warten auf dich. Das Team braucht keine pauschale Freiheit, sondern klare Kriterien und einen definierten Ausnahmeweg.",
      developing: "Entscheidungsspielräume existieren, werden aber bei Unsicherheit schnell zurückgegeben. Leitplanken und Beispiele müssen konkreter werden.",
      stable: "Standardfälle werden weitgehend dezentral entschieden. Prüfe regelmäßig, ob neue Ausnahmen wieder unbemerkt bei dir landen.",
    },
    questions: [
      {
        text: "Wie werden wiederkehrende Entscheidungen getroffen?",
        options: options(
          "Sie landen fast immer bei mir.",
          "Je nachdem, wer gerade da ist.",
          "Es gibt Leitplanken, aber viele Rückfragen.",
          "Kriterien und Zuständigkeiten sind klar."
        ),
      },
      {
        text: "Du bist 48 Stunden nicht erreichbar. Wie viele Entscheidungen warten?",
        options: options(
          "Fast alle wichtigen.",
          "Mehrere operative.",
          "Nur Ausnahmen.",
          "Nur echte Eskalationen."
        ),
      },
    ],
  },
  {
    id: "marketing",
    number: "03",
    name: "Marketing-System",
    shortName: "Marketing",
    prompt: "Entsteht Nachfrage systematisch – oder nur durch Anschub?",
    diagnosis: "Marketing braucht zu viel persönlichen Anschub. Ohne festen Input-, Produktions- und Review-Rhythmus wird Sichtbarkeit zur wiederkehrenden Founder-Aufgabe.",
    workflow: {
      title: "Content- und Creative-Operating-Loop",
      description: "Ideen, Produktion, Review und Distribution laufen in einem sichtbaren Rhythmus; AI übernimmt Vorbereitung und Wiederverwendung, nicht die Haltung.",
    },
    actions: [
      "Einen verbindlichen wöchentlichen Input- und Veröffentlichungsrhythmus festlegen.",
      "Ideen, Proof, Produktion, Freigabe und Distribution als einen durchgängigen Flow abbilden.",
      "AI für Recherche, Varianten und Repurposing einsetzen; Positionierung und finale Freigabe bleiben menschlich."
    ],
    insights: {
      critical: "Nachfrage und Output hängen an deinem persönlichen Anschub. Ohne festen Input- und Produktionsrhythmus fällt Marketing bei operativem Druck zuerst aus.",
      developing: "Ein Plan existiert, aber Übergaben, Reviews oder Distribution reißen noch ab. Der Engpass liegt meist zwischen den einzelnen Marketing-Schritten.",
      stable: "Marketing hat einen tragfähigen Grundbetrieb. Achte darauf, Haltung und Qualitätsmaßstab nicht mit operativer Dauerfreigabe zu verwechseln.",
    },
    questions: [
      {
        text: "Wovon hängt regelmäßiger Marketing-Output ab?",
        options: options(
          "Von meinem persönlichen Anschub.",
          "Von Einzelpersonen und spontanen Ideen.",
          "Von einem Plan, der nicht immer durchgezogen wird.",
          "Von einem klaren System mit Verantwortlichen und Rhythmus."
        ),
      },
      {
        text: "Was passiert mit Marketing, wenn du einen Monat nichts vorgibst?",
        options: options(
          "Fast nichts.",
          "Einzelne Aktivitäten laufen weiter.",
          "Der Grundbetrieb läuft, die Qualität schwankt.",
          "Produktion, Review und Distribution laufen stabil."
        ),
      },
    ],
  },
  {
    id: "communication",
    number: "04",
    name: "Kommunikation & Übergaben",
    shortName: "Übergaben",
    prompt: "Fließt Kontext sauber – oder nur über Gespräche mit dir?",
    diagnosis: "Kontext geht bei Übergaben verloren. Das erzeugt Meetings, Rückfragen und Rework – und macht deinen Kopf zur inoffiziellen Projekt-Datenbank.",
    workflow: {
      title: "Async Status- und Übergabe-Briefing",
      description: "Status, Entscheidungen, Risiken und nächste Schritte werden aus den Arbeitssystemen zu einem belastbaren Briefing zusammengeführt.",
    },
    actions: [
      "Für jedes laufende Projekt Owner, Status, Entscheidung und nächsten Schritt sichtbar machen.",
      "Übergaben nach einer festen Struktur statt als freies Gespräch dokumentieren.",
      "Status-Updates automatisch aus Tasks, Notizen und Entscheidungen vorbereiten lassen."
    ],
    insights: {
      critical: "Dein Kopf verbindet Status, Entscheidungen und nächste Schritte. Fällst du aus, muss Kontext erst in Gesprächen rekonstruiert werden.",
      developing: "Übergaben funktionieren, kosten aber Rückfragen und Suchzeit. Ein einheitliches Briefing-Format würde den größten Teil dieser Reibung entfernen.",
      stable: "Kontext fließt überwiegend sauber. Prüfe vor allem Ausnahmen, bei denen kritische Entscheidungen nur mündlich weitergegeben werden.",
    },
    questions: [
      {
        text: "Wie werden Übergaben, Freigaben und Updates gesteuert?",
        options: options(
          "Über Zuruf und meinen Überblick.",
          "Über mehrere Chats und Meetings.",
          "Mit festen Abläufen, aber Lücken.",
          "Mit klaren Owners, Status und Eskalationswegen."
        ),
      },
      {
        text: "Jemand übernimmt morgen ein laufendes Projekt. Wie schnell ist die Person arbeitsfähig?",
        options: options(
          "Erst nach langem Briefing durch mich.",
          "Nach mehreren Gesprächen und Suchen.",
          "Mit vorhandenen Infos plus Rückfragen.",
          "Durch sauberen Kontext, Status und nächste Schritte."
        ),
      },
    ],
  },
  {
    id: "execution",
    number: "05",
    name: "Operative Ausführung",
    shortName: "Ausführung",
    prompt: "Laufen Prozesse zuverlässig – auch wenn du nicht nachhältst?",
    diagnosis: "Die Ausführung hängt an manueller Kontrolle. Der Hebel ist nicht noch ein Tool, sondern ein klarer Trigger, ein Owner und ein überprüfbares Qualitätskriterium.",
    workflow: {
      title: "SOP-to-Workflow mit Qualitätschecks",
      description: "Ein wiederkehrender Prozess wird von Trigger bis Ergebnis abgebildet, mit eindeutigem Owner, Checks und sauberer Eskalation.",
    },
    actions: [
      "Den Prozess auswählen, bei dem du am häufigsten erinnern oder nachkontrollieren musst.",
      "Trigger, Owner, Definition of Done und Fehlerweg auf einer Seite festhalten.",
      "Erst danach die stabilen Schritte automatisieren und Ausnahmen bewusst menschlich lassen."
    ],
    insights: {
      critical: "Wiederkehrende Arbeit wird durch Erinnern und Nachkontrolle stabilisiert. Der erste Hebel ist ein klarer Prozess – nicht sofort eine Automation.",
      developing: "Der Grundprozess läuft, aber Qualität wird noch manuell abgesichert. Definition of Done und Fehlerweg sind die fehlenden Teile.",
      stable: "Ausführung ist weitgehend belastbar. Beobachte, ob Wachstum neue manuelle Kontrollen erzeugt, bevor du weitere Automationen hinzufügst.",
    },
    questions: [
      {
        text: "Wie zuverlässig werden wiederkehrende Prozesse erledigt?",
        options: options(
          "Wenn ich erinnere oder selbst übernehme.",
          "Unterschiedlich, je nach Person.",
          "Meist zuverlässig, mit manuellen Kontrollen.",
          "Über klare Trigger, Owners und Qualitätschecks."
        ),
      },
      {
        text: "Ein Fehler tritt auf. Was passiert?",
        options: options(
          "Ich werde direkt zum Problemlöser.",
          "Das Team probiert, eskaliert aber früh.",
          "Es gibt Checklisten und eine definierte Eskalation.",
          "Fehler werden erkannt, begrenzt und dokumentiert."
        ),
      },
    ],
  },
  {
    id: "automation",
    number: "06",
    name: "AI & Automation",
    shortName: "AI & Automation",
    prompt: "Sind AI Workflows belastbar – oder nur persönliche Abkürzungen?",
    diagnosis: "AI und Automation sind noch Inseln. Ohne Owner, Monitoring und Fallback entstehen neue Abhängigkeiten – diesmal nur mit modernerem Etikett.",
    workflow: {
      title: "Workflow-Reliability-Layer",
      description: "Die wichtigsten AI Workflows bekommen Monitoring, Fehlerwege, klare Verantwortlichkeit und eine messbare Definition of Done.",
    },
    actions: [
      "Alle produktiv genutzten AI- und Automation-Workflows mit Owner und Zweck inventarisieren.",
      "Für den wichtigsten Workflow Erfolgssignal, Alert und manuellen Fallback definieren.",
      "Nicht mehr Tools hinzufügen, bevor ein bestehender Workflow stabil messbaren Nutzen liefert."
    ],
    insights: {
      critical: "AI und Automation sind persönliche Abkürzungen statt verlässliche Betriebsbausteine. Ohne Monitoring wird nur die Art der Abhängigkeit moderner.",
      developing: "Einige Workflows liefern wiederkehrenden Nutzen, aber Owner, Fallback oder Erfolgssignal fehlen noch. Stabilität schlägt hier zusätzliche Tools.",
      stable: "AI Workflows sind überwiegend belastbar. Der nächste Hebel ist messbare Wirkung und saubere Abschaltung von Dingen, die keinen Nutzen liefern.",
    },
    questions: [
      {
        text: "Wie setzt ihr AI und Automation heute ein?",
        options: options(
          "Einzelne Tools, ohne festen Prozess.",
          "Persönliche Abkürzungen einzelner Personen.",
          "Einige wiederkehrende Workflows.",
          "Gezielte Systeme mit Owner, Daten und Qualitätskontrolle."
        ),
      },
      {
        text: "Was passiert, wenn ein automatisierter Workflow scheitert?",
        options: options(
          "Wir merken es oft spät.",
          "Jemand muss manuell nachsehen.",
          "Es gibt Alerts und einen Fallback.",
          "Monitoring, Fallback und Verantwortlichkeit sind klar."
        ),
      },
    ],
  },
];

export const questions = areas.flatMap((area, areaIndex) =>
  area.questions.map((question, questionIndex) => ({
    ...question,
    area,
    areaIndex,
    questionIndex,
    globalIndex: areaIndex * 2 + questionIndex,
  }))
);

export const tiers = [
  {
    min: 0,
    max: 30,
    title: "Du bist das Betriebssystem.",
    description: "Wissen, Entscheidungen und Ausführung laufen zu stark über dich. Mehr Einsatz löst das nicht – du brauchst einen ersten belastbaren System-Hebel.",
  },
  {
    min: 31,
    max: 55,
    title: "Das Unternehmen läuft – solange du mitsteuerst.",
    description: "Es gibt Strukturen, aber viele Ausnahmen, Freigaben und Übergaben ziehen dich zurück ins Tagesgeschäft.",
  },
  {
    min: 56,
    max: 75,
    title: "Strukturen greifen, aber Ausnahmen ziehen dich zurück.",
    description: "Der Grundbetrieb funktioniert. Der nächste Sprung entsteht nicht durch mehr Dokumentation, sondern durch klare Entscheidungen, Checks und Eskalationswege.",
  },
  {
    min: 76,
    max: 100,
    title: "Dein Unternehmen arbeitet ohne Dauerzugriff auf dich.",
    description: "Du hast tragfähige Systeme gebaut. Jetzt lohnt sich der Blick auf den schwächsten Bereich, damit Wachstum nicht wieder neue Founder-Abhängigkeit erzeugt.",
  },
];

const tieBreakPriority = [
  "decisions",
  "execution",
  "knowledge",
  "communication",
  "marketing",
  "automation",
];

export function getTierForScore(score) {
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    throw new RangeError("Score must be an integer from 0 to 100.");
  }
  return tiers.find((tier) => score >= tier.min && score <= tier.max);
}

export function getAreaStatus(score) {
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    throw new RangeError("Area score must be an integer from 0 to 100.");
  }
  if (score <= 33) return { id: "critical", label: "Akut personenabhängig" };
  if (score <= 66) return { id: "developing", label: "Teilweise systemisiert" };
  return { id: "stable", label: "Tragfähig" };
}

export function calculateResult(answers) {
  if (!Array.isArray(answers) || answers.length !== questions.length) {
    throw new TypeError(`Expected ${questions.length} answers.`);
  }
  if (answers.some((answer) => !Number.isInteger(answer) || answer < 0 || answer > MAX_OPTION_SCORE)) {
    throw new RangeError("Every answer must be an integer from 0 to 3.");
  }

  const maxTotal = questions.length * MAX_OPTION_SCORE;
  const total = answers.reduce((sum, answer) => sum + answer, 0);
  const score = Math.round((total / maxTotal) * 100);
  const areaResults = areas.map((area, areaIndex) => {
    const start = areaIndex * 2;
    const raw = answers[start] + answers[start + 1];
    const areaScore = Math.round((raw / 6) * 100);
    const status = getAreaStatus(areaScore);
    return {
      id: area.id,
      name: area.name,
      shortName: area.shortName,
      raw,
      max: 6,
      score: areaScore,
      status: status.label,
      insight: area.insights[status.id],
      area,
    };
  });

  const priority = new Map(tieBreakPriority.map((id, index) => [id, index]));
  const sorted = [...areaResults].sort(
    (a, b) => a.raw - b.raw || priority.get(a.id) - priority.get(b.id)
  );

  return {
    total,
    maxTotal,
    score,
    tier: getTierForScore(score),
    areaResults,
    bottleneck: sorted[0],
    secondBottleneck: sorted[1],
  };
}

export function encodeResult(answers) {
  calculateResult(answers);
  return RESULT_CODE_VERSION + answers.join("");
}

export function decodeResult(code) {
  const pattern = new RegExp(`^${RESULT_CODE_VERSION}[0-${MAX_OPTION_SCORE}]{${questions.length}}$`);
  if (typeof code !== "string" || !pattern.test(code)) return null;
  return code.slice(1).split("").map(Number);
}
