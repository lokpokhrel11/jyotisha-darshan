// Run: node tests/chapter11-navapanchaka.test.js
const assert=require('node:assert/strict');
const fs=require('node:fs');
const app=fs.readFileSync('app.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const distance=(a,b)=>((b-a+12)%12)+1;
let matches=0;
for(let a=1;a<=12;a++)for(let b=1;b<=12;b++){
 const forward=distance(a,b),reverse=distance(b,a);
 const match=(forward===5&&reverse===9)||(forward===9&&reverse===5);
 assert(forward>=1&&forward<=12&&reverse>=1&&reverse<=12);
 if(a===b)assert.equal(forward,1);
 else assert.equal(forward+reverse,14);
 if(match){matches++;assert.equal((Math.abs(a-b)%4),0,'Matching signs must share zodiac element');}
}
assert.equal(matches,24,'12 unordered navapanchaka pairs must produce 24 directed matches');
assert.deepEqual([distance(1,5),distance(5,1)],[5,9]);
assert.deepEqual([distance(4,12),distance(12,4)],[9,5]);
assert.deepEqual([distance(1,2),distance(2,1)],[2,12]);
assert(app.includes('const forward=((y-x+12)%12)+1,reverse=((x-y+12)%12)+1;'),'Calculator formula changed');
assert(app.includes("localStorage.removeItem('jyotisha-chapter11-score')"),'Assessment reset must clear saved score');
for(const id of ['ch11MoonA','ch11MoonB','ch11CountResult','ch11Quiz'])assert(html.includes('id="'+id+'"'),'Missing '+id);
console.log('Chapter 11: all 144 ordered Moon-sign pairs checked; 24 directed navapanchaka matches.');
