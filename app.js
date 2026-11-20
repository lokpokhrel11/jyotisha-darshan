'use strict';
const signs=['मेष','वृष','मिथुन','कर्कट','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
const lords=['मङ्गल','शुक्र','बुध','चन्द्र','सूर्य','बुध','शुक्र','मङ्गल','बृहस्पति','शनि','शनि','बृहस्पति'];
const anga=[
 {name:'तिथि',count:'३०',desc:'सूर्य र चन्द्रमाबीचको कोणीय अन्तरका आधारमा निर्धारण हुने चान्द्र दिन।'},
 {name:'वार',count:'७',desc:'सात दिनको क्रम। परम्परागत पञ्चाङ्गमा सूर्योदयलाई दिनको सीमासँग जोडिन्छ।'},
 {name:'नक्षत्र',count:'२७',desc:'चन्द्रमाको राशिचक्रमा रहेको स्थितिसँग सम्बन्धित २७ खण्ड।'},
 {name:'योग',count:'२७',desc:'सूर्य र चन्द्रमाको भोगांशको योगका आधारमा गणना गरिने अङ्ग।'},
 {name:'करण',count:'११ प्रकार',desc:'तिथिको आधा भाग; पञ्चाङ्गमा ११ प्रकारका करण मानिन्छन्।'}
];
const $=id=>document.getElementById(id);
$('year').textContent=new Date().getFullYear();
$('menu').addEventListener('click',()=>{const open=$('nav').classList.toggle('open');$('menu').setAttribute('aria-expanded',String(open));});
$('nav').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{$('nav').classList.remove('open');$('menu').setAttribute('aria-expanded','false');}));
function showAnga(i){$('angaTabs').querySelectorAll('button').forEach((b,j)=>{b.classList.toggle('selected',i===j);b.setAttribute('aria-pressed',String(i===j));});const a=anga[i];$('angaDetail').innerHTML=`<strong>${a.name}</strong> · ${a.count}<p>${a.desc}</p>`;}
anga.forEach((a,i)=>{const b=document.createElement('button');b.textContent=a.name;b.addEventListener('click',()=>showAnga(i));$('angaTabs').append(b);});showAnga(0);
$('openLesson').addEventListener('click',()=>{$('lesson').hidden=false;$('lesson').scrollIntoView({behavior:'smooth',block:'start'});});
$('closeLesson').addEventListener('click',()=>{$('lesson').hidden=true;$('openLesson').focus();});
// Chapter 1 formative assessment. Each item includes its study-note section.
const questions=[
 {unit:'१.१',q:'पञ्चाङ्गका पाँच अङ्गमध्ये कुन पर्दछ?',options:['लग्न','करण','भावेश'],correct:1,why:'तिथि, वार, नक्षत्र, योग र करण पाँच अङ्ग हुन्।'},
 {unit:'१.१',q:'पञ्चाङ्गका पाँच अङ्गमध्ये कुन पर्दैन?',options:['योग','नक्षत्र','दशा'],correct:2,why:'दशा ज्योतिष अध्ययनको विषय हो तर पञ्चाङ्गका पाँच अङ्गमध्ये होइन।'},
 {unit:'१.२',q:'चन्द्रमासमा कुल कति तिथि मानिन्छन्?',options:['१५','३०','२७'],correct:1,why:'शुक्ल र कृष्ण पक्षमा १५–१५ गरी ३० तिथि हुन्छन्।'},
 {unit:'१.२',q:'३० तिथि भए पनि छुट्टाछुट्टै नाम कति छन्?',options:['१५','१६','३०'],correct:1,why:'चौध नाम दुई पक्षमा दोहोरिन्छन्; पूर्णिमा र औँसी छुट्टै हुन्।'},
 {unit:'१.२',q:'पाँचौँ तिथि कुन नन्दादि समूहमा पर्छ?',options:['पूर्णा','जया','रिक्ता'],correct:0,why:'नन्दा, भद्रा, जया, रिक्ता, पूर्णाको पाँच-पाँच क्रम दोहोरिन्छ।'},
 {unit:'१.२क',q:'३६०° लाई ३० तिथिमा बाँड्दा एक तिथिको कोण कति?',options:['१०°','१२°','१३°२०′'],correct:1,why:'३६०° ÷ ३० = १२°।'},
 {unit:'१.२क',q:'एक अंशमा कति कला हुन्छन्?',options:['३०','६०','१००'],correct:1,why:'१ अंश = ६० कला; १ कला = ६० विकला।'},
 {unit:'१.३',q:'परम्परागत वारहरूको संख्या कति?',options:['५','७','९'],correct:1,why:'आइतबारदेखि शनिबारसम्म सात वार हुन्छन्।'},
 {unit:'१.४',q:'मानक गणनामा नक्षत्र कति?',options:['१२','२७','२८'],correct:1,why:'मानक विभाजनमा २७ नक्षत्र; अभिजित छुट्टै सन्दर्भमा आउँछ।'},
 {unit:'१.४',q:'प्रत्येक नक्षत्रमा कति पाउ हुन्छन्?',options:['२','४','६'],correct:1,why:'२७ × ४ = १०८ पाउ।'},
 {unit:'१.४',q:'तिष्य अर्को कुन नक्षत्रको नाम हो?',options:['पुष्य','रोहिणी','रेवती'],correct:0,why:'नोटमा तिष्य/पुष्य एउटै आठौँ नक्षत्रका नाम हुन्।'},
 {unit:'१.५',q:'विष्कुम्भादि योग सूचीमा शुभ कुन क्रममा छ?',options:['२३','२४','२५'],correct:0,why:'२३ शुभ र २४ शुक्ल हुन्।'},
 {unit:'१.६',q:'आनन्दादि योग कति छन्?',options:['२७','२८','३०'],correct:1,why:'आनन्दादि २८ र विष्कुम्भादि २७ योगका अलग सूची हुन्।'},
 {unit:'१.७',q:'करणका प्रकार जम्मा कति छन्?',options:['७','११','१५'],correct:1,why:'सात चर र चार स्थिर गरी ११ प्रकारका करण हुन्छन्।'},
 {unit:'१.८',q:'अयन र ऋतुका संख्या क्रमशः कति?',options:['२ र ६','६ र २','२ र १२'],correct:0,why:'दुई अयन र छ ऋतु मानिन्छन्।'}
];
let questionIndex=0,correctCount=0,answered=false,unitScores={};
function renderQuestion(){
 const q=questions[questionIndex];answered=false;
 $('questionTitle').textContent=q.q;$('quizFeedback').textContent='';
 $('quizProgress').textContent=`प्रश्न ${questionIndex+1} / ${questions.length} · सही ${correctCount} · स्रोत खण्ड ${q.unit}`;
 $('quizOptions').replaceChildren();
 q.options.forEach((option,i)=>{const b=document.createElement('button');b.type='button';b.textContent=option;b.addEventListener('click',()=>{
  if(answered)return;answered=true;const ok=i===q.correct;if(ok)correctCount++;
  if(!unitScores[q.unit])unitScores[q.unit]={right:0,total:0};unitScores[q.unit].total++;if(ok)unitScores[q.unit].right++;
  $('quizFeedback').textContent=(ok?'सही। ':'अहिले सही भएन। ')+q.why;
  $('quizProgress').textContent=`प्रश्न ${questionIndex+1} / ${questions.length} · सही ${correctCount} · स्रोत खण्ड ${q.unit}`;
  $('quizOptions').querySelectorAll('button').forEach(x=>x.disabled=true);
  $('nextQuestion').hidden=questionIndex===questions.length-1;
  if(questionIndex===questions.length-1){
   const passed=correctCount>=12;
   $('quizFeedback').textContent+=` अन्तिम नतिजा: ${correctCount}/${questions.length}। `+(passed?'प्रारम्भिक मूल्याङ्कन पूरा भयो।':'पुनः अध्ययन गरेर प्रयास गर्नुहोस्।');
   $('unitBreakdown').textContent='खण्डअनुसार: '+Object.entries(unitScores).map(([unit,v])=>`${unit}: ${v.right}/${v.total}`).join(' · ');
   $('restartQuiz').hidden=false;
   try{localStorage.setItem('jd-chapter1-v05',JSON.stringify({score:correctCount,total:questions.length,completed:passed,units:unitScores}));}catch(e){}
  }
 });$('quizOptions').append(b);});$('nextQuestion').hidden=true;
}
$('nextQuestion').addEventListener('click',()=>{questionIndex++;renderQuestion()});
$('restartQuiz').addEventListener('click',()=>{questionIndex=0;correctCount=0;unitScores={};$('restartQuiz').hidden=true;$('unitBreakdown').textContent='';renderQuestion()});
try{const prev=JSON.parse(localStorage.getItem('jd-chapter1-v05')||'null');if(prev){$('savedProgress').textContent=`अघिल्लो अभ्यास: ${prev.score}/${prev.total} · ${prev.completed?'मापदण्ड पूरा':'पुनः अभ्यास आवश्यक'}`;}}catch(e){}
renderQuestion();
// Chapter 1 expanded learning tools. Angles are hypothetical teaching inputs.
const tithiGroups=['नन्दा','भद्रा','जया','रिक्ता','पूर्णा'];
for(let i=1;i<=15;i++)$('tithiNumber').add(new Option(`${i} औँ तिथि`,String(i)));
function showTithiGroup(){const n=Number($('tithiNumber').value);$('tithiGroupResult').textContent=`${n} औँ तिथि: ${tithiGroups[(n-1)%5]} समूह।`;}
$('tithiNumber').addEventListener('change',showTithiGroup);showTithiGroup();
function validAngle(id){const v=Number($(id).value);return $(id).value.trim()!==''&&Number.isFinite(v)&&v>=0&&v<360?v:null;}
$('nakCalculate').addEventListener('click',()=>{
 const d=validAngle('nakDegree');if(d===null){$('nakResult').textContent='० देखि ३६० भन्दा कम अंश लेख्नुहोस्।';return;}
 const n=Math.floor(d/(360/27))+1;const pad=Math.floor((d-(n-1)*(360/27))/(360/108))+1;
 $('nakResult').textContent=`नक्षत्र क्रम ${Math.min(n,27)} · पाउ ${Math.min(pad,4)}। यो २७ नक्षत्रको समान खण्डमा आधारित अभ्यास हो।`;
});
$('tithiCalculate').addEventListener('click',()=>{
 const sun=validAngle('sunLongitude'),moon=validAngle('moonLongitude');
 if(sun===null||moon===null){$('tithiCalcResult').textContent='दुवै भोगांश ० देखि ३६० भन्दा कम हुनुपर्छ।';return;}
 const diff=(moon-sun+360)%360;const idx=Math.floor(diff/12);const paksha=idx<15?'शुक्ल':'कृष्ण';
 const n=idx%15+1;const names=['प्रतिपदा','द्वितीया','तृतीया','चतुर्थी','पञ्चमी','षष्ठी','सप्तमी','अष्टमी','नवमी','दशमी','एकादशी','द्वादशी','त्रयोदशी','चतुर्दशी'];
 const name=n===15?(paksha==='शुक्ल'?'पूर्णिमा':'औँसी'):names[n-1];
 const nearest=Math.round(diff/12)*12;const boundary=Math.abs(diff-nearest)<1e-9;
 $('tithiCalcResult').textContent=boundary?`अन्तर ${diff.toFixed(2)}° · यो १२° को ठीक सीमा हो। ${diff===0?'०° औँसीको सन्दर्भबिन्दु हो। ':diff===180?'१८०° पूर्णिमाको सन्दर्भबिन्दु हो। ':''}सीमापछि सुरु हुने तिथि: ${paksha} ${name}। वास्तविक पञ्चाङ्गमा सटीक समयसहित जाँच गर्नुहोस्।`:`अन्तर ${diff.toFixed(2)}° · ${paksha} पक्ष · ${name} (तिथि ${n})।`;
});
// Source-verified Chapter 1 lists (PDF pp. 8–10).
const nakNames=['अश्विनी','भरणी','कृत्तिका','रोहिणी','मृगशिरा','आर्द्रा','पुनर्वसु','पुष्य (तिष्य)','आश्लेषा','मघा','पूर्वाफाल्गुनी','उत्तराफाल्गुनी','हस्त','चित्रा','स्वाती','विशाखा','अनुराधा','ज्येष्ठा','मूल','पूर्वाषाढा','उत्तराषाढा','श्रवण','धनिष्ठा','शतभिषा','पूर्वाभाद्रपदा','उत्तराभाद्रपदा','रेवती'];
const nakLords=['केतु (७)','शुक्र (२०)','सूर्य (६)','चन्द्र (१०)','मङ्गल (७)','राहु (१८)','बृहस्पति (१६)','शनि (१९)','बुध (१७)'];
const ntable=document.createElement('div');ntable.className='nak-grid';nakNames.forEach((n,i)=>{const e=document.createElement('div');e.textContent=`${i+1}. ${n} · ${nakLords[i%9]}`;ntable.append(e);});$('nakshatraTable').append(ntable);
const yogas27=['विष्कुम्भ','प्रीति','आयुष्मान्','सौभाग्य','शोभन','अतिगण्ड','सुकर्मा','धृति','शूल','गण्ड','वृद्धि','ध्रुव','व्याघात','हर्षण','वज्र','सिद्धि','व्यतीपात','वरीयान्','परिघ','शिव','सिद्ध','साध्य','शुभ','शुक्ल','ब्रह्म','ऐन्द्र','वैधृति'];
const yogas28=['आनन्द','कालदण्ड','धूम्र','धाता','सौम्य','ध्वाङ्क्ष','ध्वज','श्रीवत्स','वज्र','मुद्गर','छत्र','मित्र','मानस','पद्म','लुम्ब','उत्पात','मृत्यु','काण','सिद्धि','शुभ','अमृत','मुसल','गद','मातङ्ग','राक्षस','चर','स्थिर','वर्धमान'];
$('yoga27').textContent=yogas27.map((x,i)=>`${i+1}. ${x}`).join(' · ');
$('yoga28').textContent=yogas28.map((x,i)=>`${i+1}. ${x}`).join(' · ');
const lagna=$('lagna'),bhava=$('bhava');signs.forEach((s,i)=>lagna.add(new Option(`${i+1} · ${s}`,String(i+1))));for(let i=1;i<=12;i++)bhava.add(new Option(`${i} औँ भाव`,String(i)));lagna.value='5';bhava.value='9';
// Fixed North Indian chart houses: 1 top diamond, 4 left diamond, 7 bottom diamond, 10 right diamond.
// Other houses occupy the corner triangles. Labels are at approximate visual centers.
const houseCenters=[[200,91],[105,51],[51,106],[92,200],[51,293],[106,348],[200,309],[294,348],[349,294],[309,200],[349,106],[294,51]];
const roman=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
let selectedHouse=1;
function updateChart(){
 const l=Number(lagna.value),g=$('chartLabels');g.replaceChildren();
 houseCenters.forEach(([x,y],i)=>{
  const n=i+1,r=(l+i-1)%12+1;
  const group=document.createElementNS('http://www.w3.org/2000/svg','g');
  group.setAttribute('role','button');group.setAttribute('tabindex','0');
  group.setAttribute('aria-label',`${n} औँ भाव, ${signs[r-1]} राशि`);
  group.setAttribute('class','chart-house'+(n===selectedHouse?' selected':''));
  const hit=document.createElementNS('http://www.w3.org/2000/svg','circle');
  hit.setAttribute('cx',x);hit.setAttribute('cy',y-5);hit.setAttribute('r',28);hit.setAttribute('fill','transparent');
  const t=document.createElementNS('http://www.w3.org/2000/svg','text');
  t.setAttribute('x',x);t.setAttribute('y',y);t.setAttribute('font-size','19');t.textContent=String(r);
  const sub=document.createElementNS('http://www.w3.org/2000/svg','text');
  sub.setAttribute('x',x);sub.setAttribute('y',y+14);sub.setAttribute('font-size','10');sub.textContent=roman[i];
  group.append(hit,t,sub);
  const select=()=>{selectedHouse=n;updateChart();};
  group.addEventListener('click',select);
  group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}});
  g.append(group);
 });
 const r=(l+selectedHouse-2)%12+1;
 $('chartSelection').textContent=`भाव ${selectedHouse} (${roman[selectedHouse-1]}) · राशि ${r} (${signs[r-1]}) · स्वामी ${lords[r-1]} · ${[1,4,7,10].includes(selectedHouse)?'केन्द्र':([5,9].includes(selectedHouse)?'त्रिकोण':([6,8,12].includes(selectedHouse)?'दुःस्थान':'अन्य भाव'))}`;
}
function calculate(){const l=Number(lagna.value),h=Number(bhava.value),idx=(l+h-2)%12;$('result').textContent=`${h} औँ भावमा ${idx+1} नम्बरको ${signs[idx]} राशि पर्छ। यसको स्वामी ${lords[idx]} हो।`;updateChart();}
$('calculate').addEventListener('click',calculate);lagna.addEventListener('change',()=>{$('result').textContent='लग्न परिवर्तन भयो। नयाँ नतिजा हेर्न गणना गर्नुहोस्।';updateChart();});bhava.addEventListener('change',()=>{$('result').textContent='राशि पत्ता लगाउनुहोस् बटन थिच्नुहोस्।';});$('newExample').addEventListener('click',()=>{lagna.value=String(Math.floor(Math.random()*12)+1);bhava.value=String(Math.floor(Math.random()*12)+1);$('result').textContent='नयाँ उदाहरण छानियो। पहिले आफैँ गणना गर्नुहोस्।';updateChart();});
updateChart();
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}


