// Browser smoke tests. Run after starting a local static server on port 8765.
// Requires: npm install --no-save playwright && npx playwright install chromium
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.SITE_URL || 'http://127.0.0.1:8765/index.html';
(async () => {
 const browser = await chromium.launch({headless:true});
 try {
  for (const width of [390, 1280]) {
   const page = await browser.newPage({viewport:{width,height:844},deviceScaleFactor:1});
   const errors = [];
   try {
   page.on('pageerror', error => errors.push(error.message));
   for (const [chapter,anchor] of [[4,'ch4ExampleQuiz'],[5,'ch5-assessment'],[6,'ch6-assessment']]) {
    await page.goto(base+'?chapter='+chapter+'#'+anchor,{waitUntil:'domcontentloaded'});
    const target = page.locator('#'+anchor);
    await target.waitFor({state:'visible',timeout:10000});
    assert(await target.isVisible(),'Chapter '+chapter+' assessment hidden at '+width+'px');
    const tab = page.locator('#chapter'+chapter+'-tab-practice');
    assert.equal(await tab.getAttribute('aria-selected'),'true','Chapter '+chapter+' practice tab not selected');
    await page.waitForFunction(id => {
      const rect = document.getElementById(id).getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }, anchor, { timeout: 5000 });
    const overflow = await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
    assert(!overflow,'Horizontal overflow on chapter '+chapter+' at '+width+'px');
   }
   await page.goto(base+'?chapter=4#localSunrise',{waitUntil:'domcontentloaded'});
   await page.locator('#lsDistrict option').last().waitFor({state:'attached'});
   assert.equal(await page.locator('#lsDistrict option').count(),78,'77 districts plus placeholder expected');
   await page.locator('#lsDistrict').selectOption({label:'काठमाडौँ (काठमाडौँ)'});
   assert.equal(await page.locator('#lsOffset').inputValue(),'+00:00','Kathmandu baseline offset');
   await page.locator('#lsDistrict').selectOption({label:'झापा (चन्द्रगढी)'});
   assert.equal(await page.locator('#lsOffset').inputValue(),'+11:00','Jhapa relative-to-Kathmandu offset');
   await page.locator('#lsDistrict').selectOption({label:'तनहुँ (दमौली)'});
   assert.equal(await page.locator('#lsOffset').inputValue(),'-04:08','Damauli relative-to-Kathmandu offset');
   assert((await page.locator('#lsResult').innerText()).includes('05:38'),'Damauli local sunrise should be 05:38');

   // Verify hash navigation works after the page has already loaded.
   await page.goto(base+'?chapter=5#chapter5',{waitUntil:'domcontentloaded'});
   await page.locator('#chapter5-tab-lesson').waitFor();
   await page.evaluate(()=>{location.hash='ch5-assessment'});
   await page.waitForFunction(()=>document.querySelector('#chapter5-tab-practice')?.getAttribute('aria-selected')==='true');
   assert(await page.locator('#ch5-assessment').isVisible(),'Hash-change assessment link remains hidden');

   // Exercise the actual reader theme toggle through its stored setting.
   await page.evaluate(()=>localStorage.setItem('jyotisha-reader-theme-v1','dark'));
   await page.reload({waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('html').getAttribute('data-theme'),'dark',
     'Saved dark mode not restored at '+width+'px');
   await page.evaluate(()=>localStorage.setItem('jyotisha-reader-theme-v1','light'));

   await page.goto(base+'?chapter=2#chapter2exam',{waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('#chapter2-tab-quiz').getAttribute('aria-selected'),'true',
     'Chapter 2 quiz deep link did not activate quiz tab');
   await page.goto(base+'?chapter=7#ch7Quiz',{waitUntil:'domcontentloaded'});
   assert(await page.locator('#ch7Quiz').isVisible(),'Chapter 7 quiz hidden');
   assert.deepEqual(errors,[],'Browser JavaScript errors at '+width+'px');
   console.log('PASS: chapter navigation and assessment visibility at '+width+'px');
   } catch (error) {
    fs.mkdirSync('test-results',{recursive:true});
    await page.screenshot({path:'test-results/failure-'+width+'.png',fullPage:true}).catch(()=>{});
    fs.writeFileSync('test-results/failure-'+width+'.txt',String(error.stack||error));
    throw error;
   } finally { await page.close(); }
  }
 } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
