// Serve only the built candidate. Requires Playwright and its selected browser.
const { chromium, firefox, webkit } = require('playwright');
const assert = require('node:assert/strict');
const { createServer } = require('node:http');
const { setTimeout: delay } = require('node:timers/promises');

const base = new URL(process.env.SITE_URL || 'http://127.0.0.1:8766/');
const url = path => new URL(path, base).href;
const text = (page, id) => page.locator('#' + id).textContent();

async function checkViewport(page) {
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    'Unexpected horizontal overflow on ' + page.url());
}

async function checkSite(browser, width) {
  const page = await browser.newPage({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => {
    if (response.status() >= 400) errors.push(response.status() + ' ' + response.url());
  });
  try {
    await page.goto(url(''));
    await checkViewport(page);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.hash), '#main-content');
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content');
    await page.locator('#menu').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#menu').getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#menu').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'menu');

    assert.equal(await page.locator('#htDistrict option').count(), 78);
    await page.locator('#htDistrict').selectOption({ label: 'काठमाडौँ (काठमाडौँ)' });
    for (const [id, expected] of Object.entries({
      Sunrise: /05:34/, Ghadi: /23 घडी 2 पला 30 विपला/,
      Ist: /19 घडी 25 पला/, Dasha: /वर्ष.*महिना.*दिन/,
      Tithi: /शुक्ल पञ्चमी/, Nak: /रोहिणी.*2 पाउ/,
    })) {
      await page.locator('#ht' + id + 'Go').click();
      assert.match(await text(page, 'ht' + id + 'Out'), expected);
    }
    await page.locator('#htSun').fill('');
    await page.locator('#htTithiGo').click();
    assert.match(await text(page, 'htTithiOut'), /३६०/);

    await page.locator('#themeToggle').click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    await page.goto(url('course.html'));
    await checkViewport(page);
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    await page.locator('a[href="index.html?chapter=1"]').click();
    await checkViewport(page);
    assert(await page.locator('#lesson').isVisible());
    assert(!(await page.locator('#chapter2').isVisible()));
    await page.locator('#nakCalculate').click();
    assert.match(await text(page, 'nakResult'), /नक्षत्र|पाउ/);
    await page.locator('#calculate').click();
    assert.match(await text(page, 'result'), /मेष/);
    const chapter1Answers = [1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0];
    for (const [i, answer] of chapter1Answers.entries()) {
      await page.locator('#quizOptions button').nth(answer).click();
      if (i < 14) await page.locator('#nextQuestion').click();
    }
    assert.match(await text(page, 'quizFeedback'), /अन्तिम नतिजा: 15\/15/);
    await page.locator('#restartQuiz').click();
    assert.equal(await page.evaluate(() => document.activeElement.id), 'questionTitle');

    await page.goto(url('index.html?chapter=2#chapter2exam'));
    await checkViewport(page);
    assert(!(await page.locator('#pathshala').isVisible()));
    assert(await page.locator('#chapter2exam').isVisible());
    assert(await page.locator('#chapter2exam').evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < innerHeight;
    }));
    const submit = page.locator('#chapter2ExamForm button[type="submit"]');
    await submit.click();
    assert.match(await text(page, 'examResults'), /२०|20/);
    const questions = page.locator('#chapter2ExamQuestions fieldset');
    assert.equal(await questions.count(), 20);
    const chapter2Answers = [0, 1, 1, 0, 1, 1, 2, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1];
    for (const [i, answer] of chapter2Answers.entries()) {
      await questions.nth(i).locator('input').nth(answer).check();
    }
    await submit.click();
    assert.match(await text(page, 'examResults'), /नतिजा: 20\/20/);
    await page.locator('#examReset').click();
    assert.equal(await questions.locator('input:checked').count(), 0);

    await page.goto(url('index.html#dashboard'));
    assert.match(await text(page, 'dashboard'), /खोलिएका अध्याय: 2\/२/);
    assert.match(await text(page, 'dashboard'), /पछिल्लो अभ्यास: \d+\/15/);
    assert.match(await text(page, 'dashboard'), /पछिल्लो अभ्यास: \d+\/20/);
    await page.reload();
    assert.match(await text(page, 'dashboard'), /पछिल्लो अभ्यास: \d+\/20/);

    await page.goto(url('akshara-chakra.html'));
    await checkViewport(page);
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    assert.match(await text(page, 'acDataCheck'), /१०८|108/);
    await page.locator('#acDegreeForm button[type="submit"]').click();
    assert.match(await text(page, 'acDegreeResult'), /रोहिणी/);
    await page.locator('a[href="course.html"]').last().click();
    assert.equal(page.url(), url('course.html'));

    for (let chapter = 3; chapter <= 13; chapter++) {
      await page.goto(url('index.html?chapter=' + chapter + '#chapter' + chapter));
      assert.equal(await page.locator('#chapter' + chapter).count(), 0);
    }
    for (const path of ['app.js?v=58', 'chapter3.html', 'CHAPTER3_SOURCE_MAP.md', '.git/HEAD']) {
      assert.equal((await page.request.get(url(path))).status(), 404, path);
    }
    assert.deepEqual(errors, []);
    console.log('Public learning, calculator, navigation and asset checks passed at ' + width + 'px.');
  } finally {
    await page.close();
  }
}


