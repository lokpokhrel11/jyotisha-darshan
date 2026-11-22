# Jyotish Darshan public release gate

**Status: Candidate for review. Release requires explicit approval.**

**Verification date: 2026-11-22**

## Scope and baseline

- The private master remains on `1be0d10366e9516debb2890ab2c3e9616581ffd4`. The source still contains the first two lessons and all eleven later chapter sections. The staging build reads its restricted source only for local comparison.
- The public site's GitHub Pages source is `main` at `/`. The verified live source revision was `c2bfccd4b6cc9838652f6bf2035918cd1135dd0d`. The review branch branches from `staging/public-chapters-1-2` at `82ea107aae827caf98468ecc0deca8653f3d643f`.
- The reviewed implementation exports `public-preview.html` as `index.html` and `public-course.html` as `course.html`. The export preserves the public URLs, six homepage calculators, 77-district sunrise selector, अक्षरचक्र, Chapter 1 and 2 lessons, exercises and assessments, and browser-local progress. Chapter 1 uses `?chapter=1` because its original section ID is `pathshala`.
- The last completed attempt stays on the dashboard while a student retries. The public pages retain the established storage keys for Chapters 1 and 2 and the reader theme on a same-origin cutover. A new origin starts with its own browser storage.

## Reproduce the candidate checks

Run from the review branch with an adjacent, read-only checkout of the private master. Choose a new output directory each time.

```sh
python3 tools/test_public_preview.py
python3 tools/build_public_candidate.py ../jyotish-public-export
python3 -B tools/audit_public_candidate.py ../jyotish-public-export ../jyotisha-darshan-master
python3 -m http.server 8766 --bind 127.0.0.1 --directory ../jyotish-public-export
```

In a second terminal, install Playwright 1.58.2 in a scratch directory and run the suite with that directory's `node_modules` on `NODE_PATH`. Set `BROWSER=firefox` or `BROWSER=webkit` to run the same journeys with those Playwright engines. For Chromium, use Playwright's installed browser or set `CHROMIUM_PATH` to a local Chromium executable. `SITE_URL` defaults to `http://127.0.0.1:8766/`.

```sh
node tools/test_public_browser.cjs
# With axe-core 4.11.1 on NODE_PATH:
node tools/test_public_accessibility.cjs
```

The export has 11 allowlisted files. Publish the export directory alone. It excludes full-course `app.js`, private lesson and assessment source, repository metadata, test data, and tooling. The shared stylesheet retains some selectors for later chapters. The audit checks the stylesheet for restricted text alongside the other files, and it contains no corresponding lesson content. The build rejects an existing destination to prevent stale files from carrying forward.

## Verification and open issues

