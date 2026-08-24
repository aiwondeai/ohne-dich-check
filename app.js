import {
  questions,
  calculateResult,
  decodeResult,
  encodeResult,
} from "./quiz-data.js";

const STORAGE_KEY = "ohne-dich-check:v1";
const answerKeys = ["1", "2", "3", "4"];

const elements = {
  landing: document.querySelector("#landing-view"),
  quiz: document.querySelector("#quiz-view"),
  result: document.querySelector("#result-view"),
  startButtons: document.querySelectorAll("[data-start]"),
  areaCount: document.querySelector("#area-count"),
  questionCount: document.querySelector("#question-count"),
  progress: document.querySelector(".progress-track"),
  progressBar: document.querySelector("#progress-bar"),
  areaName: document.querySelector("#area-name"),
  areaPrompt: document.querySelector("#area-prompt"),
  questionKicker: document.querySelector("#question-kicker"),
  questionText: document.querySelector("#question-text"),
  options: document.querySelector("#options"),
  back: document.querySelector("#back-button"),
  saveExit: document.querySelector("#save-exit-button"),
  announcer: document.querySelector("#question-announcer"),
  scoreLockup: document.querySelector("#score-lockup"),
  scoreValue: document.querySelector("#score-value"),
  tierTitle: document.querySelector("#tier-title"),
  tierDescription: document.querySelector("#tier-description"),
  bottleneckName: document.querySelector("#bottleneck-name"),
  bottleneckDiagnosis: document.querySelector("#bottleneck-diagnosis"),
  workflowTitle: document.querySelector("#workflow-title"),
  workflowDescription: document.querySelector("#workflow-description"),
  actionList: document.querySelector("#action-list"),
  areaScores: document.querySelector("#area-scores"),
  share: document.querySelector("#share-button"),
  print: document.querySelector("#print-button"),
  restart: document.querySelector("#restart-button"),
  contact: document.querySelector("#contact-link"),
  feedback: document.querySelector("#share-feedback"),
};

let state = {
  answers: Array(questions.length).fill(null),
  current: 0,
  locked: false,
};

function isValidSavedAnswers(value) {
  return Array.isArray(value)
    && value.length === questions.length
    && value.every((answer) => answer === null || (Number.isInteger(answer) && answer >= 0 && answer <= 3));
}

function clearSavedProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // The assessment still works when browser storage is unavailable.
  }
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (isValidSavedAnswers(saved?.answers)) {
      state.answers = saved.answers;
      const firstOpen = state.answers.findIndex((answer) => answer === null);
      state.current = firstOpen === -1 ? questions.length - 1 : firstOpen;
    }
  } catch {
    clearSavedProgress();
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers: state.answers }));
  } catch {
    // Persistence is optional; never block the live assessment.
  }
  updateStartLabels();
}

function answeredCount() {
  return state.answers.filter((answer) => answer !== null).length;
}

function updateStartLabels() {
  const count = answeredCount();
  elements.startButtons.forEach((button) => {
    if (button.matches(".text-button") && button.closest(".topbar")) {
      button.firstChild.textContent = count > 0 && count < questions.length ? "Fortsetzen " : "Check starten ";
    }
  });
}

function setView(view) {
  elements.landing.hidden = view !== "landing";
  elements.quiz.hidden = view !== "quiz";
  elements.result.hidden = view !== "result";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startCheck() {
  const firstOpen = state.answers.findIndex((answer) => answer === null);
  state.current = firstOpen === -1 ? 0 : firstOpen;
  if (firstOpen === -1) {
    state.answers = Array(questions.length).fill(null);
    clearSavedProgress();
    window.history.replaceState({}, "", window.location.pathname);
    updateStartLabels();
  }
  setView("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[state.current];
  const count = answeredCount();
  elements.areaCount.textContent = `${String(question.areaIndex + 1).padStart(2, "0")} / 06`;
  elements.questionCount.textContent = `${String(state.current + 1).padStart(2, "0")} / ${questions.length}`;
  elements.progress.setAttribute("aria-valuenow", String(count));
  elements.progressBar.style.width = `${(count / questions.length) * 100}%`;
  elements.areaName.textContent = question.area.name;
  elements.areaPrompt.textContent = question.area.prompt;
  elements.questionKicker.textContent = String(state.current + 1).padStart(2, "0");
  elements.questionText.textContent = question.text;
  elements.options.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.setAttribute("aria-pressed", String(state.answers[state.current] === option.score));
    if (state.answers[state.current] === option.score) button.classList.add("is-selected");

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = answerKeys[index];
    letter.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.textContent = option.label;
    button.append(letter, label);
    button.addEventListener("click", () => selectAnswer(option.score, button));
    elements.options.append(button);
  });

  elements.back.disabled = state.current === 0;
  elements.announcer.textContent = `Frage ${state.current + 1} von ${questions.length}. Bereich ${question.area.name}.`;
  elements.questionText.focus({ preventScroll: true });
  state.locked = false;
}

