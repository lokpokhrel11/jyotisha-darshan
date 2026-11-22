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
const menuButton=$('menu'),mainNav=$('nav');
function setMenuOpen(open){
 mainNav.classList.toggle('open',open);
 menuButton.setAttribute('aria-expanded',String(open));
 menuButton.setAttribute('aria-label',open?'विषय सूची बन्द गर्नुहोस्':'विषय सूची खोल्नुहोस्');
}
menuButton.addEventListener('click',()=>setMenuOpen(menuButton.getAttribute('aria-expanded')!=='true'));
// An expanded phone menu must not remain marked open after rotating or widening the viewport.
const mobileMenuQuery=window.matchMedia('(max-width: 650px)');
const syncMenuViewport=()=>{if(!mobileMenuQuery.matches&&menuButton.getAttribute('aria-expanded')==='true')setMenuOpen(false);};
if(mobileMenuQuery.addEventListener)mobileMenuQuery.addEventListener('change',syncMenuViewport);
else if(mobileMenuQuery.addListener)mobileMenuQuery.addListener(syncMenuViewport);
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenuOpen(false)));
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){
  setMenuOpen(false);
  menuButton.focus();
 }
});
document.addEventListener('pointerdown',event=>{
 if(menuButton.getAttribute('aria-expanded')==='true'&&!mainNav.contains(event.target)&&!menuButton.contains(event.target))setMenuOpen(false);
});
function showAnga(i){$('angaTabs').querySelectorAll('button').forEach((b,j)=>{b.classList.toggle('selected',i===j);b.setAttribute('aria-pressed',String(i===j));});const a=anga[i];$('angaDetail').innerHTML=`<strong>${a.name}</strong> · ${a.count}<p>${a.desc}</p>`;}
anga.forEach((a,i)=>{const b=document.createElement('button');b.textContent=a.name;b.addEventListener('click',()=>showAnga(i));$('angaTabs').append(b);});showAnga(0);
$('openLesson').addEventListener('click',()=>{$('lesson').hidden=false;$('lesson').scrollIntoView({behavior:'smooth',block:'start'});});
$('closeLesson').addEventListener('click',()=>{$('lesson').hidden=true;$('openLesson').focus();});
// Chapter 1 formative assessment. Each item includes its study-note section.
const questions=[
 {unit:'१.१',q:'पञ्चाङ्गका पाँच अङ्गमध्ये कुन पर्दछ?',options:['लग्न','करण','भावेश'],correct:1,why:'तिथि, वार, नक्षत्र, योग र करण पाँच अङ्ग हुन्।'},
 {unit:'१.१',q:'पञ्चाङ्गका पाँच अङ्गमध्ये कुन पर्दैन?',options:['योग','नक्षत्र','दशा'],correct:2,why:'दशा ज्योतिष अध्ययनको विषय हो तर पञ्चाङ्गका पाँच अङ्गमध्ये होइन।'},
 {unit:'१.२',q:'चन्द्रमासमा कुल कति तिथि मानिन्छन्?',options:['१५','३०','२७'],correct:1,why:'शुक्ल र कृष्ण पक्षमा १५–१५ गरी ३० तिथि हुन्छन्।'},
 {unit:'१.२',q:'३० तिथि भए पनि छुट्टाछुट्टै नाम कति छन्?',options:['१५','१६','३०'],correct:1,why:'प्रतिपदादेखि चतुर्दशीसम्मका १४ नाम शुक्ल र कृष्ण दुवै पक्षमा दोहोरिन्छन्। शुक्ल पक्षको पन्ध्रौँ तिथि पूर्णिमा र कृष्ण पक्षको पन्ध्रौँ तिथि औँसी भएकाले अलग नाम जम्मा १६ हुन्छन्।'},
 {unit:'१.२',q:'पाँचौँ तिथि कुन नन्दादि समूहमा पर्छ?',options:['पूर्णा','जया','रिक्ता'],correct:0,why:'तिथिहरूलाई नन्दा, भद्रा, जया, रिक्ता र पूर्णा गरी पाँच समूहमा राखिन्छ। यही पाँच समूहको क्रम तीनपटक दोहोरिन्छ। त्यसैले पाँचौँ, दशौँ र पन्ध्रौँ तिथि पूर्णा समूहमा पर्छन्।'},
 {unit:'१.२क',q:'३६०° लाई ३० तिथिमा बाँड्दा एक तिथिको कोण कति?',options:['१०°','१२°','१३°२०′'],correct:1,why:'३६०° ÷ ३० = १२°।'},
 {unit:'१.२क',q:'एक अंशमा कति कला हुन्छन्?',options:['३०','६०','१००'],correct:1,why:'१ अंश = ६० कला; १ कला = ६० विकला।'},
 {unit:'१.३',q:'परम्परागत वारहरूको संख्या कति?',options:['५','७','९'],correct:1,why:'आइतबारदेखि शनिबारसम्म सात वार हुन्छन्।'},
 {unit:'१.४',q:'मानक गणनामा नक्षत्र कति?',options:['१२','२७','२८'],correct:1,why:'राशिचक्रलाई समान २७ भागमा बाँडेर नक्षत्रको सामान्य गणना गरिन्छ। अभिजितलाई समावेश गर्ने २८ नक्षत्रको सूची पनि परम्परामा पाइन्छ, तर यस पाठको गणना २७ नक्षत्रमा आधारित छ।'},
 {unit:'१.४',q:'प्रत्येक नक्षत्रमा कति पाउ हुन्छन्?',options:['२','४','६'],correct:1,why:'२७ × ४ = १०८ पाउ।'},
 {unit:'१.४',q:'तिष्य अर्को कुन नक्षत्रको नाम हो?',options:['पुष्य','रोहिणी','रेवती'],correct:0,why:'नोटमा तिष्य/पुष्य एउटै आठौँ नक्षत्रका नाम हुन्।'},
 {unit:'१.५',q:'विष्कुम्भादि योग सूचीमा शुभ कुन क्रममा छ?',options:['२३','२४','२५'],correct:0,why:'२३ शुभ र २४ शुक्ल हुन्।'},
 {unit:'१.६',q:'आनन्दादि योग कति छन्?',options:['२७','२८','३०'],correct:1,why:'आनन्दादि २८ र विष्कुम्भादि २७ योगका अलग सूची हुन्।'},
 {unit:'१.७',q:'करणका प्रकार जम्मा कति छन्?',options:['७','११','१५'],correct:1,why:'बव, बालव, कौलव, तैतिल, गर, वणिज र विष्टि सात चर करण हुन्। शकुनि, चतुष्पद, नाग र किंस्तुघ्न चार स्थिर करण हुन्। त्यसैले जम्मा ११ प्रकार हुन्छन्।'},
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
  $('quizFeedback').textContent=(ok?'सही उत्तर। ':'सही उत्तर «'+q.options[q.correct]+'» हो। ')+q.why;
  $('quizProgress').textContent=`प्रश्न ${questionIndex+1} / ${questions.length} · सही ${correctCount} · स्रोत खण्ड ${q.unit}`;
  $('quizOptions').querySelectorAll('button').forEach((x,j)=>{x.disabled=true;if(j===q.correct){x.classList.add('correct-answer');x.setAttribute('aria-label',x.textContent+' — सही उत्तर')}else if(j===i){x.classList.add('incorrect-answer')}});
  $('nextQuestion').hidden=questionIndex===questions.length-1;
  if(questionIndex===questions.length-1){
   const passed=correctCount>=12;
   $('quizFeedback').textContent+=` अन्तिम नतिजा: ${correctCount}/${questions.length}। `+(passed?'प्रारम्भिक मूल्याङ्कन पूरा भयो।':'पुनः अध्ययन गरेर प्रयास गर्नुहोस्।');
   $('unitBreakdown').textContent='खण्डअनुसार: '+Object.entries(unitScores).map(([unit,v])=>`${unit}: ${v.right}/${v.total}`).join(' · ');
   $('restartQuiz').hidden=false;
   try{localStorage.setItem('jd-chapter1-v05',JSON.stringify({score:correctCount,total:questions.length,completed:passed,units:unitScores}));}catch(e){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  }
 });$('quizOptions').append(b);});$('nextQuestion').hidden=true;
}
$('nextQuestion').addEventListener('click',()=>{questionIndex++;renderQuestion()});
$('restartQuiz').addEventListener('click',()=>{questionIndex=0;correctCount=0;unitScores={};$('restartQuiz').hidden=true;$('unitBreakdown').textContent='';$('savedProgress').textContent='';try{localStorage.removeItem('jd-chapter1-v05')}catch(e){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));renderQuestion()});
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
 const globalPada=Math.floor((d+1e-10)/(360/108));const n=Math.floor(globalPada/4)+1;const pad=globalPada%4+1;
 $('nakResult').textContent=`कुल भोगांश ${d.toFixed(2)}° ÷ ३°२०′ (एक पाउ) गर्दा ${globalPada} पूरा पाउ बितेका छन्। त्यसैले नक्षत्र क्रम ${n} र त्यसको ${pad} औँ पाउ चलिरहेको छ। यो २७ नक्षत्रको समान कोणीय विभाजनमा आधारित अभ्यास हो।`;
});
$('tithiCalculate').addEventListener('click',()=>{
 const sun=validAngle('sunLongitude'),moon=validAngle('moonLongitude');
 if(sun===null||moon===null){$('tithiCalcResult').textContent='दुवै भोगांश ० देखि ३६० भन्दा कम हुनुपर्छ।';return;}
 const diff=(moon-sun+360)%360;const idx=Math.floor(diff/12);const paksha=idx<15?'शुक्ल':'कृष्ण';
 const n=idx%15+1;const names=['प्रतिपदा','द्वितीया','तृतीया','चतुर्थी','पञ्चमी','षष्ठी','सप्तमी','अष्टमी','नवमी','दशमी','एकादशी','द्वादशी','त्रयोदशी','चतुर्दशी'];
 const name=n===15?(paksha==='शुक्ल'?'पूर्णिमा':'औँसी'):names[n-1];
 const completed=Math.floor(diff/12);const remainder=diff-completed*12;
 const boundary=Math.abs(remainder)<1e-9||Math.abs(remainder-12)<1e-9;
 const degreesIntoTithi=boundary?0:remainder;
 const elapsed=boundary?'ठीक सीमामा नयाँ तिथि सुरु हुन्छ।':completed+' वटा १२° का खण्ड पूरा भएका छन्; चालू तिथिभित्र '+degreesIntoTithi.toFixed(2)+'° बितेको छ।';
 $('tithiCalcResult').textContent='चन्द्र '+moon.toFixed(2)+'° − सूर्य '+sun.toFixed(2)+'° = '+(moon-sun).toFixed(2)+'°; ३६०° चक्रमा मिलाउँदा '+diff.toFixed(2)+'°। '+elapsed+' त्यसैले '+paksha+' '+name+' (क्रम '+n+')। '+(boundary?'यो गणितीय सीमा हो; वास्तविक तिथि परिवर्तनको घडी निकाल्न समयसहितको खगोलीय गणना चाहिन्छ।':'यो दिइएका काल्पनिक भोगांशको अभ्यास हो, आजको पञ्चाङ्ग होइन।');
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
  group.setAttribute('aria-label',`${n} औँ भाव, ${signs[r-1]} राशि${n===selectedHouse?', हाल चयन गरिएको':''}`);
  group.setAttribute('class','chart-house'+(n===selectedHouse?' selected':''));
  const hit=document.createElementNS('http://www.w3.org/2000/svg','circle');
  hit.setAttribute('cx',x);hit.setAttribute('cy',y-5);hit.setAttribute('r',28);hit.setAttribute('fill','transparent');
  const t=document.createElementNS('http://www.w3.org/2000/svg','text');
  t.setAttribute('x',x);t.setAttribute('y',y);t.setAttribute('font-size',n===selectedHouse?'28':'25');t.setAttribute('fill','currentColor');t.style.setProperty('font-weight','800','important');t.textContent=String(r);
  const sub=document.createElementNS('http://www.w3.org/2000/svg','text');
  sub.setAttribute('x',x);sub.setAttribute('y',y+14);sub.setAttribute('font-size','11');sub.setAttribute('fill','currentColor');sub.style.setProperty('font-weight','700','important');sub.textContent=roman[i];
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


// Chapter 2: source-aligned introductory exercises (master notes, sections 2.1–2.6).
const meanings=['शरीर, स्वभाव','धन, आफन्त','साहस, भाइबहिनी','आमा, घर','सन्तान, विद्या','रोग, शत्रु','विवाह, विदेश','मृत्यु, अवरोध','धर्म, भाग्य','बुबा, कर्म','आय, लाभ','खर्च, विदेश'];
for(const id of ['reverseLagna','reverseRashi']){const sel=$(id);signs.forEach((s,i)=>sel.add(new Option(`${i+1} · ${s}`,String(i+1))));}
for(let i=1;i<=12;i++)$('houseMeaning').add(new Option(`${i} औँ भाव`,String(i)));
function updateHouseMeaning(){const n=Number($('houseMeaning').value);$('houseMeaningResult').textContent=`${n} औँ भाव: ${meanings[n-1]}।`;}
$('houseMeaning').addEventListener('change',updateHouseMeaning);updateHouseMeaning();
$('reverseLagna').value='1';$('reverseRashi').value='4';
function reverseCalculate(){const l=Number($('reverseLagna').value),r=Number($('reverseRashi').value);const n=(r-l+12)%12+1;$('reverseResult').textContent=`लग्न ${signs[l-1]} (${l}) र खोजिएको राशि ${signs[r-1]} (${r}) हो। गणना: (${r} − ${l} + १२) mod १२ + १ = ${n}। त्यसैले ${signs[r-1]} राशि ${n} औँ भावमा पर्छ।`;}
$('reverseCalculate').addEventListener('click',reverseCalculate);
for(const id of ['reverseLagna','reverseRashi'])$(id).addEventListener('change',()=>{$('reverseResult').textContent='चयन परिवर्तन भयो। नयाँ नतिजाका लागि गणना गर्नुहोस्।';});
reverseCalculate();


// The master notes' nine-planet exaltation teaching chart, section 2.1 (p. 12).
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
function revealExalted(){const p=exaltedPlanets[Number(ep.value)];$('exaltedResult').textContent=`मेष लग्नमा ${p.name} ${signs[p.house-1]} राशिमा राखिएको छ। राशि सङ्ख्या ${p.house} भएकाले यो ${p.house} औँ भाव हो। यो उच्च राशिको परम्परागत शिक्षण उदाहरण हो, वास्तविक जन्मकुण्डली होइन।`;}
$('exaltedReveal').addEventListener('click',revealExalted);
ep.addEventListener('change',()=>{$('exaltedResult').textContent='अर्को ग्रह छानिएको छ। त्यसको उत्तर हेर्नुहोस्।';});
$('exaltedToggle').addEventListener('click',()=>{showExalted=!showExalted;$('exaltedToggle').setAttribute('aria-pressed',String(showExalted));$('exaltedToggle').textContent=showExalted?'चार्टका ग्रह लुकाउनुहोस्':'चार्टमा सबै ग्रह देखाउनुहोस्';drawExalted();});
drawExalted();


// Chapter 2 formative assessment, sourced from master notes sections 2.1–2.6.
const chapter2Questions=[
 ['२.१','यहाँ प्रयोग गरिएको हीराकार कुण्डलीमा पहिलो भाव कहाँ हुन्छ?',['माथि बीचको हीरा','बायाँ बीचको हीरा','तल बीचको हीरा'],0,'पहिलो भाव माथि बीचको ठूलो हीरामा हुन्छ।'],
 ['२.१','चौथो भाव कहाँ हुन्छ?',['दायाँ बीच','बायाँ बीच','तल बीच'],1,'चौथो भाव बायाँ बीचको हीरा हो।'],
 ['२.१','सातौँ भाव कहाँ हुन्छ?',['माथि बीच','तल बीच','दायाँ बीच'],1,'सातौँ भाव तल बीचको हीरा हो।'],
 ['२.१','दशौँ भाव कहाँ हुन्छ?',['दायाँ बीच','बायाँ बीच','माथि बीच'],0,'दशौँ भाव दायाँ बीचको हीरा हो।'],
 ['२.१','दोस्रो भावको स्थान कुन हो?',['माथि दायाँ त्रिकोण','माथि बायाँ त्रिकोण','तल बायाँ त्रिकोण'],1,'दोस्रो भाव माथि बायाँ त्रिकोण हो।'],
 ['२.२','कुण्डलीभित्रको ५ अङ्कले सामान्यतः के जनाउँछ?',['पाँचौँ भाव','सिंह राशि','सूर्य ग्रह त्यहीँ बसेको'],1,'अङ्क ५ सिंह राशि हो; सूर्यको स्वामित्व र सूर्यको उपस्थिति एउटै होइनन्।'],
 ['२.२','भावको स्थान कुन अवस्थामा बदलिन्छ?',['लग्न बदलिँदा','ग्रह बदलिँदा','यहाँको हीराकार ढाँचामा बदलिँदैन'],2,'यहाँको हीराकार ढाँचामा भावको स्थान स्थिर रहन्छ।'],
 ['२.३','वृश्चिक राशिको स्वामी को हो?',['मङ्गल','बुध','शुक्र'],0,'राशि १ र ८ मङ्गलका घर हुन्।'],
 ['२.३','धनु राशिको स्वामी को हो?',['शनि','बृहस्पति','चन्द्र'],1,'राशि ९ र १२ बृहस्पतिका घर हुन्।'],
 ['२.३','राहु र केतुका राशिस्वामी सम्बन्धमा यस पाठको नियम कुन हो?',['दुवैका दुई-दुई घर छन्','यस तहमा आफ्ना घर मानिँदैनन्','दुवै सिंहका स्वामी हुन्'],1,'यस पाठको प्रारम्भिक राशिस्वामी तालिकामा राहु र केतुलाई आफ्नै राशिको स्वामी मानिएको छैन; यस विषयमा परम्परागत मतभेद पनि पाइन्छ।'],
 ['२.४','सिंह लग्नमा पहिलो भावमा कुन राशि हुन्छ?',['मेष','सिंह','कन्या'],1,'लग्न राशि नै पहिलो भावमा रहन्छ।'],
 ['२.४','सिंह लग्नमा नवौँ भावमा कुन राशि पर्छ?',['मेष','मीन','धनु'],0,'सिंहलाई पहिलो मानेर क्रमशः कन्या दोस्रो, तुला तेस्रो हुँदै गन्दा नवौँमा मेष पर्छ।'],
 ['२.४','सिंह लग्नमा धनु राशिमा बसेको ग्रह कुन भावमा हुन्छ?',['पाँचौँ','नवौँ','दोस्रो'],0,'सिंहबाट गन्दा सिंह पहिलो, कन्या दोस्रो, तुला तेस्रो, वृश्चिक चौथो र धनु पाँचौँ भावमा पर्छ।'],
 ['२.४','वृश्चिक लग्नमा छैटौँ भावमा कुन राशि हुन्छ?',['मेष','मीन','मिथुन'],0,'वृश्चिक पहिलो, धनु दोस्रो, मकर तेस्रो, कुम्भ चौथो, मीन पाँचौँ र मेष छैटौँ भावमा पर्छ।'],
 ['२.५','सन्तान र विद्या कुन भावका मुख्य शब्द हुन्?',['तेस्रो','पाँचौँ','आठौँ'],1,'यस पाठको प्रारम्भिक तालिकामा पाँचौँ भाव सन्तान र विद्यासँग जोडिएको छ।'],
 ['२.६','केन्द्र भावहरूको सही समूह कुन हो?',['१, ४, ७, १०','१, ५, ९','६, ८, १२'],0,'यस पाठका चार केन्द्र १, ४, ७, १० हुन्।'],
 ['२.६','यस अध्यायको अभ्यास-सूचीमा त्रिकोण भावको जोडी कुन दिइएको छ?',['१, ५, ९','५, ९','४, ७, १०'],1,'यस अध्यायमा प्रयोग गरिएको अभ्यास-सूचीले पाँचौँ र नवौँ भावलाई त्रिकोणको जोडीका रूपमा राखेको छ। कतिपय परम्परागत वर्गीकरणमा पहिलो भाव (लग्न) समेत समावेश गरी १, ५ र ९ लाई त्रिकोण भनिन्छ। त्यसैले प्रश्नले सामान्य परिभाषा होइन, यही अभ्यास-सूचीको जोडी सोधेको हो।'],
 ['उच्च कुण्डली','मेष लग्नको शिक्षण उच्च कुण्डलीमा बृहस्पति कहाँ छ?',['चौथो भाव कर्कट','नवौँ भाव धनु','दशौँ भाव मकर'],0,'स्रोतको चित्रमा बृहस्पति कर्कट अर्थात् चौथो भावमा छ।'],
 ['उच्च कुण्डली','यस शिक्षण उच्च कुण्डलीमा कुन भाव खाली छ?',['पाँचौँ','सातौँ','दशौँ'],0,'पाँचौँ, आठौँ र एघारौँ भाव खाली छन्।'],
 ['उच्च कुण्डली','यस शिक्षण उच्च कुण्डलीमा मङ्गल कहाँ छ?',['पहिलो भाव मेष','दशौँ भाव मकर','छैटौँ भाव कन्या'],1,'मङ्गल मकर राशिमा दशौँ भावमा छ।']
];
const examForm=$('chapter2ExamForm'),examQuestions=$('chapter2ExamQuestions'),examResults=$('examResults');
function renderChapter2Exam(){examQuestions.replaceChildren();chapter2Questions.forEach((q,i)=>{const fs=document.createElement('fieldset');fs.className='exam-question';const lg=document.createElement('legend');lg.textContent=`${i+1}. [${q[0]}] ${q[1]}`;fs.append(lg);q[2].forEach((answer,j)=>{const label=document.createElement('label');label.className='exam-option';const radio=document.createElement('input');radio.type='radio';radio.name=`chapter2q${i}`;radio.value=String(j);label.append(radio,document.createTextNode(' '+answer));fs.append(label);});examQuestions.append(fs);});examResults.hidden=true;examResults.replaceChildren();updateChapter2Progress();}
function updateChapter2Progress(){let done=0;chapter2Questions.forEach((q,i)=>{if(examForm.querySelector(`input[name="chapter2q${i}"]:checked`))done++;});$('examProgress').textContent=`उत्तर दिइएका: ${done}/${chapter2Questions.length}`;}
examForm.addEventListener('change',event=>{updateChapter2Progress();if(event.target.matches('input[type="radio"]')){try{localStorage.removeItem('jyotisha-chapter2-score')}catch(e){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));examResults.hidden=true;examResults.replaceChildren();}});
examForm.addEventListener('submit',event=>{event.preventDefault();const answers=chapter2Questions.map((q,i)=>examForm.querySelector(`input[name="chapter2q${i}"]:checked`));if(answers.some(a=>!a)){examResults.hidden=false;examResults.textContent=`नतिजा हेर्नुअघि बाँकी ${answers.filter(a=>!a).length} प्रश्नको उत्तर दिनुहोस्।`;const first=answers.findIndex(a=>!a);const target=examQuestions.querySelectorAll('fieldset.exam-question')[first];if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});}return;}let score=0;const summary=document.createElement('div');const title=document.createElement('h3');chapter2Questions.forEach((q,i)=>{const chosen=Number(answers[i].value);const ok=chosen===q[3];if(ok)score++;const p=document.createElement('p');p.textContent=`${i+1}. ${ok?'✓ सही':'✗ सुधार'} · ${q[4]}${ok?'':` सही उत्तर: ${q[2][q[3]]}।`}`;summary.append(p);});title.textContent=`नतिजा: ${score}/20 · ${score>=16?'अभ्यास लक्ष्य पूरा':'पुनः अभ्यास सिफारिस'}`;examResults.replaceChildren(title,summary);examResults.hidden=false;title.tabIndex=-1;title.focus({preventScroll:true});try{localStorage.setItem('jyotisha-chapter2-score',JSON.stringify({score,total:20}));}catch(e){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));examResults.scrollIntoView({behavior:'smooth',block:'start'});});
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
  try{localStorage.removeItem('jyotisha-chapter2-score')}catch(e){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  reshuffleChapter2Questions();
  renderChapter2Exam();
  // Return to the beginning so the cleared selections are immediately visible.
  const firstQuestion=examQuestions.querySelector('fieldset');
  if(firstQuestion){firstQuestion.setAttribute('tabindex','-1');firstQuestion.focus({preventScroll:true});firstQuestion.scrollIntoView({behavior:'smooth',block:'start'});}
});
renderChapter2Exam();

