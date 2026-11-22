# Public release gate: Chapters 1–2 only

Status: **STAGING / NOT APPROVED FOR DEPLOYMENT** (2026-11-22)

## Verified architecture
- Private master: `lokpokhrel11/jyotisha-darshan-master` (all 13 chapters).
- Public site: `lokpokhrel11/jyotisha-darshan`.
- The public `index.html` currently embeds chapters 1–13 (chapter 3 begins at `<section id="chapter3"`).
- Public `app.js` includes assessment banks and routing for chapters 3–13.
- Do not hide private lessons only with CSS, links, or JavaScript guards.

## Required release changes
1. Produce public HTML from the private master using an explicit chapter 1–2 allowlist; keep homepage, free calculators, akṣara-cakra and general information.
2. Produce a **separate** public JavaScript bundle containing only the dependencies for free lessons, calculators, quizzes, navigation and accessibility.
3. Remove public links to chapter 3–13 anchors, routes, assessments and progress records; replace with course enrollment information.
4. Ensure free calculators do not import or expose restricted lesson text.
5. Test the output at mobile/desktop widths, keyboard navigation, dark mode, quiz interactions, calculators, deep links, and browser console.
6. Scan all generated HTML/JS/JSON/search indexes/service-worker caches for restricted chapter text.
7. **Before monetization**, publish the public build from a fresh public repository or clean orphan history; the current public repository already has full-course content in Git history. Existing third-party copies cannot be recalled.
8. Keep the current live website unchanged until the public build passes these checks.

## Release acceptance
- Private master retains 1–13 and is not deployed publicly.
- Public HTML and JavaScript include instructional material for chapters 1–2 only.
- Direct requests for chapters 3–13 cannot retrieve course content.
- No paid-course source is present in public repository history at launch.
- No regressions in free exercises, calculations, mobile layout or accessibility.

This is a release checklist, not a claim that extraction is complete.
