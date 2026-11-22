// Browser smoke tests. Run after starting a local static server on port 8765.
// Requires: npm install --no-save playwright && npx playwright install chromium
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.SITE_URL || 'http://127.0.0.1:8765/index.html';
(async () => {
 const browser = await chromium.launch({headless:true});
 try {
  for (const width of [390, 1280]) {
   const page = await browser.newPage({viewport:{width,height:844},deviceScaleFactor:1});
   const errors = [];
   page.on('pageerror', error => errors.push(error.message));
   for (const [chapter,anchor] of [[4,'ch4ExampleQuiz'],[5,'ch5-assessment'],[6,'ch6-assessment']]) {
    await page.goto(base+'?chapter='+chapter+'#'+anchor,{waitUntil:'domcontentloaded'});
    const target = page.locator('#'+anchor);
    await target.waitFor({state:'visible',timeout:10000});
    assert(await target.isVisible(),'Chapter '+chapter+' assessment hidden at '+width+'px');
    const tab = page.locator('#chapter'+chapter+'-tab-practice');
    assert.equal(await tab.getAttribute('aria-selected'),'true','Chapter '+chapter+' practice tab not selected');
    await page.waitForTimeout(150);
    const visible = await target.evaluate(el => {
      const rect=el.getBoundingClientRect();
      return rect.bottom>0 && rect.top<window.innerHeight;
    });
    assert(visible,'Chapter '+chapter+' assessment not scrolled into viewport at '+width+'px');
    const overflow = await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
    assert(!overflow,'Horizontal overflow on chapter '+chapter+' at '+width+'px');
   }
   await page.goto(base+'?chapter=2#chapter2exam',{waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('#chapter2-tab-quiz').getAttribute('aria-selected'),'true',
     'Chapter 2 quiz deep link did not activate quiz tab');
   await page.goto(base+'?chapter=7#ch7Quiz',{waitUntil:'domcontentloaded'});
   assert(await page.locator('#ch7Quiz').isVisible(),'Chapter 7 quiz hidden');
   assert.deepEqual(errors,[],'Browser JavaScript errors at '+width+'px');
   console.log('PASS: chapter navigation and assessment visibility at '+width+'px');
   await page.close();
  }
 } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