// Chapter 2: source-aligned introductory exercises (Guruji notes, pp. 10–15).
const meanings=['शरीर, स्वभाव','धन, आफन्त','साहस, भाइबहिनी','आमा, घर','सन्तान, विद्या','रोग, शत्रु','विवाह, विदेश','मृत्यु, अवरोध','धर्म, भाग्य','बुबा, कर्म','आय, लाभ','खर्च, विदेश'];
for(const id of ['reverseLagna','reverseRashi']){const sel=$(id);signs.forEach((s,i)=>sel.add(new Option(`${i+1} · ${s}`,String(i+1))));}
for(let i=1;i<=12;i++)$('houseMeaning').add(new Option(`${i} औँ भाव`,String(i)));
function updateHouseMeaning(){const n=Number($('houseMeaning').value);$('houseMeaningResult').textContent=`${n} औँ भाव: ${meanings[n-1]}।`;}
$('houseMeaning').addEventListener('change',updateHouseMeaning);updateHouseMeaning();
$('reverseLagna').value='5';$('reverseRashi').value='9';
function reverseCalculate(){const l=Number($('reverseLagna').value),r=Number($('reverseRashi').value);const n=(r-l+12)%12+1;$('reverseResult').textContent=`${signs[r-1]} (${r}) राशि ${n} औँ भावमा पर्छ। गणना: (${r} − ${l} + १२) mod १२ + १ = ${n}।`;}
$('reverseCalculate').addEventListener('click',reverseCalculate);
for(const id of ['reverseLagna','reverseRashi'])$(id).addEventListener('change',()=>{$('reverseResult').textContent='चयन परिवर्तन भयो। नयाँ नतिजाका लागि गणना गर्नुहोस्।';});
reverseCalculate();