// Chapter 3: explicitly mapped to the reference notes' 117-page notes, PDF pp. 16–20.
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
function checkPlanetStatus(){const i=Number($('planetStatus').value),r=Number($('planetSign').value),d=planetDignities[i];const matches=[];if(d.ex===r)matches.push('उच्च');if(d.own.includes(r))matches.push('स्वगृही');if(d.deb===r)matches.push('नीच');const status=matches.length?matches.join(' र '):'उच्च, नीच वा स्वगृहीमध्ये कुनै होइन';const note=d.deb===null?' यस अध्ययन नोटमा यस ग्रहको नीच राशि दिइएको छैन; अन्य राशिमा नीच नभएको निष्कर्ष यसबाट निकाल्न मिल्दैन।':'';$('planetStatusResult').textContent=`${navagraha[i]} · ${signs[r-1]}: ${status}।${note}`;}
$('checkPlanetStatus').addEventListener('click',checkPlanetStatus);
for(const id of ['planetStatus','planetSign'])$(id).addEventListener('change',()=>{$('planetStatusResult').textContent='चयन परिवर्तन भयो। अवस्था हेर्नुहोस्।';});checkPlanetStatus();
const aspectOffsets={2:[4,7,8],4:[5,7,9],6:[3,7,10]};
function calculateAspects(){const i=Number($('aspectPlanet').value),house=Number($('aspectHouse').value);if(i>=7){$('aspectResult').textContent='मूल दृष्टि-चार्टमा राहु र केतुका लागि «आफैँमा» लेखिएको छ। यसको गणनात्मक अर्थ अध्ययन नोटमा निश्चित नभएकाले यहाँ अन्य ग्रहजस्तै दृष्टि-भाव निकालिएको छैन।';return;}const offsets=aspectOffsets[i]||[7];const houses=offsets.map(n=>((house+n-2)%12)+1);$('aspectResult').textContent=`${navagraha[i]} ${house} औँ भावमा छ। बसेको भावलाई पहिलो मानेर गन्दा ${offsets.map((n,j)=>`${n} औँ दृष्टि ${houses[j]} औँ भावमा`).join('; ')} पर्छ। उदाहरणको नियम: सुरुको भावलाई समेत गन्तीमा समावेश गर्ने।`;}
$('aspectCalculate').addEventListener('click',calculateAspects);
for(const id of ['aspectPlanet','aspectHouse'])$(id).addEventListener('change',()=>{$('aspectResult').textContent='छनोट बदलिएको छ। नयाँ मानका आधारमा फेरि गणना गर्नुहोस्।';});calculateAspects();
const friendships=[
['चन्द्र, मङ्गल, बृहस्पति','बुध','शुक्र, शनि'],['सूर्य, बुध','मङ्गल, बृहस्पति, शुक्र, शनि','कोही छैन'],
['सूर्य, चन्द्र, बृहस्पति','शुक्र, शनि','बुध'],['सूर्य, शुक्र','मङ्गल, बृहस्पति, शनि','चन्द्र'],
['सूर्य, चन्द्र, मङ्गल','शनि','बुध, शुक्र'],['बुध, शनि','मङ्गल, बृहस्पति','सूर्य, चन्द्र'],
['बुध, शुक्र','बृहस्पति','सूर्य, चन्द्र, मङ्गल']];
$('planetFriendship').textContent=friendships.map((a,i)=>`${navagraha[i]} — मित्र: ${a[0]}; सम: ${a[1]}; शत्रु: ${a[2]}।`).join(' ');


// Chapter 3 formative quiz: question objects retain keys when shuffled.
const chapter3Bank = [["३.१", "परम्परागत कारकत्वमा मन र आमासँग कुन ग्रह जोडिन्छ?", ["चन्द्र", "शनि", "मङ्गल"], 0, "चन्द्रका कारकत्वमा आमा र मन उल्लेख छन्।"], ["३.२", "यस अध्ययन नोटको कक्षागत वर्गीकरणमा शनि कुन समूहमा राखिएको छ?", ["पुरुषकारक", "स्त्रीकारक", "नपुंसक"], 1, "खण्ड ३.२ को कक्षागत तालिकामा शनि स्त्रीकारक छ। बृहत्पाराशरहोराशास्त्रमा शनिलाई नपुंसक मानिएको भिन्न मत पनि नोटले उल्लेख गर्छ।"], ["३.७", "ग्रह-दिशा तालिकामा ईशान (उत्तर-पूर्व) दिशासँग कुन ग्रह सम्बन्धित छ?", ["शुक्र", "बृहस्पति", "शनि"], 1, "खण्ड ३.७ को ग्रह-दिशा तालिकाअनुसार ईशान दिशामा बृहस्पति, आग्नेयमा शुक्र र पश्चिममा शनि छन्। यो परम्परागत ज्योतिषीय सम्बन्ध हो।"], ["३.१", "धर्म, ज्ञान र उच्चशिक्षा कुन ग्रहका कारकत्व हुन्?", ["बृहस्पति", "राहु", "शनि"], 0, "बृहस्पतिका कारकत्वमा धर्म, ज्ञान र उच्चशिक्षा उल्लेख छन्।"], ["३.४", "सूर्य कुन राशिमा उच्च मानिन्छ?", ["सिंह", "मेष", "तुला"], 1, "सूर्य मेषमा उच्च र तुलामा नीच मानिन्छ।"], ["३.४", "चन्द्रको नीच राशि कुन हो?", ["वृश्चिक", "कर्कट", "वृष"], 0, "चन्द्र वृषमा उच्च र वृश्चिकमा नीच मानिन्छ।"], ["३.४", "मङ्गल कुन राशिमा उच्च मानिन्छ?", ["मेष", "कर्कट", "मकर"], 2, "मङ्गल मकरमा उच्च र कर्कटमा नीच मानिन्छ।"], ["३.४", "बुधका लागि उच्च र स्वगृही दुवै हुने राशि कुन हो?", ["मिथुन", "कन्या", "मीन"], 1, "कन्या बुधको उच्च र स्वगृही दुवै राशि हो।"], ["३.५", "नैसर्गिक मित्रताको तालिकामा सूर्यका मित्र कुन ग्रह हुन्?", ["चन्द्र, मङ्गल, बृहस्पति", "बुध, शुक्र, शनि", "शुक्र र शनि"], 0, "अध्ययन नोटको तालिकाअनुसार सूर्यका मित्र चन्द्र, मङ्गल र बृहस्पति हुन्।"], ["३.३", "यस पाठमा बुधलाई शुभ र द्वैत दुवै किन भनिएको छ?", ["बुधको स्थिति वा सङ्गतिअनुसार वर्गीकरण फरक मानिन्छ", "बुध सधैँ क्रूर हुन्छ", "बुधको कुनै कारकत्व हुँदैन"], 0, "अध्ययन नोटमा बुधलाई शुभ ग्रहको सूचीमा राखेर ग्रहसङ्गतिअनुसार द्वैत स्वभाव पनि मानिएको छ।"], ["३.४", "यस पाठमा राहुको नीच राशि कुन भनिएको छ?", ["धनु", "निश्चित उल्लेख छैन", "मिथुन"], 1, "आधार तालिकामा राहुको नीच राशि उल्लेख छैन।"], ["३.६", "मङ्गलका पूर्ण दृष्टि पर्ने स्थानहरू कुन-कुन हुन्?", ["४, ७, ८", "५, ७, ९", "३, ७, १०"], 0, "मङ्गलले आफू बसेको भावलाई पहिलो मानेर गन्दा चौथो, सातौँ र आठौँ स्थानमा पूर्ण दृष्टि गर्छ। सातौँ दृष्टि सामान्य नियम हो; चौथो र आठौँ मङ्गलका विशेष दृष्टि हुन्।"], ["३.६", "बृहस्पतिका पूर्ण दृष्टि पर्ने स्थानहरू कुन-कुन हुन्?", ["३, ७, १०", "५, ७, ९", "४, ७, ८"], 1, "बृहस्पतिले आफू बसेको भावलाई पहिलो मानेर गन्दा पाँचौँ, सातौँ र नवौँ स्थानमा पूर्ण दृष्टि गर्छ। सातौँ सामान्य दृष्टि हो; पाँचौँ र नवौँ बृहस्पतिका विशेष दृष्टि हुन्।"], ["३.६", "शनि चौथो भावमा भए कुन भावमा दृष्टि पर्छ?", ["५, ९, ११", "४, ७, १०", "६, १०, १"], 2, "शनि बसेको चौथो भावलाई पहिलो मानेर गन्दा तेस्रो दृष्टि छैटौँ, सातौँ दृष्टि दशौँ र दशौँ दृष्टि पहिलो भावमा पर्छ।"], ["३.६", "राहु र केतुको दृष्टि गणना किन समावेश गरिएको छैन?", ["स्रोतमा अर्थ स्पष्ट छैन", "दुवै सातौँ मात्र हेर्छन्", "दुवैको दृष्टि ४, ७, ८ हुन्छ"], 0, "अध्ययन नोटको खण्ड ३.६ मा राहु र केतुका लागि ‘आफैँमा’ लेखिएको छ र त्यसको अर्थ [पुष्टि गर्नुपर्ने] भनिएको छ। केही ग्रन्थमा ५, ७, ९ दृष्टिको भिन्न मत रहेको पनि उल्लेख छ। त्यसैले यस अभ्यासमा उनीहरूको दृष्टि गणना निश्चित गरिएको छैन।"]];
const chapter3Form=$('chapter3ExamForm'),chapter3Container=$('chapter3ExamQuestions'),chapter3Results=$('chapter3Results');
function renderChapter3(){chapter3Container.replaceChildren();chapter3Bank.forEach((q,i)=>{const fs=document.createElement('fieldset');fs.className='exam-question';const legend=document.createElement('legend');legend.textContent=`${i+1}. [${q[0]}] ${q[1]}`;fs.append(legend);q[2].forEach((a,j)=>{const label=document.createElement('label');label.className='exam-option';const input=document.createElement('input');input.type='radio';input.name=`ch3q${i}`;input.value=String(j);label.append(input,document.createTextNode(' '+a));fs.append(label);});chapter3Container.append(fs);});chapter3Results.hidden=true;chapter3Results.replaceChildren();updateChapter3Progress();}
function updateChapter3Progress(){let count=0;chapter3Bank.forEach((q,i)=>{if(chapter3Form.querySelector(`input[name="ch3q${i}"]:checked`))count++;});$('chapter3Progress').textContent=`उत्तर दिइएका: ${count}/${chapter3Bank.length}`;}
chapter3Form.addEventListener('change',event=>{updateChapter3Progress();if(event.target.matches('input[type="radio"]')){try{localStorage.removeItem('jyotisha-chapter3-score')}catch(e){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));chapter3Results.hidden=true;chapter3Results.replaceChildren();}});
chapter3Form.addEventListener('submit',event=>{event.preventDefault();const answers=chapter3Bank.map((q,i)=>chapter3Form.querySelector(`input[name="ch3q${i}"]:checked`));if(answers.some(a=>!a)){chapter3Results.textContent=`नतिजा हेर्नुअघि बाँकी ${answers.filter(a=>!a).length} प्रश्नको उत्तर दिनुहोस्।`;chapter3Results.hidden=false;const first=answers.findIndex(a=>!a);const target=chapter3Container.querySelectorAll('fieldset.exam-question')[first];if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});}return;}let score=0;const summary=document.createElement('div');chapter3Bank.forEach((q,i)=>{const ok=Number(answers[i].value)===q[3];if(ok)score++;const line=document.createElement('p');line.textContent=`${i+1}. ${ok?'✓ सही':'✗ सुधार'} · ${q[4]}${ok?'':` सही उत्तर: ${q[2][q[3]]}।`}`;summary.append(line);});const heading=document.createElement('h3');heading.textContent=`नतिजा: ${score}/15 · ${score>=12?'अभ्यास लक्ष्य पूरा':'पुनः अभ्यास सिफारिस'}`;chapter3Results.replaceChildren(heading,summary);chapter3Results.hidden=false;heading.tabIndex=-1;heading.focus({preventScroll:true});try{localStorage.setItem('jyotisha-chapter3-score',JSON.stringify({score,total:15}));}catch(e){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));chapter3Results.scrollIntoView({behavior:'smooth',block:'start'});});
$('chapter3Reset').addEventListener('click',()=>{const prev=chapter3Bank.slice();for(let i=chapter3Bank.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[chapter3Bank[i],chapter3Bank[j]]=[chapter3Bank[j],chapter3Bank[i]];}if(chapter3Bank.every((q,i)=>q===prev[i]))[chapter3Bank[0],chapter3Bank[1]]=[chapter3Bank[1],chapter3Bank[0]];chapter3Form.reset();try{localStorage.removeItem('jyotisha-chapter3-score')}catch(e){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));renderChapter3();const first=chapter3Container.querySelector('fieldset');if(first){first.setAttribute('tabindex','-1');first.focus({preventScroll:true});first.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}});
renderChapter3();

// Chapter 4–5: edited calculator inputs invalidate the previously displayed calculation.
(function(){
 const groups=[
  [['ch4Hours','ch4Minutes'],'ch4Output'],
  [['istBirth','istSunrise','istPrevious'],'istOutput'],
  [['lsCalendar','lsOffset'],'lsResult'],
  [['bhCase','bhIst','bhToday','bhOther'],'bhOutput'],
  [['padaBhayat','padaBhavog'],'padaOutput'],
  [['dbBhayat','dbBhavog','dbLord'],'dbOutput']
 ];
 for(const [inputs,outputId] of groups){
  const output=document.getElementById(outputId);
  if(!output)continue;
  const invalidate=()=>{output.textContent='मान परिवर्तन गरिएको छ। नयाँ नतिजाका लागि फेरि गणना गर्नुहोस्।';};
  for(const id of inputs){const input=document.getElementById(id);if(input)input.addEventListener(input.matches('select,input[type="checkbox"],input[type="radio"]')?'change':'input',invalidate);}
 }
})();

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
 if(previous&&birth>=sun){out.textContent='अघिल्लो दिनको सूर्योदय विकल्पमा जन्मको घडी आजको सूर्योदयभन्दा अघि हुनुपर्छ। आजको सूर्योदय छुट्टै प्रविष्ट नगरिएकाले यो जाँच घडीको तुलनामा आधारित छ; मिति र वास्तविक सूर्योदय पनि पुष्टि गर्नुहोस्।';return;}
 const elapsed=birth-sun+(previous?86400:0);
 // The sunrise-based day has 60 ghadi; reject impossible date/sunrise combinations.
 if(elapsed<0||elapsed>=86400){out.textContent='इष्टकाल ० देखि ६० घडीभन्दा कम हुनुपर्छ। अघिल्लो दिनको सूर्योदय, जन्म मिति र समय फेरि जाँच्नुहोस्।';return;}
 const halfVipala=elapsed*5; // 1 clock second = 2.5 vipala; integer half-vipala units avoid floating-point boundaries
 const ghadi=Math.floor(halfVipala/7200),pala=Math.floor((halfVipala%7200)/120),vipala=(halfVipala%120)/2;
 out.textContent=`${previous?'सूर्योदयअघिको जन्म: जन्म घडीमा २४ घण्टा जोडेर अघिल्लो दिनको प्रविष्ट स्थानीय सूर्योदय घटाइएको छ। ':'उही दिनको स्थानीय सूर्योदयबाट समय गनिएको छ। '}बितेको समय: ${Math.floor(elapsed/3600)} घण्टा ${Math.floor(elapsed%3600/60)} मिनेट ${elapsed%60} सेकेन्ड। इष्टकाल = ${ghadi} घडी ${pala} पला ${Number(vipala.toFixed(2))} विपला।${previous?' यो नतिजा अघिल्लो दिनको सूर्योदय सही प्रविष्ट गरिएको अवस्थामा मात्र मान्य हुन्छ।':''}`;
});
$('istCalculate').click();

