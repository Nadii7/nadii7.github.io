const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
function setMenu(open){menuButton?.setAttribute('aria-expanded',String(open));menuButton?.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav?.classList.toggle('is-open',open);}
menuButton?.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton?.getAttribute('aria-expanded')==='true'){setMenu(false);menuButton.focus();}});
matchMedia('(min-width: 701px)').addEventListener('change',()=>setMenu(false));
for(const gallery of document.querySelectorAll('[data-gallery]')){
 const track=gallery.querySelector('.gallery-track');const slides=[...track.children];const prev=gallery.querySelector('[data-gallery-prev]');const next=gallery.querySelector('[data-gallery-next]');const status=gallery.querySelector('[data-gallery-status]');let frame;
 const current=()=>slides.reduce((best,slide,i)=>Math.abs(slide.offsetLeft-track.offsetLeft-track.scrollLeft)<Math.abs(slides[best].offsetLeft-track.offsetLeft-track.scrollLeft)?i:best,0);
 function update(){const index=current();prev.disabled=index===0;next.disabled=index===slides.length-1;status.textContent=`${index+1} of ${slides.length}`;}
 function go(delta){const index=Math.min(slides.length-1,Math.max(0,current()+delta));const left=slides[index].offsetLeft-track.offsetLeft;track.scrollTo({left,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 prev.addEventListener('click',()=>go(-1));next.addEventListener('click',()=>go(1));
 track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);},{passive:true});
 track.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();go(e.key==='ArrowRight'?1:-1);}});
 new ResizeObserver(update).observe(track);update();
}