function selectAnswer(score, selectedButton) {
  if (state.locked) return;
  state.locked = true;
  state.answers[state.current] = score;
  saveProgress();

  elements.options.querySelectorAll(".option").forEach((button) => {
    const selected = button === selectedButton;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  elements.progress.setAttribute("aria-valuenow", String(answeredCount()));
  elements.progressBar.style.width = `${(answeredCount() / questions.length) * 100}%`;

  window.setTimeout(() => {
    if (state.current < questions.length - 1) {
      state.current += 1;
      renderQuestion();
      return;
    }

    const nextOpen = state.answers.findIndex((answer) => answer === null);
    if (nextOpen !== -1) {
      state.current = nextOpen;
      renderQuestion();
      return;
    }
    showResult();
  }, 220);
}

function buildResultUrl(code) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("r", code);
  return url.toString();
}

function showResult() {
  if (state.answers.some((answer) => answer === null)) {
    startCheck();
    return;
  }

  const result = calculateResult(state.answers);
  const code = encodeResult(state.answers);
  const resultUrl = buildResultUrl(code);
  window.history.replaceState({ resultCode: code }, "", resultUrl);

  elements.scoreValue.textContent = String(result.score);
  elements.scoreLockup.setAttribute("aria-label", `Unabhängigkeits-Score ${result.score} von 100`);
  elements.tierTitle.textContent = result.tier.title;
  elements.tierDescription.textContent = result.tier.description;
  elements.bottleneckName.textContent = result.bottleneck.name;
  elements.bottleneckDiagnosis.textContent = result.bottleneck.area.diagnosis;
  elements.workflowTitle.textContent = result.bottleneck.area.workflow.title;
  elements.workflowDescription.textContent = result.bottleneck.area.workflow.description;

  elements.actionList.replaceChildren();
  result.bottleneck.area.actions.forEach((action) => {
    const item = document.createElement("li");
    item.textContent = action;
    elements.actionList.append(item);
  });

  elements.areaScores.replaceChildren();
  result.areaResults.forEach((area) => {
    const row = document.createElement("div");
    row.className = "area-score";
    if (area.id === result.bottleneck.id) row.classList.add("is-bottleneck");

    const head = document.createElement("div");
    head.className = "area-score-head";
    const name = document.createElement("span");
    name.className = "area-score-name";
    name.textContent = area.name;
    const value = document.createElement("span");
    value.className = "area-score-value";
    value.textContent = `${area.score} / 100`;
    head.append(name, value);

    const track = document.createElement("div");
    track.className = "area-score-track";
    track.setAttribute("aria-label", `${area.name}: ${area.score} von 100`);
    const fill = document.createElement("span");
    fill.className = "area-score-fill";
    fill.style.width = `${area.score}%`;
    track.append(fill);
    row.append(head, track);
    elements.areaScores.append(row);
  });

  const subject = `Mein Ohne-dich-Check: ${result.score}/100 · Engpass ${result.bottleneck.name}`;
  const body = [
    "Hi Falko,",
    "",
    `mein Unabhängigkeits-Score liegt bei ${result.score}/100.`,
    `Größter Engpass: ${result.bottleneck.name}.`,
    `Empfohlener erster Workflow: ${result.bottleneck.area.workflow.title}.`,
    "",
    `Ergebnis: ${resultUrl}`,
    "",
    "Ich würde gern den sinnvollsten ersten Hebel besprechen.",
  ].join("\n");
  elements.contact.href = `mailto:info@aiwon.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  elements.feedback.textContent = "";
  setView("result");
  elements.tierTitle.focus({ preventScroll: true });
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.className = "sr-only";
  document.body.append(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

async function shareResult() {
  const result = calculateResult(state.answers);
  const url = buildResultUrl(encodeResult(state.answers));
  const shareData = {
    title: "Mein Ohne-dich-Check",
    text: `Mein Unabhängigkeits-Score: ${result.score}/100. Größter Engpass: ${result.bottleneck.name}.`,
    url,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      elements.feedback.textContent = "Ergebnis geteilt.";
    } else {
      await copyText(url);
      elements.feedback.textContent = "Ergebnislink kopiert.";
    }
  } catch (error) {
    if (error?.name !== "AbortError") {
      elements.feedback.textContent = "Teilen ging nicht. Kopiere die URL aus der Adresszeile.";
    }
  }
}

function restart() {
  clearSavedProgress();
  state = {
    answers: Array(questions.length).fill(null),
    current: 0,
    locked: false,
  };
  window.history.replaceState({}, "", window.location.pathname);
  updateStartLabels();
  startCheck();
}

function saveAndExit() {
  saveProgress();
  setView("landing");
}

function hydrateFromUrl() {
  const code = new URLSearchParams(window.location.search).get("r");
  if (!code) return false;
  const answers = decodeResult(code);
  if (!answers) return false;
  state.answers = answers;
  state.current = questions.length - 1;
  saveProgress();
  showResult();
  return true;
}

elements.startButtons.forEach((button) => button.addEventListener("click", startCheck));
elements.back.addEventListener("click", () => {
  if (state.current === 0) return;
  state.current -= 1;
  renderQuestion();
});
elements.saveExit.addEventListener("click", saveAndExit);
elements.share.addEventListener("click", shareResult);
elements.print.addEventListener("click", () => window.print());
elements.restart.addEventListener("click", restart);
window.addEventListener("popstate", () => {
  if (!hydrateFromUrl()) setView("landing");
});

document.addEventListener("keydown", (event) => {
  if (elements.quiz.hidden || state.locked) return;
  const index = answerKeys.indexOf(event.key);
  const option = elements.options.children[index];
  if (option) option.click();
});

loadProgress();
updateStartLabels();
if (!hydrateFromUrl()) setView("landing");