// Chapter 4: self-check for the four worked examples in master notes §4.6.
(function(){
 const form=$('ch4ExampleQuiz'),root=$('ch4ExampleQuestions'),feedback=$('ch4ExampleFeedback');
 if(!form||!root||!feedback)return;
 const cases=[
  {name:'दमौली',date:'२०८३ असार ४',answer:[19,25,0]},
  {name:'पाल्पा',date:'२०८३ साउन ४',answer:[13,55,0]},
  {name:'पोखरा',date:'२०८३ साउन १',answer:[6,27,30]},
  {name:'मोरङ (सूर्योदयअघिको शिक्षण उदाहरण)',date:'२०८३ असार २०',answer:[54,35,0]}
 ];
 cases.forEach((item,i)=>{
  const fieldset=document.createElement('fieldset');fieldset.className='exam-question';
  const legend=document.createElement('legend');legend.textContent=`${i+1}. ${item.name} · ${item.date}`;fieldset.append(legend);
  ['घडी','पला','विपला'].forEach((unit,j)=>{
   const label=document.createElement('label');label.textContent=unit+' ';
   const input=document.createElement('input');input.type='number';input.min='0';input.max=j===0?'59':'59';input.step='1';input.required=true;input.name=`ch4-example-${i}-${j}`;input.inputMode='numeric';input.style.maxWidth='7rem';input.setAttribute('aria-label',item.name+' '+unit);
   if(j===2)input.value='0';
   label.append(input);fieldset.append(label);
  });
  root.append(fieldset);
 });
 form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  let correct=0;const lines=[];
  cases.forEach((item,i)=>{
   const entered=item.answer.map((_,j)=>Number(form.elements.namedItem(`ch4-example-${i}-${j}`).value));
   const ok=entered.every((v,j)=>Number.isInteger(v)&&v===item.answer[j]);
   if(ok)correct++;
   lines.push(`${item.name}: ${ok?'सही':'फेरि जाँच्नुहोस्'}। ${ok?'':`स्रोतको गोलाकार मानअनुसार उत्तर ${item.answer[0]} घडी ${item.answer[1]} पला ${item.answer[2]} विपला हो।`}`);
  });
  feedback.textContent=`नतिजा: ${correct}/4। ${lines.join(' ')}`;
  try{localStorage.setItem('jyotisha-chapter4-score',JSON.stringify({score:correct,total:cases.length}))}catch(_){}
  window.dispatchEvent(new Event('jyotisha-assessment-updated'));
 });
 const invalidateChapter4=()=>{try{localStorage.removeItem('jyotisha-chapter4-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));};
 form.addEventListener('reset',()=>{feedback.textContent='';invalidateChapter4();});
 form.addEventListener('input',event=>{
  if(event.target.matches('input[name^="ch4-example-"]')){
   invalidateChapter4();
   if(feedback.textContent)feedback.textContent='उत्तर परिवर्तन गरिएको छ। नयाँ नतिजाका लागि फेरि जाँच्नुहोस्।';
  }
 });
})();
// Chapter 4 local sunrise, minute-rounded signed offset per study notes.
$('lsCalculate').addEventListener('click',()=>{
 const t=$('lsCalendar').value,m=/^([+-])(\d{1,2}):(\d{2})$/.exec($('lsOffset').value.trim()),out=$('lsResult');
 const calendar=istSeconds(t);
 if(calendar===null||!m||Number(m[2])>59||Number(m[3])>59){out.textContent='पात्रोको समय र वेलान्तर जाँच्नुहोस्। वेलान्तरको ढाँचा +07:16 वा -07:52 हो।';return;}
 const signed=(m[1]==='-'?-1:1);
 const offsetSeconds=signed*(Number(m[2])*60+Number(m[3]));
 // Apply the exact seconds first, then round the final local sunrise once.
 // Rounding the calendar time and offset independently can shift the result by a minute.
 const exactLocalSeconds=calendar-4*60-offsetSeconds;
 const adjusted=Math.floor((exactLocalSeconds+30)/60);
 if(adjusted<0||adjusted>=1440){out.textContent='यस अभ्यासको मान्य दायराबाहिर समय आयो। पात्रोको सूर्योदय र वेलान्तर पुनः जाँच्नुहोस्।';return;}
 const hh=String(Math.floor(adjusted/60)).padStart(2,'0'),mm=String(adjusted%60).padStart(2,'0');
 out.textContent=`वेलान्तर ${m[1]}${m[2]} मिनेट ${m[3]} सेकेन्ड। पात्रोको सूर्योदय − ४ मिनेट − (वेलान्तर) = स्थानीय सूर्योदय ${hh}:${mm} (अन्तिम परिणाम नजिकको मिनेटमा गोलाकार)। यो समय इष्टकाल अभ्यासमा प्रविष्ट गर्नुहोस्।`;
});
$('lsCalculate').click();

// Chapter 5: standard cases only; use integer pala to avoid rounding errors.
function bhRead(v){const m=/^(\d{1,2})\s*\/\s*(\d{1,2})$/.exec((v||'').trim());if(!m)return null;const g=Number(m[1]),p=Number(m[2]);return g>=0&&g<=60&&p>=0&&p<60&&!(g===60&&p>0)?g*60+p:null;}
function bhFmt(p){return `${Math.floor(p/60)} घडी ${String(p%60).padStart(2,'0')} पला`;}
function bhUpdateCase(){const choice=$('bhCase').value;$('bhOtherLabel').textContent=choice==='ka'?'भोलिको नक्षत्र अन्त्य-मान (घडी/पला)':choice==='kha'?'हिजोको गत नक्षत्र अन्त्य-मान (घडी/पला)':'भोलि वा हिजोको सम्बन्धित अन्त्य-मान (घडी/पला)';$('bhCaseHelp').textContent=choice==='ka'?'अवस्था क: इष्टकाल आजको अन्त्य-मानभन्दा ठूलो हुनुपर्छ। भोलिको मान प्रविष्ट गर्नुहोस्।':choice==='kha'?'अवस्था ख: इष्टकाल आजको अन्त्य-मानभन्दा सानो हुनुपर्छ। हिजोको गत नक्षत्रको मान प्रविष्ट गर्नुहोस्।':'इष्टकाल र आजको अन्त्य-मान तुलना गरेर अवस्था स्वतः छानिन्छ।';}
$('bhCase').addEventListener('change',bhUpdateCase);bhUpdateCase();
 // Source §5.4: Rohini (22/52, 08/12, next 04/10) => 14/40, 55/58.
 // Source §5.3: Shravana (25/00, 55/19, previous 50/53) => 34/07, 64/26.
 for(const [id,values] of [
  ['bhPresetRohini',['ka','22/52','08/12','04/10']],
  ['bhPresetShravana',['kha','25/00','55/19','50/53']]
 ]){
  const button=document.getElementById(id);
  if(button)button.addEventListener('click',()=>{
   ['bhCase','bhIst','bhToday','bhOther'].forEach((field,j)=>{$(field).value=values[j];});
   bhUpdateCase();
   $('bhCalculate').click();
  });
 }
$('bhCalculate').addEventListener('click',()=>{
 const i=bhRead($('bhIst').value),e=bhRead($('bhToday').value),o=bhRead($('bhOther').value),out=$('bhOutput'),bhPanel=$('bhBhayat'),bbPanel=$('bhBhavog');
 bhPanel.textContent='—';bbPanel.textContent='—';
 if([i,e,o].some(v=>v===null)||i>=3600||e>=3600||o>=3600){out.textContent='कृपया ००/०० देखि ५९/५९ सम्मका घडी/पला सही ढाँचामा राख्नुहोस्।';return;}
 const exactBoundary=i===e; // Revised notes §5.3 assign equality to case 1 (today's nakshatra).
 const a=i>e,choice=$('bhCase').value;
 if((choice==='ka'&&!a)||(choice==='kha'&&a)){out.textContent=`चयन गरिएको अवस्था ${choice==='ka'?'क':'ख'} र प्रविष्ट मान मेल खाँदैनन्। इष्टकाल र E तुलना गरी अवस्था सच्याउनुहोस्।`;return;}
 const bh=a?i-e:3600-o+i,bb=a?3600-e+o:3600-o+e;
 if(bh<0||bb<=0||bh>=bb){out.textContent='भयात भभोगभन्दा कम हुनुपर्छ। प्रविष्ट गरिएको अर्को दिनको मान वा पञ्चाङ्गको अवस्था जाँच्नुहोस्।';return;}
 out.textContent=`${exactBoundary?'सीमा-क्षण: अध्ययन नोटको अवस्था १ अनुसार आजकै नक्षत्र लिइएको छ; वास्तविक पञ्चाङ्गको समय-शुद्धता पुष्टि गर्नुहोस्। ':''}अवस्था ${a?'क':'ख'}: ${a?'इष्टकाल आजको नक्षत्रको अन्त्य-मानभन्दा ठूलो छ, त्यसैले त्यसपछि सुरु भएको नक्षत्र जन्म नक्षत्र हो।':'इष्टकाल आजको नक्षत्रको अन्त्य-मानभन्दा सानो छ, त्यसैले आजको पङ्क्तिमा लेखिएको नक्षत्र नै जन्म नक्षत्र हो।'} भयात = ${a?`${bhFmt(i)} − ${bhFmt(e)}`:`(६० घडी − ${bhFmt(o)}) + ${bhFmt(i)}`} = ${bhFmt(bh)}। भभोग = ${a?`(६० घडी − ${bhFmt(e)}) + ${bhFmt(o)}`:`(६० घडी − ${bhFmt(o)}) + ${bhFmt(e)}`} = ${bhFmt(bb)}। जाँच: भयात भभोगभन्दा सानो छ।`;
 bhPanel.textContent=bhFmt(bh);bbPanel.textContent=bhFmt(bb);
});$('bhCalculate').click();

// Chapter 5 pada presets: one verified Rohini example and one synthetic exact-boundary test.
for(const [id,bhayat,bhavog] of [
 ['padaPresetRohini','14/40','55/58'],
 ['padaPresetBoundary','07/30','30/00']
]){
 const button=document.getElementById(id);
 if(button)button.addEventListener('click',()=>{
  $('padaBhayat').value=bhayat;
  $('padaBhavog').value=bhavog;
  $('padaCalculate').click();
 });
}
// Chapter 5: use vipala integer arithmetic to avoid floating point boundaries.
$('padaCalculate').addEventListener('click',()=>{
 const out=$('padaOutput');const parse=(s)=>{const m=/^\s*(\d{1,2})\s*[/：:]\s*(\d{1,2})\s*$/.exec(s);if(!m)return null;const g=+m[1],p=+m[2];return g<=60&&p<60&&(g<60||p===0)?(g*60+p)*60:null;};
 const a=parse($('padaBhayat').value),b=parse($('padaBhavog').value);
 if(a===null||b===null||b<=0||a<0){out.textContent='मान्य घडी/पला दिनुहोस्। भभोग शून्यभन्दा ठूलो हुनुपर्छ।';return;}
 if(a===b){out.textContent='भयात र भभोग बराबर छन्। यो नक्षत्र परिवर्तनको सीमा-क्षण हो; पञ्चाङ्गबाट पुष्टि नगरी चरण तोकिँदैन।';return;}
 if(a>b){out.textContent='भयात भभोगभन्दा ठूलो छ। दुवै मान र नक्षत्रको अवस्था पुनः जाँच्नुहोस्।';return;}
 const boundary=[1,2,3].find(k=>a*4===b*k);const stage=Math.floor(a*4/b)+1;
 const fmt=(n)=>{const g=Math.floor(n/3600),p=Math.floor((n%3600)/60),v=n%60;return `${g} घडी ${p} पला ${v} विपला`;};
 // Quarter boundaries can contain a fractional vipala; preserve ghadi/pala units.
 const exactFmt=n=>{const g=Math.floor(n/3600),p=Math.floor((n-g*3600)/60),v=Number((n-g*3600-p*60).toFixed(2));return `${g} घडी ${p} पला ${v} विपला`;};
 const bounds=[1,2,3,4].map(k=>`${k} औँ सीमा: ${exactFmt(b*k/4)}`).join(' | ');
 out.textContent=boundary?`भयात ${fmt(a)} ठ्याक्कै ${boundary} औँ चरणको अन्त्य-सीमामा छ। सीमा-क्षणको परम्परागत निर्धारण पुष्टि नगरी निश्चित चरण तोकिएको छैन। एक चरण: ${exactFmt(b/4)}। ${bounds}`:`चरण: ${['पहिलो','दोस्रो','तेस्रो','चौथो'][stage-1]} (${stage}/४)। भयात: ${fmt(a)}। ${a===0?'भयात शून्य भएकाले गणनात्मक रूपमा पहिलो चरणको आरम्भ मानिएको छ। ':''}एक चरण: ${exactFmt(b/4)}। ${bounds}`;
});
$('padaCalculate').click();

// Chapter 5.7: Vimshottari balance. Input is ghadi/pala, output uses 360-day pedagogical year.
const dbPreset=document.getElementById('dbPresetRohini');
if(dbPreset)dbPreset.addEventListener('click',()=>{
 $('dbBhayat').value='14/40';$('dbBhavog').value='55/58';$('dbLord').value='moon';$('dbCalculate').click();
});
const dbYears={sun:6,moon:10,mars:7,rahu:18,jupiter:16,saturn:19,mercury:17,ketu:7,venus:20};
let dbCalculatedTransfer=null;
const dbTransferButton=document.getElementById('dbTransferToCycle');
if(dbTransferButton){
 dbTransferButton.addEventListener('click',()=>{
  if(!dbCalculatedTransfer)return;
  $('cycleLord').value=dbCalculatedTransfer.lord;
  $('cycleBalance').value=String(dbCalculatedTransfer.years);
  $('cycleNakshatra').value='';
  $('cycleNakshatraHelp').textContent='अध्याय ५ बाट दशास्वामी र दशा शेष सारिएको छ। जन्म नक्षत्रको मिलान आवश्यक भए पुनः पुष्टि गर्नुहोस्।';
  renderCycle();
  $('dbTransferHelp').textContent='दशा शेष अध्याय ६ मा सारियो। तलको महादशा क्रम हेर्नुहोस्।';
  const chapter6=document.getElementById('chapter6');
  if(chapter6){chapter6.classList.remove('chapter-focus-hidden');chapter6.scrollIntoView({behavior:'smooth',block:'start'});}
  // Keep the current page mounted so the calculated value survives the transfer.
 });
 for(const id of ['dbBhayat','dbBhavog','dbLord']){
  $(id).addEventListener('input',()=>{
   dbCalculatedTransfer=null;dbTransferButton.disabled=true;
   $('dbTransferHelp').textContent='मान परिवर्तन भएको छ। नयाँ दशा शेष गणना गरेर मात्र सार्नुहोस्।';
  });
  $(id).addEventListener('change',()=>{
   dbCalculatedTransfer=null;dbTransferButton.disabled=true;
  });
 }
}

$('dbCalculate').addEventListener('click',()=>{
 const parse=(s)=>{const m=/^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(s);if(!m)return null;const g=Number(m[1]),p=Number(m[2]);return Number.isInteger(g)&&Number.isInteger(p)&&g>=0&&g<=120&&p>=0&&p<60&&(g<120||p===0)?g*60+p:null;};
 const a=parse($('dbBhayat').value),b=parse($('dbBhavog').value),out=$('dbOutput'),years=dbYears[$('dbLord').value];
 dbCalculatedTransfer=null;
 if(dbTransferButton)dbTransferButton.disabled=true;
 if(a===null||b===null||b<=0||a<0||!years){out.textContent='घडी/पला सही लेख्नुहोस् (जस्तै 14/40)। भभोग शून्यभन्दा ठूलो हुनुपर्छ।';return;}
 if(a===b){out.textContent='भयात र भभोग बराबर छन्। नक्षत्रको अन्त्य-सीमामा शेष शून्य हुन्छ; अर्को नक्षत्र र दशास्वामी पञ्चाङ्गबाट पुष्टि गरेपछि मात्र जन्मदशा निर्धारण गर्नुहोस्।';return;}
 if(a>=3600){out.textContent='भयात एक सूर्योदय-दिनको ६० घडीभन्दा कम हुनुपर्छ।';return;}
 if(a>b){out.textContent='भयात भभोगभन्दा ठूलो छ। पञ्चाङ्गका मान र नक्षत्रको अवस्था जाँच्नुहोस्।';return;}
 const fraction=(b-a)/b,remaining=years*fraction;
 // Use nearest day for a stable, transparent pedagogical conversion.
 const totalDays=Math.round(remaining*360),y=Math.floor(totalDays/360),mo=Math.floor(totalDays%360/30),d=totalDays%30;
 const roundingNote=totalDays===0&&remaining>0?' ध्यान दिनुहोस्: वास्तविक शेष शून्य होइन; एक दिनभन्दा कम अवधि नजिकको पूर्ण दिनमा गोलाकार गर्दा ० दिन देखिएको हो।':'';
 dbCalculatedTransfer={lord:$('dbLord').value,years:remaining};
 if(dbTransferButton){dbTransferButton.disabled=false;$('dbTransferHelp').textContent='गणना पूरा भयो। अध्याय ६ मा यही दशास्वामी र शेष अवधि सार्न सकिन्छ।';}
 out.textContent=`बाँकी नक्षत्र-अंश: ${Math.floor((b-a)/60)}/${String((b-a)%60).padStart(2,'0')} (${b-a} पला) ÷ ${b} पला = ${(fraction*100).toFixed(2)}%। महादशा अवधि: ${years} वर्ष। दशा शेष: ${remaining.toFixed(4)} वर्ष ≈ ${y} वर्ष ${mo} महिना ${d} दिन (३६०-दिने वर्षमा, नजिकको दिनमा गोलाकार)।${roundingNote}`;
});
$('dbCalculate').click();

// Chapter 6.1: canonical 120-year Vimshottari sequence.
const cyclePlanets=[['ketu','केतु',7],['venus','शुक्र',20],['sun','सूर्य',6],['moon','चन्द्र',10],['mars','मङ्गल',7],['rahu','राहु',18],['jupiter','बृहस्पति',16],['saturn','शनि',19],['mercury','बुध',17]];
// Chapter 6: 27 nakshatras in traditional order, each group of nine repeats the same lords.
const nakshatraLords=['ketu','venus','sun','moon','mars','rahu','jupiter','saturn','mercury'];
const nakshatraInput=document.getElementById('cycleNakshatra');
if(nakshatraInput){
 nakshatraInput.addEventListener('change',()=>{
  const n=nakshatraInput.value;
  if(n===''){$('cycleNakshatraHelp').textContent='नक्षत्र नछानेमा तलबाट स्वामी आफैँ चयन गर्नुहोस्।';return;}
  const i=Number(n);
  if(!Number.isInteger(i)||i<0||i>=27)return;
  $('cycleLord').value=nakshatraLords[i%9];
  $('cycleBalance').value='';
  $('cycleNakshatraHelp').textContent='नक्षत्रअनुसार दशास्वामी छानिएको छ। जन्मको दशा शेष अध्याय ५ बाट निकालेर तल प्रविष्ट गर्नुहोस्; खाली छोडे पूरा अवधि देखाइन्छ।';
  renderCycle();
 });
 $('cycleLord').addEventListener('change',()=>{
  nakshatraInput.value='';
  $('cycleNakshatraHelp').textContent='दशास्वामी हातैले परिवर्तन गर्नुभएको छ; नक्षत्रसँगको मिलान फेरि पुष्टि गर्नुहोस्।';
 });
}
function renderCycle(){
 const lord=$('cycleLord').value,raw=$('cycleBalance').value,remaining=raw.trim()===''?null:Number(raw);
 const start=cyclePlanets.findIndex(x=>x[0]===lord),out=$('cycleOutput');
 if(start<0){out.textContent='मान्य महादशाको ग्रह छान्नुहोस्।';return;}
 const full=cyclePlanets[start][2];
 if(remaining!==null&&(!Number.isFinite(remaining)||remaining<0||remaining>full)){out.textContent=`दशा शेष ० देखि ${full} वर्षसम्म हुनुपर्छ।`;return;}
 const first=remaining===null?full:remaining;
 let elapsed=0;const table=document.createElement('table');table.className='data-table';
 const header=document.createElement('tr');['दशा','अवधि (वर्ष)','उमेर: सुरु → अन्त्य'].forEach(s=>{const th=document.createElement('th');th.textContent=s;header.append(th);});table.append(header);
 for(let i=0;i<9;i++){const p=cyclePlanets[(start+i)%9],years=i===0?first:p[2];const row=document.createElement('tr');[p[1]+(i===0?' (शेष)':''),years.toFixed(3),`${elapsed.toFixed(3)} → ${(elapsed+years).toFixed(3)}`].forEach(s=>{const td=document.createElement('td');td.textContent=s;row.append(td);});table.append(row);elapsed+=years;}
 const note=document.createElement('p');note.textContent=`पहिलो महादशाको शेष ${first.toFixed(3)} वर्ष; त्यसपछि आठ पूर्ण महादशा। बाँकी ग्रहको अवधि अर्को चक्रमा जारी रहन्छ।`;
 out.replaceChildren(note,table);
}
$('cycleBalance').addEventListener('input',()=>{$('cycleOutput').textContent='दशा शेष परिवर्तन गरिएको छ। नयाँ दशा क्रम हेर्न फेरि गणना गर्नुहोस्।';});
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
for(const [id,lord] of [['adPresetMoon','moon'],['adPresetSaturn','saturn']]){
 const button=document.getElementById(id);
 if(button)button.addEventListener('click',()=>{$('adLord').value=lord;renderAntardasha();});
}
$('adCalculate').addEventListener('click',renderAntardasha);
$('adLord').addEventListener('change',renderAntardasha);
renderAntardasha();

// Chapter 6.3: exact integer months avoid rounding drift.
function renderTribhagi(){
 const start=cyclePlanets.findIndex(p=>p[0]===$('triLord').value);
 if(start<0){$('triOutput').textContent='पहिलो दशाको मान्य ग्रह छान्नुहोस्।';return;}
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
 const {n,index}=selection,table=document.createElement('table');table.className='data-table';const heading=document.createElement('tr');['योगिनी','ग्रह','वर्ष','सञ्चित वर्ष'].forEach(t=>{const th=document.createElement('th');th.textContent=t;heading.append(th);});table.append(heading);let sum=0;for(let i=0;i<8;i++){const y=yoginis[(index+i)%8];sum+=y[2];const row=document.createElement('tr');[y[0],y[1],String(y[2]),String(sum)].forEach(t=>{const td=document.createElement('td');td.textContent=t;row.append(td);});table.append(row);}const intro=document.createElement('p');intro.textContent=`नक्षत्र क्रम ${n} मा (${n} + ३) ÷ ८ गर्दा शेष ${(n+3)%8} आउँछ। शेष १ देखि ७ भए क्रमशः पहिलोदेखि सातौँ योगिनी, शेष ० भए आठौँ योगिनी लिइन्छ। त्यसैले प्रारम्भिक योगिनी ${yoginis[index][0]} (${yoginis[index][2]} वर्ष) हो। आठ दशाको पूर्ण अवधि जोड्दा ३६ वर्ष हुन्छ। तालिकाको ‘सञ्चित वर्ष’ स्तम्भमा प्रत्येक योगिनीको पूरा अवधि जोडिएको छ; जन्ममा पहिलो योगिनीको दशा शेष कम हुन सक्छ। वास्तविक जन्मपछिको समयक्रम जान्न तल दशा शेष छुट्टै गणना गर्नुहोस्।`;o.replaceChildren(intro,table);}
function yoginiBalance(){const selection=yoginiSelection(),out=$('ygBalanceOutput');if(!selection){out.textContent='पहिले नक्षत्र क्रम १–२७ राख्नुहोस्।';return;}
 const parse=v=>{const m=/^(\d{1,2})\s*\/\s*(\d{1,2})$/.exec(v.trim());if(!m)return null;const g=Number(m[1]),p=Number(m[2]);return g<=60&&p<60&&(g<60||p===0)?g*60+p:null;};const a=parse($('ygBhayat').value),b=parse($('ygBhavog').value);if(a===null||b===null||b<=0||a<0){out.textContent='भयात र भभोग घडी/पला ढाँचामा लेख्नुहोस्, जस्तै 14/40 र 55/58। पला ०–५९ हुनुपर्छ र भभोग शून्यभन्दा ठूलो हुनुपर्छ।';return;}
 if(a===b){out.textContent='भयात र भभोग बराबर छन्। यो नक्षत्र परिवर्तनको सीमा-क्षण हो; जन्म नक्षत्र पुष्टि गरेपछि मात्र योगिनी दशा शेष निकाल्नुहोस्।';return;}
 if(a>b){out.textContent='भयात भभोगभन्दा ठूलो छ। जन्म नक्षत्र सुरु भएको समय र समाप्त भएको समय पञ्चाङ्गबाट पुनः जाँच्नुहोस्।';return;}
 const y=yoginis[selection.index],remaining=(b-a)/b*y[2],totalDays=Math.round(remaining*360),years=Math.floor(totalDays/360),months=Math.floor((totalDays%360)/30),days=totalDays%30;out.textContent=`${y[0]} (${y[1]}) को पूर्ण अवधि ${y[2]} वर्ष। भयात ${Math.floor(a/60)}/${String(a%60).padStart(2,'0')}, भभोग ${Math.floor(b/60)}/${String(b%60).padStart(2,'0')}। बाँकी नक्षत्र अवधि ${b-a} पला। दशा शेष = (${b} − ${a}) ÷ ${b} × ${y[2]} = ${remaining.toFixed(4)} वर्ष ≈ ${years} वर्ष ${months} महिना ${days} दिन (३६०-दिने शैक्षिक वर्ष; नजिकको दिनमा गोलाकार)।${totalDays===0&&remaining>0?' वास्तविक शेष शून्य होइन; एक दिनभन्दा कम अवधि गोलाकार गर्दा ० दिन देखिएको हो।':''}`;}
for(const id of ['ygNak','ygBhayat','ygBhavog']){
 const input=$(id);
 input.addEventListener('input',()=>{
  $('ygOutput').textContent='नक्षत्र क्रम वा मान परिवर्तन गरिएको छ। योगिनी चक्र फेरि गणना गर्नुहोस्।';
  $('ygBalanceOutput').textContent='मान परिवर्तन गरिएको छ। जन्म दशा शेष फेरि गणना गर्नुहोस्।';
 });
}
$('ygCalculate').addEventListener('click',yoginiCycle);$('ygBalance').addEventListener('click',yoginiBalance);yoginiCycle();yoginiBalance();

(function(){const key='jyotisha-pathshala-opened-v3';let opened=[];try{const v=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(v))opened=[...new Set(v.filter(x=>Number.isInteger(x)&&x>=1&&x<=13))]}catch(_){}const cards=[...document.querySelectorAll('.chapter-card[data-chapter]')];function render(){cards.forEach(c=>c.classList.toggle('visited',opened.includes(Number(c.dataset.chapter))));const n=opened.length;document.getElementById('progressCount').textContent=String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)])+' / १३';document.getElementById('progressFill').style.width=(n/13*100)+'%';document.getElementById('progressTrack').setAttribute('aria-valuenow',String(n))}cards.forEach(c=>c.addEventListener('click',()=>{const n=Number(c.dataset.chapter);if(!opened.includes(n)){opened.push(n);try{localStorage.setItem(key,JSON.stringify(opened))}catch(_){}render()}}));document.getElementById('resetProgress').addEventListener('click',()=>{if(!window.confirm('खोलिएका अध्यायको गणना र पछिल्लो अध्ययन स्थान हटाउने? परीक्षाका नतिजा सुरक्षित रहनेछन्।'))return;opened=[];try{localStorage.removeItem(key);localStorage.removeItem('jyotisha-pathshala-last-chapter-v1');localStorage.removeItem('jyotisha-pathshala-ch8-last-lesson-v1')}catch(_){}document.querySelector('.study-resume')?.remove();render()});render()})();

