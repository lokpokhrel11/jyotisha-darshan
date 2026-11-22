// Run: node tests/chapter7-assessment.test.js
// Check the eight questions used by the actual Chapter 7 assessment.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const app = fs.readFileSync('app.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');
const start = app.indexOf(' const questions=[', app.indexOf("const quiz=document.getElementById('ch7Quiz')"));
const end = app.indexOf('\n ];', start);
assert(start !== -1 && end > start, 'Chapter 7 question bank not found');
const literal = app.slice(start, end + 4).replace(/^\s*const questions=/, '');
const questions = vm.runInNewContext(literal);
assert.equal(questions.length, 8, 'Chapter 7 requires eight questions');
questions.forEach((q, i) => {
  assert.equal(typeof q.q, 'string', 'Missing question ' + (i + 1));
  assert(q.q.length > 12, 'Question is too short: ' + (i + 1));
  assert.equal(q.choices.length, 3, 'Each question needs three choices');
  assert(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.choices.length,
    'Correct-answer index out of range: ' + (i + 1));
  assert(q.why.length > 25, 'Missing explanatory feedback: ' + (i + 1));
  assert.equal(new Set(q.choices).size, 3, 'Duplicate choices: ' + (i + 1));
});
assert.equal(questions[0].choices[questions[0].correct], 'मङ्गल');
assert.equal(questions[1].choices[questions[1].correct], 'शनि');
assert.equal(questions[2].choices[questions[2].correct], 'मङ्गल');
assert.equal(questions[3].choices[questions[3].correct], '१, ४, ७, १०');
assert.equal(questions[4].choices[questions[4].correct], 'दशौँ');
assert.equal(questions[5].choices[questions[5].correct], 'उच्च');
assert.equal(questions[6].choices[questions[6].correct], 'भावेशको स्थिति र सम्बन्ध जाँच्नु');
assert.match(questions[7].choices[questions[7].correct], /सीमित टिप्पणी/);
assert(html.includes('id="ch7Quiz"'), 'Quiz container missing');
assert(html.includes('id="ch7Feedback"'), 'Feedback container missing');
assert(app.includes("localStorage.setItem('jyotisha-chapter7-score'"), 'Score persistence missing');
assert(app.includes('if(missing)'), 'Incomplete-answer protection missing');
console.log('Chapter 7 assessment checks passed: eight questions, answers, explanations, and integration markers.');