// Guruji's nine-planet exaltation teaching chart, source PDF p. 12.
// This is a synthetic exercise, NOT a natal or astronomical chart.
const exaltedPlanets=[
 {name:'सूर्य',house:1},{name:'चन्द्र',house:2},{name:'राहु',house:3},
 {name:'बृहस्पति',house:4},{name:'बुध',house:6},{name:'शनि',house:7},
 {name:'केतु',house:9},{name:'मङ्गल',house:10},{name:'शुक्र',house:12}
];
const exaltedByHouse=Object.fromEntries(exaltedPlanets.map(p=>[p.house,p.name]));
const ep=$('exaltedPlanet');exaltedPlanets.forEach((p,i)=>ep.add(new Option(p.name,String(i))));
let showExalted=false;
function drawExalted(){const g=$('exaltedChartLabels');g.replaceChildren();houseCenters.forEach(([x,y],i)=>{
 const n=i+1;const a=document.createElementNS('http://www.w3.org/2000/svg','text');a.setAttribute('x',x);a.setAttribute('y',y-5);a.setAttribute('font-size','18');a.textContent=String(n);g.append(a);
 const b=document.createElementNS('http://www.w3.org/2000/svg','text');b.setAttribute('x',x);b.setAttribute('y',y+10);b.setAttribute('font-size','10');b.textContent=roman[i];g.append(b);
 if(showExalted&&exaltedByHouse[n]){const c=document.createElementNS('http://www.w3.org/2000/svg','text');c.setAttribute('x',x);c.setAttribute('y',y+23);c.setAttribute('font-size','11');c.textContent=exaltedByHouse[n];g.append(c);}
});}
function revealExalted(){const p=exaltedPlanets[Number(ep.value)];$('exaltedResult').textContent=`${p.name}: ${p.house} औँ भाव, ${signs[p.house-1]} राशि (${p.house})। उच्च कुण्डलीको शिक्षण उदाहरण।`;}
$('exaltedReveal').addEventListener('click',revealExalted);
ep.addEventListener('change',()=>{$('exaltedResult').textContent='ग्रह फेरियो। उत्तर देखाउनुहोस्।';});
$('exaltedToggle').addEventListener('click',()=>{showExalted=!showExalted;$('exaltedToggle').setAttribute('aria-pressed',String(showExalted));$('exaltedToggle').textContent=showExalted?'चार्टका ग्रह लुकाउनुहोस्':'चार्टमा सबै ग्रह देखाउनुहोस्';drawExalted();});
drawExalted();


// v1.0 Chapter 2 formative assessment, sourced from Guruji notes pp. 11–15.
const chapter2Questions=[
 ['२.१','उत्तर भारतीय कुण्डलीमा पहिलो भाव कहाँ हुन्छ?',['माथि बीचको हीरा','बायाँ बीचको हीरा','तल बीचको हीरा'],0,'पहिलो भाव माथि बीचको ठूलो हीरामा हुन्छ।'],
 ['२.१','चौथो भाव कहाँ हुन्छ?',['दायाँ बीच','बायाँ बीच','तल बीच'],1,'चौथो भाव बायाँ बीचको हीरा हो।'],
 ['२.१','सातौँ भाव कहाँ हुन्छ?',['माथि बीच','तल बीच','दायाँ बीच'],1,'सातौँ भाव तल बीचको हीरा हो।'],
 ['२.१','दशौँ भाव कहाँ हुन्छ?',['दायाँ बीच','बायाँ बीच','माथि बीच'],0,'दशौँ भाव दायाँ बीचको हीरा हो।'],
 ['२.१','दोस्रो भावको स्थान कुन हो?',['माथि दायाँ त्रिकोण','माथि बायाँ त्रिकोण','तल बायाँ त्रिकोण'],1,'दोस्रो भाव माथि बायाँ त्रिकोण हो।'],
 ['२.२','कुण्डलीभित्रको ५ अङ्कले सामान्यतः के जनाउँछ?',['पाँचौँ भाव','सिंह राशि','सूर्य ग्रह त्यहीँ बसेको'],1,'अङ्क ५ सिंह राशि हो; सूर्यको स्वामित्व र सूर्यको उपस्थिति एउटै होइनन्।'],
 ['२.२','भावको स्थान कुन अवस्थामा बदलिन्छ?',['लग्न बदलिँदा','ग्रह बदलिँदा','उत्तर भारतीय चार्टमा बदलिँदैन'],2,'उत्तर भारतीय शैलीमा भावको स्थान स्थिर रहन्छ।'],
 ['२.३','वृश्चिक राशिको स्वामी को हो?',['मङ्गल','बुध','शुक्र'],0,'राशि १ र ८ मङ्गलका घर हुन्।'],
 ['२.३','धनु राशिको स्वामी को हो?',['शनि','बृहस्पति','चन्द्र'],1,'राशि ९ र १२ बृहस्पतिका घर हुन्।'],
 ['२.३','राहु र केतुका राशिस्वामी सम्बन्धमा यस पाठको नियम कुन हो?',['दुवैका दुई-दुई घर छन्','यस तहमा आफ्ना घर मानिँदैनन्','दुवै सिंहका स्वामी हुन्'],1,'यस पाठमा राहु र केतुको घर हुँदैन भनिएको छ।'],
 ['२.४','सिंह लग्नमा पहिलो भावमा कुन राशि हुन्छ?',['मेष','सिंह','कन्या'],1,'लग्न राशि नै पहिलो भावमा रहन्छ।'],
 ['२.४','सिंह लग्नमा नवौँ भावमा कुन राशि पर्छ?',['मेष','मीन','धनु'],0,'५ + ९ − १ = १३, १२ घटाउँदा १ अर्थात् मेष।'],
 ['२.४','सिंह लग्नमा धनु राशिमा बसेको ग्रह कुन भावमा हुन्छ?',['पाँचौँ','नवौँ','दोस्रो'],0,'९ − ५ + १ = ५।'],
 ['२.४','वृश्चिक लग्नमा छैटौँ भावमा कुन राशि हुन्छ?',['मेष','मीन','मिथुन'],0,'८ + ६ − १ = १३ → १, मेष।'],
 ['२.५','सन्तान र विद्या कुन भावका मुख्य शब्द हुन्?',['तेस्रो','पाँचौँ','आठौँ'],1,'यस पाठको प्रारम्भिक तालिकामा पाँचौँ भाव सन्तान र विद्यासँग जोडिएको छ।'],
 ['२.५','केन्द्र भावहरूको सही समूह कुन हो?',['१, ४, ७, १०','१, ५, ९','६, ८, १२'],0,'यस पाठका चार केन्द्र १, ४, ७, १० हुन्।'],
 ['२.५','यस पाठमा त्रिकोण कुन भावलाई भन्नुभएको छ?',['१, ५, ९','५, ९','४, ७, १०'],1,'यो स्रोतको विशिष्ट सूची हो: ५ र ९।'],
 ['उच्च कुण्डली','मेष लग्नको शिक्षण उच्च कुण्डलीमा बृहस्पति कहाँ छ?',['चौथो भाव कर्कट','नवौँ भाव धनु','दशौँ भाव मकर'],0,'स्रोतको चित्रमा बृहस्पति कर्कट अर्थात् चौथो भावमा छ।'],
 ['उच्च कुण्डली','यस शिक्षण उच्च कुण्डलीमा कुन भाव खाली छ?',['पाँचौँ','सातौँ','दशौँ'],0,'पाँचौँ, आठौँ र एघारौँ भाव खाली छन्।'],
 ['उच्च कुण्डली','यस शिक्षण उच्च कुण्डलीमा मङ्गल कहाँ छ?',['पहिलो भाव मेष','दशौँ भाव मकर','छैटौँ भाव कन्या'],1,'मङ्गल मकर राशिमा दशौँ भावमा छ।']
];
const examForm=$('chapter2ExamForm'),examQuestions=$('chapter2ExamQuestions'),examResults=$('examResults');
function renderChapter2Exam(){examQuestions.replaceChildren();chapter2Questions.forEach((q,i)=>{const fs=document.createElement('fieldset');fs.className='exam-question';const lg=document.createElement('legend');lg.textContent=`${i+1}. [${q[0]}] ${q[1]}`;fs.append(lg);q[2].forEach((answer,j)=>{const label=document.createElement('label');label.className='exam-option';const radio=document.createElement('input');radio.type='radio';radio.name=`chapter2q${i}`;radio.value=String(j);label.append(radio,document.createTextNode(' '+answer));fs.append(label);});examQuestions.append(fs);});examResults.hidden=true;examResults.replaceChildren();updateChapter2Progress();}
function updateChapter2Progress(){let done=0;chapter2Questions.forEach((q,i)=>{if(examForm.querySelector(`input[name="chapter2q${i}"]:checked`))done++;});$('examProgress').textContent=`उत्तर दिइएका: ${done}/${chapter2Questions.length}`;}
examForm.addEventListener('change',updateChapter2Progress);
examForm.addEventListener('submit',event=>{event.preventDefault();const answers=chapter2Questions.map((q,i)=>examForm.querySelector(`input[name="chapter2q${i}"]:checked`));if(answers.some(a=>!a)){examResults.hidden=false;examResults.textContent='कृपया सबै २० प्रश्नको उत्तर दिनुहोस्।';return;}let score=0;const summary=document.createElement('div');const title=document.createElement('h3');chapter2Questions.forEach((q,i)=>{const chosen=Number(answers[i].value);const ok=chosen===q[3];if(ok)score++;const p=document.createElement('p');p.textContent=`${i+1}. ${ok?'✓ सही':'✗ सुधार'} · ${q[4]}${ok?'':` सही उत्तर: ${q[2][q[3]]}।`}`;summary.append(p);});title.textContent=`नतिजा: ${score}/20 · ${score>=16?'अभ्यास लक्ष्य पूरा':'पुनः अभ्यास सिफारिस'}`;examResults.replaceChildren(title,summary);examResults.hidden=false;try{localStorage.setItem('jyotisha-chapter2-score',JSON.stringify({score,total:20}));}catch(e){}examResults.scrollIntoView({behavior:'smooth',block:'start'});});
// Shuffle the question objects together with their answer keys and explanations.
// Reject an unchanged order so every reset visibly changes the sequence.
function reshuffleChapter2Questions(){
  const previous=chapter2Questions.slice();
  for(let i=chapter2Questions.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [chapter2Questions[i],chapter2Questions[j]]=[chapter2Questions[j],chapter2Questions[i]];
  }
  if(chapter2Questions.every((q,i)=>q===previous[i])){
    [chapter2Questions[0],chapter2Questions[1]]=[chapter2Questions[1],chapter2Questions[0]];
  }
}
$('examReset').addEventListener('click',()=>{
  examForm.reset();
  reshuffleChapter2Questions();
  renderChapter2Exam();
  // Return to the beginning so the cleared selections are immediately visible.
  const firstQuestion=examQuestions.querySelector('fieldset');
  if(firstQuestion){firstQuestion.setAttribute('tabindex','-1');firstQuestion.focus({preventScroll:true});firstQuestion.scrollIntoView({behavior:'smooth',block:'start'});}
});
renderChapter2Exam();

