# Learner journey QA protocol (Jyotish Darshan)

Status: **NOT YET EXECUTED in a live browser**. This document defines reproducible checks; it is not evidence of a passing test.

## Test setup

1. Open the deployed `index.html` in a private browser window; enable the browser console.
2. Check desktop width and a narrow phone viewport (e.g. 375px); repeat critical steps in dark mode.
3. Record browser, device, date, failures and screenshots. Never use real student records for testing.

## Core journey

- [ ] On the dashboard, opened chapters, assessments and study markers initially show zero in a fresh profile.
- [ ] Open Chapter 1 from its card; its opened count increments exactly once, and the chapter page is readable without horizontal overflow.
- [ ] Mark Chapter 1 as studied; the button reports pressed state; return to dashboard and confirm the self-reported count increments.
- [ ] Unmark Chapter 1; confirm count decreases without changing any assessment score.
- [ ] Complete Chapter 1's 15-question assessment; confirm a saved result appears on dashboard after returning.
- [ ] Restart the Chapter 1 assessment; confirm its saved result is cleared and the dashboard no longer counts it as attempted.
- [ ] In Chapters 4, 5 and 6, submit each assessment and confirm saved scores, question totals (4/5/5), and target statuses (3/4/4).
- [ ] Change an answer after submitting each Chapter 4–6 assessment; confirm the previously saved score is invalidated until resubmission.
- [ ] Reset opened-chapter history; verify opened count resets but reading markers and assessment scores remain unchanged.
- [ ] In a second tab, change opened history, reading markers and assessment scores; verify the first tab's dashboard refreshes after the storage event.
- [ ] Verify the provisional study-and-practice status appears **only** when all 13 chapters are marked as studied and all 13 main assessment targets are met.
- [ ] Verify no UI claims certification, verified completion or account-backed persistence.

## Accessibility and responsive checks

- [ ] Keyboard-only: reach chapter navigation, reading toggle, quiz controls and assessment links; focus indicator remains visible.
- [ ] Screen reader: progress bar is described as *chapters opened*; assessment summary and completion message announce updates without reading all 13 rows.
- [ ] Mobile: 320px and 375px widths have no sideways page scroll; chapter reading toggle wraps and is tappable.
- [ ] Dark mode: readable text, focus styles, quiz results and toggle states retain adequate contrast.
- [ ] No uncaught JavaScript exceptions during the entire sequence.

## Release gate

Do not mark this QA protocol passed until the live-browser checklist has been executed and any defects are resolved. Browser-local progress is not a secure student record and must not be used for payment access control or verified certificates.

## Source-level assessment audit (2026-11-22)

This section records **static inspection only**, not a passing browser test.

| Chapter | Dashboard total | Practice target | Score key |
|---|---:|---:|---|
| 1 | 15 | 12 | `jd-chapter1-v05` |
| 2 | 20 | 16 | `jyotisha-chapter2-score` |
| 3 | 15 | 12 | `jyotisha-chapter3-score` |
| 4 | 4 | 3 | `jyotisha-chapter4-score` |
| 5 | 5 | 4 | `jyotisha-chapter5-score` |
| 6 | 5 | 4 | `jyotisha-chapter6-score` |
| 7 | 8 | 7 | `jyotisha-chapter7-score` |
| 8 | 8 | 8 | `jyotisha-chapter8-score` |
| 9 | 5 | 4 | `jyotisha-chapter9-score` |
| 10 | 4 | 3 | `jyotisha-chapter10-score` |
| 11 | 7 | 6 | `jyotisha-chapter11-score` |
| 12 | 5 | 4 | `jyotisha-chapter12-score` |
| 13 | 10 | 8 | `jyotisha-chapter13-score` |

**Findings:** Every listed score key has a corresponding write path in `app.js`. The Chapter 7 dashboard total was corrected from 1 to 8 in commit `f8e009f`. Chapters 4–13 include reset/change invalidation paths. Question totals for dynamically generated banks and the pedagogical appropriateness of targets still require runtime and instructional review. In particular, Chapter 8 currently requires 8/8; retain this as a documented design choice until reviewed, not an independently validated standard.

## Chapters 9–13 assessment source review (2026-11-22)

- Chapters 9, 10 and 11: verified that every configured answer key corresponds to a form question with the expected three option values (`a`, `b`, `c`). Their question counts are 5, 4 and 7 respectively.
- Chapters 9–13: inspected code paths that remove stored assessment results on answer changes and form resets. This guards against stale achievement indicators.
- Chapters 9–11: explanations include limitations on treating traditional astrological interpretations as established health, marriage or life-outcome predictions. Chapter 10 explicitly flags an unresolved tension between two traditional business-related rules instead of presenting both as simultaneously certain.
- **Outstanding:** verify the actual semantic correctness of every option in Chapters 12–13 against the study source, execute submissions/resets on desktop and mobile browsers, and test screen-reader focus/feedback. This source review is not a browser QA pass or a claim of scientific validation of Jyotiṣa.

## Chapters 12–13 answer-key verification (2026-11-22)

Compared the five Chapter 12 and ten Chapter 13 assessment items in `index.html` with the most recent 124-page PDF of *ज्योतिष शास्त्र: अध्ययन नोट (गुरुजीका कक्षामा आधारित)*, especially PDF pages 108–119.

- **Chapter 12 (5/5):** ordering of remedies (p.108), handwritten बुध count 8,000 rather than the alternative 9,000 (pp.108–109), turning the mālā at the sumeru (p.115), 27 × 4 = 108 (p.115), and the explicitly unconfirmed 12-name kālasarpa/Rāhu-house mapping (pp.115–116) agree with the assessment's keyed answers.
- **Chapter 13 (10/10):** northeast/Bṛhaspati, southeast/Śukra and cooking, facing east for study, head oriented south while sleeping, no confirmed separate toilet-direction rule, examining soil three times, Aries eighth lord Maṅgala, the distinction between eighth-house placement and eighth-lord association, and the source-only status of rice/soil omen claims agree with the source (pp.117–119). The Aries eighth-lord calculation is also consistent with the standard zodiacal sign-lord mapping taught earlier in the course.
- **Editorial conclusion:** no answer-key change indicated. Traditional astrological or omen associations remain descriptions of the study source, not empirical evidence for diagnosis, safety, or property decisions.
- **Remaining:** verify behavior through a real browser, including all 15 answer submissions, changes, resets, focus and mobile layouts; confirm textual nuances against original handwritten images wherever the PDF marks an unresolved reading.