| Check | Result |
| --- | --- |
| Public static preview and export | Passed. Verified available sections, local file and fragment references, manifest, worker behavior, and 911 sampled signatures from restricted lesson text and JavaScript against every exported file. A signature comparison can miss paraphrased or rearranged text. |
| Public Chromium 156 and Playwright 1.58.2 at 390 × 844 and 1280 × 844 | Passed. Six calculators including blank input validation, perfect scores on both assessments and retries, dashboard persistence, Chapter 2 deep linking, keyboard skip and menu focus, dark mode, अक्षरचक्र degree lookup and course link, horizontal overflow, console errors, and restricted route and asset checks. |
| Legacy worker migration fixture | Passed. Chromium first served a cached legacy asset. The replacement at the same scope purged the legacy cache, preserved unrelated cache storage, unregistered, and the legacy asset returned 404. |
| Clean Git rehearsal | Passed. A freshly initialized local repository, populated solely from the export, had one root commit and 13 reachable objects: one commit, one tree, and 11 blobs. `git fsck --full --no-reflogs` passed. Export tree: `17f5c7cea0ec3489e186d3d36bdf910279be496c`. No remote was connected. |
| Full-course legacy source checks | Static structure and all ten Node test files passed. Corrected two stale sunrise assertions to reflect the signed offsets and nearest-minute rounding. |
| Full-course legacy browser smoke | Passed at both widths on the hosted runner. The test now waits for the assessment to enter the viewport and for district options to be attached. |
| Full-course learning regression | 48 of 48 passed against the untouched staging checkout. The hosted learning workflow also passed after pinning the runner and Playwright version. |
| Hosted smoke and browser engines | Ubuntu 24.04 with Playwright 1.58.2. Chromium 145, Firefox 146 and WebKit 26 passed public journeys at both widths and the cache retirement fixture. [Hosted PR run](https://github.com/lokpokhrel11/jyotisha-darshan/actions/runs/45082253013). |

Axe-core 4.11.1 reported zero WCAG 2.1 A/AA violations in 24 scans covering the homepage, chapter views, course overview, अक्षरचक्र, and the expanded menu at both widths and themes. Keyboard checks covered skip navigation, menu focus, and interaction with the named chart group and its 12 house buttons. Chromium exposed all 12 buttons and the selected state in its accessibility tree. The five public views showed no page-level horizontal overflow at 320 CSS pixels. Native screen-reader and physical iOS Safari testing remain unverified. The hosted WebKit check used Linux.

## History and previously distributed copies

Both original public branches already expose later chapters in tracked HTML and JavaScript. Their combined reachable history had 943 commits at review, with later lesson sections and assessment banks present on `main`. The GitHub listing returned no tags, pull refs, or forks before this review PR.

### Historical Actions artifact audit

The read-only hosted scan downloaded and inspected all 503 listed archives using nested ZIP, tar and embedded Playwright report handling. It compared supported text members with 532 lesson signatures from the legacy public HTML. It also counted structural markers and route references. These counts overlap. [Hosted audit results](https://github.com/lokpokhrel11/jyotisha-darshan/actions/runs/45082253013/job/137392800451).

| Artifact name | Archives scanned | Restricted lesson passages | Restricted source markers | Restricted route references |
| --- | ---: | ---: | ---: | ---: |
| `github-pages` | 30 | 30 | 30 | 30 |
| `playwright-diagnostics` | 464 | 463 | 297 | 464 |
| `playwright-report` | 9 | 7 | 0 | 9 |
| **Total** | **503** | **500** | **327** | **503** |

The three archives without a passage match still reference restricted chapters. A negative signature match does not rule out reformatted content, images, other opaque data, or passages absent from the signature set. The audit covers retained artifacts in this repository. Expired or previously deleted artifacts, workflow logs outside these archives, and external copies were outside scope. The job logs report counts and matching artifact IDs without reproducing lesson passages. The updated test workflows avoid uploading full-course browser diagnostics.

Publishing a new clean repository does not retract the old public repository, GitHub-cached objects or pull refs, browser caches, or third-party copies. The worker update can clean Cache Storage only in browsers that revisit the original origin and receive the replacement at the original scope. Existing downloads, browser HTTP caches, and never-reconnected devices are outside that cleanup.

## Decisions requiring owner authorization

- Whether and when to merge the review PR.
- Whether to create a fresh public repository, which URL to use, and when to deploy.
- How to handle the legacy public repository and Pages site, including any visibility change.
- Which historical artifacts, if any, to delete and whether to ask GitHub Support to address retained copies.

The audit and CI changes are on the review branch. The private master, live Pages source, repository visibility, and historical artifacts were preserved.

## Deployment sequence, pending owner approval

1. Approve the new repository and intended public URL, and separately authorize how to close off the existing exposure. A clean replacement should use a freshly initialized repository. Preserve the legacy repository privately if the owner approves that visibility change. Coordinate the old Pages site, repository visibility, retained Actions artifacts and logs, GitHub-cached objects, and any visible forks with the owner and GitHub support as applicable.
2. Rebuild and audit the approved review commit. Run the public browser suite on the exact export and record the export tree and checksums. Use a fresh empty Git repository and copy in just the export files. Verify the tree, one root commit, and reachable object set before the first upload. Do not use a GitHub fork, import the old history, force-push the historical public repository, or attach the staging branch to the replacement.
3. After approval, verify the host can serve the project's files under the intended URL prefix. Configure it to serve the audited clean root. For a same-URL cutover, serve the included retirement worker at the existing `sw.js` URL and scope, with revalidation, and verify the old full-course routes and bundles return 404. If the public origin changes, coordinate separately how to serve the retirement worker on the old origin.
4. Run desktop and mobile smoke tests on the approved host. Fetch the homepage, the asset URLs and manifests, restricted paths, and the retirement worker directly. Check both a clean profile and an upgraded profile, and confirm the remote release tree matches the audited export. Keep any rollback package restricted to the audited Chapters 1–2 export. Do not reactivate the old full-course distribution as a rollback.
