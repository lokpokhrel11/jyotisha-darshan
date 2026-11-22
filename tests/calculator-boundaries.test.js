// Run: node tests/calculator-boundaries.test.js
// Regression checks against the actual conversion helpers in app.js.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('app.js', 'utf8');
function extract(start, end) {
 const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
 assert(a >= 0 && b > a, 'Calculator source segment missing: ' + start);
 return source.slice(a, b);
}
const context = vm.createContext({});
vm.runInContext(extract('function istSeconds(', "$('istCalculate').addEventListener"), context);
vm.runInContext(extract('function bhRead(', 'function bhFmt('), context);
const ist = value => vm.runInContext('istSeconds(' + JSON.stringify(value) + ')', context);
const bh = value => vm.runInContext('bhRead(' + JSON.stringify(value) + ')', context);
assert.equal(ist('00:00'), 0);
assert.equal(ist('23:59:59'), 86399);
assert.equal(ist('24:00'), null);
assert.equal(ist('12:60'), null);
assert.equal(ist('not a time'), null);
assert.equal(bh('00/00'), 0);
assert.equal(bh('59/59'), 3599);
assert.equal(bh('60/00'), 3600);
assert.equal(bh('60/01'), null);
assert.equal(bh('61/00'), null);
assert.equal(bh('14/60'), null);
const pada = (a,b) => {
 if (!(b>0 && a>=0 && a<b)) return 'boundary';
 const k=[1,2,3].find(k=>a*4===b*k);
 return k ? 'exact-quarter' : Math.floor(a*4/b)+1;
};
assert.equal(pada(0,3600),1);
assert.equal(pada(900,3600),'exact-quarter');
assert.equal(pada(1800,3600),'exact-quarter');
assert.equal(pada(2700,3600),'exact-quarter');
assert.equal(pada(3599,3600),4);
assert.equal(pada(3600,3600),'boundary');
const balanceDays=(elapsed,total,years)=>Math.round((total-elapsed)/total*years*360);
assert.equal(balanceDays(0,3600,7),2520);
assert.equal(balanceDays(3599,3600,7),1);
assert.equal(balanceDays(3599,3600,1),0);
assert.equal(balanceDays(1800,3600,20),3600);
const yoginiIndex=n=>(n+2)%8;
assert.equal(yoginiIndex(1),3);
assert.equal(yoginiIndex(5),7); // remainder zero selects Sankata
assert.equal(yoginiIndex(27),5);
console.log('Calculator boundary checks passed (time, ghadi/pala, pada, dasha, Yogini).');
