import { readFile } from "node:fs/promises";
import { areas, questions } from "../quiz-data.js";

const [html, css, app, ogImage, portrait, displayFont, favicon, archivoLicense, outfitLicense] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../styles.css", import.meta.url), "utf8"),
  readFile(new URL("../app.js", import.meta.url), "utf8"),
  readFile(new URL("../assets/og-image.png", import.meta.url)),
  readFile(new URL("../assets/falko-portrait.webp", import.meta.url)),
  readFile(new URL("../assets/fonts/archivo-black-regular.ttf", import.meta.url)),
  readFile(new URL("../assets/favicon.svg", import.meta.url), "utf8"),
  readFile(new URL("../assets/fonts/OFL-Archivo-Black.txt", import.meta.url), "utf8"),
  readFile(new URL("../assets/fonts/OFL-Outfit.txt", import.meta.url), "utf8"),
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
assert(!/share-button|Ergebnis teilen|navigator\.share|clipboard\.writeText/i.test(`${html}\n${app}`), "Share functionality must be removed.");
assert(/id="report-form"/.test(html), "Detail-report form is missing.");
assert(/name="name"/.test(html) && /name="email"/.test(html), "Report gate needs name and email.");
assert(!/name="(?:phone|company|firma|telefon)"/i.test(html), "Report gate must not ask for phone or company.");
assert(/Kein Newsletter/i.test(html), "Transactional purpose must be explained at the form.");
assert(/https:\/\/falkotreptau\.com\/api\/ohne-dich-report/.test(app), "Resend-backed report endpoint is missing.");
assert(/Report speichern/.test(html), "Print action must be labelled Report speichern.");
assert(/https:\/\/falkotreptau\.com\/#newsletter/.test(html) && /Termin anfragen/i.test(html), "Temporary contact CTA must point to the live contact trigger section.");
assert(/connect-src[^;]*https:\/\/falkotreptau\.com/.test(html), "CSP must allow the report API.");
assert(/payload\.delivery !== "sent"[^\n]*!isDetailedReport\(payload\.report\)/.test(app), "Report must unlock only after confirmed delivery with a server report.");
assert(/REPORT_STORAGE_PREFIX/.test(app) && /JSON\.stringify\(report\)/.test(app), "Delivered report must be cached by result code.");
assert(areas.every((area) => !("diagnosis" in area) && !("workflow" in area) && !("actions" in area) && !("insights" in area)), "Detailed report content must not ship in the public quiz bundle.");
assert(!/localStorage\.setItem\([^;]*(?:email|name)/i.test(app), "PII must not be written to localStorage.");
assert(/\.hero-title\s*\{[\s\S]*?(?:row-)?gap:\s*clamp\(/.test(css), "Hero title needs an explicit responsive line gap.");
assert(/\.question-number\s*\{[\s\S]*?transform:\s*translateX\(-48px\)/.test(css), "Desktop question numbers must move 48px left.");
assert(!/score-(?:dial|angle)/.test(`${html}\n${css}\n${app}`), "Stale score-gauge implementation remains.");
assert(!/#141414|#f5f3ee/i.test(`${css}\n${favicon}`), "Brand palette must use #0a0a0a, white, and transparent-white surfaces.");
assert(!/fonts\.(googleapis|gstatic)\.com/.test(`${html}\n${css}`), "Fonts must be self-hosted.");
assert(/Content-Security-Policy/.test(html), "Content Security Policy is missing.");
assert(/property="og:image"/.test(html), "Open Graph image metadata is missing.");
assert(ogImage.subarray(1, 4).toString("ascii") === "PNG", "Open Graph asset is not a PNG.");
assert(ogImage.readUInt32BE(16) === 1200 && ogImage.readUInt32BE(20) === 630, "Open Graph image must be 1200 × 630.");
assert(portrait.length > 10_000, "Falko portrait is unexpectedly small.");
assert(portrait.subarray(0, 4).toString("ascii") === "RIFF", "Portrait must be a WebP container.");
assert(portrait.subarray(8, 12).toString("ascii") === "WEBP", "Portrait must be WebP.");
assert(displayFont.readUInt32BE(0) === 0x00010000, "Display font must be a TrueType font.");
assert(/<svg[\s>]/.test(favicon), "Favicon must be SVG.");
assert(/SIL Open Font License, Version 1\.1/.test(archivoLicense), "Archivo Black license is missing.");
assert(/SIL Open Font License, Version 1\.1/.test(outfitLicense), "Outfit license is missing.");
assert(html.includes("./assets/falko-portrait.webp"), "Portrait must be referenced from HTML.");
assert(css.includes("./assets/fonts/archivo-black-regular.ttf"), "Display font must be referenced from CSS.");

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

const printStyles = css.slice(css.indexOf("@media print"));
assert(printStyles.includes("--muted: rgba(0, 0, 0"), "Print colors must switch to dark text on white.");
assert(printStyles.includes(".skip-link"), "Skip link must be hidden in print.");
assert(printStyles.includes(".report-gate-section"), "Report gate must be hidden in print.");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Validation passed: ${areas.length} areas, ${questions.length} questions, ${sections.length} sections.`);
