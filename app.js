import {
  questions,
  calculateResult,
  decodeResult,
  encodeResult,
} from "./quiz-data.js";

const STORAGE_KEY = "ohne-dich-check:v1";
const REPORT_STORAGE_PREFIX = "ohne-dich-check:report:v2:";
const REPORT_API_URL = "https://falkotreptau.com/api/ohne-dich-report";
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
  scoreBottleneckName: document.querySelector("#score-bottleneck-name"),
  tierTitle: document.querySelector("#tier-title"),
  tierDescription: document.querySelector("#tier-description"),
  bottleneckName: document.querySelector("#bottleneck-name"),
  bottleneckDiagnosis: document.querySelector("#bottleneck-diagnosis"),
  secondBottleneckName: document.querySelector("#second-bottleneck-name"),
  workflowTitle: document.querySelector("#workflow-title"),
  workflowDescription: document.querySelector("#workflow-description"),
  actionList: document.querySelector("#action-list"),
  areaScores: document.querySelector("#area-scores"),
  reportForm: document.querySelector("#report-form"),
  reportName: document.querySelector("#report-name"),
  reportEmail: document.querySelector("#report-email"),
  reportWebsite: document.querySelector("#report-website"),
  reportStatus: document.querySelector("#report-status"),
  reportSuccess: document.querySelector("#report-success"),
  reportSuccessTitle: document.querySelector("#report-success-title"),
  reportDetail: document.querySelector("#report-detail"),
  print: document.querySelector("#print-button"),
  restart: document.querySelector("#restart-button"),
};