/* v3.1 chapter-focused reading mode. All existing widgets stay mounted. */
(function(){
 const params=new URLSearchParams(window.location.search);
 const chapter=Number(params.get('chapter'));
 if(!Number.isInteger(chapter)||chapter<1||chapter>13)return;
 const groups={"1":["pathshala","practice"],"2":["chapter2","planetExample","chapter2exam"],"3":["chapter3","chapter3exam"],"4":["chapter4","istakala","localSunrise"],"5":["chapter5","padaPractice","dashaBalance"],"6":["chapter6","antardasha","tribhagi","yogini"],"7":["chapter7"],"8":["chapter8"],"9":["chapter9"],"10":["chapter10"],"11":["chapter11"],"12":["chapter12"],"13":["chapter13"]};
 const titles=["","पञ्चाङ्गका आधार","राशि र भाव","ग्रह परिचय","समय गणित","नक्षत्र गणना","दशा पद्धति","कुण्डली कसरी हेर्ने","नाता र भावात् भावम्","स्वभाव, शरीर र स्वास्थ्यका संकेत","धन, कमाइ, परिश्रम र यात्रा","सन्तान र कुण्डली मिलान","ग्रहशान्ति र परम्परागत उपाय","वास्तु: दिशा र परम्परा"];
 const allowed=new Set(groups[chapter]);
 document.body.classList.add('chapter-focus');
 for(const section of document.querySelectorAll('main > section')){
  if(!allowed.has(section.id))section.classList.add('chapter-focus-hidden');
 }
 const main=document.querySelector('main');
 const heroSection=document.getElementById(chapter===1?'pathshala':'chapter'+chapter);
 const chapterHeading=heroSection?.querySelector(':scope > .section-heading');
 if(chapterHeading){chapterHeading.setAttribute('data-chapter-number',String(chapter).padStart(2,'0').replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]));const heading=chapterHeading.querySelector('h2');if(heading){const h1=document.createElement('h1');h1.className='chapter-main-title';h1.innerHTML=heading.innerHTML;heading.replaceWith(h1);}}
 if(chapter===1){const lesson=document.getElementById('lesson');if(lesson)lesson.hidden=false;const tiles=document.querySelector('#pathshala > .cards');if(tiles)tiles.hidden=true;}
 const banner=document.createElement('div');banner.className='chapter-focus-banner';
 const back=document.createElement('a');back.href='index.html#dashboard';back.className='chapter-back';back.textContent='← अध्ययन कक्ष';
 const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent='अध्याय '+String(chapter).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 const actions=document.createElement('div');actions.className='chapter-pager';
 if(chapter>1){const a=document.createElement('a');a.href='index.html?chapter='+(chapter-1);a.textContent='← अघिल्लो अध्याय';actions.append(a)}
 if(chapter<13){const a=document.createElement('a');a.href='index.html?chapter='+(chapter+1);a.textContent='अर्को अध्याय →';actions.append(a)}
 const toc=document.createElement('nav');toc.className='chapter-toc';toc.setAttribute('aria-label','अध्यायका पाठ र अभ्यास');const labels={pathshala:'पञ्चाङ्गका आधार',practice:'पञ्चाङ्ग अभ्यास',chapter2:'राशि र भाव',planetExample:'ग्रहसम्बन्धी अभ्यास',chapter2exam:'राशि र भाव परीक्षा',chapter3:'नवग्रहको परिचय',chapter3exam:'नवग्रह परीक्षा',chapter4:'समय गणना',istakala:'इष्टकाल',localSunrise:'सूर्योदय',chapter5:'नक्षत्र गणना',padaPractice:'नक्षत्र चरण',dashaBalance:'दशा शेष',chapter6:'दशा पद्धति',antardasha:'अन्तर्दशा',tribhagi:'त्रिभागी',yogini:'योगिनी',chapter7:'पाठ तथा अभ्यास',chapter8:'पाठ तथा परीक्षा'};
 for(const id of groups[chapter]){if(chapter>=8)break;const section=document.getElementById(id);if(!section)continue;const heading=section.querySelector('h2,h3');const link=document.createElement('a');link.href='#'+id;link.textContent=labels[id]||(heading?heading.textContent.trim():id);toc.append(link)}
 banner.append(back,eyebrow,actions);if(toc.childElementCount)banner.append(toc);
 // Voluntary lesson-reading marker; separate from assessment and certification.
 const readingKey='jyotisha-chapters-read-v1';
 const readControl=document.createElement('button');readControl.type='button';readControl.className='chapter-read-toggle';
 readControl.setAttribute('aria-label','यस अध्यायको पाठ अध्ययन गरेको अभिलेख');
 const getRead=()=>{try{const v=JSON.parse(localStorage.getItem(readingKey)||'[]');return Array.isArray(v)?v.filter(n=>Number.isInteger(n)&&n>=1&&n<=13):[]}catch(_){return []}};
 const renderRead=()=>{const checked=getRead().includes(chapter);readControl.textContent=checked?'✓ अध्ययन गरेको चिन्ह लगाइएको छ · हटाउनुहोस्':'□ यो अध्याय अध्ययन गरेको चिन्ह लगाउनुहोस्';readControl.setAttribute('aria-pressed',String(checked))};
 readControl.addEventListener('click',()=>{const values=new Set(getRead());if(values.has(chapter))values.delete(chapter);else values.add(chapter);try{localStorage.setItem(readingKey,JSON.stringify([...values].sort((a,b)=>a-b)))}catch(_){}renderRead();window.dispatchEvent(new Event('jyotisha-reading-updated'))});
 renderRead();banner.append(readControl);main.prepend(banner);
 // Unified chapter masthead for all available chapters. Reuse actual chapter headings, never duplicate them.
 const sourceHero=chapter>=8?heroSection?.querySelector(':scope > .ch8-hero, :scope > .ch9-hero'):null;
 const sourceHeading=chapterHeading||sourceHero;
 if(sourceHeading&&heroSection){
  const masthead=document.createElement('header');masthead.className='chapter-editorial-hero';
  const copy=document.createElement('div');copy.className='chapter-editorial-copy';
  const kicker=document.createElement('p');kicker.className='chapter-editorial-kicker';kicker.textContent='ज्योतिष दर्शन · अध्याय '+String(chapter).padStart(2,'0').replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
  const originalTitle=sourceHeading.querySelector('.chapter-main-title,h1,h2');
  const originalSummary=sourceHeading.querySelector('p:not(.eyebrow):not(.ch8-kicker):not(.ch9-kicker)');
  const title=document.createElement('h1');title.className='chapter-main-title';title.textContent=originalTitle?.textContent?.trim()||titles[chapter];
  copy.append(kicker,title);
  if(originalSummary){const summary=document.createElement('p');summary.className='chapter-editorial-summary';summary.textContent=originalSummary.textContent.trim();copy.append(summary)}
  const actionsRow=document.createElement('nav');actionsRow.className='chapter-editorial-actions';actionsRow.setAttribute('aria-label','यस अध्यायका मुख्य विकल्प');
  const lesson=document.createElement('a');lesson.className='chapter-editorial-primary';lesson.href='#'+(chapter===1?'lesson':'chapter'+chapter);lesson.textContent='पाठ अध्ययन गर्नुहोस् →';actionsRow.append(lesson);
  const practiceIds={1:'practice',2:'chapter2exam',3:'chapter3exam',4:'ch4ExampleQuiz',5:'ch5-assessment',6:'ch6-assessment',7:'ch7Quiz',8:'ch8AssessmentPanel',9:'ch9-practice',10:'ch10-assessment',11:'ch11-quiz',12:'ch12-quiz',13:'ch13-quiz'};
  const practiceId=practiceIds[chapter];if(practiceId&&document.getElementById(practiceId)){const practice=document.createElement('a');practice.className='chapter-editorial-secondary';practice.href='#'+practiceId;practice.textContent='अभ्यास / परीक्षा →';actionsRow.append(practice)}
  copy.append(actionsRow);
  const seal=document.createElement('div');seal.className='chapter-editorial-seal';seal.setAttribute('role','img');seal.setAttribute('aria-label','अध्याय '+chapter);
  const sealInner=document.createElement('div');sealInner.className='chapter-editorial-seal-inner';
  const sealLabel=document.createElement('span');sealLabel.textContent='अध्याय';
  const sealNumber=document.createElement('strong');sealNumber.textContent=String(chapter).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
  const sealFoot=document.createElement('span');sealFoot.textContent='ज्योतिष दर्शन';
  sealInner.append(sealLabel,sealNumber,sealFoot);seal.append(sealInner);
  masthead.append(copy,seal);heroSection.insertBefore(masthead,sourceHeading);
  if(sourceHero){const meta=sourceHero.querySelector('.ch8-hero-meta,.ch9-hero-meta');if(meta){const compact=document.createElement('div');compact.className='chapter-editorial-meta';compact.innerHTML=meta.innerHTML;masthead.append(compact)}}
  sourceHeading.remove();heroSection.classList.add('chapter-editorial-section');
 }
 const bottomNav=document.createElement('nav');bottomNav.className='chapter-bottom-nav';bottomNav.setAttribute('aria-label','अध्यायको अन्त्यमा नेभिगेसन');const bottomBack=document.createElement('a');bottomBack.href='index.html#dashboard';bottomBack.className='chapter-back';bottomBack.textContent='← अध्ययन कक्षमा फर्कनुहोस्';bottomNav.append(bottomBack);if(chapter>1){const previousChapter=document.createElement('a');previousChapter.href='index.html?chapter='+(chapter-1);previousChapter.className='chapter-previous-button';previousChapter.textContent='← अघिल्लो अध्याय';previousChapter.setAttribute('aria-label','अघिल्लो अध्याय: '+titles[chapter-1]);bottomNav.append(previousChapter)}if(chapter<13){const nextChapter=document.createElement('a');nextChapter.href='index.html?chapter='+(chapter+1);nextChapter.className='chapter-next-button';nextChapter.textContent='अर्को अध्याय →';nextChapter.setAttribute('aria-label','अर्को अध्याय: '+titles[chapter+1]);bottomNav.append(nextChapter)}main.append(bottomNav);document.title=titles[chapter]+' | ज्योतिष दर्शन';
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
 for(const [key,sections] of Object.entries(ids))for(const id of sections){const panel=document.getElementById(id);if(panel)panel.setAttribute('role','tabpanel');}
 let active='lesson',current=0;
 const qContainer=document.getElementById('chapter2ExamQuestions');
 const pager=document.createElement('div');pager.className='exam-stepper';
 const counter=document.createElement('span');counter.setAttribute('role','status');counter.setAttribute('aria-live','polite');
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
  const btn=document.createElement('button');btn.type='button';btn.className='learning-tab';btn.textContent=label;btn.setAttribute('role','tab');btn.id='chapter2-tab-'+key;btn.setAttribute('aria-controls',ids[key][0]);ids[key].forEach(id=>{const panel=document.getElementById(id);if(panel)panel.setAttribute('aria-labelledby',btn.id)});btn.addEventListener('click',()=>activate(key));tabs.append(btn);buttons[key]=btn;
 }
 tabs.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const keys=['lesson','practice','quiz'];const index=e.key==='Home'?0:e.key==='End'?keys.length-1:(keys.indexOf(active)+(e.key==='ArrowRight'?1:keys.length-1))%keys.length;activate(keys[index],true)});
 const toc=banner.querySelector('.chapter-toc');if(toc)toc.remove();
 banner.append(tabs);
 prev.addEventListener('click',()=>showQuestion(current-1));
 next.addEventListener('click',()=>showQuestion(current+1));
 qContainer.addEventListener('change',()=>{if(current<questions().length-1){next.classList.add('ready-next')}});
 const form=document.getElementById('chapter2ExamForm');
 form.addEventListener('submit',()=>{
  const list=questions();
  const firstMissing=list.findIndex(q=>!q.querySelector('input[type="radio"]:checked'));
  if(firstMissing!==-1){
   pager.hidden=false;
   showQuestion(firstMissing);
   const target=list[firstMissing];
   target.setAttribute('tabindex','-1');
   target.focus({preventScroll:true});
   target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
   return;
  }
  list.forEach(q=>{q.hidden=false;q.classList.remove('question-hidden')});
  pager.hidden=true;
 });
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
 for(const ids of Object.values(mapping))ids.forEach(id=>{const section=document.getElementById(id);if(section)section.setAttribute('role','tabpanel')});
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
  const btn=document.createElement('button');btn.type='button';btn.className='learning-tab';btn.textContent=label;btn.setAttribute('role','tab');btn.id='chapter'+chapter+'-tab-'+key;btn.setAttribute('aria-controls',mapping[key][0]);mapping[key].forEach(id=>{const section=document.getElementById(id);if(section)section.setAttribute('aria-labelledby',btn.id)});btn.addEventListener('click',()=>activate(key));tabs.append(btn);buttons[key]=btn;
 }
 const keys=Object.keys(mapping);
 tabs.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const index=e.key==='Home'?0:e.key==='End'?keys.length-1:(keys.indexOf(active)+(e.key==='ArrowRight'?1:keys.length-1))%keys.length;activate(keys[index],true)});
 const toc=banner.querySelector('.chapter-toc');if(toc)toc.hidden=true;
 banner.append(tabs);
 const syncHash=()=>{const hash=decodeURIComponent(location.hash.slice(1));const matching=Object.entries(mapping).find(([,ids])=>ids.includes(hash));if(matching)activate(matching[0]);};
 activate('lesson');
 syncHash();
 window.addEventListener('hashchange',syncHash);
})();


/* v3.8: Chapter 3 one-question-at-a-time assessment. */
(function(){
 if(new URLSearchParams(location.search).get('chapter')!=='3')return;
 const form=document.getElementById('chapter3ExamForm'),container=document.getElementById('chapter3ExamQuestions');
 if(!form||!container)return;
 const pager=document.createElement('div');pager.className='exam-stepper';
 const prev=document.createElement('button');prev.type='button';prev.textContent='← अघिल्लो प्रश्न';
 const counter=document.createElement('span');counter.setAttribute('role','status');counter.setAttribute('aria-live','polite');
 const next=document.createElement('button');next.type='button';next.textContent='अर्को प्रश्न →';
 pager.append(prev,counter,next);container.after(pager);
 let current=0;
 const questions=()=>[...container.querySelectorAll('fieldset.exam-question')];
 function show(index){
  const list=questions();if(!list.length)return;
  current=Math.max(0,Math.min(index,list.length-1));
  list.forEach((q,i)=>{q.hidden=i!==current;q.classList.toggle('question-hidden',i!==current)});
  counter.textContent='प्रश्न '+(current+1)+' / '+list.length;
  prev.disabled=current===0;next.disabled=current===list.length-1;
 }
 prev.addEventListener('click',()=>show(current-1));
 next.addEventListener('click',()=>show(current+1));
 // If submission is incomplete, take the student to the first unanswered question.
 form.addEventListener('submit',()=>{
  const list=questions();
  const firstMissing=list.findIndex((q,i)=>!form.querySelector('input[name="ch3q'+i+'"]:checked'));
  if(firstMissing!==-1){
   show(firstMissing);
   // The original submit handler runs first; focus only after the unanswered fieldset is visible.
   const target=list[firstMissing];
   target.setAttribute('tabindex','-1');
   target.focus({preventScroll:true});
   target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
   return;
  }
  // The existing result panel already provides the complete answer review.
  show(current);
 });
 document.getElementById('chapter3Reset').addEventListener('click',()=>queueMicrotask(()=>show(0)));
 show(0);
})();


/* v4.0: Accessible collapsible practice tools in chapters 4–6. */
(function(){
 const chapter=Number(new URLSearchParams(location.search).get('chapter'));
 const groups={4:['istakala','localSunrise'],5:['padaPractice','dashaBalance'],6:['antardasha','tribhagi','yogini']};
 if(!groups[chapter])return;
 const panels=groups[chapter].map(id=>document.getElementById(id)).filter(Boolean);
 const expanded=new Set();
 function setOpen(section,open){
  section.classList.toggle('practice-panel-open',open);
  const button=section.querySelector('.practice-panel-toggle');
  if(button)button.setAttribute('aria-expanded',String(open));
  for(const child of section.children){if(child.classList.contains('section-heading'))continue;child.hidden=!open;}
  if(open)expanded.add(section.id);else expanded.delete(section.id);
 }
 panels.forEach((section,index)=>{
  const heading=section.querySelector(':scope > .section-heading');
  if(!heading)return;
  const h=heading.querySelector('h2');
  if(!h)return;
  const button=document.createElement('button');
  button.type='button';button.className='practice-panel-toggle';
  button.setAttribute('aria-expanded','false');
  const label=document.createElement('span');label.textContent=h.textContent.trim();
  const chevron=document.createElement('span');chevron.className='practice-panel-chevron';chevron.setAttribute('aria-hidden','true');chevron.textContent='⌄';
  button.append(label,chevron);
  h.replaceChildren(button);
  button.addEventListener('click',()=>setOpen(section,!expanded.has(section.id)));
  setOpen(section,false);
 });
 const hash=decodeURIComponent(location.hash.slice(1));
 if(groups[chapter].includes(hash)){const target=document.getElementById(hash);if(target)setOpen(target,true);}
})();

/* v4.2: Chapter 7 house-lord identification and formative assessment. */
(function(){
 const asc=document.getElementById('ch7Asc'),rows=document.getElementById('ch7LordRows');
 if(!asc||!rows)return;
 const type=n=>[1,4,7,10].includes(n)?'केन्द्र':[5,9].includes(n)?'त्रिकोण':[6,8,12].includes(n)?'दुःस्थान':'अन्य';
 function render(){
  const first=Number(asc.value);
  rows.replaceChildren();
  for(let house=1;house<=12;house++){
   const sign=(first+house-1)%12,tr=document.createElement('tr');
   for(const value of [String(house),signs[sign],lords[sign],type(house)]){
    const td=document.createElement('td');td.textContent=value;tr.append(td);
   }
   rows.append(tr);
  }
 }
 asc.addEventListener('change',render);render();

 const quiz=document.getElementById('ch7Quiz'),feedback=document.getElementById('ch7Feedback');
 const questions=[
  {q:'मेष लग्नको लग्नेश कुन ग्रह हो?',choices:['शनि','मङ्गल','बृहस्पति'],correct:1,why:'मेष राशिको स्वामी मङ्गल भएकाले मेष लग्नको लग्नेश मङ्गल हो।'},
  {q:'मेष लग्नमा दशौँ भाव मकर हो। दशमेश कुन ग्रह हो?',choices:['मङ्गल','शनि','शुक्र'],correct:1,why:'मकरको स्वामी शनि हो। दशौँ भावमा मङ्गल बसे पनि दशमेश शनि नै रहन्छ।'},
  {q:'अभ्यास कुण्डलीमा दशौँ भावमा बसेको ग्रह कुन हो?',choices:['मङ्गल','शनि','चन्द्र'],correct:0,why:'दशौँ भावमा मङ्गल बसेको छ। भावमा बसेको ग्रह र भावको स्वामी छुट्टाछुट्टै पहिचान गर्नुपर्छ।'},
  {q:'तलका कुन भावहरू केन्द्र हुन्?',choices:['१, ४, ७, १०','२, ५, ८, ११','३, ६, ९, १२'],correct:0,why:'केन्द्र भावहरू १, ४, ७ र १० हुन्। यस पाठमा ५ र ९ लाई लग्नबाहेकका त्रिकोण भाव भनिएको छ।'},
  {q:'चौथो भावमा रहेको बृहस्पतिको सातौँ दृष्टि कुन भावमा पर्छ?',choices:['आठौँ','दशौँ','बाह्रौँ'],correct:1,why:'ग्रह बसेको चौथो भावलाई पहिलो मानेर सात स्थान गन्दा दशौँ भाव पुगिन्छ।'},
  {q:'यस अभ्यासमा मकर राशिमा बसेको मङ्गलको अवस्था के हो?',choices:['नीच','स्वगृही','उच्च'],correct:2,why:'परम्परागत उच्च–नीच वर्गीकरणमा मङ्गल मकर राशिमा उच्च मानिन्छ।'},
  {q:'कुनै भावमा ग्रह नदेखिँदा पहिलो अध्ययन कदम के हो?',choices:['त्यस भावको फल छैन भन्नु','भावेशको स्थिति र सम्बन्ध जाँच्नु','भावलाई अध्ययनबाट हटाउनु'],correct:1,why:'खाली भावको अध्ययनमा पनि त्यसको स्वामी, स्थिति र दृष्टि जाँचिन्छ।'},
  {q:'केवल यस अपूर्ण अभ्यास कुण्डलीबाट कुन निष्कर्ष उचित हुन्छ?',choices:['निश्चित पेशा घोषणा गर्नु','आयको रकम निश्चित गर्नु','उपलब्ध ग्रहस्थिति र दृष्टि लेखेर सीमित टिप्पणी गर्नु'],correct:2,why:'अपूर्ण ग्रहस्थितिबाट निश्चित जीवनघटना निकाल्नु उचित हुँदैन। स्रोतमा दिइएका सम्बन्धसम्म मात्र व्याख्या सीमित राख्नुपर्छ।'}
 ];
 const fieldsets=quiz.querySelectorAll('fieldset');
 fieldsets.forEach(f=>f.remove());
 questions.forEach((item,i)=>{
  const fs=document.createElement('fieldset'),legend=document.createElement('legend');
  legend.textContent=(i+1)+'. '+item.q;fs.append(legend);
  item.choices.forEach((choice,j)=>{
   const label=document.createElement('label');label.className='ch7-choice';
   const radio=document.createElement('input');radio.type='radio';radio.name='ch7q'+i;radio.value=String(j);
   label.append(radio,document.createTextNode(' '+choice));fs.append(label);
  });
  quiz.insertBefore(fs,quiz.querySelector('button[type="submit"]'));
 });
 quiz.addEventListener('submit',event=>{
  event.preventDefault();let score=0;const explanations=[];let missing=0;
  questions.forEach((item,i)=>{
   const answer=quiz.querySelector('input[name="ch7q'+i+'"]:checked');
   if(!answer){missing++;return;}
   const correct=Number(answer.value)===item.correct;if(correct)score++;
   explanations.push((i+1)+'. '+(correct?'सही। ':'पुनः हेर्नुहोस्। ')+item.why);
  });
  if(missing){feedback.textContent='सबै आठ प्रश्नको उत्तर छान्नुहोस्। अझै '+missing+' प्रश्न बाँकी छन्।';return;}
  try{localStorage.setItem('jyotisha-chapter7-score',JSON.stringify({score,total:questions.length}))}catch(_){}
  window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  feedback.replaceChildren();
  const summary=document.createElement('strong');
  summary.textContent='प्राप्त अङ्क: '+score+' / '+questions.length+'।';
  const list=document.createElement('ol');
  list.className='ch7-answer-explanations';
  explanations.forEach(line=>{const item=document.createElement('li');item.textContent=line.slice(line.indexOf('. ')+2);list.append(item)});
  feedback.append(summary,list);
 });
 quiz.addEventListener('change',event=>{if(event.target.matches('input[type="radio"]')){try{localStorage.removeItem('jyotisha-chapter7-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));feedback.textContent='उत्तर परिवर्तन गरिएको छ। सबै उत्तर जाँच्नुहोस्।';}});
})();

/* v4.3: Accessible North Indian-style chart, using only known placements from notes p.64. */
(function(){
 const svg=document.getElementById('ch7Chart'),detail=document.getElementById('ch7HouseDetail'),buttons=document.getElementById('ch7HouseButtons');
 if(!svg||!detail||!buttons)return;
 const ns='http://www.w3.org/2000/svg';
 const shapes=[
 ['200,0 300,100 200,200 100,100',200,77],
 ['0,0 200,0 100,100',100,35],
 ['0,0 100,100 0,200',36,103],
 ['0,200 100,100 200,200 100,300',74,196],
 ['0,200 100,300 0,400',35,299],
 ['0,400 100,300 200,400',100,336],
 ['200,400 100,300 200,200 300,300',200,276],
 ['200,400 300,300 400,400',300,336],
 ['400,400 300,300 400,200',365,299],
 ['400,200 300,100 200,200 300,300',326,196],
 ['400,200 300,100 400,0',365,103],
 ['400,0 300,100 200,0',300,35]
 ];
 const planets={1:['शनि'],4:['बृहस्पति'],6:['शुक्र'],7:['चन्द्र'],10:['मङ्गल']};
 const strengths={शनि:'नीच',बृहस्पति:'उच्च',शुक्र:'नीच',चन्द्र:'सम',मङ्गल:'उच्च'};
 const aspects={1:['चन्द्र','मङ्गल'],3:['शनि'],4:['मङ्गल'],5:['मङ्गल'],7:['शनि'],8:['बृहस्पति'],10:['शनि','बृहस्पति'],12:['शुक्र','बृहस्पति']};
 const svgNode=(tag,attrs)=>{const n=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));return n};
 const frame=svgNode('rect',{x:1,y:1,width:398,height:398,fill:'none',stroke:'#314d58','stroke-width':2});svg.append(frame);
 svg.setAttribute('aria-label','मेष लग्नको अध्ययन कुण्डली। बाह्र भावमध्ये कुनै भाव छान्न ट्याब र इन्टर वा स्पेस प्रयोग गर्नुहोस्।');
 let active=1;
 function show(house){
  active=house;const sign=(house-1)%12,found=planets[house]||[],seen=aspects[house]||[];
  const rows=[['भाव',String(house)],['राशि',signs[sign]+' ('+(sign+1)+')'],['भावेश',lords[sign]],['भाव प्रकार',house===1?'केन्द्र र त्रिकोण (लग्न)':[4,7,10].includes(house)?'केन्द्र':[5,9].includes(house)?'त्रिकोण':[6,8,12].includes(house)?'दुःस्थान':'अन्य'],['ग्रहस्थिति',found.length?found.map(p=>p+' ('+strengths[p]+')').join(', '):'नोटमा ग्रहस्थिति दिइएको छैन'],['यस भावमा दृष्टि',seen.length?seen.join(', ') :'यस उदाहरणमा स्थान दिइएका पाँच ग्रहबाट यस भावमा कुनै दृष्टि पर्दैन; स्थान नखुलेका ग्रहको दृष्टि गणना गरिएको छैन']];
  detail.replaceChildren();const heading=document.createElement('h4');heading.textContent='भाव '+house+' · '+signs[sign];detail.append(heading);
  const dl=document.createElement('dl');for(const [key,value] of rows){const dt=document.createElement('dt');dt.textContent=key;const dd=document.createElement('dd');dd.textContent=value;dl.append(dt,dd)}detail.append(dl);
  svg.querySelectorAll('[data-house]').forEach(el=>{const selected=Number(el.dataset.house)===house;el.setAttribute('aria-pressed',String(selected));el.classList.toggle('selected',selected)});
  buttons.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.house)===house)));
 }
 shapes.forEach(([points,x,y],i)=>{
  const house=i+1,group=svgNode('g',{'data-house':house,role:'button',tabindex:0,'aria-controls':'ch7HouseDetail','aria-label':'भाव '+house+', राशि '+signs[i]+', '+(planets[house]?planets[house].join(' र '):'ग्रहस्थिति नखुलेको'),'aria-pressed':'false'});
  const polygon=svgNode('polygon',{points,class:'ch7-chart-house'}),label=svgNode('text',{x,y,'text-anchor':'middle',class:'ch7-chart-label'});
  const a=svgNode('tspan',{x,dy:0});a.textContent='भाव '+String(house);const b=svgNode('tspan',{x,dy:17});b.textContent='राशि '+String(i+1);
  label.append(a,b);group.append(polygon,label);
  if(planets[house]){const p=svgNode('text',{x,y:y+33,'text-anchor':'middle',class:'ch7-chart-planet'});p.textContent=planets[house].join('·');group.append(p)}
  group.addEventListener('click',()=>show(house));group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(house)}});
  svg.append(group);
  const button=document.createElement('button');button.type='button';button.dataset.house=String(house);button.textContent='भाव '+house;button.setAttribute('aria-controls','ch7HouseDetail');button.setAttribute('aria-label','भाव '+house+', '+signs[i]+' राशि: विवरण हेर्नुहोस्');button.addEventListener('click',()=>show(house));buttons.append(button);
 });show(1);
})();

