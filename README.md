# Jyotisha Darshan · ज्योतिष दर्शन

Free, static GitHub Pages pilot for a Nepali-first Jyotiṣa education platform, with a clearly marked future consultations and expert-network section.

## Included in v0.1
- Responsive public homepage and bilingual navigation cues
- Interactive first lesson: the five limbs of pañcāṅga, with a self-check question
- Lagna/house-to-sign practice and a North Indian fixed-house chart
- Planned consultation and expert-network information (no bookings, fees, or practitioner claims)
- Installable PWA manifest and service worker; no server or account required
- Methodology, source provenance, and educational disclaimer

## Publish on GitHub Pages
1. Create a **public** repository called `jyotisha-darshan` in the `lokpokhrel11` GitHub account.
2. Upload all files from this folder **to the repository root** (not inside a nested folder).
3. In GitHub repository **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then save.
4. After deployment, visit `https://lokpokhrel11.github.io/jyotisha-darshan/`.
5. Test on mobile and desktop. Changes to the service worker may require a hard refresh.

## Project safeguards
- This is a public educational prototype. **Never commit actual clients' birth details, appointment records, payment data, or private Guruji notes.**
- Do not publish large excerpts or scanned pages of Guruji's notes without permission.
- Content is derived from the user's designated October 4, 2026, 117-page study compilation; the first lesson paraphrases only introductory material.
- No astrological prediction or natal astronomy engine is implemented. The chart practice illustrates sign/house sequence only.
- The expert network is conceptual. No Guruji/classmate participation or credentials are represented as confirmed.
- Commercial functionality will require an authenticated backend, privacy controls, contractual terms, payment provider, and secure payout infrastructure.

## Next milestones
1. Validate chart diagram orientation and teaching content with Guruji.
2. Expand chapter 1 with full original exercises, then chapter 2.
3. Introduce separate `pathshala/` and `consultations/` sections as feature depth grows.
4. Add calculation unit tests and documented source/convention differences.
5. Create practitioner profiles only after written agreement.

License: All rights reserved unless a separate license is granted. Third-party source texts and notes are not included in this repository.


## v0.2 upgrade
Upload all files from this directory to the repository root, replacing existing files. See CHANGELOG.md. No payment or client-data collection is implemented.

## v0.3
Upload extracted files to the repository root. See CHANGELOG.md.