// Chapter 3: explicitly mapped to Guruji's 117-page notes, PDF pp. 16–20.
const navagraha=['सूर्य','चन्द्र','मङ्गल','बुध','बृहस्पति','शुक्र','शनि','राहु','केतु'];
const planetTraitsData=[
'हड्डी, मुटु, राजनीति, दाहिने आँखा, अग्नितत्त्व, बुबा',
'आमा, मन, सुख, पानी, खानेकुरा, देब्रे आँखा',
'भाइबहिनी, हतियार, रगत, घरजग्गा, साहस',
'गणित, बोली, लेखन, मामा, छाला, तर्क',
'धर्म, ज्ञान, सन्तान, उच्चशिक्षा, उपदेश, नैतिकता',
'दाम्पत्य सुख, सङ्गीत, गायन, रेटिना',
'अनुशासन, सेवा, फलाम, ढिलाइ, कठिन परिश्रम',
'प्रविधि, जिद्दी, कुतर्क, भाइरस, विषालु प्राणी',
'पुरानो ज्ञान, सीप, पेशा, मोक्ष'];
const planetDignities=[
{own:[5],ex:1,deb:7},{own:[4],ex:2,deb:8},{own:[1,8],ex:10,deb:4},
{own:[3,6],ex:6,deb:12},{own:[9,12],ex:4,deb:10},{own:[2,7],ex:12,deb:6},
{own:[10,11],ex:7,deb:1},{own:[],ex:3,deb:null},{own:[],ex:9,deb:null}];
for(const id of ['planetSelect','planetStatus','aspectPlanet'])navagraha.forEach((n,i)=>$(id).add(new Option(n,String(i))));
signs.forEach((n,i)=>$('planetSign').add(new Option(`${i+1} · ${n}`,String(i+1))));
for(let n=1;n<=12;n++)$('aspectHouse').add(new Option(`${n} औँ भाव`,String(n)));
function showPlanetTraits(){const i=Number($('planetSelect').value);$('planetTraits').textContent=`${navagraha[i]}: ${planetTraitsData[i]}। `;}
$('planetSelect').addEventListener('change',showPlanetTraits);showPlanetTraits();
function checkPlanetStatus(){const i=Number($('planetStatus').value),r=Number($('planetSign').value),d=planetDignities[i];const matches=[];if(d.ex===r)matches.push('उच्च');if(d.own.includes(r))matches.push('स्वगृही');if(d.deb===r)matches.push('नीच');const status=matches.length?matches.join(' र '):'उच्च, नीच वा स्वगृहीमध्ये कुनै होइन';const note=d.deb===null?' यस ग्रहको नीच राशि स्रोतमा उल्लेख छैन।':'';$('planetStatusResult').textContent=`${navagraha[i]} · ${signs[r-1]}: ${status}।${note}`;}
$('checkPlanetStatus').addEventListener('click',checkPlanetStatus);
for(const id of ['planetStatus','planetSign'])$(id).addEventListener('change',()=>{$('planetStatusResult').textContent='चयन परिवर्तन भयो। अवस्था हेर्नुहोस्।';});checkPlanetStatus();
const aspectOffsets={2:[4,7,8],4:[5,7,9],6:[3,7,10]};
function calculateAspects(){const i=Number($('aspectPlanet').value),house=Number($('aspectHouse').value);if(i>=7){$('aspectResult').textContent='राहु–केतुको दृष्टि यस नोटमा स्पष्ट नभएकाले गणना स्थगित छ। [पुष्टि गर्नुपर्ने]';return;}const offsets=aspectOffsets[i]||[7];const houses=offsets.map(n=>((house+n-2)%12)+1);$('aspectResult').textContent=`${navagraha[i]} ${house} औँ भावमा हुँदा ${offsets.join(', ')} औँ दृष्टि क्रमशः ${houses.join(', ')} भावमा पर्छ। बसेको भावलाई १ मानेर गनिएको हो।`;}
$('aspectCalculate').addEventListener('click',calculateAspects);
for(const id of ['aspectPlanet','aspectHouse'])$(id).addEventListener('change',()=>{$('aspectResult').textContent='चयन परिवर्तन भयो। फेरि गणना गर्नुहोस्।';});calculateAspects();
const friendships=[
['चन्द्र, मङ्गल, बृहस्पति','बुध','शुक्र, शनि'],['सूर्य, बुध','मङ्गल, बृहस्पति, शुक्र, शनि','कोही छैन'],
['सूर्य, चन्द्र, बृहस्पति','शुक्र, शनि','बुध'],['सूर्य, शुक्र','मङ्गल, बृहस्पति, शनि','चन्द्र'],
['सूर्य, चन्द्र, मङ्गल','शनि','बुध, शुक्र'],['बुध, शनि','मङ्गल, बृहस्पति','सूर्य, चन्द्र'],
['बुध, शुक्र','बृहस्पति','सूर्य, चन्द्र, मङ्गल']];
$('planetFriendship').textContent=friendships.map((a,i)=>`${navagraha[i]} — मित्र: ${a[0]}; सम: ${a[1]}; शत्रु: ${a[2]}।`).join(' ');