/* v4.4: Source-grounded interpretive reasoning with explanatory feedback. */
(function(){
 const select=document.getElementById('ch7ReasonQuestion'),fieldset=document.getElementById('ch7ReasonChoices'),check=document.getElementById('ch7ReasonCheck'),feedback=document.getElementById('ch7ReasonFeedback');
 if(!select||!fieldset||!check||!feedback)return;
 const tasks={
  lord:{prompt:'दशौँ भावको स्वामी र त्यहाँ बसेको ग्रहबारे कुन कथन सही छ?',options:[
   'मङ्गल दशौँ भावमा छ, त्यसैले दशौँ भावको स्वामी पनि मङ्गल हो।',
   'दशौँ भाव मकर हो, यसको स्वामी शनि हो; उदाहरणमा त्यस भावमा मङ्गल बसेको छ।',
   'शनि पहिलो भावमा छ, त्यसैले दशौँ भावको स्वामी बृहस्पति हो।'
  ],correct:1,why:'मेष लग्नमा दशौँ भाव मकर राशिमा पर्छ। मकरको राशिस्वामी शनि हो। पृष्ठ ६४ को अभ्यासमा मङ्गल दशौँ भावमा उच्च अवस्थामा बसेको छ। भावेश र भावमा बसेको ग्रह फरक हुन्।'},
  aspects:{prompt:'पृष्ठ ६४ को उदाहरणमा दशौँ भावबारे कुन निष्कर्ष स्रोतले समर्थन गर्छ?',options:[
   'शनि र बृहस्पति दुवैको दृष्टि दशौँ भावमा पर्छ, त्यसैले दुवै संकेतलाई विचार गर्नुपर्छ।',
   'दशौँ भावमा कुनै ग्रहको दृष्टि पर्दैन।',
   'दशौँ भावमा केवल चन्द्रको दृष्टि पर्छ।'
  ],correct:0,why:'पहिलो भावको शनिको दशौँ दृष्टि र चौथो भावको बृहस्पतिको सातौँ दृष्टि दशौँ भावमा पुग्छ। पृष्ठ ६४ ले दुवैलाई सँगै विचार गरेको छ।'},
  limits:{prompt:'उदाहरणमा सूर्यलगायत केही ग्रहहरूको स्थिति दिइएको छैन। अध्ययनका लागि कुन निष्कर्ष उपयुक्त छ?',options:[
   'सूर्यको स्थिति थाहा नभए पनि सबै योग र दशाको अन्तिम फल निश्चित गर्न सकिन्छ।',
   'खाली देखिएका सबै भावमा कुनै ग्रह छैन भन्ने प्रमाणित हुन्छ।',
   'उपलब्ध ग्रहस्थितिबाट सीमित अभ्यास गर्न सकिन्छ, तर नदिइएका ग्रहस्थान र पूर्ण योगको निष्कर्ष अनुमान गर्नु हुँदैन।'
  ],correct:2,why:'नोटको अभ्यास कुण्डली पूर्ण जन्मकुण्डली होइन। पृष्ठ ६४ मा सूर्यको स्थान नदिइएको उल्लेख छ। त्यसैले उपलब्ध प्रमाणभन्दा बाहिरको ग्रहस्थिति वा योग अनुमान गर्नु उचित हुँदैन।'}
 };
 function render(){
  const task=tasks[select.value];fieldset.replaceChildren();
  const legend=document.createElement('legend');legend.textContent=task.prompt;fieldset.append(legend);
  task.options.forEach((option,i)=>{const label=document.createElement('label');label.className='ch7-choice';const radio=document.createElement('input');radio.type='radio';radio.name='ch7reason';radio.value=String(i);label.append(radio,document.createTextNode(' '+option));fieldset.append(label)});
  feedback.replaceChildren();
 }
 select.addEventListener('change',render);
 check.addEventListener('click',()=>{
  const selected=fieldset.querySelector('input[name="ch7reason"]:checked');feedback.replaceChildren();
  if(!selected){feedback.textContent='उत्तर जाँच्नुअघि उपलब्ध निष्कर्षमध्ये एउटा छान्नुहोस्।';return}
  const task=tasks[select.value],correct=Number(selected.value)===task.correct;
  const heading=document.createElement('strong');heading.textContent=correct?'सही तर्क।':'यो निष्कर्ष स्रोतसँग मिलेन।';
  const explanation=document.createElement('p');explanation.textContent=task.why;
  feedback.append(heading,explanation);
 });
 render();
})();

/* Chapter 8, part 1: count inclusively from a reference house. */
(function(){
 const base=document.getElementById('ch8Base'),steps=document.getElementById('ch8Steps'),result=document.getElementById('ch8Result'),quiz=document.getElementById('ch8Quiz');
 if(!base||!steps||!result)return;
 for(let n=1;n<=12;n++){for(const el of [base,steps]){const o=document.createElement('option');o.value=String(n);o.textContent=String(n);el.append(o)}}
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);const update=()=>{const a=Number(base.value),b=Number(steps.value),house=((a+b-2)%12)+1;result.textContent='आधार '+nep(a)+'औँ भावलाई पहिलो मानेर '+nep(b)+' स्थान गन्नुहोस्। क्रम: '+Array.from({length:b},(_,i)=>nep(((a+i-1)%12)+1)).join(' → ')+'। उत्तर: '+nep(house)+'औँ भाव।'};
 base.value='4';steps.value='3';base.addEventListener('change',update);steps.addEventListener('change',update);
 document.querySelectorAll('[data-ch8-example]').forEach(button=>button.addEventListener('click',()=>{const examples={mother:[4,3],spouse:[7,2],grandchild:[5,5],father:[4,9]};const v=examples[button.dataset.ch8Example];if(!v)return;base.value=String(v[0]);steps.value=String(v[1]);update()}));
 if(quiz)quiz.addEventListener('submit',e=>{e.preventDefault();const chosen=quiz.querySelector('input[name="ch8q"]:checked'),feedback=document.getElementById('ch8Feedback');feedback.textContent=!chosen?'पहिले उत्तर छान्नुहोस्।':chosen.value==='10'?'सही। ७ + ४ − १ = १०। जीवनसाथीको आमालाई दशौँ भावबाट हेर्ने उदाहरण हो।':'फेरि गन्नुहोस्: सातौँ भावलाई १ मानेर चार स्थान गन्नुहोस्।'});
 update();
})();

/* Chapter 8: distinguishing stated rules from unresolved source wording. */
(function(){
 const form=document.getElementById('ch8SourceQuiz'),feedback=document.getElementById('ch8SourceFeedback');
 if(!form||!feedback)return;
 form.addEventListener('submit',e=>{e.preventDefault();const checked=form.querySelector('input[name="ch8source"]:checked');feedback.textContent=!checked?'उत्तर जाँच्नुअघि एउटा विकल्प छान्नुहोस्।':checked.value==='b'?'सही। परम्परागत प्रतीकमा राहु शिर वा माथिल्लो भाग र केतु शिरविहीन शरीर वा तल्लो भागसँग सम्बन्धित छन्। त्यसैले माथिल्लो र तल्लो तलाको व्याख्या गरिएको हो। यो वास्तविक सम्पत्ति प्राप्तिको प्रमाण होइन।':'राहु र केतुको शिर तथा शरीरसँगको प्रतीकात्मक सम्बन्ध विचार गर्नुहोस्। यो सांस्कृतिक व्याख्या हो, निश्चित भविष्यवाणी होइन।'});
})();

/* Chapter 8.5: verify the sequence in the reference notes' fourth-house reading. */
(function(){
 const form=document.getElementById('ch8ComfortQuiz'),feedback=document.getElementById('ch8ComfortFeedback');
 if(!form||!feedback)return;
 form.addEventListener('submit',e=>{e.preventDefault();const checked=form.querySelector('input[name="ch8comfort"]:checked');feedback.textContent=!checked?'पहिले उत्तर छान्नुहोस्।':checked.value==='a'?'सही। अध्ययन सामग्रीअनुसार पहिले लग्न र लग्नेश हेर्ने, त्यसपछि चौथो भाव र चन्द्रमाको अवस्था जाँच्ने।':'फेरि हेर्नुहोस्। पृष्ठ ७४ मा लग्न र लग्नेश हेरेपछि चौथो भाव जाँच्ने भनिएको छ।'});
})();

/* Chapter 8.6: Mars-reference inclusive house counting, not predictive inference. */
(function(){
 const mars=document.getElementById('ch8MarsHouse'),order=document.getElementById('ch8SiblingOrder'),result=document.getElementById('ch8SiblingResult'),quiz=document.getElementById('ch8SiblingQuiz');
 if(!mars||!order||!result)return;
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 for(let i=1;i<=12;i++){const option=document.createElement('option');option.value=String(i);option.textContent=nep(i);mars.append(option)}
 const render=()=>{const a=Number(mars.value),n=Number(order.value),house=((a+n-2)%12)+1;result.textContent='मङ्गल '+nep(a)+'औँ भावमा छ। त्यसलाई पहिलो मानेर '+nep(n)+' स्थान गन्दा: '+Array.from({length:n},(_,i)=>nep(((a+i-1)%12)+1)).join(' → ')+'। उत्तर: '+nep(house)+'औँ भाव। यसबाट भाइबहिनीको संख्या वा अवस्था निश्चित हुँदैन।'};
 mars.value='6';mars.addEventListener('change',render);order.addEventListener('change',render);render();
 if(quiz)quiz.addEventListener('submit',e=>{e.preventDefault();const answer=quiz.querySelector('input[name="ch8sibling"]:checked'),feedback=document.getElementById('ch8SiblingFeedback');feedback.textContent=!answer?'पहिले उत्तर छान्नुहोस्।':answer.value==='8'?'सही। छैटौँबाट तेस्रो: ६ + ३ − १ = ८।':'फेरि गन्नुहोस्: छैटौँ भावलाई पहिलो मान्दा सातौँ दोस्रो र आठौँ तेस्रो हुन्छ।'});
})();

/* Chapter 8.7: identify a traditional relocation rule without predicting outcomes. */
(function(){
 const form=document.getElementById('ch8ResidenceQuiz'),feedback=document.getElementById('ch8ResidenceFeedback');
 if(!form||!feedback)return;
 form.addEventListener('submit',e=>{e.preventDefault();const answer=form.querySelector('input[name="ch8residence"]:checked');feedback.textContent=!answer?'पहिले उत्तर छान्नुहोस्।':answer.value==='b'?'सही। अध्ययन सामग्रीमा चतुर्थेश र लग्नेश बाह्रौँ भावमा हुँदा विदेशमा स्वेच्छिक बसाइको परम्परागत संकेत भनिएको छ। यसलाई वास्तविक बसाइँसराइ निश्चित हुने प्रमाण मान्नु हुँदैन।':'फेरि जाँच्नुहोस्। नोटमा सप्तमलाई स्वदेशभित्र र बाह्रौँलाई विदेशसँग जोडिएको छ।'});
})();

/* Chapter 8.8: identify house-origin context in the reference notes' example. */
(function(){
 const form=document.getElementById('ch8ConflictQuiz'),feedback=document.getElementById('ch8ConflictFeedback');
 if(!form||!feedback)return;
 form.addEventListener('submit',e=>{e.preventDefault();const answer=form.querySelector('input[name="ch8conflict"]:checked');feedback.textContent=!answer?'पहिले उत्तर छान्नुहोस्।':answer.value==='a'?'सही। शुक्र दोस्रो र सातौँ भावको स्वामी भएकाले धन र दाम्पत्यको प्रसङ्ग जोडिएको छ।':'फेरि हेर्नुहोस्। शुक्रको दोस्रो र सातौँ भावको स्वामित्वसँग जोडिएका विषय पहिचान गर्नुहोस्।'});
})();

/* Chapter 8 comprehensive assessment: source comprehension, not divination. */
(function(){
 const form=document.getElementById('ch8Assessment'),mount=document.getElementById('ch8AssessmentQuestions'),summary=document.getElementById('ch8AssessmentSummary'),reset=document.getElementById('ch8AssessmentReset');
 if(!form||!mount||!summary||!reset)return;
 summary.setAttribute('role','status');
 summary.setAttribute('aria-live','polite');
 summary.setAttribute('aria-atomic','true');
 const questions=[
 {q:'८.१: यस अध्यायको स्रोत-तालिकामा लग्नबाट बुवाको स्थान कुन भाव दिइएको छ?',a:['नवौँ','दशौँ','बाह्रौँ'],correct:1,why:'पृष्ठ ७१ को स्रोत-तालिकामा लग्नबाट दशौँ र सूर्यबाट नवौँ उल्लेख छ। अन्य परम्परामा लग्नबाट नवौँलाई पितृभाव मान्ने मत पनि पाइन्छ; यो प्रश्न यही स्रोत-तालिका बुझ्नका लागि हो।'},
 {q:'८.२: आमाको भाइ (मामा) चौथो भावबाट तेस्रो गन्दा कुन भाव?',a:['पाँचौँ','छैटौँ','सातौँ'],correct:1,why:'४ + ३ − १ = ६। आधार भावलाई १ मानेर गनिन्छ।'},
 {q:'८.३: यस पाठमा राहु र केतुलाई घरको माथिल्लो र तल्लो तलासँग जोड्ने प्रतीकात्मक व्याख्या कुन हो?',a:['दुवै एउटै तलाका प्रतीक भएकाले','राहु शिर वा माथिल्लो भाग र केतु शिरविहीन शरीर वा तल्लो भागसँग जोडिने भएकाले','यसले सम्पत्तिको कानुनी स्वामित्व निश्चित गर्ने भएकाले'],correct:1,why:'पृष्ठ ७२ र ७६ का कथनलाई जोडेर हेर्दा राहुको शिर र केतुको शिरविहीन शरीरसँगको प्रतीकात्मक सम्बन्धले माथिल्लो र तल्लो तलाको व्याख्या गर्छ। यो प्रतीकात्मक कारण मूल नोटमा शब्दशः दिइएको छैन; पाठमा थपिएको व्याख्या हो, सम्पत्तिको वास्तविक नियम होइन।'},
 {q:'८.४: पारिवारिक संस्कार हेर्दा नोटमा मुख्यतः कुन भाव र स्वामी जोडिएका छन्?',a:['दोस्रो भाव र द्वितीयेश','दशौँ भाव मात्र','आठौँ भाव मात्र'],correct:0,why:'पृष्ठ ७३ मा दोस्रो भाव र द्वितीयेशको बललाई परिवारको परम्परा र संस्कारसँग जोडिएको छ। यो ज्योतिषीय अध्ययनको परम्परागत सम्बन्ध हो; व्यक्तिको संस्कारको स्वतन्त्र प्रमाण होइन।'},
 {q:'८.५: चौथो भावको अध्ययन गर्नुअघि नोटमा कुन आधार जाँच्न भनिएको छ?',a:['घातबार मात्र','लग्न र लग्नेश','छैटौँ मात्र'],correct:1,why:'पृष्ठ ७४: पहिले लग्न र लग्नेश, त्यसपछि चौथो भाव र चन्द्रमाको अवस्था।'},
 {q:'८.६: मङ्गल छैटौँमा हुँदा मङ्गलबाट तेस्रो कुन भाव?',a:['सातौँ','आठौँ','नवौँ'],correct:1,why:'६ + ३ − १ = ८। यो गणनाले वास्तविक भाइबहिनीको अवस्था निर्धारण गर्दैन।'},
 {q:'८.७: चतुर्थेश र लग्नेश बाह्रौँमा हुँदा नोटमा कुन परम्परागत संकेत छ?',a:['स्वदेशभित्र बसाइ','विदेशमा स्वेच्छिक बसाइ','घर निर्माण निश्चित'],correct:1,why:'पृष्ठ ७६ मा सप्तमलाई स्वदेशभित्र र बाह्रौँलाई विदेश बसाइसँग जोडिएको छ। यो अध्ययन नोटमा उल्लिखित परम्परागत व्याख्या हो; यसबाट कुनै व्यक्तिको वास्तविक बसाइँसराइ निश्चित हुँदैन।'},
 {q:'८.८: मेष लग्नको छैटौँमा शुक्र दोस्रो र सातौँको स्वामी हुँदा उदाहरणले के जोड्छ?',a:['धन र दाम्पत्य','केवल दशौँ','केवल नक्षत्र'],correct:0,why:'पृष्ठ ७७: शुक्रको दोस्रो र सातौँ भावको स्वामित्वबाट धन र दाम्पत्य प्रसङ्ग जोडिएको छ। भावस्वामित्वले अध्ययनको विषय पहिचान गर्छ; यसले वास्तविक आर्थिक वा वैवाहिक परिणाम निश्चित गर्दैन।'}
 ];
 questions.forEach((item,i)=>{
  const field=document.createElement('fieldset');field.className='ch8-assessment-item';
  const legend=document.createElement('legend');legend.textContent=item.q;field.append(legend);
  item.a.forEach((option,j)=>{const label=document.createElement('label');label.className='ch7-choice';const input=document.createElement('input');input.type='radio';input.name='ch8assessment'+i;input.value=String(j);label.append(input,document.createTextNode(' '+option));field.append(label)});
  const feedback=document.createElement('p');feedback.className='ch8-assessment-feedback';feedback.id='ch8AssessmentFeedback'+i;feedback.setAttribute('aria-live','polite');field.append(feedback);mount.append(field);
 });
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const answers=questions.map((_,i)=>form.querySelector('input[name="ch8assessment'+i+'"]:checked'));
  const answered=answers.filter(Boolean).length;
  if(answered<questions.length){
   summary.textContent='उत्तर दिइएका प्रश्न: '+nep(answered)+' / '+nep(questions.length)+'। सबै प्रश्नको उत्तर दिएपछि मात्र नतिजा र व्याख्या देखाइन्छ।';
   questions.forEach((_,i)=>{
    const feedback=document.getElementById('ch8AssessmentFeedback'+i);
    feedback.textContent='';
    feedback.classList.remove('is-correct');
   });
   const first=answers.findIndex(a=>!a);
   const target=form.querySelector('input[name="ch8assessment'+first+'"]')?.closest('fieldset');
   if(target){
    target.setAttribute('tabindex','-1');
    target.focus({preventScroll:true});
    target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
   }
   return;
  }
  let score=0;
  questions.forEach((item,i)=>{
   const right=Number(answers[i].value)===item.correct;
   if(right)score++;
   const feedback=document.getElementById('ch8AssessmentFeedback'+i);
   feedback.textContent=(right?'सही। ':'पुनः अध्ययन गर्नुहोस्। ')+item.why;
   feedback.classList.toggle('is-correct',right);
  });
  try{localStorage.setItem('jyotisha-chapter8-score',JSON.stringify({score,total:questions.length}))}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  summary.textContent='प्राप्ताङ्क: '+nep(score)+' / '+nep(questions.length)+'। '+(score===questions.length?'सबै उत्तर सही छन्। अध्याय ८ को पुनरावलोकन पूरा भयो।':'प्रतिक्रिया पढेर फेरि अभ्यास गर्नुहोस्।');
 });
 form.addEventListener('change',e=>{if(!e.target.matches('input[type="radio"]'))return;const index=Number(e.target.name.replace('ch8assessment',''));if(!Number.isInteger(index)||index<0||index>=questions.length)return;const f=document.getElementById('ch8AssessmentFeedback'+index);f.textContent='';f.classList.remove('is-correct');summary.textContent='उत्तर परिवर्तन गरिएको छ। नयाँ नतिजाका लागि फेरि जाँच्नुहोस्।';});
 reset.addEventListener('click',()=>{form.reset();questions.forEach((_,i)=>{const f=document.getElementById('ch8AssessmentFeedback'+i);f.textContent='';f.classList.remove('is-correct')});summary.textContent='८ प्रश्नको उत्तर छान्नुहोस्।';try{localStorage.removeItem('jyotisha-chapter8-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));});
})();

/* Chapter 8 mobile contents: progressive enhancement; desktop links stay visible. */
(function(){
 const nav=document.querySelector('#chapter8 .ch8-contents'),toggle=nav?.querySelector('.ch8-nav-toggle'),links=nav?.querySelector('.ch8-contents-links');
 if(!toggle||!links)return;
 const setOpen=open=>{toggle.setAttribute('aria-expanded',String(open));links.classList.toggle('is-open',open);toggle.innerHTML=open?'लुकाउनुहोस् <span aria-hidden="true">⌃</span>':'सबै पाठ हेर्नुहोस् <span aria-hidden="true">⌄</span>'};
 toggle.addEventListener('click',()=>setOpen(toggle.getAttribute('aria-expanded')!=='true'));
 links.addEventListener('click',event=>{if(event.target.closest('a')&&window.matchMedia('(max-width:680px)').matches)setOpen(false)});
})();

/* Stabilization: consistent chapter-level navigation for integrated Chapters 7 and 8.
   These are in-page links, not disclosure tabs: all lesson content remains accessible. */
(function(){
 const chapter=Number(new URLSearchParams(location.search).get('chapter'));
 if(chapter!==7&&chapter!==8)return;
 const banner=document.querySelector('.chapter-focus-banner');
 if(!banner)return;
 const targets=chapter===7
  ?[['पाठ','chapter7'],['अभ्यास','ch7Chart'],['परीक्षा','ch7Quiz']]
  :[['पाठ','ch8-lesson-1'],['अभ्यास','ch8-lesson-2'],['परीक्षा','ch8AssessmentPanel']];
 const nav=document.createElement('nav');
 nav.className='learning-tabs chapter-learning-links';
 nav.setAttribute('aria-label','पाठ, अभ्यास र परीक्षा');
 for(const [label,id] of targets){
  if(!document.getElementById(id))continue;
  const link=document.createElement('a');
  link.className='learning-tab';
  link.href='#'+id;
  link.textContent=label;
  nav.append(link);
 }
 if(nav.childElementCount)banner.append(nav);
})();

/* Reader preference: explicit light/dark mode with browser-local persistence. */
(function(){
 const key='jyotisha-reader-theme-v1';
 const button=document.getElementById('themeToggle');if(!button)return;
 let saved=null;try{saved=localStorage.getItem(key)}catch(_){}
 const preferred=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
 function apply(theme){
  document.documentElement.dataset.theme=theme;
  button.setAttribute('aria-pressed',String(theme==='dark'));
  button.setAttribute('aria-label',theme==='dark'?'उज्यालो रूप प्रयोग गर्नुहोस्':'अँध्यारो रूप प्रयोग गर्नुहोस्');
  button.textContent=theme==='dark'?'☀':'☾';
 }
 apply(saved==='dark'||saved==='light'?saved:preferred);
 button.addEventListener('click',()=>{
  const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
  apply(next);try{localStorage.setItem(key,next)}catch(_){}
 });
})();

/* Browser-local study continuity: remember explicitly selected Chapter 8 lesson. */
(function(){
 const chapterKey='jyotisha-pathshala-last-chapter-v1';
 const lessonKey='jyotisha-pathshala-ch8-last-lesson-v1';
 const chapter=Number(new URLSearchParams(location.search).get('chapter'));
 const valid=n=>Number.isInteger(n)&&n>=1&&n<=13;
 const ids=new Set(Array.from({length:8},(_,i)=>'ch8-lesson-'+(i+1)).concat('ch8AssessmentPanel'));
 const getSavedLesson=()=>{try{const value=localStorage.getItem(lessonKey);return ids.has(value)?value:null}catch(_){return null}};
 if(valid(chapter)){
  try{localStorage.setItem(chapterKey,String(chapter))}catch(_){}
  if(chapter===8){
   const nav=document.querySelector('#chapter8 .ch8-contents-links');
   const remember=id=>{if(ids.has(id))try{localStorage.setItem(lessonKey,id)}catch(_){}};
   if(nav)nav.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');
    if(link)remember(decodeURIComponent(link.hash.slice(1)));
   });
   const quick=document.querySelector('.chapter-learning-links');
   if(quick)quick.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');
    if(link)remember(decodeURIComponent(link.hash.slice(1)));
   });
   const rememberHash=()=>{const id=decodeURIComponent(location.hash.slice(1));if(ids.has(id))remember(id)};
   window.addEventListener('hashchange',rememberHash);
   rememberHash();
  }
  return;
 }
 const dashboard=document.getElementById('dashboard');
 if(!dashboard)return;
 let last=null;
 try{last=Number(localStorage.getItem(chapterKey))}catch(_){}
 if(!valid(last))return;
 const card=dashboard.querySelector('.chapter-card[data-chapter="'+last+'"]');
 if(!card)return;
 const panel=document.createElement('div');
 panel.className='study-resume';
 const text=document.createElement('div');
 const title=document.createElement('strong');
 title.textContent='अघिल्लो अध्ययन जारी राख्नुहोस्';
 const desc=document.createElement('p');
 const heading=card.querySelector('h3');
 const lesson=last===8?getSavedLesson():null;
 const lessonLink=lesson?document.querySelector('#chapter8 .ch8-contents-links a[href="#'+lesson+'"]'):null;
 desc.textContent='अध्याय '+String(last).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)])+' · '+(heading?heading.textContent:'अध्ययन')+(lessonLink?' · '+lessonLink.textContent:'');
 text.append(title,desc);
 const link=document.createElement('a');
 link.className='button primary';
 link.href='index.html?chapter='+last+(lesson?'#'+lesson:'');
 link.textContent=lesson?'पछिल्लो पाठमा फर्कनुहोस् →':'अध्ययनमा फर्कनुहोस् →';
 panel.append(text,link);
 const stats=dashboard.querySelector('.dashboard-stats');
 if(stats)stats.after(panel);
 else dashboard.prepend(panel);
})();

