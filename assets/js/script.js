// Smooth cursor with lerp + hover states
const ring = document.querySelector('.cursor-ring');
const dot = document.querySelector('.cursor-dot');
let mouse = {x: window.innerWidth/2, y: window.innerHeight/2};
let pos = {x: mouse.x, y: mouse.y};

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  dot.style.left = mouse.x + 'px';
  dot.style.top = mouse.y + 'px';
});

function lerp(a,b,n){return (1-n)*a + n*b;}

function animate() {
  pos.x = lerp(pos.x, mouse.x, 0.18);
  pos.y = lerp(pos.y, mouse.y, 0.18);
  ring.style.left = pos.x + 'px';
  ring.style.top = pos.y + 'px';
  requestAnimationFrame(animate);
}
animate();

// hide cursor on touch devices
if('ontouchstart' in window || navigator.maxTouchPoints > 0){
  ring.style.display = 'none';
  dot.style.display = 'none';
  document.documentElement.style.cursor = 'auto';
}

// reveal on scroll
const revealElems = document.querySelectorAll('.card, .hero-text, .section-title, .hero-card');
const onScroll = () => {
  const trigger = window.innerHeight * 0.85;
  revealElems.forEach(el => {
    const r = el.getBoundingClientRect();
    if(r.top < trigger) el.classList.add('visible');
  });
};
window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// link hover interactions for cursor
document.querySelectorAll('a, .card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1.15)';
    ring.style.borderColor = 'rgba(15,23,42,0.08)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(15,23,42,0.06)';
  });
});

// accessibility: allow keyboard tab navigation to show focus outlines
document.addEventListener('keyup', (e) => {
  if(e.key === 'Tab') document.body.classList.add('show-focus');
});
