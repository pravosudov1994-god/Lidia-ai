(() => {
  // Cloudflare fallback for the main Lydia image.
  // First try the local static asset; if Cloudflare does not expose it on this route,
  // fall back to the public GitHub copy so the hero image always appears.
  const lidiaImageUrl = 'https://raw.githubusercontent.com/pravosudov1994-god/Lidia-ai/main/assets/lidia-hero.webp';
  document.querySelectorAll('img[src$="lidia-hero.webp"]').forEach(img => {
    img.addEventListener('error', () => {
      if (img.src !== lidiaImageUrl) img.src = lidiaImageUrl;
    }, { once: true });
    img.src = '/assets/lidia-hero.webp';
  });

  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const modal = document.getElementById('leadModal');
  const closeModal = () => {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };
  const openModal = e => {
    e.preventDefault();
    modal?.classList.add('open');
    modal?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(() => modal?.querySelector('input')?.focus(), 50);
  };

  document.querySelectorAll('.js-open-form').forEach(btn => btn.addEventListener('click', openModal));
  document.querySelectorAll('.js-close-form').forEach(btn => btn.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  const form = document.getElementById('leadForm');
  const status = document.getElementById('formStatus');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = 'Форма готова. Подключим отправку в Telegram/CRM на этапе публикации.';
  });

  const canvas = document.getElementById('fxCanvas');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  const particles = [];
  const MAX = 48;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function seed() {
    particles.length = 0;
    const count = Math.min(MAX, Math.max(22, Math.floor(w / 26)));
    for (let i=0;i<count;i++) {
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        vx: (Math.random()-.5)*.16,
        vy: (Math.random()-.5)*.12,
        r: Math.random()*1.2+.5,
        gold: Math.random()>.55
      });
    }
  }

  function draw() {
    ctx.clearRect(0,0,w,h);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = w+20;
      if (p.x > w+20) p.x = -20;
      if (p.y < -20) p.y = h+20;
      if (p.y > h+20) p.y = -20;
      ctx.beginPath();
      ctx.fillStyle = p.gold ? 'rgba(233,154,42,.52)' : 'rgba(35,105,164,.42)';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    for (let i=0;i<particles.length;i++) {
      for (let j=i+1;j<particles.length;j++) {
        const a=particles[i], b=particles[j];
        const dx=a.x-b.x, dy=a.y-b.y, dist=Math.hypot(dx,dy);
        if (dist<115) {
          ctx.beginPath();
          ctx.strokeStyle=`rgba(50,105,155,${(1-dist/115)*.12})`;
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  resize(); seed();
  if (!reduced) draw();

  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer=setTimeout(()=>{resize();seed();},100);
  }, {passive:true});
})();