// Chapter 3 formative quiz: question objects retain keys when shuffled.
const chapter3Bank = [["३.१", "परम्परागत कारकत्वमा मन र आमासँग कुन ग्रह जोडिन्छ?", ["चन्द्र", "शनि", "मङ्गल"], 0, "चन्द्रका कारकत्वमा आमा र मन उल्लेख छन्।"], ["३.१", "गणित, बोली र लेखनको कारक ग्रह कुन हो?", ["शुक्र", "बुध", "सूर्य"], 1, "बुधसँग गणित, बोली र लेखन जोडिन्छन्।"], ["३.१", "साहस र भाइबहिनीको कारकत्व कुन ग्रहसँग जोडिन्छ?", ["बृहस्पति", "चन्द्र", "मङ्गल"], 2, "मङ्गलको कारकत्वमा साहस र भाइबहिनी छन्।"], ["३.१", "धर्म, ज्ञान र उच्चशिक्षा कुन ग्रहका कारकत्व हुन्?", ["बृहस्पति", "राहु", "शनि"], 0, "बृहस्पतिका कारकत्वमा धर्म, ज्ञान र उच्चशिक्षा उल्लेख छन्।"], ["३.४", "सूर्य कुन राशिमा उच्च मानिन्छ?", ["सिंह", "मेष", "तुला"], 1, "सूर्य मेषमा उच्च र तुलामा नीच मानिन्छ।"], ["३.४", "चन्द्रको नीच राशि कुन हो?", ["वृश्चिक", "कर्कट", "वृष"], 0, "चन्द्र वृषमा उच्च र वृश्चिकमा नीच मानिन्छ।"], ["३.४", "मङ्गल कुन राशिमा उच्च मानिन्छ?", ["मेष", "कर्कट", "मकर"], 2, "मङ्गल मकरमा उच्च र कर्कटमा नीच मानिन्छ।"], ["३.४", "बुधका लागि उच्च र स्वगृही दुवै हुने राशि कुन हो?", ["मिथुन", "कन्या", "मीन"], 1, "कन्या बुधको उच्च र स्वगृही दुवै राशि हो।"], ["३.४", "बृहस्पतिको उच्च राशि कुन हो?", ["कर्कट", "धनु", "मीन"], 0, "बृहस्पति कर्कटमा उच्च मानिन्छ।"], ["३.४", "शुक्र कुन राशिमा नीच मानिन्छ?", ["तुला", "मीन", "कन्या"], 2, "शुक्र कन्यामा नीच र मीनमा उच्च मानिन्छ।"], ["३.४", "यस पाठमा राहुको नीच राशि कुन भनिएको छ?", ["धनु", "निश्चित उल्लेख छैन", "मिथुन"], 1, "आधार तालिकामा राहुको नीच राशि उल्लेख छैन।"], ["३.६", "मङ्गलका विशेष दृष्टि कुन हुन्?", ["४, ७, ८", "५, ७, ९", "३, ७, १०"], 0, "मङ्गलले आफू बसेको स्थानबाट ४, ७ र ८ औँ स्थान हेर्छ।"], ["३.६", "बृहस्पतिका दृष्टि कुन हुन्?", ["३, ७, १०", "५, ७, ९", "४, ७, ८"], 1, "बृहस्पतिका दृष्टि ५, ७ र ९ हुन्।"], ["३.६", "शनि चौथो भावमा भए कुन भावमा दृष्टि पर्छ?", ["५, ९, ११", "४, ७, १०", "६, १०, १"], 2, "चौथो भावबाट शनि ३, ७, १० गन्दा भाव ६, १०, १ पर्छन्।"], ["३.६", "राहु र केतुको दृष्टि गणना किन समावेश गरिएको छैन?", ["स्रोतमा अर्थ स्पष्ट छैन", "दुवै सातौँ मात्र हेर्छन्", "दुवैको दृष्टि ४, ७, ८ हुन्छ"], 0, "आधार नोटमा 'आफैँमा' को अर्थ अस्पष्ट भएकाले गणना रोकिएको छ।"]];
const chapter3Form=$('chapter3ExamForm'),chapter3Container=$('chapter3ExamQuestions'),chapter3Results=$('chapter3Results');
function renderChapter3(){chapter3Container.replaceChildren();chapter3Bank.forEach((q,i)=>{const fs=document.createElement('fieldset');fs.className='exam-question';const legend=document.createElement('legend');legend.textContent=`${i+1}. [${q[0]}] ${q[1]}`;fs.append(legend);q[2].forEach((a,j)=>{const label=document.createElement('label');label.className='exam-option';const input=document.createElement('input');input.type='radio';input.name=`ch3q${i}`;input.value=String(j);label.append(input,document.createTextNode(' '+a));fs.append(label);});chapter3Container.append(fs);});chapter3Results.hidden=true;chapter3Results.replaceChildren();updateChapter3Progress();}
function updateChapter3Progress(){let count=0;chapter3Bank.forEach((q,i)=>{if(chapter3Form.querySelector(`input[name="ch3q${i}"]:checked`))count++;});$('chapter3Progress').textContent=`उत्तर दिइएका: ${count}/${chapter3Bank.length}`;}
chapter3Form.addEventListener('change',updateChapter3Progress);
chapter3Form.addEventListener('submit',event=>{event.preventDefault();const answers=chapter3Bank.map((q,i)=>chapter3Form.querySelector(`input[name="ch3q${i}"]:checked`));if(answers.some(a=>!a)){chapter3Results.textContent='कृपया सबै १५ प्रश्नको उत्तर दिनुहोस्।';chapter3Results.hidden=false;chapter3Results.scrollIntoView({behavior:'smooth',block:'start'});return;}let score=0;const summary=document.createElement('div');chapter3Bank.forEach((q,i)=>{const ok=Number(answers[i].value)===q[3];if(ok)score++;const line=document.createElement('p');line.textContent=`${i+1}. ${ok?'✓ सही':'✗ सुधार'} · ${q[4]}${ok?'':` सही उत्तर: ${q[2][q[3]]}।`}`;summary.append(line);});const heading=document.createElement('h3');heading.textContent=`नतिजा: ${score}/15 · ${score>=12?'अभ्यास लक्ष्य पूरा':'पुनः अभ्यास सिफारिस'}`;chapter3Results.replaceChildren(heading,summary);chapter3Results.hidden=false;try{localStorage.setItem('jyotisha-chapter3-score',JSON.stringify({score,total:15}));}catch(e){}chapter3Results.scrollIntoView({behavior:'smooth',block:'start'});});
$('chapter3Reset').addEventListener('click',()=>{const prev=chapter3Bank.slice();for(let i=chapter3Bank.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[chapter3Bank[i],chapter3Bank[j]]=[chapter3Bank[j],chapter3Bank[i]];}if(chapter3Bank.every((q,i)=>q===prev[i]))[chapter3Bank[0],chapter3Bank[1]]=[chapter3Bank[1],chapter3Bank[0]];chapter3Form.reset();renderChapter3();const first=chapter3Container.querySelector('fieldset');if(first){first.setAttribute('tabindex','-1');first.focus({preventScroll:true});first.scrollIntoView({behavior:'smooth',block:'start'});}});
renderChapter3();

// Chapter 4 unit conversion: integer seconds preserve exact vipala values.
$('ch4Calculate').addEventListener('click',()=>{
 const hr=Number($('ch4Hours').value),mn=Number($('ch4Minutes').value),out=$('ch4Output');
 if(!$('ch4Hours').value||!$('ch4Minutes').value||!Number.isInteger(hr)||!Number.isInteger(mn)||hr<0||hr>23||mn<0||mn>59){out.textContent='कृपया ०–२३ घण्टा र ०–५९ मिनेटको पूर्ण सङ्ख्या दिनुहोस्।';return;}
 const totalVipala=(hr*60+mn)*150; // 1 minute = 2.5 pala = 150 vipala
 const ghadi=Math.floor(totalVipala/3600),pala=Math.floor(totalVipala%3600/60),vipala=totalVipala%60;
 out.textContent=`${hr} घण्टा ${mn} मिनेट = ${ghadi} घडी ${pala} पला ${vipala} विपला। जाँच: ${(hr*60+mn)} मिनेट × २.५ पला प्रति मिनेट।`;
});
$('ch4Calculate').click();

// Chapter 4.3: local-sunrise-only teaching calculator, no location data collected.
function istSeconds(v){const m=/^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(v||'');if(!m)return null;const a=m.slice(1).map(x=>x===undefined?0:Number(x));if(a[0]>23||a[1]>59||a[2]>59)return null;return a[0]*3600+a[1]*60+a[2];}
$('istCalculate').addEventListener('click',()=>{
 const birth=istSeconds($('istBirth').value),sun=istSeconds($('istSunrise').value),previous=$('istPrevious').value==='previous',out=$('istOutput');
 if(birth===null||sun===null){out.textContent='कृपया दुवै समय सही ढाँचामा दिनुहोस्।';return;}
 if(!previous&&birth<sun){out.textContent='जन्म समय सूर्योदयभन्दा अघि छ। अघिल्लो दिनको स्थानीय सूर्योदय प्रविष्ट गरी त्यसको विकल्प छान्नुहोस्।';return;}
 if(previous&&birth>=sun){out.textContent='अघिल्लो दिनको सूर्योदय विकल्पमा जन्मसमय आजको सूर्योदयअघिको हुनुपर्छ। सही सूर्योदय समय पुष्टि गर्नुहोस्।';return;}
 const elapsed=birth-sun+(previous?86400:0);
 const totalVipala=elapsed*2.5; // 1 second of clock time = 2.5 vipala
 const ghadi=Math.floor(totalVipala/3600),pala=Math.floor((totalVipala%3600)/60),vipala=totalVipala%60;
 out.textContent=`बितेको समय: ${Math.floor(elapsed/3600)} घण्टा ${Math.floor(elapsed%3600/60)} मिनेट ${elapsed%60} सेकेन्ड। इष्टकाल = ${ghadi} घडी ${pala} पला ${Number(vipala.toFixed(2))} विपला।`;
});
$('istCalculate').click();

