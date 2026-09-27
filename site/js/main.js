/* Fleur — prototype behaviour: nav, placeholder motifs, fake forms */

document.addEventListener('DOMContentLoaded', () => {

  /* mobile nav */
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => document.body.classList.toggle('nav-open'));
  }

  /* placeholder botanical motifs */
  const rose = `
    <svg viewBox="0 0 400 520" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
      <circle cx="200" cy="212" r="74" opacity=".85"/>
      <path d="M136 238 C 152 186, 248 186, 264 238"/>
      <path d="M152 230 C 168 198, 232 198, 248 230"/>
      <path d="M168 224 C 180 205, 220 205, 232 224"/>
      <path d="M200 220 c -13 1 -20 -9 -15 -18 c 5 -9 20 -8 24 1 c 4 10 -5 17 -14 16"/>
      <path d="M131 234 C 140 270, 260 270, 269 234" opacity=".7"/>
      <path d="M200 286 C 196 344, 206 428, 200 500"/>
      <path d="M199 434 C 158 428, 136 398, 145 366 C 184 375, 203 404, 199 434 Z" fill="currentColor" opacity=".16"/>
      <path d="M201 468 C 238 460, 256 434, 250 404 C 214 411, 197 440, 201 468 Z" fill="currentColor" opacity=".16"/>
    </svg>`;

  const stem = `
    <svg viewBox="0 0 400 520" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
      <path d="M200 500 C 197 420, 204 300, 200 190"/>
      <path d="M200 190 c -20 -34 -8 -70 14 -84 c 20 16 26 56 -2 84"/>
      <path d="M199 250 C 162 244, 142 216, 150 186 C 186 194, 203 222, 199 250 Z" fill="currentColor" opacity=".16"/>
      <path d="M201 300 C 234 292, 252 266, 246 238 C 214 244, 198 272, 201 300 Z" fill="currentColor" opacity=".16"/>
      <circle cx="200" cy="96" r="26" opacity=".85"/>
      <path d="M186 84 c 6 -10 22 -10 28 0" opacity=".7"/>
    </svg>`;

  document.querySelectorAll('.ph[data-motif]').forEach(el => {
    if (el.dataset.motif === 'rose') el.insertAdjacentHTML('afterbegin', rose);
    if (el.dataset.motif === 'stem') el.insertAdjacentHTML('afterbegin', stem);
  });

  /* shelf filters (category + price, combined) */
  document.querySelectorAll('.filter-row').forEach(row => {
    const scope = row.closest('.wrap') || document;
    const cards = scope.querySelectorAll('[data-cat]');
    const active = { cat: 'all', price: 'all' };
    const apply = () => {
      cards.forEach(card => {
        const okCat = active.cat === 'all' || card.dataset.cat === active.cat;
        const okPrice = active.price === 'all' || card.dataset.price === active.price;
        card.style.display = (okCat && okPrice) ? '' : 'none';
      });
    };
    row.querySelectorAll('button[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.dataset.group;
        row.querySelectorAll('button[data-group="' + group + '"]').forEach(b => b.classList.toggle('active', b === btn));
        active[group] = btn.dataset.filter;
        apply();
      });
    });
  });

  /* toast */
  let toastTimer;
  window.fleurToast = (msg) => {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3400);
  };

  document.querySelectorAll('[data-toast]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.tagName === 'A') e.preventDefault();
      fleurToast(el.dataset.toast);
    });
  });

  /* fake form submits */
  document.querySelectorAll('form[data-fake]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const done = form.dataset.fake;
      if (done === 'thanks') {
        form.closest('.signup, .commission-form').classList.add('form-done');
      }
      fleurToast(form.dataset.toastMsg || 'Noted — this is the design prototype.');
    });
  });

  /* footer year */
  document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());

  /* lightbox — click any .gallery image to zoom */
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Enlarged image');
  lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close enlarged image" type="button">&times;</button><img alt="">';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeLightbox = () => lightbox.classList.remove('open');

  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  document.querySelectorAll('.gallery .ph img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
});