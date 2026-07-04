document.documentElement.classList.remove('no-js');
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ---------- Scroll progress + nav shrink ---------- */
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');

ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: self => {
    progress.style.width = (self.progress * 100) + '%';
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
});

/* ---------- Mobile menu ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;
gsap.set(mobileMenu, { yPercent: -100, opacity: 0 });
const menuTl = gsap.timeline({ paused: true })
  .to(mobileMenu, { yPercent: 0, opacity: 1, duration: .5, ease: 'power3.inOut' })
  .from(mobileMenu.querySelectorAll('a'), { y: 24, opacity: 0, stagger: .06, duration: .5, ease: 'power2.out' }, '-=.25');

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('is-open', menuOpen);
  hamburger.querySelectorAll('span')[0].style.transform = menuOpen ? 'translateY(6px) rotate(45deg)' : '';
  hamburger.querySelectorAll('span')[1].style.opacity = menuOpen ? '0' : '1';
  hamburger.querySelectorAll('span')[2].style.transform = menuOpen ? 'translateY(-6px) rotate(-45deg)' : '';
  if (menuOpen) { menuTl.play(); } else { menuTl.reverse(); }
});

mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuOpen = false;
  mobileMenu.classList.remove('is-open');
  menuTl.reverse();
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
}));

/* ---------- Hero intro ---------- */
const heroTl = gsap.timeline({ delay: .2 });
heroTl
  .to('.hero-el.eyebrow', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, 0)
  .from('.hero-el.eyebrow', { opacity: 0, y: 16 }, 0)
  .to('.hero h1 .line span', {
    y: '0%', duration: 1, ease: 'power4.out', stagger: .12
  }, .15)
  .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, .55)
  .fromTo('.hero-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, .68)
  .fromTo('.hv-frame', { opacity: 0 }, { opacity: 1, duration: .8 }, .3)
  .fromTo('.hv-main', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power4.inOut' }, .35)
  .fromTo('.hv-main img', { scale: 1.32 }, { scale: 1.12, duration: 1.4, ease: 'power3.out' }, .35)
  .fromTo('.hv-mini', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power4.inOut' }, .6)
  .fromTo('.hv-dot', { scale: 0, opacity: 0 }, { scale: 1, opacity: .55, duration: .9, ease: 'back.out(1.7)' }, .5);

/* gentle idle float once intro settles */
gsap.to('.hv-main', { y: 14, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
gsap.to('.hv-mini', { y: -10, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.2 });

/* parallax on scroll */
gsap.to('.hv-main', {
  yPercent: 8,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 }
});
gsap.to('.hv-mini', {
  yPercent: -14,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 }
});

/* ---------- Generic scroll reveals ---------- */
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 34 }, {
    opacity: 1, y: 0, duration: .9, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});

/* staggered grids */
ScrollTrigger.batch('.feat-item', {
  start: 'top 90%',
  onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: .1, duration: .8, ease: 'power3.out' }),
  onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: .1, duration: .8, ease: 'power3.out' })
});
gsap.set('.feat-item', { opacity: 0, y: 30 });

ScrollTrigger.batch('.how-card', {
  start: 'top 90%',
  onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: .12, duration: .8, ease: 'power3.out' }),
  onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: .12, duration: .8, ease: 'power3.out' })
});
gsap.set('.how-card', { opacity: 0, y: 40 });

ScrollTrigger.batch('.gal-item', {
  start: 'top 90%',
  onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: .12, duration: .9, ease: 'power3.out' }),
  onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: .12, duration: .9, ease: 'power3.out' })
});
gsap.set('.gal-item', { opacity: 0, y: 40 });

/* ---------- Roadmap timeline fill ---------- */
const rmItems = gsap.utils.toArray('[data-rm]');
gsap.to('#rmFill', {
  height: '100%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.rm-list',
    start: 'top 70%',
    end: 'bottom 80%',
    scrub: .6
  }
});
rmItems.forEach(item => {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 68%',
    onEnter: () => item.classList.add('active'),
    onLeaveBack: () => item.classList.remove('active')
  });
});

/* ---------- Magnetic buttons ---------- */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(btn, { x: x * .25, y: y * .5, duration: .4, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.4)' });
  });
});

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        gsap.to(openItem.querySelector('.faq-a'), { height: 0, duration: .45, ease: 'power2.inOut' });
      }
    });
    if (isOpen) {
      item.classList.remove('open');
      gsap.to(a, { height: 0, duration: .45, ease: 'power2.inOut' });
    } else {
      item.classList.add('open');
      gsap.set(a, { height: 'auto' });
      const h = a.offsetHeight;
      gsap.fromTo(a, { height: 0 }, { height: h, duration: .5, ease: 'power2.inOut' });
    }
  });
});

/* ---------- Waitlist form ---------- */
const form = document.getElementById('waitlistForm');
const ctaMsg = document.getElementById('ctaMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button');
  const original = btn.textContent;
  btn.textContent = 'Added ✓';
  gsap.fromTo(ctaMsg, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5, ease: 'power2.out' });
  form.querySelector('input').value = '';
  setTimeout(() => { btn.textContent = original; }, 2600);
});

/* ---------- Smooth anchor offset ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 70 }, ease: 'power3.inOut' });
  });
});