// Chapter 4 local sunrise, minute-rounded signed offset per study notes.
$('lsCalculate').addEventListener('click',()=>{
 const t=$('lsCalendar').value,m=/^([+-])(\d{1,2}):(\d{2})$/.exec($('lsOffset').value.trim()),out=$('lsResult');
 const calendar=istSeconds(t);
 if(calendar===null||!m||Number(m[2])>59||Number(m[3])>59){out.textContent='पात्रोको समय र वेलान्तर जाँच्नुहोस्। वेलान्तरको ढाँचा +07:16 वा -07:52 हो।';return;}
 const signed=(m[1]==='-'?-1:1),rounded=Number(m[2])+(Number(m[3])>=30?1:0);
 const adjusted=Math.round(calendar/60)-4-signed*rounded;
 if(adjusted<0||adjusted>=1440){out.textContent='यस अभ्यासको मान्य दायराबाहिर समय आयो। पात्रोको सूर्योदय र वेलान्तर पुनः जाँच्नुहोस्।';return;}
 const hh=String(Math.floor(adjusted/60)).padStart(2,'0'),mm=String(adjusted%60).padStart(2,'0');
 out.textContent=`वेलान्तर ${m[1]}${rounded} मिनेट (गोलाकार)। पात्रोको सूर्योदय − ४ मिनेट − (${m[1]}${rounded} मिनेट) = स्थानीय सूर्योदय ${hh}:${mm}। यो समय इष्टकाल अभ्यासमा प्रविष्ट गर्नुहोस्।`;
});
$('lsCalculate').click();

// Chapter 5: standard cases only; use integer pala to avoid rounding errors.
function bhRead(v){const m=/^(\d{1,2})\s*\/\s*(\d{1,2})$/.exec((v||'').trim());if(!m)return null;const g=Number(m[1]),p=Number(m[2]);return g>=0&&g<=60&&p>=0&&p<60&&!(g===60&&p>0)?g*60+p:null;}
function bhFmt(p){return `${Math.floor(p/60)} घडी ${String(p%60).padStart(2,'0')} पला`;}
function bhUpdateCase(){const choice=$('bhCase').value;$('bhOtherLabel').textContent=choice==='ka'?'भोलिको नक्षत्र अन्त्य-मान (घडी/पला)':choice==='kha'?'हिजोको गत नक्षत्र अन्त्य-मान (घडी/पला)':'भोलि वा हिजोको सम्बन्धित अन्त्य-मान (घडी/पला)';$('bhCaseHelp').textContent=choice==='ka'?'अवस्था क: इष्टकाल आजको अन्त्य-मानभन्दा ठूलो हुनुपर्छ। भोलिको मान प्रविष्ट गर्नुहोस्।':choice==='kha'?'अवस्था ख: इष्टकाल आजको अन्त्य-मानभन्दा सानो हुनुपर्छ। हिजोको गत नक्षत्रको मान प्रविष्ट गर्नुहोस्।':'इष्टकाल र आजको अन्त्य-मान तुलना गरेर अवस्था स्वतः छानिन्छ।';}
$('bhCase').addEventListener('change',bhUpdateCase);bhUpdateCase();
$('bhCalculate').addEventListener('click',()=>{
 const i=bhRead($('bhIst').value),e=bhRead($('bhToday').value),o=bhRead($('bhOther').value),out=$('bhOutput'),bhPanel=$('bhBhayat'),bbPanel=$('bhBhavog');
 bhPanel.textContent='—';bbPanel.textContent='—';
 if([i,e,o].some(v=>v===null)||i>=3600||e>=3600||o>=3600){out.textContent='कृपया ००/०० देखि ५९/५९ सम्मका घडी/पला सही ढाँचामा राख्नुहोस्।';return;}
 if(i===e){out.textContent='इष्टकाल र अन्त्य-मान बराबर छन्। यो सीमा-क्षणका लागि पञ्चाङ्गको थप जाँच आवश्यक छ।';return;}
 const a=i>e,choice=$('bhCase').value;
 if((choice==='ka'&&!a)||(choice==='kha'&&a)){out.textContent=`चयन गरिएको अवस्था ${choice==='ka'?'क':'ख'} र प्रविष्ट मान मेल खाँदैनन्। इष्टकाल र E तुलना गरी अवस्था सच्याउनुहोस्।`;return;}
 const bh=a?i-e:3600-o+i,bb=a?3600-e+o:3600-o+e;
 if(bh<0||bb<=0||bh>=bb){out.textContent='भयात भभोगभन्दा कम हुनुपर्छ। प्रविष्ट गरिएको अर्को दिनको मान वा पञ्चाङ्गको अवस्था जाँच्नुहोस्।';return;}
 out.textContent=`अवस्था ${a?'क':'ख'} प्रयोग भयो। ${a?'आजको अन्त्य-मानपछि अर्को नक्षत्रमा जन्म।':'आजको अन्त्य-मानभित्रको नक्षत्रमा जन्म।'} जाँच: भयात < भभोग।`;
 bhPanel.textContent=bhFmt(bh);bbPanel.textContent=bhFmt(bb);
});$('bhCalculate').click();

// Chapter 5: use vipala integer arithmetic to avoid floating point boundaries.
$('padaCalculate').addEventListener('click',()=>{
 const out=$('padaOutput');const parse=(s)=>{const m=/^\s*(\d{1,2})\s*[/：:]\s*(\d{1,2})\s*$/.exec(s);if(!m)return null;const g=+m[1],p=+m[2];return g<=60&&p<60&&(g<60||p===0)?(g*60+p)*60:null;};
 const a=parse($('padaBhayat').value),b=parse($('padaBhavog').value);
 if(a===null||b===null||b<=0||a<0||a>=b){out.textContent='मान्य घडी/पला दिनुहोस्। भभोग ० भन्दा ठूलो र भयात ० देखि भभोगभन्दा सानो हुनुपर्छ।';return;}
 const stage=Math.floor(a*4/b)+1;
 const fmt=(n)=>{const g=Math.floor(n/3600),p=Math.floor((n%3600)/60),v=n%60;return `${g} घडी ${p} पला ${v} विपला`;};
 const limits=[1,2,3,4].map(k=>`${k} औँ सीमा: ${fmt(b*k/4)}`).join(' · ');
 // Quarter boundaries can be fractional vipala; show rounded to 2 decimals without claiming exact integer vipala.
 const exactFmt=n=>Number.isInteger(n)?fmt(n):`${(n/60).toFixed(3)} पला`;
 const bounds=[1,2,3,4].map(k=>`${k} औँ सीमा: ${exactFmt(b*k/4)}`).join(' | ');
 out.textContent=`चरण: ${['पहिलो','दोस्रो','तेस्रो','चौथो'][stage-1]} (${stage}/४)। भयात: ${fmt(a)}। एक चरण: ${exactFmt(b/4)}। ${bounds}`;
});
$('padaCalculate').click();

// Chapter 5.7: Vimshottari balance. Input is ghadi/pala, output uses 360-day pedagogical year.
const dbYears={sun:6,moon:10,mars:7,rahu:18,jupiter:16,saturn:19,mercury:17,ketu:7,venus:20};
$('dbCalculate').addEventListener('click',()=>{
 const parse=(s)=>{const m=/^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(s);if(!m)return null;const g=Number(m[1]),p=Number(m[2]);return Number.isSafeInteger(g)&&Number.isSafeInteger(p)&&p<60?g*60+p:null;};
 const a=parse($('dbBhayat').value),b=parse($('dbBhavog').value),out=$('dbOutput'),years=dbYears[$('dbLord').value];
 if(a===null||b===null||b<=0||a<0||a>=b||!years){out.textContent='घडी/पला सही लेख्नुहोस् (जस्तै 14/40)। भयात भभोगभन्दा कम हुनुपर्छ।';return;}
 const fraction=(b-a)/b,remaining=years*fraction;
 // Use nearest day for a stable, transparent pedagogical conversion.
 const totalDays=Math.round(remaining*360),y=Math.floor(totalDays/360),mo=Math.floor(totalDays%360/30),d=totalDays%30;
 out.textContent=`बाँकी नक्षत्र-अंश: ${b-a}/${b} = ${(fraction*100).toFixed(2)}%। महादशा अवधि: ${years} वर्ष। दशा शेष: ${remaining.toFixed(4)} वर्ष ≈ ${y} वर्ष ${mo} महिना ${d} दिन (३६०-दिने वर्षमा, नजिकको दिनमा गोलाकार)।`;
});
$('dbCalculate').click();

