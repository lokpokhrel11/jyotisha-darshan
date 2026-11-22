// Run: node tests/chapter9-assessment.test.js
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
const app=fs.readFileSync('app.js','utf8');
const form=html.match(/<form id="ch9Quiz"[\s\S]*?<\/form>/)?.[0];
assert(form,'Chapter 9 assessment missing');
const block=app.match(/\/\* Chapter 9: educational assessment[\s\S]*?(?=\/\* Chapter 9: chart-position)/)?.[0];
assert(block,'Chapter 9 assessment handler missing');
const expected=[['ch9q','a'],['ch9q2','b'],['ch9q3','c'],['ch9q4','a'],['ch9q5','b']];
for(const [name,answer] of expected){
 const group=form.match(new RegExp('<fieldset>[\\s\\S]*?name="'+name+'"[\\s\\S]*?<\\/fieldset>'))?.[0];
 assert(group,'Missing question '+name);
 const choices=[...group.matchAll(new RegExp('name="'+name+'" value="([^"]+)"','g'))].map(m=>m[1]);
 assert.deepEqual(choices,['a','b','c'],'Unexpected choices for '+name);
 assert(block.includes("name:'"+name+"',answer:'"+answer+"'"),'Answer key mismatch for '+name);
}
assert(form.includes('मेष लग्नमा अष्टम भाव'),'Eighth-house question missing');
assert(form.includes('वृश्चिक र मङ्गल'),'Eighth-house correct option missing');
assert(form.includes('धनिष्ठाको उत्तरार्धबाट'),'Panchaka source answer missing');
assert(block.includes("localStorage.removeItem('jyotisha-chapter9-score')"),'Reset must clear saved score');
assert(block.includes("window.dispatchEvent(new Event('jyotisha-assessment-updated'))"),'Progress update missing');
console.log('Chapter 9: five questions, answer keys, and reset/progress wiring verified.');
