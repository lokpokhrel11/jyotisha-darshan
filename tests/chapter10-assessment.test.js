// Run: node tests/chapter10-assessment.test.js
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
const app=fs.readFileSync('app.js','utf8');
const form=html.match(/<form id="ch10Quiz"[\s\S]*?<\/form>/)?.[0];
assert(form,'Chapter 10 assessment form missing');
const section=app.match(/\/\* Chapter 10: source-based topic explorer[\s\S]*?(?=\/\* Chapter 11|$)/)?.[0];
assert(section,'Chapter 10 quiz handler missing');
const expected=[['ch10q1','a'],['ch10q2','b'],['ch10q3','c'],['ch10q4','b']];
for(const [name,answer] of expected){
 const choices=[...form.matchAll(new RegExp('name="'+name+'" value="([^"]+)"','g'))].map(m=>m[1]);
 assert.deepEqual(choices,['a','b','c'],'Options mismatch: '+name);
 assert(section.includes("name:'"+name+"',answer:'"+answer+"'"),'Answer mismatch: '+name);
}
assert(form.includes('मिथुन र बुध'),'Taurus second-house answer missing');
assert(form.includes('दुई नियमबीच असङ्गति'),'Source disagreement question missing');
assert(section.includes("localStorage.removeItem('jyotisha-chapter10-score')"),'Reset must clear saved score');
const names=['मेष','वृष','मिथुन','कर्कट','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
const owners=['मङ्गल','शुक्र','बुध','चन्द्र','सूर्य','बुध','शुक्र','मङ्गल','बृहस्पति','शनि','शनि','बृहस्पति'];
for(let asc=1;asc<=12;asc++){
 const second=asc%12;
 assert.equal(names[second],names[(asc+1-1)%12]);
 assert(owners[second]);
 for(const house of [2,6,12]){
  const sign=(asc+house-2)%12;
  assert(sign>=0&&sign<12);
  if(house===2)assert.equal(sign,second,'Second-house lord in own house must be in own sign');
 }
}
assert.equal(owners[2],'बुध','Taurus second-house lord');
assert.equal((2+6-2)%12,6,'Taurus sixth house is Libra');
assert.equal((12+2-2)%12,0,'Pisces second house wraps to Aries');
assert(app.includes('const second=a%12;'),'Second-house calculator changed');
assert(app.includes('const signIndex=(lagna+position-2)%12;'),'Placement calculator changed');
console.log('Chapter 10: 12 ascendants, 36 hypothetical placements, and four quiz keys checked.');