let state = {
  answers: Array(questions.length).fill(null),
  current: 0,
  locked: false,
  resultCode: null,
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

function reportStorageKey(code) {
  return `${REPORT_STORAGE_PREFIX}${code}`;
}

function isDetailedReport(report) {
  return Boolean(
    report
    && Number.isInteger(report.score)
    && report.tier?.title
    && report.tier?.description
    && Array.isArray(report.areaResults)
    && report.areaResults.length === 6
    && report.areaResults.every((area) => area.id && area.name && Number.isInteger(area.score) && area.status && area.insight)
    && report.bottleneck?.id
    && report.bottleneck?.name
    && report.bottleneck?.diagnosis
    && report.bottleneck?.workflow?.title
    && report.bottleneck?.workflow?.description
    && Array.isArray(report.bottleneck?.actions)
    && report.bottleneck.actions.length === 3
    && report.secondBottleneck?.name
  );
}

function loadStoredReport(code) {
  try {
    const report = JSON.parse(localStorage.getItem(reportStorageKey(code)));
    if (isDetailedReport(report)) return report;
    localStorage.removeItem(reportStorageKey(code));
  } catch {
    // A malformed or unavailable cache must never unlock the report.
  }
  return null;
}

function storeDetailedReport(code, report) {
  if (!isDetailedReport(report)) return false;
  try {
    localStorage.setItem(reportStorageKey(code), JSON.stringify(report));
  } catch {
    // Delivery succeeded even when local persistence is unavailable.
  }
  return true;
}

function renderReportAccess(report, name = "") {
  const unlocked = isDetailedReport(report);
  elements.reportForm.hidden = unlocked;
  elements.reportSuccess.hidden = !unlocked;
  elements.reportDetail.hidden = !unlocked;
  elements.reportSuccessTitle.textContent = name
    ? `${name}, dein Report ist unterwegs.`
    : "Dein Report ist freigeschaltet.";
  if (unlocked) renderDetailedReport(report);
  else {
    elements.reportStatus.textContent = "";
    elements.reportStatus.classList.remove("is-error");
  }
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

function renderDetailedReport(report) {
  elements.bottleneckName.textContent = report.bottleneck.name;
  elements.bottleneckDiagnosis.textContent = report.bottleneck.diagnosis;
  elements.secondBottleneckName.textContent = report.secondBottleneck.name;
  elements.workflowTitle.textContent = report.bottleneck.workflow.title;
  elements.workflowDescription.textContent = report.bottleneck.workflow.description;

  elements.actionList.replaceChildren();
  report.bottleneck.actions.forEach((action) => {
    const item = document.createElement("li");
    item.textContent = action;
    elements.actionList.append(item);
  });

  elements.areaScores.replaceChildren();
  report.areaResults.forEach((area) => {
    const row = document.createElement("div");
    row.className = "area-score";
    if (area.id === report.bottleneck.id) row.classList.add("is-bottleneck");

    const head = document.createElement("div");
    head.className = "area-score-head";
    const title = document.createElement("div");
    title.className = "area-score-title";
    const name = document.createElement("span");
    name.className = "area-score-name";
    name.textContent = area.name;
    const status = document.createElement("span");
    status.className = "area-score-status";
    status.textContent = area.status;
    title.append(name, status);
    const value = document.createElement("span");
    value.className = "area-score-value";
    value.textContent = `${area.score} / 100`;
    head.append(title, value);

    const track = document.createElement("div");
    track.className = "area-score-track";
    track.setAttribute("role", "meter");
    track.setAttribute("aria-label", `${area.name}: ${area.score} von 100`);
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");
    track.setAttribute("aria-valuenow", String(area.score));
    const fill = document.createElement("span");
    fill.className = "area-score-fill";
    fill.style.width = `${area.score}%`;
    track.append(fill);

    const insight = document.createElement("p");
    insight.className = "area-score-insight";
    insight.textContent = area.insight;
    row.append(head, track, insight);
    elements.areaScores.append(row);
  });
}

function showResult() {
  if (state.answers.some((answer) => answer === null)) {
    startCheck();
    return;
  }

  const result = calculateResult(state.answers);
  const code = encodeResult(state.answers);
  state.resultCode = code;
  const resultUrl = buildResultUrl(code);
  window.history.replaceState({ resultCode: code }, "", resultUrl);

  elements.scoreValue.textContent = String(result.score);
  elements.scoreLockup.setAttribute("aria-label", `Unabhängigkeits-Score ${result.score} von 100`);
  elements.tierTitle.textContent = result.tier.title;
  elements.tierDescription.textContent = result.tier.description;
  elements.scoreBottleneckName.textContent = result.bottleneck.name;
  renderReportAccess(loadStoredReport(code));
  setView("result");
  elements.tierTitle.focus({ preventScroll: true });
}

function setFieldValidity(field, valid) {
  field.setAttribute("aria-invalid", String(!valid));
}

function reportFailureMessage(status) {
  if (status === 400) return "Prüfe bitte Vorname und E-Mail.";
  if (status === 429) return "Zu viele Versuche in kurzer Zeit. Warte bitte etwas und probiere es erneut.";
  if (status === 502) return "Der Mailversand ist gerade nicht erreichbar. Dein Report wurde nicht freigeschaltet – bitte versuche es erneut.";
  return "Das hat technisch nicht funktioniert. Dein Report wurde nicht freigeschaltet – bitte versuche es erneut.";
}

async function requestDetailReport(event) {
  event.preventDefault();
  const name = elements.reportName.value.trim();
  const email = elements.reportEmail.value.trim().toLowerCase();
  const nameValid = name.length > 0 && name.length <= 80;
  const emailValid = elements.reportEmail.checkValidity() && email.length <= 254;
  setFieldValidity(elements.reportName, nameValid);
  setFieldValidity(elements.reportEmail, emailValid);

  if (!nameValid || !emailValid || !state.resultCode) {
    elements.reportStatus.textContent = "Prüfe bitte Vorname und E-Mail.";
    elements.reportStatus.classList.add("is-error");
    (nameValid ? elements.reportEmail : elements.reportName).focus();
    return;
  }

  const submit = elements.reportForm.querySelector("button[type='submit']");
  const originalLabel = submit.innerHTML;
  submit.disabled = true;
  submit.textContent = "REPORT WIRD ERSTELLT …";
  elements.reportStatus.textContent = "Der Report wird erstellt und per E-Mail versendet.";
  elements.reportStatus.classList.remove("is-error");

  try {
    const response = await fetch(REPORT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        resultCode: state.resultCode,
        website: elements.reportWebsite.value,
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.delivery !== "sent" || !isDetailedReport(payload.report)) {
      throw Object.assign(new Error("report_delivery_failed"), { status: response.status });
    }

    storeDetailedReport(state.resultCode, payload.report);
    renderReportAccess(payload.report, name);
    elements.reportForm.reset();
    window.requestAnimationFrame(() => {
      const reportTop = elements.reportDetail.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: reportTop - 20, behavior: "smooth" });
      elements.bottleneckName.focus({ preventScroll: true });
    });
  } catch (error) {
    elements.reportStatus.textContent = reportFailureMessage(error?.status);
    elements.reportStatus.classList.add("is-error");
  } finally {
    submit.disabled = false;
    submit.innerHTML = originalLabel;
  }
}

function restart() {
  clearSavedProgress();
  state = {
    answers: Array(questions.length).fill(null),
    current: 0,
    locked: false,
    resultCode: null,
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
elements.reportForm.addEventListener("submit", requestDetailReport);
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
