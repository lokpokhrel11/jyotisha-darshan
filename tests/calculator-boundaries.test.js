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
// Run the actual chapter 5 pada click handler with minimal DOM controls.
const padaFields = {
 padaBhayat: {value:'00/00'}, padaBhavog: {value:'60/00'},
 padaOutput: {textContent:''},
 padaCalculate: {addEventListener(event, handler){if(event==='click')this.handler=handler;},click(){this.handler();}}
};
const padaContext=vm.createContext({$:id=>padaFields[id]});
vm.runInContext(extract("$('padaCalculate').addEventListener", '// Chapter 5.7:'),padaContext);
const padaResult=(elapsed,total)=>{
 padaFields.padaBhayat.value=elapsed;
 padaFields.padaBhavog.value=total;
 padaFields.padaCalculate.click();
 return padaFields.padaOutput.textContent;
};
assert.match(padaResult('00/00','60/00'),/पहिलो/);
assert.match(padaResult('15/00','60/00'),/सीमामा/);
assert.match(padaResult('30/00','60/00'),/सीमामा/);
assert.match(padaResult('45/00','60/00'),/सीमामा/);
assert.match(padaResult('59/59','60/00'),/चौथो/);
assert.match(padaResult('60/00','60/00'),/सीमा-क्षण/);
assert.match(padaResult('60/00','59/59'),/ठूलो/);
assert.match(padaResult('14/00','57/01'),/14 घडी 15 पला 15\\.25 विपला/);
// Exercise the actual Vimshottari balance click handler.
const dashaFields={
 dbBhayat:{value:'00/00'},dbBhavog:{value:'60/00'},dbLord:{value:'ketu'},
 dbOutput:{textContent:''},
 dbCalculate:{addEventListener(event,handler){if(event==='click')this.handler=handler;},click(){this.handler();}}
};
const dashaContext=vm.createContext({$:id=>dashaFields[id]});
vm.runInContext(extract('const dbYears=', '// Chapter 6.1:'),dashaContext);
const dashaResult=(a,b,lord='ketu')=>{
 dashaFields.dbBhayat.value=a;dashaFields.dbBhavog.value=b;dashaFields.dbLord.value=lord;
 dashaFields.dbCalculate.click();return dashaFields.dbOutput.textContent;
};
assert.match(dashaResult('00/00','60/00'),/७ वर्ष|7 वर्ष/);
assert.match(dashaResult('30/00','60/00','venus'),/10\.0000 वर्ष/);
assert.match(dashaResult('59/59','60/00'),/0\.0019 वर्ष/);
assert.match(dashaResult('60/00','60/00'),/सीमा-क्षण/);
assert.match(dashaResult('60/00','59/59'),/ठूलो/);
assert.match(dashaResult('14/60','60/00'),/सही लेख्नुहोस्/);
// Exercise the website's actual Yogini selector, rather than duplicating its formula.
const yoginiContext = vm.createContext({$: id => ({value: yoginiContext.nakshatra})});
vm.runInContext(extract('function yoginiSelection()', 'function yoginiCycle()'), yoginiContext);
const yoginiIndex = n => {
 yoginiContext.nakshatra = String(n);
 const selection = vm.runInContext('yoginiSelection()', yoginiContext);
 return selection === null ? null : selection.index;
};
assert.equal(yoginiIndex(1),3);
assert.equal(yoginiIndex(5),7); // remainder zero selects Sankata
assert.equal(yoginiIndex(27),5);
assert.equal(yoginiIndex(0),null);
assert.equal(yoginiIndex(28),null);
// Exercise the actual Yogini birth-balance handler with the selected nakshatra.
const yoginiFields={
 ygNak:{value:'5'},ygBhayat:{value:'00/00'},ygBhavog:{value:'60/00'},
 ygBalanceOutput:{textContent:''}
};
const yoginiBalanceContext=vm.createContext({$:id=>yoginiFields[id]});
vm.runInContext(extract('const yoginis=', "for(const id of ['ygNak'"),yoginiBalanceContext);
const yoginiBalanceResult=(nak,a,b)=>{
 yoginiFields.ygNak.value=String(nak);yoginiFields.ygBhayat.value=a;yoginiFields.ygBhavog.value=b;
 vm.runInContext('yoginiBalance()',yoginiBalanceContext);
 return yoginiFields.ygBalanceOutput.textContent;
};
assert.match(yoginiBalanceResult(5,'00/00','60/00'),/सङ्कटा/);
assert.match(yoginiBalanceResult(5,'30/00','60/00'),/4\.0000 वर्ष/);
assert.match(yoginiBalanceResult(5,'60/00','60/00'),/सीमा-क्षण/);
assert.match(yoginiBalanceResult(5,'60/00','59/59'),/ठूलो/);
assert.match(yoginiBalanceResult(28,'00/00','60/00'),/नक्षत्र क्रम/);
console.log('Calculator boundary checks passed (time, ghadi/pala, pada, dasha, Yogini).');
