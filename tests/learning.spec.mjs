import { test, expect } from '@playwright/test';

const base = process.env.TEST_BASE_URL || 'https://lokpokhrel11.github.io/jyotisha-darshan/index.html';
const chapter = (n) => `${base}?chapter=${n}&e2e=1`;

test('Chapter 2: all 20 answers score, review and reset', async ({ page }) => {
  await page.goto(chapter(2));
  await page.getByRole('tab', { name: 'परीक्षा' }).click();
  const form = page.locator('#chapter2ExamForm');
  await expect(form).toBeVisible();
  const questions = page.locator('#chapter2ExamQuestions fieldset.exam-question');
  await expect(questions).toHaveCount(20);
  for (let i = 0; i < 20; i++) {
    await page.locator(`#chapter2ExamQuestions input[name="chapter2q${i}"][value="0"]`).check();
    if (i < 19) await page.locator('.exam-stepper').filter({ hasText: `प्रश्न ${i + 1} / 20` }).getByRole('button', { name: /अर्को प्रश्न/ }).click();
  }
  await expect(page.locator('#examProgress')).toContainText('20/20');
  await form.locator('button[type="submit"]').click();
  await expect(page.locator('#examResults h3')).toContainText(/\d+\/20/);
  await expect(page.locator('#examResults p')).toHaveCount(20);
  await page.locator('#examReset').click();
  await expect(page.locator('#examProgress')).toContainText('0/20');
  await expect(page.locator('#chapter2ExamQuestions input:checked')).toHaveCount(0);
  await expect(page.locator('#chapter2ExamQuestions fieldset.exam-question:not([hidden])')).toHaveCount(1);
  await expect(page.locator('.exam-stepper').filter({ hasText: 'प्रश्न 1 / 20' })).toBeVisible();
});

test('Chapter 3: score, review and reset', async ({ page }) => {
  await page.goto(chapter(3));
  await page.getByRole('tab', { name: 'परीक्षा' }).click();
  const form = page.locator('#chapter3ExamForm');
  const questions = page.locator('#chapter3ExamQuestions fieldset.exam-question');
  await expect(questions).toHaveCount(15);
  for (let i = 0; i < 15; i++) {
    await page.locator(`#chapter3ExamQuestions input[name="ch3q${i}"][value="0"]`).check();
    if (i < 14) await page.locator('.exam-stepper').filter({ hasText: `प्रश्न ${i + 1} / 15` }).getByRole('button', { name: /अर्को प्रश्न/ }).click();
  }
  await expect(page.locator('#chapter3Progress')).toContainText('15/15');
  await form.locator('button[type="submit"]').click();
  await expect(page.locator('#chapter3Results h3')).toContainText(/\d+\/15/);
  await expect(page.locator('#chapter3Results p')).toHaveCount(15);
  await page.locator('#chapter3Reset').click();
  await expect(page.locator('#chapter3Progress')).toContainText('0/15');
  await expect(page.locator('#chapter3ExamQuestions input:checked')).toHaveCount(0);
  await expect(page.locator('#chapter3ExamQuestions fieldset.exam-question:not([hidden])')).toHaveCount(1);
});

for (const width of [375, 320]) {
  test(`Mobile ${width}px: no horizontal document overflow on chapters 1–7`, async ({ page }) => {
    await page.setViewportSize({ width, height: 780 });
    for (let n = 1; n <= 7; n++) {
      await page.goto(chapter(n));
      await expect(page.locator('body')).toBeVisible();
      const widths = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth
      }));
      expect(widths.content, `Chapter ${n} overflows at ${width}px`).toBeLessThanOrEqual(widths.viewport + 2);
    }
  });
}

test('Chapter 7: focused reading, house lords, and quiz feedback', async ({ page }) => {
 await page.goto(chapter(7));
 await expect(page.locator('.chapter-focus-banner h1')).toHaveText('कुण्डली कसरी हेर्ने');
 await expect(page.locator('#chapter7')).toBeVisible();
 await expect(page.locator('#ch7LordRows tr')).toHaveCount(12);
 await expect(page.locator('#ch7LordRows tr').nth(9)).toContainText('शनि');
 await page.locator('#ch7Asc').selectOption('7');
 await expect(page.locator('#ch7LordRows tr').first()).toContainText('मङ्गल');
 await page.locator('#ch7Quiz input[value="b"]').check();
 await page.locator('#ch7Quiz button[type="submit"]').click();
 await expect(page.locator('#ch7Feedback')).toContainText('सही');
});

test('Chapter 7: chart has twelve selectable houses and accurate source examples', async ({page})=>{
 await page.goto(chapter(7));
 await expect(page.locator('#ch7Chart [data-house]')).toHaveCount(12);
 await expect(page.locator('#ch7HouseButtons button')).toHaveCount(12);
 await page.locator('#ch7HouseButtons button[data-house="10"]').click();
 await expect(page.locator('#ch7HouseDetail')).toContainText('मकर');
 await expect(page.locator('#ch7HouseDetail')).toContainText('शनि');
 await expect(page.locator('#ch7HouseDetail')).toContainText('मङ्गल');
 await expect(page.locator('#ch7HouseDetail')).toContainText('बृहस्पति');
 await page.locator('#ch7HouseButtons button[data-house="2"]').click();
 await expect(page.locator('#ch7HouseDetail')).toContainText('नोटमा ग्रहस्थिति दिइएको छैन');
});

test('Chapter 7: evidence-based interpretation provides accurate feedback',async({page})=>{
 await page.goto(chapter(7));
 await expect(page.locator('#ch7ReasonChoices input')).toHaveCount(3);
 await page.locator('#ch7ReasonChoices input[value="1"]').check();
 await page.locator('#ch7ReasonCheck').click();
 await expect(page.locator('#ch7ReasonFeedback')).toContainText('सही तर्क');
 await expect(page.locator('#ch7ReasonFeedback')).toContainText('शनि');
 await page.locator('#ch7ReasonQuestion').selectOption('aspects');
 await page.locator('#ch7ReasonChoices input[value="0"]').check();
 await page.locator('#ch7ReasonCheck').click();
 await expect(page.locator('#ch7ReasonFeedback')).toContainText('बृहस्पति');
 await page.locator('#ch7ReasonQuestion').selectOption('limits');
 await page.locator('#ch7ReasonChoices input[value="0"]').check();
 await page.locator('#ch7ReasonCheck').click();
 await expect(page.locator('#ch7ReasonFeedback')).toContainText('स्रोतसँग मिलेन');
});
