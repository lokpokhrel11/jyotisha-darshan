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
