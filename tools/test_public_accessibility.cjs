// Run against the allowlisted local export. Requires Playwright and axe-core.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const axe = require.resolve('axe-core/axe.min.js');
const base = process.env.SITE_URL || 'http://127.0.0.1:8766/';
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function check(page, label) {
  await page.addScriptTag({ path: axe });
  const violations = await page.evaluate(async values => {
    const result = await axe.run({ runOnly: { type: 'tag', values } });
    return result.violations.map(rule => [rule.id, rule.nodes.map(node => node.target)]);
  }, tags);
  assert.deepEqual(violations, [], label);
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
  try {
    for (const width of [390, 1280]) for (const colorScheme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width, height: 844 }, colorScheme });
      try {
        for (const path of ['', '?chapter=1', '?chapter=2', 'course.html', 'akshara-chakra.html']) {
          await page.goto(new URL(path, base).href);
          await check(page, `${width}px ${colorScheme} ${path || 'home'}`);
        }
        await page.goto(new URL('?chapter=1#practice', base).href);
        const chart = page.locator('#practice svg[role="group"]');
        const houses = chart.getByRole('button');
        assert.equal(await houses.count(), 12);
        await houses.nth(1).focus();
        await page.keyboard.press('Enter');
        assert.equal(await houses.nth(1).getAttribute('aria-pressed'), 'true');
        assert(await houses.nth(1).evaluate(el => el === document.activeElement));
        await page.goto(new URL('', base).href);
        await page.locator('#menu').click();
        await check(page, `${width}px ${colorScheme} expanded menu`);
      } finally {
        await page.close();
      }
    }
    console.log('WCAG 2.1 A/AA axe checks and chart keyboard interaction passed.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