// Chapter 6.1: canonical 120-year Vimshottari sequence.
const cyclePlanets=[['ketu','केतु',7],['venus','शुक्र',20],['sun','सूर्य',6],['moon','चन्द्र',10],['mars','मङ्गल',7],['rahu','राहु',18],['jupiter','बृहस्पति',16],['saturn','शनि',19],['mercury','बुध',17]];
function renderCycle(){
 const lord=$('cycleLord').value,raw=$('cycleBalance').value,remaining=raw.trim()===''?null:Number(raw);
 const start=cyclePlanets.findIndex(x=>x[0]===lord),out=$('cycleOutput'),full=cyclePlanets[start][2];
 if(start<0|| (remaining!==null&&(!Number.isFinite(remaining)||remaining<0||remaining>full))){out.textContent=`दशा शेष ० देखि ${full} वर्षसम्म हुनुपर्छ।`;return;}
 const first=remaining===null?full:remaining;
 let elapsed=0;const table=document.createElement('table');table.className='data-table';
 const header=document.createElement('tr');['दशा','अवधि (वर्ष)','उमेर: सुरु → अन्त्य'].forEach(s=>{const th=document.createElement('th');th.textContent=s;header.append(th);});table.append(header);
 for(let i=0;i<9;i++){const p=cyclePlanets[(start+i)%9],years=i===0?first:p[2];const row=document.createElement('tr');[p[1]+(i===0?' (शेष)':''),years.toFixed(3),`${elapsed.toFixed(3)} → ${(elapsed+years).toFixed(3)}`].forEach(s=>{const td=document.createElement('td');td.textContent=s;row.append(td);});table.append(row);elapsed+=years;}
 const note=document.createElement('p');note.textContent=`पहिलो महादशाको शेष ${first.toFixed(3)} वर्ष; त्यसपछि आठ पूर्ण महादशा। बाँकी ग्रहको अवधि अर्को चक्रमा जारी रहन्छ।`;
 out.replaceChildren(note,table);
}
$('cycleCalculate').addEventListener('click',renderCycle);
$('cycleLord').addEventListener('change',()=>{$('cycleBalance').value='';renderCycle();});
renderCycle();

// Chapter 6.2: all nine antardasha periods within one complete mahadasha.
function renderAntardasha(){
 const start=cyclePlanets.findIndex(p=>p[0]===$('adLord').value),out=$('adOutput');
 if(start<0){out.textContent='मान्य ग्रह छान्नुहोस्।';return;}
 const major=cyclePlanets[start],totalDays=major[2]*360;
 let elapsedDays=0;
 const table=document.createElement('table');table.className='data-table';
 const header=document.createElement('tr');['अन्तर्दशा','अवधि','सञ्चित अवधि'].forEach(s=>{const th=document.createElement('th');th.textContent=s;header.append(th);});table.append(header);
 const formatDays=d=>{const years=Math.floor(d/360),months=Math.floor(d%360/30),days=d%30;return `${years} व ${months} म ${days} दि`;};
 for(let i=0;i<9;i++){
   const sub=cyclePlanets[(start+i)%9];
   // Exact integer days under the pedagogical 360-day year: (major*sub/120)*360 = major*sub*3.
   const durationDays=major[2]*sub[2]*3;
   elapsedDays+=durationDays;
   const tr=document.createElement('tr');[`${major[1]}–${sub[1]}`,formatDays(durationDays),formatDays(elapsedDays)].forEach(s=>{const td=document.createElement('td');td.textContent=s;tr.append(td);});table.append(tr);
 }
 const summary=document.createElement('p');summary.textContent=`कुल अवधि: ${formatDays(elapsedDays)} = ${major[2]} वर्ष। ${elapsedDays===totalDays?'जम्मा मिल्यो।':'गणना पुनः जाँच्नुहोस्।'}`;
 out.replaceChildren(summary,table);
}
$('adCalculate').addEventListener('click',renderAntardasha);
$('adLord').addEventListener('change',renderAntardasha);
renderAntardasha();

// Chapter 6.3: exact integer months avoid rounding drift.
function renderTribhagi(){
 const start=cyclePlanets.findIndex(p=>p[0]===$('triLord').value);
 const table=document.createElement('table');table.className='data-table';
 const head=document.createElement('tr');['ग्रह','त्रिभागी अवधि','सञ्चित अवधि'].forEach(t=>{const c=document.createElement('th');c.textContent=t;head.append(c);});table.append(head);
 let sum=0;const fmt=m=>`${Math.floor(m/12)} वर्ष ${m%12} महिना`;
 for(let i=0;i<9;i++){const p=cyclePlanets[(start+i)%9];const months=p[2]*8;sum+=months;const row=document.createElement('tr');[p[1],fmt(months),fmt(sum)].forEach(t=>{const c=document.createElement('td');c.textContent=t;row.append(c);});table.append(row);}
 const note=document.createElement('p');note.textContent=`जम्मा ${fmt(sum)} (८० वर्ष)। विंशोत्तरी १२० वर्षको दुई तिहाइ।`;
 $('triOutput').replaceChildren(note,table);
}
$('triCalculate').addEventListener('click',renderTribhagi);$('triLord').addEventListener('change',renderTribhagi);renderTribhagi();

// Chapter 6.4: standard eight-Yogini cycle as used in printed examples.
const yoginis=[['मङ्गला','चन्द्र',1],['पिङ्गला','सूर्य',2],['धान्या','बृहस्पति',3],['भ्रामरी','मङ्गल',4],['भद्रिका','बुध',5],['उल्का','शनि',6],['सिद्धा','शुक्र',7],['सङ्कटा','राहु',8]];
function yoginiSelection(){const n=Number($('ygNak').value);if(!Number.isInteger(n)||n<1||n>27)return null;return {n,index:(n+3-1)%8};}
function yoginiCycle(){const o=$('ygOutput'),selection=yoginiSelection();if(!selection){o.textContent='नक्षत्र क्रम १ देखि २७ सम्मको पूर्ण सङ्ख्या राख्नुहोस्।';return;}
 const {n,index}=selection,table=document.createElement('table');table.className='data-table';const heading=document.createElement('tr');['योगिनी','ग्रह','वर्ष','सञ्चित वर्ष'].forEach(t=>{const th=document.createElement('th');th.textContent=t;heading.append(th);});table.append(heading);let sum=0;for(let i=0;i<8;i++){const y=yoginis[(index+i)%8];sum+=y[2];const row=document.createElement('tr');[y[0],y[1],String(y[2]),String(sum)].forEach(t=>{const td=document.createElement('td');td.textContent=t;row.append(td);});table.append(row);}const intro=document.createElement('p');intro.textContent=`(${n} + ३) ÷ ८ को शेष ${(n+3)%8} → पहिलो योगिनी ${yoginis[index][0]} (${yoginis[index][2]} वर्ष)। आठ दशाको जम्मा ३६ वर्ष।`;o.replaceChildren(intro,table);}
function yoginiBalance(){const selection=yoginiSelection(),out=$('ygBalanceOutput');if(!selection){out.textContent='पहिले नक्षत्र क्रम १–२७ राख्नुहोस्।';return;}
 const parse=v=>{const m=/^(\d{1,2})\s*\/\s*(\d{1,2})$/.exec(v.trim());if(!m||Number(m[2])>=60)return null;return Number(m[1])*60+Number(m[2]);};const a=parse($('ygBhayat').value),b=parse($('ygBhavog').value);if(a===null||b===null||b<=0||a<0||a>=b){out.textContent='भयात र भभोग घडी/पला रूपमा दिनुहोस् (उदाहरण 14/40); ० ≤ भयात < भभोग हुनुपर्छ।';return;}
 const y=yoginis[selection.index],remaining=(b-a)/b*y[2],totalDays=Math.round(remaining*360),years=Math.floor(totalDays/360),months=Math.floor((totalDays%360)/30),days=totalDays%30;out.textContent=`${y[0]} (${y[1]}) को पूर्ण अवधि ${y[2]} वर्ष। दशा शेष = (${b} − ${a}) ÷ ${b} × ${y[2]} = ${remaining.toFixed(4)} वर्ष ≈ ${years} वर्ष ${months} महिना ${days} दिन।`;}
$('ygCalculate').addEventListener('click',yoginiCycle);$('ygBalance').addEventListener('click',yoginiBalance);yoginiCycle();yoginiBalance();

(function(){const key='jyotisha-pathshala-opened-v3';let opened=[];try{const v=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(v))opened=[...new Set(v.filter(x=>Number.isInteger(x)&&x>=1&&x<=6))]}catch(_){}const cards=[...document.querySelectorAll('.chapter-card[data-chapter]')];function render(){cards.forEach(c=>c.classList.toggle('visited',opened.includes(Number(c.dataset.chapter))));const n=opened.length;document.getElementById('progressCount').textContent=n+' / ६';document.getElementById('progressFill').style.width=(n/6*100)+'%';document.getElementById('progressTrack').setAttribute('aria-valuenow',String(n))}cards.forEach(c=>c.addEventListener('click',()=>{const n=Number(c.dataset.chapter);if(!opened.includes(n)){opened.push(n);try{localStorage.setItem(key,JSON.stringify(opened))}catch(_){}render()}}));document.getElementById('resetProgress').addEventListener('click',()=>{if(!window.confirm('यस ब्राउजरमा सुरक्षित अध्ययन प्रगति हटाउने?'))return;opened=[];try{localStorage.removeItem(key)}catch(_){}render()});render()})();

