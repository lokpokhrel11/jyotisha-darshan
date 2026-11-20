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
$('nav').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>$('nav').classList.remove('open')));
function showAnga(i){$('angaTabs').querySelectorAll('button').forEach((b,j)=>{b.classList.toggle('selected',i===j);b.setAttribute('aria-pressed',String(i===j));});const a=anga[i];$('angaDetail').innerHTML=`<strong>${a.name}</strong> · ${a.count}<p>${a.desc}</p>`;}
anga.forEach((a,i)=>{const b=document.createElement('button');b.textContent=a.name;b.addEventListener('click',()=>showAnga(i));$('angaTabs').append(b);});showAnga(0);
$('openLesson').addEventListener('click',()=>{$('lesson').hidden=false;$('lesson').scrollIntoView({behavior:'smooth',block:'start'});});
$('closeLesson').addEventListener('click',()=>{$('lesson').hidden=true;});
// Multiple formative checks grounded in Chapter 1 of the study notes.
const questions=[
 {q:'पञ्चाङ्गका पाँच अङ्गमध्ये कुन पर्दछ?',options:['लग्न','करण','भावेश'],correct:1,why:'करण पञ्चाङ्गका पाँच अङ्गमध्ये एक हो।'},
 {q:'एक तिथिमा कति करण हुन्छन्?',options:['एक','दुई','चार'],correct:1,why:'एक तिथि दुई करण बराबर हुन्छ।'},
 {q:'नक्षत्रको परम्परागत संख्या कति हो?',options:['१२','२७','३०'],correct:1,why:'पञ्चाङ्गमा २७ नक्षत्र प्रयोग गरिन्छ।'},
 {q:'वारको परम्परागत संख्या कति हो?',options:['५','७','९'],correct:1,why:'वार सात हुन्छन्।'},
 {q:'पञ्चाङ्गमा योगको संख्या कति हो?',options:['११','२७','३०'],correct:1,why:'योग २७ हुन्छन्।'}
];
let questionIndex=0,correctCount=0,answered=false;
function renderQuestion(){
 const q=questions[questionIndex];answered=false;
 $('questionTitle').textContent=q.q;$('quizFeedback').textContent='';
 $('quizProgress').textContent=`प्रश्न ${questionIndex+1} / ${questions.length} · सही ${correctCount}`;
 $('quizOptions').replaceChildren();
 q.options.forEach((option,i)=>{const b=document.createElement('button');b.type='button';b.textContent=option;b.addEventListener('click',()=>{
  if(answered)return;answered=true;
  const ok=i===q.correct;if(ok)correctCount++;
  $('quizFeedback').textContent=(ok?'सही। ':'अहिले सही भएन। ')+q.why;
  $('quizProgress').textContent=`प्रश्न ${questionIndex+1} / ${questions.length} · सही ${correctCount}`;
  $('quizOptions').querySelectorAll('button').forEach(x=>x.disabled=true);
  $('nextQuestion').hidden=questionIndex===questions.length-1;
  if(questionIndex===questions.length-1){
   const passed=correctCount>=4;
   $('quizFeedback').textContent+=` अन्तिम नतिजा: ${correctCount}/5। `+(passed?'अध्यायको प्रारम्भिक जाँच पूरा भयो।':'फेरि पढेर अभ्यास गर्नुहोस्।');
   $('restartQuiz').hidden=false;
   try{localStorage.setItem('jd-lesson1-v02',JSON.stringify({score:correctCount,total:5,completed:passed}));}catch(e){}
  }
 });$('quizOptions').append(b);});
 $('nextQuestion').hidden=true;
}
$('nextQuestion').addEventListener('click',()=>{questionIndex++;renderQuestion()});
$('restartQuiz').addEventListener('click',()=>{questionIndex=0;correctCount=0;$('restartQuiz').hidden=true;renderQuestion()});
renderQuestion();
// Chapter 1 expanded learning tools. Angles are hypothetical teaching inputs.
const tithiGroups=['नन्दा','भद्रा','जया','रिक्ता','पूर्णा'];
for(let i=1;i<=15;i++)$('tithiNumber').add(new Option(`${i} औँ तिथि`,String(i)));
function showTithiGroup(){const n=Number($('tithiNumber').value);$('tithiGroupResult').textContent=`${n} औँ तिथि: ${tithiGroups[(n-1)%5]} समूह।`;}
$('tithiNumber').addEventListener('change',showTithiGroup);showTithiGroup();
function validAngle(id){const v=Number($(id).value);return $(id).value.trim()!==''&&Number.isFinite(v)&&v>=0&&v<360?v:null;}
$('nakCalculate').addEventListener('click',()=>{
 const d=validAngle('nakDegree');if(d===null){$('nakResult').textContent='० देखि ३६० भन्दा कम अंश लेख्नुहोस्।';return;}
 const n=Math.floor((d+1e-10)/(360/27))+1;const pad=Math.floor(((d%(360/27))+1e-10)/(360/108))+1;
 $('nakResult').textContent=`नक्षत्र क्रम ${Math.min(n,27)} · पाउ ${Math.min(pad,4)}। यो २७ नक्षत्रको समान खण्डमा आधारित अभ्यास हो।`;
});
$('tithiCalculate').addEventListener('click',()=>{
 const sun=validAngle('sunLongitude'),moon=validAngle('moonLongitude');
 if(sun===null||moon===null){$('tithiCalcResult').textContent='दुवै भोगांश ० देखि ३६० भन्दा कम हुनुपर्छ।';return;}
 const diff=(moon-sun+360)%360;const idx=Math.floor((diff+1e-10)/12);const paksha=idx<15?'शुक्ल':'कृष्ण';
 const n=idx%15+1;const names=['प्रतिपदा','द्वितीया','तृतीया','चतुर्थी','पञ्चमी','षष्ठी','सप्तमी','अष्टमी','नवमी','दशमी','एकादशी','द्वादशी','त्रयोदशी','चतुर्दशी'];
 const name=n===15?(paksha==='शुक्ल'?'पूर्णिमा':'औँसी'):names[n-1];
 $('tithiCalcResult').textContent=`अन्तर ${diff.toFixed(2)}° · ${paksha} पक्ष · ${name} (तिथि ${n})।`;
});
const lagna=$('lagna'),bhava=$('bhava');signs.forEach((s,i)=>lagna.add(new Option(`${i+1} · ${s}`,String(i+1))));for(let i=1;i<=12;i++)bhava.add(new Option(`${i} औँ भाव`,String(i)));lagna.value='5';bhava.value='9';
// Fixed North Indian chart houses: 1 top diamond, 4 left diamond, 7 bottom diamond, 10 right diamond.
// Other houses occupy the corner triangles. Labels are at approximate visual centers.
const houseCenters=[[200,91],[105,51],[51,106],[92,200],[51,293],[106,348],[200,309],[294,348],[349,294],[309,200],[349,106],[294,51]];
function updateChart(){const l=Number(lagna.value);const g=$('chartLabels');g.replaceChildren();houseCenters.forEach(([x,y],i)=>{const t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',x);t.setAttribute('y',y);t.textContent=String((l+i-1)%12+1);g.append(t);});}
function calculate(){const l=Number(lagna.value),h=Number(bhava.value),idx=(l+h-2)%12;$('result').textContent=`${h} औँ भावमा ${idx+1} नम्बरको ${signs[idx]} राशि पर्छ। यसको स्वामी ${lords[idx]} हो।`;updateChart();}
$('calculate').addEventListener('click',calculate);lagna.addEventListener('change',()=>{$('result').textContent='लग्न परिवर्तन भयो। नयाँ नतिजा हेर्न गणना गर्नुहोस्।';updateChart();});bhava.addEventListener('change',()=>{$('result').textContent='राशि पत्ता लगाउनुहोस् बटन थिच्नुहोस्।';});$('newExample').addEventListener('click',()=>{lagna.value=String(Math.floor(Math.random()*12)+1);bhava.value=String(Math.floor(Math.random()*12)+1);$('result').textContent='नयाँ उदाहरण छानियो। पहिले आफैँ गणना गर्नुहोस्।';updateChart();});
updateChart();
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
