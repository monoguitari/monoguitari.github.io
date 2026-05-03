/**
 * motion.js — Monoguitari site motion system
 * Layer 1: passive ambient animations
 * Layer 2: scroll-triggered entrance animations
 */

(function() {
  'use strict';

  function initGrainPulse() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes grainPulse {
        0%   { opacity: 0.035; }
        50%  { opacity: 0.058; }
        100% { opacity: 0.035; }
      }
      body::before {
        animation: grainPulse 6s ease-in-out infinite !important;
      }
    `;
    document.head.appendChild(style);
  }

  function initScrollWaveforms() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    nav.style.borderBottom = 'none';

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: absolute;
      bottom: 0; left: 0;
      width: 100%;
      height: 20px;
      pointer-events: none;
    `;
    nav.appendChild(canvas);

    let progress = 0;
    let targetProgress = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const W = nav.clientWidth;
      canvas.width  = W * dpr;
      canvas.height = 20 * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = '20px';
    }

    function draw() {
      const dpr  = window.devicePixelRatio || 1;
      const ctx  = canvas.getContext('2d');
      const W    = canvas.width;
      const H    = canvas.height;
      const CY   = H / 2;
      const COUNT = 100;
      const gold  = getComputedStyle(document.documentElement).getPropertyValue('--gold').trim() || '#c9a84c';

      progress += (targetProgress - progress) * 0.07;
      ctx.clearRect(0, 0, W, H);

      const pts = Array.from({ length: COUNT }, (_, i) => {
        const t      = i / (COUNT - 1);
        const x      = t * W;
        const env    = Math.sin(t * Math.PI);
        const filled = t <= progress;
        const wave   = Math.sin(t * Math.PI * 10 + progress * Math.PI * 6);
        const amp    = filled
          ? env * 7 * dpr * (0.4 + 0.6 * Math.abs(wave))
          : env * 1.5 * dpr;
        return { x, yTop: CY - amp, yBot: CY + amp };
      });

      ctx.beginPath();
      pts.forEach(p => ctx.lineTo(p.x, p.yTop));
      pts.slice().reverse().forEach(p => ctx.lineTo(p.x, p.yBot));
      ctx.closePath();
      ctx.fillStyle = gold;
      ctx.globalAlpha = 0.08;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.yTop) : ctx.lineTo(p.x, p.yTop));
      ctx.strokeStyle = gold;
      ctx.lineWidth   = 1.2 * dpr;
      ctx.globalAlpha = 0.7;
      ctx.lineJoin    = 'round';
      ctx.stroke();

      ctx.beginPath();
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.yBot) : ctx.lineTo(p.x, p.yBot));
      ctx.strokeStyle = gold;
      ctx.lineWidth   = 1.2 * dpr;
      ctx.globalAlpha = 0.22;
      ctx.stroke();
      ctx.globalAlpha = 1;

      const px = progress * W;
      ctx.beginPath();
      ctx.moveTo(px, 0); ctx.lineTo(px, H);
      ctx.strokeStyle = gold;
      ctx.lineWidth   = 1.2 * dpr;
      ctx.globalAlpha = 0.55;
      ctx.stroke();
      ctx.globalAlpha = 1;

      requestAnimationFrame(draw);
    }

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress   = maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(draw);
  }

  function initHamburger() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const links = nav.querySelector('.nav-links');
    if (!links) return;

    const btn = document.createElement('button');
    btn.className = 'nav-hamburger';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        btn.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  function observe(elements, options) {
    const { stagger = 0, threshold = 0.15 } = options || {};
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseFloat(el.dataset.motionDelay || 0);
          setTimeout(() => el.classList.add('in'), delay * 1000);
          io.unobserve(el);
        }
      });
    }, { threshold });

    elements.forEach((el, i) => {
      if (stagger) el.dataset.motionDelay = (i * stagger).toFixed(2);
      io.observe(el);
    });
  }

  function initHeaderEntrance() {
    const header = document.querySelector(
      '.catalog-header, .about-header, .blog-header, .hero-left'
    );
    if (!header) return;

    const targets = header.querySelectorAll('h1, .hero-name, .hero-eyebrow, .catalog-title, .about-title, .blog-title');
    const subtitle = header.querySelectorAll('.catalog-subtitle, .blog-subtitle, .hero-tagline, .hero-actions');

    [...targets].forEach((el, i) => {
      el.classList.add('motion-fade-up');
      el.dataset.motionDelay = (i * 0.07).toFixed(2);
    });
    [...subtitle].forEach((el, i) => {
      el.classList.add('motion-fade-up');
      el.dataset.motionDelay = (0.18 + i * 0.08).toFixed(2);
    });

    requestAnimationFrame(() => {
      [...targets, ...subtitle].forEach(el => {
        setTimeout(() => el.classList.add('in'),
          parseFloat(el.dataset.motionDelay || 0) * 1000);
      });
    });
  }

  function initRuledLines() {
    document.querySelectorAll('.rule').forEach(el => {
      el.classList.add('motion-rule');
    });
    observe(document.querySelectorAll('.rule'), { threshold: 0.5 });
  }

  function initCardEntrance() {
    const cards = document.querySelectorAll('.card');
    if (!cards.length) return;
    cards.forEach(el => el.classList.add('motion-fade-up'));
    observe(cards, { stagger: 0.1, threshold: 0.08 });
  }

  function initTimelineEntrance() {
    const entries = document.querySelectorAll('.timeline-entry');
    if (!entries.length) return;
    entries.forEach(el => el.classList.add('motion-fade-up'));
    observe(entries, { stagger: 0.1, threshold: 0.1 });
  }

  function initBlogEntrance() {
    const posts = document.querySelectorAll('.post-item');
    if (!posts.length) return;
    posts.forEach(el => el.classList.add('motion-fade-up'));
    observe(posts, { stagger: 0.07, threshold: 0.05 });
  }

  function initSectionHeadings() {
    document.querySelectorAll('.featured-header, .timeline-header').forEach(el => {
      el.classList.add('motion-fade-up');
    });
    observe(
      document.querySelectorAll('.featured-header, .timeline-header'),
      { threshold: 0.2 }
    );
  }

  function init() {
    initGrainPulse();
    initScrollWaveforms();
    initHamburger();
    initHeaderEntrance();
    initRuledLines();
    initCardEntrance();
    initTimelineEntrance();
    initBlogEntrance();
    initSectionHeadings();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
