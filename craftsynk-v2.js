/* =====================================================
   CRAFTSYNK V2 — SHARED JAVASCRIPT
   Theme toggle · Cursor · Scroll Reveal · Nav active
   ===================================================== */

function initPage(currentPage) {
  // ---- THEME ----
  const toggle = document.getElementById('themeToggle');
  const body   = document.body;
  const saved  = localStorage.getItem('cs-theme') || 'dark';
  body.className = saved;
  toggle.textContent = saved === 'dark' ? '🌙' : '☀️';
  toggle.addEventListener('click', () => {
    const next = body.classList.contains('dark') ? 'light' : 'dark';
    body.className = next;
    toggle.textContent = next === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('cs-theme', next);
  });

  // ---- CURSOR ----
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const glow = document.getElementById('cursor-glow');
  let mx=0,my=0, rx=0,ry=0, gx=0,gy=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  function animCursor() {
    dot.style.left  = mx+'px'; dot.style.top  = my+'px';
    rx += (mx-rx)*0.14; ry += (my-ry)*0.14;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    gx += (mx-gx)*0.06; gy += (my-gy)*0.06;
    glow.style.left = gx+'px'; glow.style.top = gy+'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('a,button,.glass,.work-card,.service-row,.process-step,.principle,.stat-card,.bento-card')
    .forEach(el => {
      el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
    });

  // ---- SCROLL REVEAL ----
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => obs.observe(r));

  // ---- NAV LOGO (home = scroll top) ----
  const logo = document.getElementById('navLogo');
  if(logo && (currentPage === 'index.html' || currentPage === '')) {
    logo.addEventListener('click', e => {
      e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- COUNTER utility ----
  window.animCounter = function(el, target, duration, suffix) {
    duration = duration || 1800; suffix = suffix || '';
    let startTime = null;
    function step(ts) {
      if(!startTime) startTime = ts;
      var prog = Math.min((ts-startTime)/duration, 1);
      el.textContent = Math.floor(prog * target) + suffix;
      if(prog < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
}