/* Assessment dashboard: distinguish unattempted, practice target, and review. */
(function(){
 const root=document.getElementById('assessmentProgress');
 const summary=document.getElementById('assessmentProgressSummary');
 const list=document.getElementById('assessmentProgressList');
 if(!root||!summary||!list)return;
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 const exams=[
  {chapter:1,name:'पञ्चाङ्गका आधार',total:15,threshold:12,anchor:'practice',storage:'jd-chapter1-v05'},
  {chapter:2,name:'राशि र भाव',total:20,threshold:16,anchor:'chapter2exam'},
  {chapter:3,name:'ग्रह परिचय',total:15,threshold:12,anchor:'chapter3exam'},
  {chapter:4,name:'इष्टकाल र समय रूपान्तरण',total:4,threshold:3,anchor:'ch4ExampleQuiz'},
  {chapter:5,name:'भयात, भभोग र दशा शेष',total:5,threshold:4,anchor:'ch5-assessment'},
  {chapter:6,name:'विंशोत्तरी दशाको क्रम',total:5,threshold:4,anchor:'ch6-assessment'},
  {chapter:7,name:'कुण्डली कसरी हेर्ने',total:1,threshold:1,anchor:'ch7Quiz'},
  {chapter:8,name:'नाता र भावात् भावम्',total:8,threshold:8,anchor:'ch8AssessmentPanel'},
  {chapter:9,name:'स्वभाव, शरीर र स्वास्थ्यका सङ्केत',total:5,threshold:4,anchor:'ch9-practice'},
  {chapter:10,name:'धन, आय, कर्म र यात्रा',total:4,threshold:3,anchor:'ch10-assessment'},
  {chapter:11,name:'सन्तान र कुण्डली मिलान',total:7,threshold:6,anchor:'ch11-quiz'},
  {chapter:12,name:'ग्रहशान्ति र परम्परागत उपाय',total:5,threshold:4,anchor:'ch12-quiz'},
  {chapter:13,name:'वास्तु: दिशा र परम्परागत प्रयोग',total:10,threshold:8,anchor:'ch13-quiz'}
 ];
 function refreshAssessmentDashboard(){
 let attempted=0,met=0;
 list.replaceChildren();
 for(const exam of exams){
  let result=null;
  try{result=JSON.parse(localStorage.getItem(exam.storage||'jyotisha-chapter'+exam.chapter+'-score')||'null')}catch(_){}
  const valid=result&&Number.isInteger(result.score)&&result.score>=0&&result.score<=exam.total&&result.total===exam.total;
  const achieved=valid&&result.score>=exam.threshold;
  if(valid){attempted++;if(achieved)met++;}
  const row=document.createElement('a');
  row.className='assessment-progress-row';
  row.href='index.html?chapter='+exam.chapter+'#'+exam.anchor;
  const name=document.createElement('strong');
  name.textContent='अध्याय '+nep(exam.chapter)+' · '+exam.name;
  const status=document.createElement('span');
  status.className='assessment-result-status '+(!valid?'assessment-unattempted':achieved?'assessment-achieved':'assessment-review');
  status.textContent=!valid?'अझै मूल्याङ्कन पूरा भएको छैन':achieved?'अभ्यास लक्ष्य पूरा':'पुनः अभ्यास आवश्यक';
  const details=document.createElement('span');
  details.className='assessment-result-details';
  details.textContent=valid?'प्राप्ताङ्क '+nep(result.score)+' / '+nep(exam.total)+' · लक्ष्य '+nep(exam.threshold)+' / '+nep(exam.total):'अभ्यास खोल्नुहोस् · लक्ष्य '+nep(exam.threshold)+' / '+nep(exam.total);
  row.append(name,status,details);
  row.setAttribute('aria-label',name.textContent+'। '+status.textContent+'। '+details.textContent);
  list.append(row);
 }
 summary.textContent='मूल्याङ्कन पूरा गरिएका: '+nep(attempted)+' / '+nep(exams.length)+' · अभ्यास लक्ष्य पुगेका: '+nep(met)+' · पुनः अभ्यास आवश्यक: '+nep(attempted-met);
 const openedEl=document.getElementById('studyOpenedCount');
 const attemptedEl=document.getElementById('studyAttemptedCount');
 const achievedEl=document.getElementById('studyAchievedCount');
 const completionEl=document.getElementById('studyCompletionNote');
 if(openedEl&&attemptedEl&&achievedEl){
  let opened=[];
  try{const saved=JSON.parse(localStorage.getItem('jyotisha-pathshala-opened-v3')||'[]');if(Array.isArray(saved))opened=saved.filter(n=>Number.isInteger(n)&&n>=1&&n<=13)}catch(_){}
  openedEl.textContent=nep(new Set(opened).size)+' / १३';
  attemptedEl.textContent=nep(attempted)+' / '+nep(exams.length);
  achievedEl.textContent=nep(met)+' / '+nep(exams.length);
  if(completionEl){
   let marked=[];try{const saved=JSON.parse(localStorage.getItem('jyotisha-chapters-read-v1')||'[]');if(Array.isArray(saved))marked=saved.filter(n=>Number.isInteger(n)&&n>=1&&n<=13)}catch(_){}
   const markedCount=new Set(marked).size;
   const openedCount=new Set(opened).size;
   const practiceComplete=markedCount===13&&met===exams.length;
   const nextStep=openedCount<13?'बाँकी अध्याय खोल्दै अध्ययन अघि बढाउन सक्नुहुन्छ।':markedCount<13?'अध्ययन गरिसकेका अध्यायमा अध्ययन गरेको चिन्ह लगाउन सक्नुहुन्छ।':attempted<exams.length?'अब बाँकी मुख्य मूल्याङ्कन पूरा गर्न सक्नुहुन्छ।':met<exams.length?'लक्ष्य नपुगेका मूल्याङ्कन पुनः अभ्यास गर्न सक्नुहुन्छ।':'सबै मुख्य मूल्याङ्कनका अभ्यास लक्ष्य पुगेका छन्।';
   const status=practiceComplete?'स्व-अभिलेखमा आधारित अध्ययन तथा अभ्यासका मापदण्ड पूरा भएका छन्।':'अध्ययन तथा अभ्यासका सबै मापदण्ड अझै पूरा भएका छैनन्।';
   completionEl.textContent=status+' आफैँ अध्ययन गरेको चिन्ह लगाइएका: '+nep(markedCount)+' / १३। अध्याय खोलिएका: '+nep(openedCount)+' / १३। मुख्य मूल्याङ्कन पूरा: '+nep(attempted)+' / १३। अभ्यास लक्ष्य पुगेका: '+nep(met)+' / १३। '+nextStep+' यो ब्राउजरमा सुरक्षित स्व-अभिलेख मात्र हो; यसले प्रमाणित पाठ्यक्रम समापन वा प्रमाणपत्र प्राप्त गर्ने योग्यता स्थापित गर्दैन।';
  }
 }

 }
 refreshAssessmentDashboard();
 window.addEventListener('jyotisha-assessment-updated',refreshAssessmentDashboard);
 window.addEventListener('jyotisha-reading-updated',refreshAssessmentDashboard);
 window.addEventListener('pageshow',refreshAssessmentDashboard);
 window.addEventListener('storage',event=>{
  if(event.key===null||event.key==='jd-chapter1-v05'||/^jyotisha-chapter(?:[1-9]|1[0-3])-score$/.test(event.key)||event.key==='jyotisha-pathshala-opened-v3'||event.key==='jyotisha-chapters-read-v1')refreshAssessmentDashboard();
 });
})();

/* Assessment navigation clarity: make the final submission location explicit. */
(function(){
 const chapter=Number(new URLSearchParams(location.search).get('chapter'));
 const form=document.getElementById(chapter===2?'chapter2ExamForm':chapter===3?'chapter3ExamForm':'');
 if(!form)return;
 const pager=form.querySelector('.exam-stepper');
 if(!pager)return;
 const hint=document.createElement('p');
 hint.className='exam-submit-hint';
 hint.textContent='सबै प्रश्न पूरा गरेपछि तलको “उत्तर जाँच्नुहोस्” बटन प्रयोग गर्नुहोस्।';
 const jump=document.createElement('button');
 jump.type='button';jump.className='button exam-submit-jump';
 jump.textContent='उत्तर जाँच्ने ठाउँमा जानुहोस् ↓';
 jump.addEventListener('click',()=>{
  const submit=form.querySelector('button[type="submit"]');
  if(submit){submit.scrollIntoView({behavior:'smooth',block:'center'});submit.focus({preventScroll:true})}
 });
 pager.after(hint,jump);
})();

/* Assessment completion indicators: local, non-scoring, accessible. */
(function(){
 const specs=[
  {form:'chapter2ExamForm',mount:'examProgress',name:'chapter2q',total:20},
  {form:'chapter3ExamForm',mount:'chapter3Progress',name:'ch3q',total:15},
  {form:'ch8Assessment',mount:'ch8AssessmentSummary',name:'ch8assessment',total:8}
 ];
 for(const spec of specs){
  const form=document.getElementById(spec.form),mount=document.getElementById(spec.mount);
  if(!form||!mount)continue;
  const wrapper=document.createElement('div');
  wrapper.className='assessment-completion';
  const label=document.createElement('span');
  label.className='assessment-completion-label';
  const bar=document.createElement('progress');
  bar.className='assessment-completion-bar';
  bar.max=spec.total;bar.value=0;
  bar.setAttribute('aria-label','उत्तर दिइएका प्रश्नको प्रगति');
  wrapper.append(label,bar);
  if(spec.form==='ch8Assessment')form.insertBefore(wrapper,form.querySelector('button[type="submit"]'));
  else mount.after(wrapper);
  const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
  const update=()=>{
   let done=0;
   for(let i=0;i<spec.total;i++){
    if(form.querySelector('input[name="'+spec.name+i+'"]:checked'))done++;
   }
   bar.value=done;
   label.textContent='पूरा भएका प्रश्न: '+nep(done)+' / '+nep(spec.total)+(done===spec.total?' · सबै उत्तर दिइयो':'');
  };
  form.addEventListener('change',update);
  form.addEventListener('reset',()=>requestAnimationFrame(update));
  const container=spec.form==='chapter2ExamForm'?document.getElementById('chapter2ExamQuestions'):spec.form==='chapter3ExamForm'?document.getElementById('chapter3ExamQuestions'):document.getElementById('ch8AssessmentQuestions');
  if(container&&window.MutationObserver){
   new MutationObserver(update).observe(container,{childList:true});
  }
  update();
 }
})();

/* Chapter 8 guided reading: preserve all sections, add lesson-by-lesson movement. */
(function(){
 if(new URLSearchParams(location.search).get('chapter')!=='8')return;
 const chapter=document.getElementById('chapter8');
 if(!chapter)return;
 const ids=Array.from({length:8},(_,i)=>'ch8-lesson-'+(i+1)).concat('ch8AssessmentPanel');
 const sections=ids.map(id=>document.getElementById(id));
 if(sections.some(section=>!section))return;
 const nav=chapter.querySelector('.ch8-contents');
 const progress=document.createElement('p');
 progress.className='ch8-reading-progress';
 progress.setAttribute('role','status');
 progress.setAttribute('aria-live','polite');
 nav?.after(progress);
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 const links=Array.from(chapter.querySelectorAll('.ch8-contents-links a'));
 function update(){
  const hash=decodeURIComponent(location.hash.slice(1));
  const i=Math.max(0,ids.indexOf(hash));
  progress.textContent=i===8?'समग्र मूल्याङ्कन · ८ पाठपछि': 'अध्ययन क्रम: पाठ '+nep(i+1)+' / ८';
  const toggle=chapter.querySelector('.ch8-nav-toggle');
  if(toggle){
   const current=i===8?'मूल्याङ्कन':'पाठ '+nep(i+1)+' / ८';
   toggle.setAttribute('aria-label','पाठ सूची खोल्नुहोस् वा बन्द गर्नुहोस्। हाल: '+current);
  }
  links.forEach(a=>{
   const active=a.getAttribute('href')==='#'+ids[i];
   if(active)a.setAttribute('aria-current','location');
   else a.removeAttribute('aria-current');
  });
  sections.forEach((section,index)=>{
   section.classList.toggle('ch8-current-lesson',index===i);
  });
 }
 sections.forEach((section,i)=>{
  const footer=document.createElement('nav');
  footer.className='ch8-lesson-pager';
  footer.setAttribute('aria-label','अध्याय ८: पाठ '+(i===8?'मूल्याङ्कन':nep(i+1))+' को अन्त्यमा नेभिगेसन');
  if(i>0){
   const prev=document.createElement('a');
   prev.href='#'+ids[i-1];prev.className='ch8-lesson-prev';
   prev.textContent='← '+(i===8?'पाठ ८':'अघिल्लो पाठ');
   prev.setAttribute('aria-label','पाठ '+nep(i)+' मा जानुहोस्');
   footer.append(prev);
  }
  if(i<8){
   const next=document.createElement('a');
   next.href='#'+ids[i+1];next.className='ch8-lesson-next';
   next.textContent=i===7?'समग्र मूल्याङ्कन →':'अर्को पाठ →';
   next.setAttribute('aria-label',i===7?'समग्र मूल्याङ्कनमा जानुहोस्':'पाठ '+nep(i+2)+' मा जानुहोस्');
   footer.append(next);
  }
  section.append(footer);
  /* Keep a compact navigation row visible immediately after each lesson heading. */
  const top=footer.cloneNode(true);
  top.classList.add('ch8-lesson-pager-top');
  top.setAttribute('aria-label','अध्याय ८: पाठ '+(i===8?'मूल्याङ्कन':nep(i+1))+' को सुरुमा नेभिगेसन');
  const heading=section.querySelector('h3');
  if(heading)heading.after(top);
 });
 chapter.addEventListener('click',event=>{if(event.target.closest('a[href^="#ch8-"]')||event.target.closest('a[href="#ch8AssessmentPanel"]'))queueMicrotask(update)});
 window.addEventListener('hashchange',update);
 update();
})();

/* Chapter 9: educational assessment with accessible, explanatory feedback. */
(function(){
 const form=document.getElementById('ch9Quiz');
 const feedback=document.getElementById('ch9Feedback');
 const review=document.getElementById('ch9Explanations');
 if(!form||!feedback||!review)return;
 const items=[
  {name:'ch9q',answer:'a',explanation:'स्वभावसम्बन्धी परम्परागत अध्ययनमा लग्नेश, लग्नमा रहेका ग्रह र चन्द्रको अवस्थालाई सँगै हेर्ने भनिएको छ।'},
  {name:'ch9q2',answer:'b',explanation:'लग्नमा ग्रह नभएको उदाहरणमा लग्नेशको स्थिति र अवस्था अध्ययनको आधार हुन्छ। यसबाट वास्तविक व्यक्तिको स्वभाव निश्चित हुँदैन।'},
  {name:'ch9q3',answer:'c',explanation:'स्वास्थ्यसम्बन्धी ग्रहगत कथन परम्परागत स्रोतको दाबी हो, प्रमाणित चिकित्सकीय परीक्षण वा निदान होइन।'},
  {name:'ch9q4',answer:'a',explanation:'मेषलाई पहिलो मानेर समावेशी गणना गर्दा मेष (१), वृष (२), मिथुन (३), कर्कट (४), सिंह (५), कन्या (६), तुला (७), वृश्चिक (८) हुन्छ। वृश्चिकको स्वामी मङ्गल भएकाले यस उदाहरणमा अष्टमेश मङ्गल हो।'},
  {name:'ch9q5',answer:'b',explanation:'अध्ययन नोटको पृष्ठ ८७ मा पञ्चक धनिष्ठाको उत्तरार्धबाट सुरु भएर शतभिषा, पूर्वाभाद्रपदा, उत्तराभाद्रपदा र रेवतीसम्म समेटिएको छ।'}
 ];
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const responses=items.map(item=>form.querySelector('input[name="'+item.name+'"]:checked'));
  const missing=responses.findIndex(value=>!value);
  if(missing!==-1){
   feedback.className='ch9-quiz-feedback is-warning';
   feedback.textContent='कृपया पाँचवटै प्रश्नको उत्तर दिनुहोस्।';
   review.hidden=true;review.replaceChildren();
   const field=form.querySelector('input[name="'+items[missing].name+'"]').closest('fieldset');
   field.tabIndex=-1;field.focus({preventScroll:true});
   field.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
   return;
  }
  const score=responses.reduce((total,response,i)=>total+Number(response.value===items[i].answer),0);
  try{localStorage.setItem('jyotisha-chapter9-score',JSON.stringify({score,total:items.length}))}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  feedback.className='ch9-quiz-feedback '+(score===items.length?'is-complete':'is-review');
  feedback.textContent='नतिजा: '+nep(score)+' / '+nep(items.length)+' सही। '+(score===items.length?'पाँचवटै उत्तर सही छन्।':'तल प्रत्येक प्रश्नको व्याख्या पढेर पुनः अभ्यास गर्न सक्नुहुन्छ।');
  review.replaceChildren();
  items.forEach((item,i)=>{
   const correct=responses[i].value===item.answer;
   const card=document.createElement('div');card.className='ch9-explanation '+(correct?'is-correct':'is-incorrect');
   const heading=document.createElement('strong');heading.textContent='प्रश्न '+nep(i+1)+' · '+(correct?'सही उत्तर':'समीक्षा आवश्यक');
   const explanation=document.createElement('p');explanation.textContent=item.explanation;
   card.append(heading,explanation);review.append(card);
  });
  review.hidden=false;
  feedback.tabIndex=-1;feedback.focus({preventScroll:true});
 });
 form.addEventListener('change',event=>{
  if(!event.target.matches('input[type="radio"]'))return;
  // A changed answer invalidates the previously saved score until resubmission.
  try{localStorage.removeItem('jyotisha-chapter9-score')}catch(_){}
  window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  if(!feedback.textContent&&!review.childElementCount)return;
  feedback.textContent='';
  feedback.className='ch9-quiz-feedback';
  review.hidden=true;review.replaceChildren();
 });
 form.addEventListener('reset',()=>{
  try{localStorage.removeItem('jyotisha-chapter9-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  feedback.textContent='';feedback.className='ch9-quiz-feedback';
  review.hidden=true;review.replaceChildren();
  form.querySelectorAll('fieldset').forEach(field=>field.removeAttribute('tabindex'));
 });
})();

