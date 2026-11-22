// Homepage quick calculators. The chapter calculators remain the detailed source.
(function(){
'use strict';
const $=id=>document.getElementById(id);
const out=(id,s)=>{$(id).textContent=s;};
const digits=n=>String(n).padStart(2,'0');
const number=id=>Number($(id).value);
const valid=(v,min,max)=>Number.isFinite(v)&&v>=min&&v<=max;
const base=$('lsDistrict'),dest=$('htDistrict');
if(base&&dest){for(const child of base.children){if(child.tagName==='OPTGROUP')dest.appendChild(child.cloneNode(true));}}
$('htSunriseGo').addEventListener('click',()=>{
 const v=$('htSunrise').value,offset=$('htDistrict').value;
 if(!/^\d{2}:\d{2}$/.test(v)||!/^[-+]\d{2}:\d{2}$/.test(offset)){out('htSunriseOut','काठमाडौँको समय र जिल्ला छान्नुहोस्।');return;}
 const [h,m]=v.split(':').map(Number),sign=offset[0]==='-'?-1:1,[om,os]=offset.slice(1).split(':').map(Number);
 const seconds=(h*60+m)*60-sign*(om*60+os);
 if(seconds<0||seconds>=86400){out('htSunriseOut','समय मान्य दायराबाहिर छ।');return;}
 const rounded=Math.floor((seconds+30)/60);out('htSunriseOut','स्थानीय सूर्योदय: '+digits(Math.floor(rounded/60))+':'+digits(rounded%60));
});
$('htGhadiGo').addEventListener('click',()=>{
 const h=number('htHours'),m=number('htMinutes');
 if(!Number.isInteger(h)||!Number.isInteger(m)||!valid(h,0,23)||!valid(m,0,59)){out('htGhadiOut','घण्टा र मिनेट जाँच्नुहोस्।');return;}
 const vipala=(h*60+m)*150,gh=Math.floor(vipala/3600),pa=Math.floor(vipala%3600/60),vi=vipala%60;
 out('htGhadiOut',gh+' घडी '+pa+' पला '+vi+' विपला');
});
$('htTithiGo').addEventListener('click',()=>{
 const s=number('htSun'),m=number('htMoon');
 if(!valid(s,0,360)||!valid(m,0,360)||s===360||m===360){out('htTithiOut','० देखि ३६०° भन्दा कम अंश राख्नुहोस्।');return;}
 const delta=(m-s+360)%360,idx=Math.floor((delta+1e-10)/12),names=['प्रतिपदा','द्वितीया','तृतीया','चतुर्थी','पञ्चमी','षष्ठी','सप्तमी','अष्टमी','नवमी','दशमी','एकादशी','द्वादशी','त्रयोदशी','चतुर्दशी','पूर्णिमा'];
 const phase=idx<15?'शुक्ल':'कृष्ण',n=idx%15;
 out('htTithiOut',phase+' '+(idx===29?'औँसी':names[n])+' · कोणीय अन्तर '+delta.toFixed(2)+'°');
});
$('htNakGo').addEventListener('click',()=>{
 const d=number('htNakDegree');
 if(!valid(d,0,360)||d===360){out('htNakOut','० देखि ३६०° भन्दा कम अंश राख्नुहोस्।');return;}
 const idx=Math.floor((d+1e-9)/(360/27)),pada=Math.floor(((d-idx*(360/27))+1e-9)/(360/108))+1;
 const names=['अश्विनी','भरणी','कृत्तिका','रोहिणी','मृगशिरा','आर्द्रा','पुनर्वसु','पुष्य','आश्लेषा','मघा','पूर्वाफाल्गुनी','उत्तराफाल्गुनी','हस्त','चित्रा','स्वाती','विशाखा','अनुराधा','ज्येष्ठा','मूल','पूर्वाषाढा','उत्तराषाढा','श्रवण','धनिष्ठा','शतभिषा','पूर्वाभाद्रपदा','उत्तराभाद्रपदा','रेवती'];
 out('htNakOut',names[Math.min(idx,26)]+' · '+Math.min(pada,4)+' पाउ');
});
})();