async function checkCacheRetirement(browser) {
  const replacement = await fetch(url('sw.js')).then(response => {
    assert(response.ok);
    return response.text();
  });
  const oldWorker = `
    self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
    self.addEventListener('fetch', event => {
      if (new URL(event.request.url).pathname === '/app.js') {
        event.respondWith(caches.match(event.request));
      }
    });`;
  let upgraded = false;
  const server = createServer((request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    if (request.url === '/sw.js') {
      response.setHeader('Content-Type', 'text/javascript');
      response.end(upgraded ? replacement : oldWorker);
    } else if (request.url === '/') {
      response.setHeader('Content-Type', 'text/html');
      response.end('<!doctype html><title>Cache migration fixture</title>');
    } else {
      response.writeHead(404).end();
    }
  });
  await new Promise((resolve, reject) => server.listen(0, '127.0.0.1', resolve).once('error', reject));
  const page = await browser.newPage();
  try {
    await page.goto('http://127.0.0.1:' + server.address().port);
    await page.evaluate(async () => {
      const oldCache = await caches.open('jyotisha-darshan-v58');
      await oldCache.put('/app.js', new Response('legacy fixture'));
      await caches.open('unrelated-site-cache');
      await navigator.serviceWorker.register('/sw.js');
    });
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
    assert.equal(await page.evaluate(() => fetch('/app.js').then(r => r.text())), 'legacy fixture');
    upgraded = true;
    await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).update());
    for (let attempt = 0; attempt < 100; attempt++) {
      if (!(await page.evaluate(async () => Boolean(await navigator.serviceWorker.getRegistration())))) break;
      await delay(50);
    }
    assert.equal(await page.evaluate(async () => Boolean(await navigator.serviceWorker.getRegistration())), false);
    assert.deepEqual(await page.evaluate(() => caches.keys()), ['unrelated-site-cache']);
    assert.equal(await page.evaluate(() => fetch('/app.js').then(r => r.status)), 404);
    console.log('Legacy worker replacement, scoped cache cleanup and unregistration passed.');
  } finally {
    await page.close();
    server.close();
  }
}

(async () => {
  const engine = process.env.BROWSER || 'chromium';
  const browserType = { chromium, firefox, webkit }[engine];
  assert(browserType, 'Unsupported browser: ' + engine);
  const executablePath = engine === 'chromium' ? process.env.CHROMIUM_PATH : undefined;
  const browser = await browserType.launch({ executablePath });
  console.log(engine + ' ' + browser.version());
  try {
    for (const width of [390, 1280]) await checkSite(browser, width);
    await checkCacheRetirement(browser);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
