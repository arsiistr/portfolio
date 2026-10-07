// ===== DATA: ПРОЕКТЫ (замени на свои видео/картинки) =====
const projects = [
  {
    name: "Showreel 2025",
    client: "все мои работы",
    year: "2025",
    tags: ["3D", "Брендинг"],
    poster: "images/showreel-cover.jpg",
    video: "videos/showreel_arsiistr-compressed.mp4"
  },
  {
    name: "Анимация интерфейса",
    client: "shtab.app",
    year: "2025",
    tags: ["UI-motion"],
    poster: "images/Vid_01_06.10 (0;00;33;00).png",
    video: "videos/Shtab_full-compressed.mp4"
  },
  {
    name: "Forma: моушн‑дизайн и 3D‑визуализация",
    client: "Forma",
    year: "2026",
    tags: ["3D", "Логотип"],
    poster: "images/FORMA_Master (0-00-09-21).png",
    video: "videos/FORMA_Master.mp4"
  },
  {
    name: "Vladcon GO - экраны на Экспофоруме",
    client: "Vladcon",
    year: "2026",
    tags: ["3D", "Брендинг"],
    poster: "images/Vladkon_600x450_3_02.09 (00000).png",
    video: "videos/VLADCON_GO_05-compressed.mp4"
  },
  {
    name: "Vladcon Go - зацикленный экран для стенда",
    client: "Vladcon",
    year: "2026",
    tags: ["2D", "Digital-билборд"],
    poster: "images/photo_2026-09-18_14-08-22.jpg",
    video: "videos/11Comp 1_07.10-compressed.mp4"
  },
  {
    name: "Aurora — рекламный ролик",
    client: "Aurora Cosmetics",
    year: "2023",
    tags: ["3D", "Реклама"],
    poster: "https://img.magnific.com/free-photo/nature-landscape-with-black-sand-beach_23-2151380379.jpg?semt=ais_hybrid&w=740",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  }
];

// ===== RENDER WORK GRID =====
const grid = document.getElementById('workGrid');
projects.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'work-card reveal-up';
  card.innerHTML = `
    <img src="${p.poster}" alt="${p.name}" loading="lazy">
    <video src="${p.video}" muted loop playsinline preload="none"></video>
    <div class="work-overlay">
      <div class="work-tags">${p.tags.map(t => `<span class="work-tag">${t}</span>`).join('')}</div>
      <div class="work-name">${p.name}</div>
      <div class="work-meta">${p.client} · ${p.year}</div>
    </div>
  `;
  const video = card.querySelector('video');
  card.addEventListener('mouseenter', () => { video.currentTime = 0; video.play().catch(()=>{}); });
  card.addEventListener('mouseleave', () => { video.pause(); });
  card.addEventListener('click', () => openLightbox(p.video));
  grid.appendChild(card);
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxClose = document.getElementById('lightboxClose');
function openLightbox(src) {
  lightboxVideo.src = src;
  lightbox.classList.add('open');
  lightboxVideo.play().catch(()=>{});
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxVideo.pause();
  lightboxVideo.src = '';
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

// ===== CUSTOM CURSOR =====
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
let mx = 0, my = 0, ox = 0, oy = 0;
window.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
function animateCursor() {
  ox += (mx - ox) * 0.15;
  oy += (my - oy) * 0.15;
  outline.style.left = ox + 'px'; outline.style.top = oy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button, .work-card').forEach(el => {
  el.addEventListener('mouseenter', () => outline.classList.add('grow'));
  el.addEventListener('mouseleave', () => outline.classList.remove('grow'));
});

// ===== PRELOADER =====
const preloader = document.getElementById('preloader');
const preloaderCount = document.getElementById('preloaderCount');
let count = 0;
const loadInterval = setInterval(() => {
  count += Math.floor(Math.random() * 12) + 3;
  if (count >= 100) {
    count = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      preloader.classList.add('hide');
      revealHero();
    }, 300);
  }
  preloaderCount.textContent = count;
}, 120);

// ===== BURGER MENU (mobile) =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('mobile-open');
  nav.style.display = nav.classList.contains('mobile-open') ? 'flex' : 'none';
});

// ===== STAT COUNTERS =====
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      current += step;
      if (current >= target) { el.textContent = target; return; }
      el.textContent = current;
      requestAnimationFrame(tick);
    };
    tick();
  });
}

// ===== GSAP REVEALS =====
function revealHero() {
  gsap.to('.hero-title .line span, .hero-tag, .hero-sub, .hero-actions', {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08
  });
}

gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.reveal-up').forEach(el => {
  if (el.closest('.hero')) return; // hero handled separately on preload finish
  gsap.to(el, {
    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});

ScrollTrigger.create({
  trigger: '.stats',
  start: 'top 80%',
  once: true,
  onEnter: animateStats
});
