# v3.5 · Fresh asset loading
- Versioned CSS and JavaScript URLs in HTML to bypass stale browser and service-worker asset caches.
- Service worker cache updated and clients claimed on activation.
- No lesson content or calculation logic changed.
- Live browser verification still required.

# v3.4 · Chapter 2 compact learning prototype
- Chapter 2 focused view now uses lesson/practice/quiz tabs; other chapters unchanged.
- Chapter 2 quiz presents one question at a time, preserving existing questions, scoring and reset logic.
- Results reveal the full question set for review; retake restores one-question navigation.
- Deep links to practice and quiz are supported. Browser regression testing is still required.

# v3.3 · Narrow-screen CSS safeguards
- Added responsive wrapping and minimum-width protection for chapter cards, quizzes, navigation and form controls.
- Improved small-screen spacing and tap target sizes.
- No Jyotisha calculations changed.
- Mobile device/browser verification remains pending; CSS changes are preventative, not a certified mobile pass.

# v3.2 · Lesson navigation refinement
- Chapter-specific table of contents with anchor links to lesson sections and exercises.
- Corrected Kundali practice placement to chapter 1; chapter 2 keeps its own example and exam.
- Chapter-specific document titles and mobile-responsive topic navigation.
- Existing calculators unchanged; interactive browser regression tests still pending.

# v3.1 · Focused chapter reading
- Six chapter-specific URLs using `index.html?chapter=1` through `?chapter=6`.
- Each view displays its relevant lesson and related existing exercises, without removing calculator DOM elements.
- Previous/next chapter controls and dashboard return link.
- Existing main homepage and all existing calculations retained.
- Browser QA not completed; syntax and repository checks pending.

# v3.0 · Student dashboard
- Six chapter cards, local-only chapter-open progress, reset and practice shortcuts.
- Existing calculators retained. Browser QA pending.

# v2.4.1 · Navigation usability fix\n- Replaced crowded horizontal links with a compact, scrollable two-column Topics menu on desktop and mobile.\n- Improved focus/hover styles, menu positioning and section anchor offsets.\n- Existing course content and calculators unchanged.\n- Browser interaction testing pending.\n\n# v2.4 · Chapter 6.4 Yogini Dasha
- Standard eight-Yogini 36-year cycle, nakshatra ordinal → starting Yogini, cycle table, optional balance calculation.
- Distinguishes printed eight-Yogini examples from unresolved handwritten nine-Yogini variant.
- Rohini test: ordinal 4 → Siddha (Venus, 7 years); 14/40 and 55/58 → about 5 years 2 months.
- JavaScript syntax checked; browser regression QA pending.
