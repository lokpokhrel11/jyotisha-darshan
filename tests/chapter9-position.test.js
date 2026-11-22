// Run: node tests/chapter9-position.test.js
const assert=require('node:assert/strict');
const fs=require('node:fs');
const app=fs.readFileSync('app.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const owners=['मङ्गल','शुक्र','बुध','चन्द्र','सूर्य','बुध','शुक्र','मङ्गल','बृहस्पति','शनि','शनि','बृहस्पति'];
const signAt=(asc,house)=>((asc+house-2)%12)+1;
const moonHouse=(asc,moon)=>((moon-asc+12)%12)+1;
for(let asc=1;asc<=12;asc++){
 assert(owners[asc-1]);
 for(let house=1;house<=12;house++){
  const sign=signAt(asc,house);
  assert(sign>=1&&sign<=12);
  if(house===1)assert.equal(sign,asc);
  if(house===12)assert.equal(sign,asc===1?12:asc-1);
  assert.equal(moonHouse(asc,sign),house,'Moon sign must map back to selected house');
 }
}
assert.equal(signAt(1,10),10,'Aries tenth is Capricorn');
assert.equal(owners[0],'मङ्गल','Aries lord');
assert.equal(signAt(7,10),4,'Libra tenth is Cancer');
assert.equal(owners[6],'शुक्र','Libra lord');
assert.equal(moonHouse(1,8),8,'Aries to Scorpio');
assert(app.includes('const sign=(a+h-2)%12;'),'Chapter 9 lagna-lord calculator changed');
assert(app.includes('const house=((m-a+12)%12)+1;'),'Chapter 9 Moon-house calculator changed');
for(const id of ['ch9Ascendant','ch9LordHouse','ch9WorkedResult','ch9MoonResult','ch9Quiz']){
 assert(html.includes('id="'+id+'"'),'Missing element '+id);
}
console.log('Chapter 9: 144 sign/house pairs and example invariants passed.');
