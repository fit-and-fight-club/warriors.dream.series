// Warriors Dream Series — shared site behaviour

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach((a) => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });

  // Event category filter (data-category on .event-card, data-filter on buttons)
  const filterButtons = document.querySelectorAll('.event-filters button');
  const cards = document.querySelectorAll('.event-card[data-category]');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        card.style.display =
          filter === 'all' || card.dataset.category === filter ? '' : 'none';
      });
    });
  });

  // Countdown timer(s): <div class="countdown" data-target="2026-12-31T18:00:00">
  document.querySelectorAll('.countdown[data-target]').forEach((el) => {
    const target = new Date(el.dataset.target).getTime();
    const daysEl = el.querySelector('[data-days]');
    const hoursEl = el.querySelector('[data-hours]');
    const minsEl = el.querySelector('[data-mins]');
    function tick() {
      const diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    }
    tick();
    setInterval(tick, 30000);
  });

  // Contact form: placeholder handler (no backend wired up yet)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-note');
      if (note) {
        note.textContent =
          'This form is not yet connected to an email service — see the README for how to wire it up.';
      }
    });
  }
});
