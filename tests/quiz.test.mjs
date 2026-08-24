import test from "node:test";
import assert from "node:assert/strict";
import {
  areas,
  questions,
  calculateResult,
  decodeResult,
  encodeResult,
  getTierForScore,
} from "../quiz-data.js";

test("the public quiz seam exposes six areas and twelve complete questions", () => {
  assert.equal(areas.length, 6);
  assert.equal(questions.length, 12);
  for (const question of questions) {
    assert.equal(question.options.length, 4);
    assert.deepEqual(question.options.map((option) => option.score), [0, 1, 2, 3]);
  }
  for (const area of areas) {
    assert.deepEqual(Object.keys(area.insights), ["critical", "developing", "stable"]);
    assert.ok(Object.values(area.insights).every((insight) => insight.length > 80));
  }
});

test("minimum answers produce zero and the founder-dependency tier", () => {
  const result = calculateResult(Array(12).fill(0));
  assert.equal(result.total, 0);
  assert.equal(result.score, 0);
  assert.equal(result.tier.title, "Du bist das Betriebssystem.");
  assert.ok(result.areaResults.every((area) => area.score === 0));
  assert.ok(result.areaResults.every((area) => area.status === "Akut personenabhängig"));
  assert.ok(result.areaResults.every((area) => area.insight.length > 80));
});

test("maximum answers produce one hundred and the autonomous tier", () => {
  const result = calculateResult(Array(12).fill(3));
  assert.equal(result.total, 36);
  assert.equal(result.score, 100);
  assert.equal(result.tier.title, "Dein Unternehmen arbeitet ohne Dauerzugriff auf dich.");
  assert.ok(result.areaResults.every((area) => area.score === 100));
  assert.ok(result.areaResults.every((area) => area.status === "Tragfähig"));
});

test("worked middle example rounds to 67 percent", () => {
  const result = calculateResult(Array(12).fill(2));
  assert.equal(result.total, 24);
  assert.equal(result.score, 67);
  assert.equal(result.tier.title, "Strukturen greifen, aber Ausnahmen ziehen dich zurück.");
});

test("business tie-break favors decisions before execution", () => {
  const answers = Array(12).fill(3);
  answers[2] = 0;
  answers[3] = 0;
  answers[8] = 0;
  answers[9] = 0;
  const result = calculateResult(answers);
  assert.equal(result.bottleneck.id, "decisions");
  assert.equal(result.secondBottleneck.id, "execution");
});

test("result code round-trips without personal data", () => {
  const answers = [0, 1, 2, 3, 3, 2, 1, 0, 2, 2, 3, 1];
  const code = encodeResult(answers);
  assert.equal(code, "1012332102231");
  assert.deepEqual(decodeResult(code), answers);
});

test("invalid result codes are rejected", () => {
  assert.equal(decodeResult(""), null);
  assert.equal(decodeResult("1999999999999"), null);
  assert.equal(decodeResult("2012332102231"), null);
  assert.equal(decodeResult("1012"), null);
});

test("tier boundaries are complete and non-overlapping", () => {
  assert.equal(getTierForScore(30).title, "Du bist das Betriebssystem.");
  assert.equal(getTierForScore(31).title, "Das Unternehmen läuft – solange du mitsteuerst.");
  assert.equal(getTierForScore(55).title, "Das Unternehmen läuft – solange du mitsteuerst.");
  assert.equal(getTierForScore(56).title, "Strukturen greifen, aber Ausnahmen ziehen dich zurück.");
  assert.equal(getTierForScore(75).title, "Strukturen greifen, aber Ausnahmen ziehen dich zurück.");
  assert.equal(getTierForScore(76).title, "Dein Unternehmen arbeitet ohne Dauerzugriff auf dich.");
});
