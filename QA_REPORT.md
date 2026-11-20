# Version 0.6 quality-control report

## Source
Primary teaching source: 117-page **ज्योतिष शास्त्र: अध्ययन नोट (गुरुजीका कक्षामा आधारित)** (4 October 2026). The Chapter 1 learning content is unchanged from v0.5.

## Changes
- Corrected the mobile navigation button aria-expanded state after selecting a link.
- Return keyboard focus to the Open Lesson button when closing the lesson.
- Removed floating-point epsilon offsets from nakshatra and tithi calculations to avoid classifying values just below a boundary as being above it.
- Clarified that North Indian chart numbers identify signs, not houses, and that the chart is a practice diagram.
- Updated PWA cache version.

## Pending before authoritative use
- Guruji review of house geometry, sign orientation, and all assessment answers.
- Real-device browser testing, including offline install and refresh.
- Exact boundary timing conventions require ephemeris support and are outside this prototype.
- No client records, bookings, payment collection, or real horoscope predictions.

## v1.0.1 follow-up
User reported reset did not visibly reset questions. Code review found the form was recreated but scroll remained at the bottom. Reset now scrolls/focuses the first question. Requires live user retest.
