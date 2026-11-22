// Run: node tests/chapter11-assessment.test.js
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('app.js','utf8');
const form=html.match(/<form id="ch11Quiz"[\s\S]*?<\/form>/)?.[0];
assert(form,'Chapter 11 quiz form missing');
const handler=js.slice(js.indexOf("const form=document.getElementById('ch11Quiz')"));
assert(handler.length>100,'Chapter 11 quiz handler missing');
const answers=['b','a','c','a','b','a','b'];
for(let i=1;i<=7;i++){
 const name='ch11q'+i;
 const values=[...form.matchAll(new RegExp('name="'+name+'" value="([^"]+)"','g'))].map(m=>m[1]);
 assert.deepEqual(values,['a','b','c'],name+' must have exactly three choices');
 assert(handler.includes("name:'"+name+"',answer:'"+answers[i-1]+"'"),name+' key mismatch');
}
assert(handler.includes("localStorage.removeItem('jyotisha-chapter11-score')"),'Reset must clear saved result');
assert(handler.includes("localStorage.setItem('jyotisha-chapter11-score'"),'Submit must save result');
assert(form.includes('चन्द्रराशि'),'Moon sign question missing');
assert(form.includes('नाडी दोष'),'Nadi question missing');
console.log('Chapter 11: all seven assessment keys and reset/save checks passed.');
