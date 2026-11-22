'use strict';
// Staging preview only: this is NOT the final public course application.
const menu=document.getElementById('menu'),nav=document.getElementById('nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));}
const theme=document.getElementById('themeToggle');if(theme){theme.addEventListener('click',()=>{const t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem('jyotisha-reader-theme-v1',t)}catch(e){}})}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
// Chapters 1-2 exercises are NOT yet wired. Do not deploy this preview.