/* Chapter 9: chart-position reading from study notes 2.3, 2.4 and 9.1. */
(function(){
 const asc=document.getElementById('ch9Ascendant');
 const house=document.getElementById('ch9LordHouse');
 const result=document.getElementById('ch9WorkedResult');
 if(!asc||!house||!result)return;
 const names=['मेष','वृष','मिथुन','कर्कट','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
 const owners=['मङ्गल','शुक्र','बुध','चन्द्र','सूर्य','बुध','शुक्र','मङ्गल','बृहस्पति','शनि','शनि','बृहस्पति'];
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 const render=()=>{
  const a=Number(asc.value),h=Number(house.value);
  if(!Number.isInteger(a)||a<1||a>12||!Number.isInteger(h)||h<1||h>12)return;
  const sign=(a+h-2)%12;
  result.replaceChildren();
  const heading=document.createElement('strong');heading.textContent=names[a-1]+' लग्न · लग्नेश '+owners[a-1];
  const steps=document.createElement('p');steps.textContent='चरण १: '+names[a-1]+' राशिको स्वामी '+owners[a-1]+' हो। चरण २: काल्पनिक उदाहरणमा '+owners[a-1]+' '+nep(h)+'औँ भावमा छ। चरण ३: त्यो भावमा '+names[sign]+' राशि (अङ्क '+nep(sign+1)+') पर्छ।';
  const note=document.createElement('p');note.textContent='अध्याय ९.१ अनुसार लग्नेश कहाँ छ भन्ने अध्ययनको पहिलो आधार यही हो। स्वभावबारे निष्कर्ष निकाल्न लग्नमा ग्रह र चन्द्रको अवस्था पनि हेर्नुपर्ने भनिएको छ।';
  result.append(heading,steps,note);
 };
 asc.addEventListener('change',render);house.addEventListener('change',render);render();
})();

/* Chapter 9: occupancy-based reading rules from Guruji notes 9.1. */
(function(){
 const root=document.getElementById('chapter9');
 const result=document.getElementById('ch9OccupancyResult');
 const detail=document.getElementById('ch9OccupancyDetail');
 const planet=document.getElementById('ch9OccupantPlanet');
 if(!root||!result||!detail||!planet)return;
 const traits={'सूर्य':'नेतृत्व, आत्मसम्मान, अधिकार','चन्द्र':'भावुक, कल्पनाशील, परिवर्तनशील मन','मङ्गल':'तीखो, छिटो, कहिलेकाहीँ झगडालु','बुध':'चलाख, तार्किक, बोल्न सिपालु','बृहस्पति':'शुद्ध, धार्मिक, उदार','शुक्र':'सौन्दर्यप्रेमी, कलात्मक, सुखप्रिय','शनि':'अनुशासित, गम्भीर, धैर्यवान्','राहु':'घमण्डी, जिद्दी, असामान्य बाटो रोज्ने','केतु':'हिचकिचाउने, अलमलमा पर्ने, अन्तर्मुखी'};
 const render=()=>{
  const value=root.querySelector('input[name="ch9Occupancy"]:checked')?.value||'none';
  detail.hidden=value==='none';
  result.replaceChildren();
  const heading=document.createElement('strong');
  const explanation=document.createElement('p');
  if(value==='none'){
   heading.textContent='लग्न खाली छ';
   explanation.textContent='अध्ययन नोटअनुसार लग्नेश कहाँ र कस्तो अवस्थामा छ हेर्नुपर्छ। माथिको लग्नेश अभ्यासमा भाव छानेर स्थानको गणना गर्न सकिन्छ। चन्द्रको अवस्था पनि छुट्टै हेर्नुपर्छ।';
  }else if(value==='one'){
   heading.textContent='लग्नमा एउटा ग्रह: '+planet.value;
   explanation.textContent='अध्ययन नोटमा एउटै ग्रह हुँदा त्यसको एकाधिकार प्रभाव हुने बताएका छन्। '+planet.value+' सँग जोडिएको परम्परागत विशेषण: '+traits[planet.value]+'। यो व्यक्तिको वास्तविक स्वभावको निष्कर्ष होइन।';
  }else{
   heading.textContent='लग्नमा धेरै ग्रह छन्';
   explanation.textContent='अध्ययन नोटअनुसार बलवान् ग्रहको प्रभाव र चलिरहेको दशा हेर्नुपर्छ। हाल छानिएको '+planet.value+' को परम्परागत विशेषण: '+traits[planet.value]+'। कुन ग्रह बलवान् हो भन्ने यो अभ्यासले निर्धारण गर्दैन।';
  }
  result.append(heading,explanation);
 };
 root.querySelectorAll('input[name="ch9Occupancy"]').forEach(input=>input.addEventListener('change',render));
 planet.addEventListener('change',render);render();
})();

/* Chapter 9: interpret independent strength indicators without invented scores. */
(function(){
 const status=document.getElementById('ch9StrengthStatus');
 const house=document.getElementById('ch9StrengthHouse');
 const result=document.getElementById('ch9StrengthResult');
 if(!status||!house||!result)return;
 const render=()=>{
  const h=Number(house.value);
  const kind=h===1?'केन्द्र र त्रिकोण':[4,7,10].includes(h)?'केन्द्र':[5,9].includes(h)?'त्रिकोण':[6,8,12].includes(h)?'दुःस्थान':'अन्य भाव';
  const descriptions={exalted:'उच्च: अध्ययन नोटअनुसार बलको अनुकूल सङ्केत।',own:'स्वगृही: अध्ययन नोटअनुसार बलको अनुकूल सङ्केत।',neutral:'अन्य/नखुलेको: राशिगत बलको निष्कर्ष निकाल्न पर्याप्त विवरण छैन।',debilitated:'नीच: अध्ययन नोटअनुसार प्रतिकूल सङ्केत।'};
  const houseText=kind==='केन्द्र र त्रिकोण'||kind==='केन्द्र'||kind==='त्रिकोण'?'केन्द्र वा त्रिकोणमा हुनु परम्परागत रूपमा अनुकूल सङ्केत मानिएको छ।':kind==='दुःस्थान'?'६, ८, १२ लाई नोटमा दुःस्थान भनिएको छ; थप सन्दर्भ आवश्यक हुन्छ।':'यस भावलाई नोटको प्रमुख केन्द्र/त्रिकोण वा दुःस्थान समूहमा राखिएको छैन।';
  result.replaceChildren();
  const heading=document.createElement('strong');heading.textContent='भाव '+String(h).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)])+' · '+kind;
  const line=document.createElement('p');line.textContent=descriptions[status.value]+' '+houseText;
  const caution=document.createElement('p');caution.textContent='यी दुई छुट्टाछुट्टै सङ्केत हुन्। यिनबाट समग्र ग्रहबलको निश्चित श्रेणी, व्यक्तित्व वा फलादेश निकालिएको छैन।';
  result.append(heading,line,caution);
 };
 status.addEventListener('change',render);house.addEventListener('change',render);render();
})();

