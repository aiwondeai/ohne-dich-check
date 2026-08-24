import { readFile } from "node:fs/promises";
import { areas, questions } from "../quiz-data.js";

const [html, css, app] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../styles.css", import.meta.url), "utf8"),
  readFile(new URL("../app.js", import.meta.url), "utf8"),
]);

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(areas.length === 6, "Expected exactly six diagnostic areas.");
assert(questions.length === 12, "Expected exactly twelve questions.");
assert(questions.every((question) => question.options.length === 4), "Every question needs four options.");
assert(!/\[REPLACE\]|lorem ipsum|feature one/i.test(`${html}\n${css}\n${app}`), "Placeholder copy remains.");
assert(!/scrollIntoView\s*\(/.test(app), "scrollIntoView is not allowed.");

const sections = html.match(/<section\b[^>]*>/g) ?? [];
assert(sections.length > 0, "No sections found.");
assert(sections.every((section) => /data-od-id=/.test(section)), "Every top-level section needs data-od-id.");

const cssOutsideRoot = css.replace(/:root\s*\{[\s\S]*?\}/, "");
const rawHex = cssOutsideRoot.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
assert(rawHex.length === 0, `Raw hex colors outside :root: ${rawHex.join(", ")}`);

assert(/@media\s*\(max-width:\s*920px\)/.test(css), "Desktop-to-mobile breakpoint is missing.");
assert(/@media\s*\(max-width:\s*620px\)/.test(css), "Small-mobile breakpoint is missing.");
assert(/prefers-reduced-motion/.test(css), "Reduced-motion support is missing.");
assert(/aria-live="polite"/.test(html), "Result feedback needs an aria-live region.");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Validation passed: ${areas.length} areas, ${questions.length} questions, ${sections.length} sections.`);
