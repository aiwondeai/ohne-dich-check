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
    return {
      id: area.id,
      name: area.name,
      shortName: area.shortName,
      raw,
      max: 6,
      score: areaScore,
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