/* Chapter 9: consolidated source-reading checklist; no personality prediction. */
(function(){
 const result=document.getElementById('ch9SequenceResult');
 const moon=document.getElementById('ch9MoonSign');
 const asc=document.getElementById('ch9Ascendant');
 const lordHouse=document.getElementById('ch9LordHouse');
 const occupancy=document.querySelectorAll('input[name="ch9Occupancy"]');
 const planet=document.getElementById('ch9OccupantPlanet');
 const dignity=document.getElementById('ch9StrengthStatus');
 const strengthHouse=document.getElementById('ch9StrengthHouse');
 if(!result||!moon||!asc||!lordHouse||!occupancy.length||!planet||!dignity||!strengthHouse)return;
 const signs=['मेष','वृष','मिथुन','कर्कट','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
 const lords=['मङ्गल','शुक्र','बुध','चन्द्र','सूर्य','बुध','शुक्र','मङ्गल','बृहस्पति','शनि','शनि','बृहस्पति'];
 const labels={exalted:'उच्च',own:'स्वगृही',neutral:'अन्य/नखुलेको',debilitated:'नीच'};
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 const render=()=>{
  const a=Number(asc.value),h=Number(lordHouse.value),sh=Number(strengthHouse.value);
  const sign=signs[(a+h-2)%12],lord=lords[a-1];
  const count=[...occupancy].find(input=>input.checked)?.value||'none';
  const occupancyText=count==='none'?'लग्न खाली छ; लग्नेशको स्थिति हेर्नुहोस्।':count==='one'?'लग्नमा एउटा ग्रह ('+planet.value+') छ; अध्ययन नोटको एकाधिकारसम्बन्धी नियम अध्ययन गर्नुहोस्।':'लग्नमा धेरै ग्रह छन्; ग्रहबल र दशा नहेरी प्रमुख ग्रह तय गर्न मिल्दैन। छानिएको उदाहरण ग्रह: '+planet.value+'।';
  const strengthText='अलग अभ्यासमा छानिएको अवस्था: '+labels[dignity.value]+', भाव '+nep(sh)+'। यो छनोट माथि देखाइएको लग्नेश '+lord+' को वास्तविक राशिगत बल हो भनेर पुष्टि गरिएको छैन।';
  const moonSign=Number(moon.value);
  const moonHouse=moon.value?((moonSign-a+12)%12)+1:null;
  const moonText=moonHouse?'चन्द्र '+signs[moonSign-1]+' राशिमा र '+nep(moonHouse)+'औँ भावमा छ। यो स्थानको गणना मात्र हो; बल, दृष्टि र दशा जाँचिएको छैन।':'चन्द्रको राशि उपलब्ध छैन; अध्ययनको एउटा आवश्यक पक्ष बाँकी छ।';
  const rows=[
   '१. लग्न र लग्नेश: '+signs[a-1]+' लग्न; '+lord+' लग्नेश; उदाहरणमा भाव '+nep(h)+' ('+sign+')।',
   '२. लग्नमा ग्रह: '+occupancyText,
   '३. ग्रहबल: '+strengthText,
   '४. चन्द्र: '+moonText,
   'निष्कर्ष: यो अध्ययनक्रमको अभ्यास मात्र हो। दशा, दृष्टि र ग्रहहरूको पूर्ण अवस्था नदिएकाले स्वभाव वा स्वास्थ्यसम्बन्धी फलादेश निकालिएको छैन।'
  ];
  const list=document.createElement('ol');
  rows.forEach((value,i)=>{const item=document.createElement('li');item.textContent=i===4?value:value.replace(/^[१-४]\. /,'');list.append(item)});
  result.replaceChildren(list);
 };
 [moon,asc,lordHouse,planet,dignity,strengthHouse].forEach(el=>el.addEventListener('change',render));
 occupancy.forEach(el=>el.addEventListener('change',render));
 render();
})();

/* Chapter 9: derive Moon house from selected Moon sign and ascendant. */
(function(){
 const asc=document.getElementById('ch9Ascendant');
 const moon=document.getElementById('ch9MoonSign');
 const result=document.getElementById('ch9MoonResult');
 if(!asc||!moon||!result)return;
 const signs=['मेष','वृष','मिथुन','कर्कट','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 const render=()=>{
  if(!moon.value){result.textContent='चन्द्रको राशि नछानिएकाले भाव गणना गरिएको छैन।';return;}
  const a=Number(asc.value),m=Number(moon.value);
  const house=((m-a+12)%12)+1;
  result.textContent='लग्न: '+signs[a-1]+'। चन्द्र: '+signs[m-1]+'। चन्द्र रहेको भाव: '+nep(house)+'। सूत्र: चन्द्र राशि अङ्क − लग्न राशि अङ्क + १ (आवश्यक भए १२ जोड्ने)।';
 };
 asc.addEventListener('change',render);moon.addEventListener('change',render);render();
})();

/* Chapter 10: second-house sign and lord, based on the standard twelve-sign order. */
(function(){
 const select=document.getElementById('ch10Ascendant'),result=document.getElementById('ch10Result');
 if(!select||!result)return;
 const names=['मेष','वृष','मिथुन','कर्कट','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
 const owners=['मङ्गल','शुक्र','बुध','चन्द्र','सूर्य','बुध','शुक्र','मङ्गल','बृहस्पति','शनि','शनि','बृहस्पति'];
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 select.addEventListener('change',()=>{
  const a=Number(select.value);
  if(!select.value||!Number.isInteger(a)||a<1||a>12){result.textContent='लग्न छानेपछि गणनाको चरण यहाँ देखिन्छ।';return}
  const second=a%12;
  result.textContent='चरण १: '+names[a-1]+' लग्न। चरण २: दोस्रो भावमा '+names[second]+' राशि (अङ्क '+nep(second+1)+') पर्छ। चरण ३: यस राशिको स्वामी '+owners[second]+' हो। त्यसैले द्वितीयेश '+owners[second]+'। यो स्थान पहिचान हो, धनको नतिजा होइन।';
 });
})();

/* Chapter 10: interpret selected hypothetical placements without making predictions. */
(function(){
 const asc=document.getElementById('ch10Ascendant');
 const house=document.getElementById('ch10LordHouse');
 const result=document.getElementById('ch10LordHouseResult');
 if(!asc||!house||!result)return;
 const descriptions={
  '6':'स्रोतको उदाहरणमा छैटौँ भावलाई नोकरी, सेवा वा दैनिक कामसँग जोडिएको छ।',
  '12':'स्रोतमा बाह्रौँ भावलाई विदेश वा टाढाको स्थानसँग जोडिएको छ; खर्चको विषय पनि उल्लेख छ।',
  '2':'द्वितीयेश दोस्रो भावमै हुँदा स्वगृही हुने संरचना बन्छ; स्रोतमा आफ्नै स्रोत र परिवारसँग सम्बन्धित परम्परागत व्याख्या दिइएको छ।'
 };
 const update=()=>{
  if(!asc.value){result.textContent='पहिले लग्न राशि छान्नुहोस्।';return}
  if(!house.value){result.textContent='द्वितीयेशको भाव छानेपछि स्रोतमा रहेको परम्परागत व्याख्या देखिन्छ।';return}
  const signs=['मेष','वृष','मिथुन','कर्कट','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
  const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
  const lagna=Number(asc.value),position=Number(house.value);
  if(!Number.isInteger(lagna)||lagna<1||lagna>12||![2,6,12].includes(position)){result.textContent='मान्य लग्न राशि र द्वितीयेशको भाव छान्नुहोस्।';return}
  const signIndex=(lagna+position-2)%12;
  const sign=signs[signIndex];
  const secondIndex=lagna%12;const lord=['मङ्गल','शुक्र','बुध','चन्द्र','सूर्य','बुध','शुक्र','मङ्गल','बृहस्पति','शनि','शनि','बृहस्पति'][secondIndex];
  result.textContent='चरण १: दोस्रो भावमा '+signs[secondIndex]+' राशि पर्छ, त्यसको स्वामी '+lord+' भएकाले द्वितीयेश '+lord+' हो। चरण २: काल्पनिक कुण्डलीमा यही '+lord+' '+nep(position)+'औँ भावको '+sign+' राशिमा बसेको मानिएको छ। चरण ३: '+descriptions[house.value]+' भावेशको स्वामित्व र उसको बसाइ फरक कुरा हुन्। यो अभ्यास वास्तविक आय, आर्थिक अवस्था वा करिअरको अनुमान होइन।';
 };
 asc.addEventListener('change',update);house.addEventListener('change',update);
})();
/* Chapter 10: source-based topic explorer and comprehension assessment. */
(function(){
 const topic=document.getElementById('ch10Topic'),topicResult=document.getElementById('ch10TopicResult');
 const topics={
  short:'तेस्रो भाव: छोटो यात्रा र स्थानीय आवागमनसँग सम्बन्धित परम्परागत अध्ययन।',
  long:'नवौँ भाव: लामो यात्रासँग सम्बन्धित परम्परागत अध्ययन।',
  foreign:'बाह्रौँ भाव: विदेश र टाढाको स्थानसँग सम्बन्धित परम्परागत अध्ययन।',
  vehicle:'चौथो भाव र शुक्र: सवारी साधनसम्बन्धी परम्परागत व्याख्यामा उल्लेखित।',
  business:'सातौँ भाव र बुध: व्यापारको परम्परागत अध्ययनमा उल्लेखित।',
  research:'आठौँ भाव र केतु: अनुसन्धानको परम्परागत सन्दर्भ; पाँचौँ र नवौँ भाव पनि उल्लेखित।',
  creative:'पाँचौँ भाव: विचार, लेखन र सिर्जनात्मक उत्पादनसँग जोडिएको परम्परागत व्याख्या।'
 };
 if(topic&&topicResult)topic.addEventListener('change',()=>{
  topicResult.textContent=topics[topic.value]?topics[topic.value]+' यो अध्ययन-वर्गीकरण हो, व्यक्तिगत भविष्यवाणी होइन।':'विषय छानेपछि सम्बन्धित भाव यहाँ देखिन्छ।';
 });
 const form=document.getElementById('ch10Quiz'),feedback=document.getElementById('ch10Feedback'),review=document.getElementById('ch10Review');
 if(!form||!feedback||!review)return;
 const items=[
  {name:'ch10q1',answer:'a',explanation:'वृषलाई पहिलो भाव मानेर गन्दा वृष (१), मिथुन (२) हुन्छ। मिथुनको स्वामी बुध भएकाले वृष लग्नमा द्वितीयेश बुध हो।'},
  {name:'ch10q2',answer:'b',explanation:'अध्ययन नोटमा तेस्रो भाव छोटो यात्रा, नवौँ लामो यात्रा र बाह्रौँ विदेशसँग जोडिएको छ।'},
  {name:'ch10q3',answer:'c',explanation:'सप्तमेश छैटौँमा जाँदा व्यापार राम्रो भन्ने कथन र भावेश आफ्नै भावबाट बाह्रौँमा पुग्दा घाटा हुने सामान्य नियमबीच असङ्गति छ। स्रोतले यी दुई नियम कसरी मिलाउने भन्ने स्पष्ट पारेको छैन; त्यसैले यस पाठमा थप पुष्टि आवश्यक भनिएको हो।'},
  {name:'ch10q4',answer:'b',explanation:'स्रोतमा पाँचौँ भावलाई विचार, लेखन र सिर्जनात्मक उत्पादनसँग तथा आठौँलाई भौतिक उत्पादनसँग जोडिएको छ।'}
 ];
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 const clear=()=>{feedback.textContent='';feedback.className='ch10-feedback';review.hidden=true;review.replaceChildren()};
 form.addEventListener('change',event=>{if(!event.target.matches('input[type="radio"]'))return;clear();try{localStorage.removeItem('jyotisha-chapter10-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'))});
 form.addEventListener('reset',()=>{clear();try{localStorage.removeItem('jyotisha-chapter10-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));form.querySelectorAll('fieldset').forEach(field=>field.removeAttribute('tabindex'))});
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const responses=items.map(item=>form.querySelector('input[name="'+item.name+'"]:checked'));
  const missing=responses.findIndex(x=>!x);
  if(missing>=0){
   clear();feedback.className='ch10-feedback is-warning';feedback.textContent='कृपया चारवटै प्रश्नको उत्तर छान्नुहोस्।';
   const field=form.querySelector('input[name="'+items[missing].name+'"]').closest('fieldset');
   field.tabIndex=-1;field.focus({preventScroll:true});return;
  }
  review.replaceChildren();
  const score=responses.reduce((n,x,i)=>n+Number(x.value===items[i].answer),0);
  try{localStorage.setItem('jyotisha-chapter10-score',JSON.stringify({score,total:items.length}))}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  feedback.className='ch10-feedback is-result';
  feedback.textContent='नतिजा: '+nep(score)+' / '+nep(items.length)+' सही। '+(score===items.length?'चारवटै उत्तर सही छन्।':'तल प्रत्येक प्रश्नको व्याख्या पढेर फेरि अभ्यास गर्नुहोस्।');
  items.forEach((item,i)=>{
   const correct=responses[i].value===item.answer;
   const card=document.createElement('div');card.className='ch10-review-card';
   const heading=document.createElement('strong');heading.textContent='प्रश्न '+nep(i+1)+' · '+(correct?'सही उत्तर':'समीक्षा आवश्यक');
   const explanation=document.createElement('p');explanation.textContent=item.explanation;
   card.append(heading,explanation);review.append(card);
  });
  review.hidden=false;feedback.tabIndex=-1;feedback.focus({preventScroll:true});
 });
})();

/* Chapter 11: inclusive zodiac counting, never a prediction about health or relationships. */
(function(){
 const a=document.getElementById('ch11MoonA'),b=document.getElementById('ch11MoonB'),out=document.getElementById('ch11CountResult');
 if(!a||!b||!out)return;
 const signs=['मेष','वृष','मिथुन','कर्कट','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 const render=()=>{
  const x=Number(a.value),y=Number(b.value);
  if(!a.value||!b.value){out.textContent='दुवै चन्द्रराशि छानेपछि दुईतर्फी दूरी देखिन्छ।';return}
  if(!Number.isInteger(x)||x<1||x>12||!Number.isInteger(y)||y<1||y>12){out.textContent='मान्य चन्द्रराशि छान्नुहोस्।';return}
  const forward=((y-x+12)%12)+1,reverse=((x-y+12)%12)+1;
  const matched=(forward===5&&reverse===9)||(forward===9&&reverse===5);
  const sequence=(start,count)=>Array.from({length:count},(_,i)=>signs[(start-1+i)%12]+' ('+nep(i+1)+')').join(' → ');
  out.textContent=signs[x-1]+' बाट '+signs[y-1]+' सम्म: '+sequence(x,forward)+'। '+signs[y-1]+' बाट '+signs[x-1]+' सम्म: '+sequence(y,reverse)+'। नतिजा: '+nep(forward)+'/'+nep(reverse)+'। '+(matched?'यस जोडीलाई स्रोतको परिभाषाअनुसार नवपञ्चक भनिन्छ।':'यस जोडीमा स्रोतको नवपञ्चक (५/९) गणना मिल्दैन।')+' दुवै दिशामा राशिचक्रको स्वाभाविक क्रममै गनिएको हो। यो राशिदूरीको अभ्यास मात्र हो; विवाह, गर्भधारण वा स्वास्थ्यको भविष्यवाणी होइन।';
 };
 a.addEventListener('change',render);b.addEventListener('change',render);
 document.querySelectorAll('#chapter11 .ch11-example-button').forEach(button=>{
  button.addEventListener('click',()=>{
   a.value=button.dataset.a;b.value=button.dataset.b;render();
   document.querySelectorAll('#chapter11 .ch11-example-button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  });
 });
 const resetPreset=()=>document.querySelectorAll('#chapter11 .ch11-example-button').forEach(item=>item.setAttribute('aria-pressed','false'));
 a.addEventListener('change',resetPreset);b.addEventListener('change',resetPreset);
})();
(function(){
 const form=document.getElementById('ch11Quiz'),feedback=document.getElementById('ch11Feedback'),review=document.getElementById('ch11Review');
 if(!form||!feedback||!review)return;
 const questions=[
  {name:'ch11q1',answer:'b',explanation:'नवपञ्चकको परिभाषामा दुवैको जन्म चन्द्रराशि तुलना गरिन्छ।'},
  {name:'ch11q2',answer:'a',explanation:'समावेशी गणनामा सुरुको राशि पनि गनिन्छ: मेष (१) → वृष (२) → मिथुन (३) → कर्कट (४) → सिंह (५)। त्यसैले मेषबाट सिंह पाँचौँ स्थानमा पर्छ; उल्टो सिंहबाट मेष नवौँ स्थानमा पर्छ।'},
  {name:'ch11q3',answer:'c',explanation:'राशिदूरीको गणनाले प्रजनन, स्वास्थ्य वा वैवाहिक भविष्य निर्धारण गर्दैन।'},
  {name:'ch11q4',answer:'a',explanation:'स्रोतमा दुवैको नाडी एउटै (आद्य–आद्य, मध्य–मध्य वा अन्त्य–अन्त्य) भए नाडी दोष भनिएको छ। अष्टकूट मिलानका आठ कूटमध्ये नाडी एउटा कूट हो; प्रचलित ३६ गुणको पद्धतिमा यसको अधिकतम भार ८ गुण हुन्छ। यो स्वास्थ्य वा विवाहको विश्वसनीय परीक्षण होइन।'},
  {name:'ch11q5',answer:'b',explanation:'मङ्गल दोषको गणना र परिहारका नियम स्रोतमा एकरूप छैनन्; ती वैज्ञानिक रूपमा प्रमाणित वैवाहिक भविष्यवाणी होइनन्।'},
  {name:'ch11q6',answer:'a',explanation:'स्रोतको शिक्षा तालिकामा उच्चशिक्षा नवम भाव र बृहस्पतिसँग जोडिएको छ।'},
  {name:'ch11q7',answer:'b',explanation:'स्रोतमा सप्तमेश दशौँ भावमा हुँदा बुबा वा कार्यस्थलमार्फत परिचयको उदाहरण छ।'}
 ];
 const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
 const clear=()=>{feedback.textContent='';feedback.className='ch10-feedback';review.hidden=true;review.replaceChildren()};
 form.addEventListener('change',event=>{if(!event.target.matches('input[type="radio"]'))return;clear();try{localStorage.removeItem('jyotisha-chapter11-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'))});
 form.addEventListener('reset',()=>{clear();try{localStorage.removeItem('jyotisha-chapter11-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));feedback.removeAttribute('tabindex')});
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const selected=questions.map(q=>form.querySelector('input[name="'+q.name+'"]:checked'));
  const missing=selected.findIndex(x=>!x);
  if(missing!==-1){clear();feedback.textContent='कृपया सातवटै प्रश्नको उत्तर छान्नुहोस्।';feedback.className='ch10-feedback is-warning';form.querySelector('input[name="'+questions[missing].name+'"]').focus();return}
  review.replaceChildren();
  const score=selected.reduce((n,x,i)=>n+Number(x.value===questions[i].answer),0);
  try{localStorage.setItem('jyotisha-chapter11-score',JSON.stringify({score,total:questions.length}))}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  feedback.className='ch10-feedback is-result';feedback.textContent='नतिजा: '+nep(score)+' / '+nep(questions.length)+' सही। '+(score===questions.length?'सातवटै उत्तर सही छन्।':'तलका व्याख्या पढेर फेरि अभ्यास गर्नुहोस्।');
  questions.forEach((q,i)=>{const card=document.createElement('div');card.className='ch10-review-card';const heading=document.createElement('strong');heading.textContent='प्रश्न '+nep(i+1)+' · '+(selected[i].value===q.answer?'सही उत्तर':'समीक्षा आवश्यक');const p=document.createElement('p');p.textContent=q.explanation;card.append(heading,p);review.append(card)});
  review.hidden=false;feedback.tabIndex=-1;feedback.focus({preventScroll:true});
 });
})();

/* Chapter 11: education categories are source descriptions, not aptitude testing. */
(function(){
 const select=document.getElementById('ch11EducationLevel');
 const out=document.getElementById('ch11EducationResult');
 if(!select||!out)return;
 const explanations={
  school:'विद्यालय तह: स्रोतले पञ्चम भाव र बुधको अवस्थालाई हेर्ने परम्परागत विधि बताउँछ।',
  higher:'उच्चशिक्षा: स्रोतले नवम भाव र बृहस्पतिलाई अध्ययनको प्रतीकात्मक सन्दर्भमा राख्छ।',
  research:'अनुसन्धान वा गहन अध्ययन: स्रोतले अष्टम भाव र केतुसँग परम्परागत सम्बन्ध देखाउँछ। यसलाई विद्यावारिधि अध्ययनको योग्यता निर्धारण गर्ने आधार मानिँदैन।'
 };
 select.addEventListener('change',()=>{
  out.textContent=explanations[select.value]?explanations[select.value]+' यो वर्गीकरण शैक्षिक क्षमता, उपयुक्त विषय वा भविष्यको सफलता मापन गर्ने परीक्षण होइन।':'तह छानेपछि सम्बन्धित भाव र ग्रहको परम्परागत जोडी देखिन्छ।';
 });
})();

/* Chapter 11: source examples for house-based relationship terminology. */
(function(){
 const select=document.getElementById('ch11MarriageHouse');
 const out=document.getElementById('ch11MarriageResult');
 if(!select||!out)return;
 const examples={
  '3':'तेस्रो भाव: स्रोतको काल्पनिक उदाहरणमा भाइबहिनी वा नजिकको परिचयमार्फत सम्बन्ध जोडिन सक्ने परम्परागत अर्थ दिइएको छ।',
  '5':'पाँचौँ भाव: स्रोतको उदाहरणमा अध्ययन, परिचय वा प्रेमसम्बन्धी सन्दर्भ उल्लेख छ।',
  '10':'दशौँ भाव: स्रोतको उदाहरणमा बुबा वा कार्यस्थलको माध्यम उल्लेख छ।'
 };
 select.addEventListener('change',()=>{
  out.textContent=examples[select.value]?examples[select.value]+' यो प्रतीकात्मक पाठ-अभ्यास हो, विवाहको भविष्यवाणी होइन।':'भाव छानेपछि स्रोतमा दिइएको सम्बन्धको परम्परागत उदाहरण देखिन्छ।';
 });
})();

/* Chapter 12 assessment: source comprehension with per-question feedback */
(function(){
 const form=document.getElementById('ch12Quiz');if(!form)return;
 const fields=[...form.querySelectorAll('fieldset[data-answer]')];
 const result=document.getElementById('ch12Result');
 form.addEventListener('submit',function(e){
  e.preventDefault();
  const unanswered=fields.find(field=>!field.querySelector('input:checked'));
  if(unanswered){result.textContent='सबै प्रश्नको उत्तर छानेपछि मात्र नतिजा जाँच्न सकिन्छ। कृपया बाँकी प्रश्न पूरा गर्नुहोस्।';unanswered.querySelector('input')?.focus();return;}
  let correct=0,answered=0;
  for(const field of fields){
   const selected=field.querySelector('input:checked');
   const good=!!selected&&Number(selected.value)===Number(field.dataset.answer);
   if(selected)answered++;if(good)correct++;
   field.classList.toggle('ch12-correct',good);
   field.classList.toggle('ch12-incorrect',!!selected&&!good);
   const explanation=field.querySelector('.ch12-explanation');
   if(explanation)explanation.hidden=false;
  }
  const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);
  try{localStorage.setItem('jyotisha-chapter12-score',JSON.stringify({score:correct,total:fields.length}))}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  result.textContent='नतिजा: '+nep(correct)+' / '+nep(fields.length)+' सही। '+(answered<fields.length?'उत्तर दिइएका प्रश्न: '+nep(answered)+'। बाँकी '+nep(fields.length-answered)+' प्रश्न पनि पूरा गर्नुहोस्।':'प्रत्येक उत्तरको व्याख्या पढेर आवश्यक पाठ पुनः अध्ययन गर्नुहोस्।');
 });
 form.addEventListener('reset',function(){
  fields.forEach(field=>{
   field.classList.remove('ch12-correct','ch12-incorrect');
   const explanation=field.querySelector('.ch12-explanation');
   if(explanation)explanation.hidden=true;
  });
  result.textContent='';
  try{localStorage.removeItem('jyotisha-chapter12-score')}catch(_){}
  window.dispatchEvent(new Event('jyotisha-assessment-updated'));
 });
 form.addEventListener('change',function(e){
  const field=e.target.closest('fieldset[data-answer]');
  if(!field)return;
  fields.forEach(item=>{
   item.classList.remove('ch12-correct','ch12-incorrect');
   const explanation=item.querySelector('.ch12-explanation');
   if(explanation)explanation.hidden=true;
  });
  try{localStorage.removeItem('jyotisha-chapter12-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));result.textContent='उत्तर परिवर्तन गरिएको छ। नयाँ नतिजाका लागि फेरि जाँच्नुहोस्।';
 });
})();

(function(){const dirs=[["पूर्व","सूर्य","पानी, स्नानघर, पूजा, अध्ययन"],["आग्नेय","शुक्र","भान्सा, बिजुली"],["दक्षिण","मङ्गल","शयन, भारी सामान"],["नैऋत्य","राहु","प्राविधिक सामग्री, घरमूलीको बसाइ"],["पश्चिम","शनि","भोजन, फ्रिज, वृद्धहरूको बसाइ"],["वायव्य","चन्द्र","पशुपालन, अन्नभण्डार"],["उत्तर","बुध","भण्डार, गहना, अध्ययन"],["ईशान","बृहस्पति","मन्दिर, पूजा, अध्ययन, पानी"]];const out=document.getElementById('ch13DirectionResult');document.querySelectorAll('#chapter13 [data-dir]').forEach(b=>b.addEventListener('click',()=>{const index=Number(b.dataset.dir);if(!out||!Number.isInteger(index)||index<0||index>=dirs.length)return;const d=dirs[index];out.textContent=d[0]+' · '+d[1]+' — '+d[2];document.querySelectorAll('#chapter13 [data-dir]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));const form=document.getElementById('ch13Quiz');if(form)form.addEventListener('submit',e=>{e.preventDefault();const fields=[...form.querySelectorAll('fieldset')];const unanswered=fields.filter(f=>!f.querySelector('input:checked'));const result=document.getElementById('ch13Result');if(unanswered.length){result.textContent='अझै '+String(unanswered.length).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)])+' प्रश्नको उत्तर दिन बाँकी छ। सबै प्रश्नको उत्तर दिएपछि जाँच्नुहोस्।';unanswered[0].querySelector('input')?.focus();return;}let score=0;fields.forEach(f=>{const chosen=f.querySelector('input:checked');const correct=Number(chosen.value)===Number(f.dataset.answer);if(correct)score++;f.querySelectorAll('label').forEach(label=>{const input=label.querySelector('input');label.classList.toggle('quiz-correct',Number(input.value)===Number(f.dataset.answer));label.classList.toggle('quiz-incorrect',input===chosen&&!correct);});f.querySelector('.ch12-explanation').hidden=false;});const nep=n=>String(n).replace(/[0-9]/g,d=>'०१२३४५६७८९'[Number(d)]);try{localStorage.setItem('jyotisha-chapter13-score',JSON.stringify({score,total:fields.length}))}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));result.textContent='नतिजा: '+nep(score)+' / '+nep(fields.length)+' सही। तल प्रत्येक उत्तरको कारण पढ्न सक्नुहुन्छ।';});if(form)form.addEventListener('reset',()=>{form.querySelectorAll('fieldset').forEach(field=>{field.querySelectorAll('label').forEach(label=>label.classList.remove('quiz-correct','quiz-incorrect'));const explanation=field.querySelector('.ch12-explanation');if(explanation)explanation.hidden=true;});document.getElementById('ch13Result').textContent='';try{localStorage.removeItem('jyotisha-chapter13-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));});if(form)form.addEventListener('change',e=>{const field=e.target.closest('fieldset[data-answer]');if(!field)return;form.querySelectorAll('fieldset').forEach(item=>{item.querySelectorAll('label').forEach(label=>label.classList.remove('quiz-correct','quiz-incorrect'));const explanation=item.querySelector('.ch12-explanation');if(explanation)explanation.hidden=true;});try{localStorage.removeItem('jyotisha-chapter13-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));document.getElementById('ch13Result').textContent='उत्तर परिवर्तन गरिएको छ। सबै उत्तर जाँच्न फेरि बटन थिच्नुहोस्।';});})();

/* Chapter 8 short checks: clear outdated feedback after an answer changes. */
(function(){
 const ids=['ch8Quiz','ch8SourceQuiz','ch8ComfortQuiz','ch8SiblingQuiz','ch8ResidenceQuiz','ch8ConflictQuiz'];
 ids.forEach(id=>{
  const form=document.getElementById(id);if(!form)return;
  const feedback=form.querySelector('[role="status"]');if(!feedback)return;
  form.addEventListener('change',event=>{if(event.target.matches('input[type="radio"]'))feedback.textContent='उत्तर परिवर्तन गरिएको छ। नयाँ उत्तर जाँच्नुहोस्।';});
 });
})();

/* Chapter 5: explanations tied to the worked examples in the lesson. */
(function(){
 const form=document.getElementById('ch5AssessmentForm');
 const root=document.getElementById('ch5AssessmentQuestions');
 const result=document.getElementById('ch5AssessmentResult');
 if(!form||!root||!result)return;
 const questions=[
  {q:'भयातले के जनाउँछ?',choices:['जन्म नक्षत्रको पूरा अवधि','जन्म नक्षत्र सुरु भएदेखि जन्मसम्म बितेको समय','सूर्योदयदेखि अर्को सूर्योदयसम्मको समय'],correct:1,why:'भयात जन्म नक्षत्र सुरु भएदेखि जन्मसम्म बितेको अवधि हो। भभोग भने त्यस नक्षत्रको पूरा अवधि हो।'},
  {q:'कृत्तिका ८/१२ मा समाप्त भयो र जन्मको इष्टकाल २२/५२ छ। रोहिणीको भयात कति हुन्छ?',choices:['१४ घडी ४० पला','३० घडी ४० पला','८ घडी १२ पला'],correct:0,why:'२२/५२ − ८/१२ = १४/४०। कृत्तिका सकिएपछि रोहिणी सुरु भएकाले यही रोहिणीको भयात हो।'},
  {q:'कृत्तिका आज ८/१२ मा र रोहिणी भोलि ४/१० मा समाप्त भए रोहिणीको भभोग कति हुन्छ?',choices:['१२ घडी २२ पला','६० घडी','५५ घडी ५८ पला'],correct:2,why:'६०/०० − ८/१२ = ५१/४८। त्यसमा भोलिको ४/१० जोड्दा ५५/५८ हुन्छ।'},
  {q:'भयात १४/४० र भभोग ५५/५८ हुँदा जन्म नक्षत्रको बाँकी अवधि कति पला हुन्छ?',choices:['८८० पला','२४७८ पला','३३५८ पला'],correct:1,why:'भभोग ५५×६०+५८ = ३३५८ पला र भयात १४×६०+४० = ८८० पला। अन्तर २४७८ पला हो।'},
  {q:'रोहिणीको नक्षत्रेश चन्द्र र महादशा १० वर्ष मान्दा माथिको उदाहरणमा दशा शेष करिब कति हुन्छ?',choices:['१० वर्ष पूरा','७ वर्ष ४ महिना १७ दिन','४ महिना १७ दिन'],correct:1,why:'(२४७८ ÷ ३३५८) × १० ≈ ७.३७९४ वर्ष। १२ महिना र ३०-दिने महिनाको शैक्षिक रूपान्तरणले करिब ७ वर्ष ४ महिना १७ दिन दिन्छ।'}
 ];
 questions.forEach((item,i)=>{
  const field=document.createElement('fieldset');
  field.className='exam-question';
  const legend=document.createElement('legend');legend.textContent=(i+1)+'. '+item.q;field.append(legend);
  item.choices.forEach((choice,j)=>{
   const label=document.createElement('label');label.style.display='flex';label.style.gap='10px';label.style.alignItems='flex-start';label.style.padding='9px 0';
   const radio=document.createElement('input');radio.type='radio';radio.name='ch5q'+i;radio.value=String(j);radio.required=true;
   label.append(radio,document.createTextNode(choice));field.append(label);
  });
  const explanation=document.createElement('p');explanation.className='feedback';explanation.id='ch5why'+i;explanation.hidden=true;field.append(explanation);root.append(field);
 });
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  let score=0;
  questions.forEach((item,i)=>{
   const chosen=form.querySelector('input[name="ch5q'+i+'"]:checked');
   const right=Number(chosen.value)===item.correct;if(right)score++;
   const explanation=document.getElementById('ch5why'+i);
   explanation.textContent=(right?'सही। ':'फेरि हेर्नुहोस्। ')+item.why;
   explanation.hidden=false;
  });
  result.textContent='प्राप्ताङ्क: '+score+' / '+questions.length+'। '+(score>=4?'अभ्यास लक्ष्य पूरा भयो।':'व्याख्या पढेर फेरि अभ्यास गर्नुहोस्।');
  try{localStorage.setItem('jyotisha-chapter5-score',JSON.stringify({score,total:questions.length}))}catch(_){}
  window.dispatchEvent(new Event('jyotisha-assessment-updated'));
 });
 form.addEventListener('reset',()=>{try{localStorage.removeItem('jyotisha-chapter5-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));questions.forEach((_,i)=>{const el=document.getElementById('ch5why'+i);el.textContent='';el.hidden=true});result.textContent='';});
 form.addEventListener('change',()=>{try{localStorage.removeItem('jyotisha-chapter5-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));result.textContent='उत्तर परिवर्तन गरिएको छ। नयाँ नतिजाका लागि फेरि जाँच्नुहोस्।';questions.forEach((_,i)=>{document.getElementById('ch5why'+i).hidden=true})});
})();

/* Chapter 6: concept and sequence checks from the Vimshottari lesson. */
(function(){
 const form=document.getElementById('ch6AssessmentForm');
 const root=document.getElementById('ch6AssessmentQuestions');
 const result=document.getElementById('ch6AssessmentResult');
 if(!form||!root||!result)return;
 const questions=[
  {q:'विंशोत्तरी महादशाको नौ ग्रहको पूरा चक्र कति वर्षको हुन्छ?',choices:['१०८ वर्ष','१२० वर्ष','३६० वर्ष'],correct:1,why:'केतु ७, शुक्र २०, सूर्य ६, चन्द्र १०, मङ्गल ७, राहु १८, बृहस्पति १६, शनि १९ र बुध १७ वर्ष जोड्दा १२० वर्ष हुन्छ।'},
  {q:'चन्द्रको महादशापछि कुन ग्रहको महादशा आउँछ?',choices:['मङ्गल','राहु','शुक्र'],correct:0,why:'दशाक्रममा सूर्यपछि चन्द्र, त्यसपछि मङ्गल र त्यसपछि राहु आउँछन्।'},
  {q:'रोहिणी नक्षत्रमा जन्म भए विंशोत्तरी दशाको प्रारम्भिक ग्रह कुन हो?',choices:['सूर्य','केतु','चन्द्र'],correct:2,why:'रोहिणी, हस्त र श्रवण नक्षत्रका स्वामी चन्द्र भएकाले जन्मदशा चन्द्रबाट सुरु हुन्छ।'},
  {q:'जन्ममा चन्द्र महादशाको ७.३७९ वर्ष बाँकी छ भने त्यसपछि कुन महादशा र कति वर्ष आउँछ?',choices:['मङ्गलको पूरा ७ वर्ष','चन्द्रको अर्को पूरा १० वर्ष','राहुको १८ वर्ष'],correct:0,why:'जन्ममा बाँकी ७.३७९ वर्ष चन्द्रको दशा शेष हो। त्यो समाप्त भएपछि क्रमअनुसार मङ्गलको पूरा ७-वर्षीय महादशा सुरु हुन्छ।'},
  {q:'जन्ममा बाँकी दशा शेष र महादशाको पूरा अवधि सम्बन्धमा कुन कथन सही छ?',choices:['दुवै सधैँ बराबर हुन्छन्','दशा शेष जन्मसमयमा बाँकी भाग हो; पूरा अवधि ग्रहको निर्धारित अवधि हो','जन्मदशा सधैँ पूरा अवधिबाट सुरु हुन्छ'],correct:1,why:'जन्म नक्षत्रको बितेको र बाँकी अंशअनुसार पहिलो महादशाको शेष बदलिन्छ। त्यस ग्रहको निर्धारित पूरा अवधि भने चक्रमा स्थिर रहन्छ।'}
 ];
 questions.forEach((item,i)=>{
  const field=document.createElement('fieldset');field.className='exam-question';
  const legend=document.createElement('legend');legend.textContent=(i+1)+'. '+item.q;field.append(legend);
  item.choices.forEach((choice,j)=>{
   const label=document.createElement('label');label.style.display='flex';label.style.gap='10px';label.style.alignItems='flex-start';label.style.padding='9px 0';
   const input=document.createElement('input');input.type='radio';input.name='ch6q'+i;input.value=String(j);input.required=true;
   label.append(input,document.createTextNode(choice));field.append(label);
  });
  const explanation=document.createElement('p');explanation.className='feedback';explanation.id='ch6why'+i;explanation.hidden=true;field.append(explanation);root.append(field);
 });
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  let score=0;
  questions.forEach((item,i)=>{
   const selected=form.querySelector('input[name="ch6q'+i+'"]:checked');
   const right=Number(selected.value)===item.correct;if(right)score++;
   const explanation=document.getElementById('ch6why'+i);
   explanation.textContent=(right?'सही। ':'फेरि हेर्नुहोस्। ')+item.why;explanation.hidden=false;
  });
  result.textContent='प्राप्ताङ्क: '+score+' / '+questions.length+'। '+(score>=4?'अभ्यास लक्ष्य पूरा भयो।':'व्याख्या पढेर फेरि अभ्यास गर्नुहोस्।');
  try{localStorage.setItem('jyotisha-chapter6-score',JSON.stringify({score,total:questions.length}))}catch(_){}
  window.dispatchEvent(new Event('jyotisha-assessment-updated'));
 });
 form.addEventListener('reset',()=>{try{localStorage.removeItem('jyotisha-chapter6-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));questions.forEach((_,i)=>{const e=document.getElementById('ch6why'+i);e.textContent='';e.hidden=true});result.textContent='';});
 form.addEventListener('change',()=>{try{localStorage.removeItem('jyotisha-chapter6-score')}catch(_){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));result.textContent='उत्तर परिवर्तन गरिएको छ। नयाँ नतिजाका लागि फेरि जाँच्नुहोस्।';questions.forEach((_,i)=>{document.getElementById('ch6why'+i).hidden=true})});
})();