/* v3.1 chapter-focused reading mode. All existing widgets stay mounted. */
(function(){
 const params=new URLSearchParams(window.location.search);
 const chapter=Number(params.get('chapter'));
 if(!Number.isInteger(chapter)||chapter<1||chapter>6)return;
 const groups={"1":["pathshala","practice"],"2":["chapter2","planetExample","chapter2exam"],"3":["chapter3","chapter3exam"],"4":["chapter4","istakala","localSunrise"],"5":["chapter5","padaPractice","dashaBalance"],"6":["chapter6","antardasha","tribhagi","yogini"]};
 const titles=["","पञ्चाङ्गका आधार","राशि र भाव","ग्रह परिचय","समय गणित","नक्षत्र गणना","दशा पद्धति"];
 const allowed=new Set(groups[chapter]);
 document.body.classList.add('chapter-focus');
 for(const section of document.querySelectorAll('main > section')){
  if(!allowed.has(section.id))section.classList.add('chapter-focus-hidden');
 }
 const main=document.querySelector('main');
 const banner=document.createElement('div');banner.className='chapter-focus-banner';
 const back=document.createElement('a');back.href='index.html#dashboard';back.className='chapter-back';back.textContent='← अध्ययन कक्षमा फर्कनुहोस्';
 const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent='JYOTISHA PATHSHALA · अध्याय '+chapter;
 const title=document.createElement('h1');title.textContent=titles[chapter];
 const actions=document.createElement('div');actions.className='chapter-pager';
 if(chapter>1){const a=document.createElement('a');a.href='index.html?chapter='+(chapter-1);a.textContent='← अघिल्लो अध्याय';actions.append(a)}
 if(chapter<6){const a=document.createElement('a');a.href='index.html?chapter='+(chapter+1);a.textContent='अर्को अध्याय →';actions.append(a)}
 const toc=document.createElement('nav');toc.className='chapter-toc';toc.setAttribute('aria-label','यस अध्यायका विषयहरू');const tocHeading=document.createElement('strong');tocHeading.textContent='यस अध्यायमा';toc.append(tocHeading);for(const id of groups[chapter]){const section=document.getElementById(id);if(!section)continue;const heading=section.querySelector('h2,h3');const link=document.createElement('a');link.href='#'+id;link.textContent=heading?heading.textContent.trim():id;toc.append(link)}banner.append(back,eyebrow,title,actions,toc);main.prepend(banner);const bottomNav=document.createElement('nav');bottomNav.className='chapter-bottom-nav';bottomNav.setAttribute('aria-label','अध्यायको अन्त्यमा नेभिगेसन');const bottomBack=document.createElement('a');bottomBack.href='index.html#dashboard';bottomBack.className='chapter-back';bottomBack.textContent='← अध्ययन कक्षमा फर्कनुहोस्';bottomNav.append(bottomBack);main.append(bottomNav);document.title=titles[chapter]+' | ज्योतिष पाठशाला';
 document.querySelectorAll('#nav a[href^="#"]').forEach(a=>{
  const hash=a.getAttribute('href');a.setAttribute('href','index.html'+hash);
 });
 document.querySelectorAll('.brand').forEach(a=>a.href='index.html#home');
})();


/* v3.4 Chapter 2 progressive disclosure: lesson, practice, quiz. */
(function(){
 if(new URLSearchParams(location.search).get('chapter')!=='2')return;
 const banner=document.querySelector('.chapter-focus-banner');
 if(!banner)return;
 const ids={lesson:['chapter2'],practice:['planetExample'],quiz:['chapter2exam']};
 const tabs=document.createElement('div');tabs.className='learning-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','अध्याय २ अध्ययन विकल्प');
 const buttons={};
 let active='lesson',current=0;
 const qContainer=document.getElementById('chapter2ExamQuestions');
 const pager=document.createElement('div');pager.className='exam-stepper';
 const counter=document.createElement('span');counter.setAttribute('aria-live','polite');
 const prev=document.createElement('button');prev.type='button';prev.textContent='← अघिल्लो प्रश्न';
 const next=document.createElement('button');next.type='button';next.textContent='अर्को प्रश्न →';
 pager.append(prev,counter,next);
 qContainer.after(pager);
 function questions(){return [...qContainer.querySelectorAll('fieldset.exam-question')]}
 function showQuestion(index){
  const list=questions();if(!list.length)return;
  current=Math.max(0,Math.min(index,list.length-1));
  list.forEach((q,i)=>{q.hidden=i!==current;q.classList.toggle('question-hidden',i!==current)});
  counter.textContent='प्रश्न '+(current+1)+' / '+list.length;
  prev.disabled=current===0;next.disabled=current===list.length-1;
 }
 function activate(name,focus=false){
  active=name;
  for(const [key,sections] of Object.entries(ids)){
   for(const id of sections){const section=document.getElementById(id);if(section)section.hidden=key!==name;}
   buttons[key].setAttribute('aria-selected',String(key===name));
   buttons[key].tabIndex=key===name?0:-1;
  }
  if(name==='quiz')showQuestion(current);
  if(focus)buttons[name].focus();
 }
 for(const [key,label] of [['lesson','पाठ'],['practice','अभ्यास'],['quiz','परीक्षा']]){
  const btn=document.createElement('button');btn.type='button';btn.className='learning-tab';btn.textContent=label;btn.setAttribute('role','tab');btn.setAttribute('aria-controls',ids[key][0]);btn.addEventListener('click',()=>activate(key));tabs.append(btn);buttons[key]=btn;
 }
 tabs.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft'].includes(e.key))return;e.preventDefault();const keys=['lesson','practice','quiz'];activate(keys[(keys.indexOf(active)+(e.key==='ArrowRight'?1:2))%3],true)});
 const toc=banner.querySelector('.chapter-toc');if(toc)toc.hidden=true;
 banner.append(tabs);
 prev.addEventListener('click',()=>showQuestion(current-1));
 next.addEventListener('click',()=>showQuestion(current+1));
 qContainer.addEventListener('change',()=>{if(current<questions().length-1){next.classList.add('ready-next')}});
 const form=document.getElementById('chapter2ExamForm');
 form.addEventListener('submit',()=>{questions().forEach(q=>{q.hidden=false;q.classList.remove('question-hidden')});pager.hidden=true;});
 document.getElementById('examReset').addEventListener('click',()=>queueMicrotask(()=>{pager.hidden=false;showQuestion(0)}));
 // Preserve deep links to the exercise and assessment when opening a chapter.
 const hash=location.hash.slice(1);
 activate(hash==='chapter2exam'?'quiz':hash==='planetExample'?'practice':'lesson');
})();


/* v3.7: compact tabs for chapters 1 and 3–6; Chapter 2 retains its validated implementation. */
(function(){
 const chapter=Number(new URLSearchParams(location.search).get('chapter'));
 if(![1,3,4,5,6].includes(chapter))return;
 const banner=document.querySelector('.chapter-focus-banner');if(!banner)return;
 const maps={
  1:{lesson:['pathshala'],practice:['practice']},
  3:{lesson:['chapter3'],quiz:['chapter3exam']},
  4:{lesson:['chapter4'],practice:['istakala','localSunrise']},
  5:{lesson:['chapter5'],practice:['padaPractice','dashaBalance']},
  6:{lesson:['chapter6'],practice:['antardasha','tribhagi','yogini']}
 };
 const mapping=maps[chapter];
 const tabs=document.createElement('div');tabs.className='learning-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','अध्याय '+chapter+' अध्ययन विकल्प');
 const buttons={};let active='lesson';
 function activate(name,focus=false){
  active=name;
  for(const [key,ids] of Object.entries(mapping)){
   ids.forEach(id=>{const section=document.getElementById(id);if(section)section.hidden=key!==name});
   buttons[key].setAttribute('aria-selected',String(key===name));buttons[key].tabIndex=key===name?0:-1;
  }
  if(focus)buttons[name].focus();
 }
 for(const [key,label] of Object.entries({lesson:'पाठ',practice:'अभ्यास',quiz:'परीक्षा'})){
  if(!mapping[key])continue;
  const btn=document.createElement('button');btn.type='button';btn.className='learning-tab';btn.textContent=label;btn.setAttribute('role','tab');btn.setAttribute('aria-controls',mapping[key][0]);btn.addEventListener('click',()=>activate(key));tabs.append(btn);buttons[key]=btn;
 }
 const keys=Object.keys(mapping);
 tabs.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();activate(keys[(keys.indexOf(active)+(e.key==='ArrowRight'?1:keys.length-1))%keys.length],true)});
 const toc=banner.querySelector('.chapter-toc');if(toc)toc.hidden=true;
 banner.append(tabs);
 const hash=location.hash.slice(1);
 const matching=Object.entries(mapping).find(([,ids])=>ids.includes(hash));
 activate(matching?matching[0]:'lesson');
})();
