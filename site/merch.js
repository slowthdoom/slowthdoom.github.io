// Merch carousel. Slides can be TBA boxes or images.
(() => {
  'use strict';
  document.querySelectorAll('[data-merch]').forEach(root => {
    const stage = root.querySelector('.merch-stage');
    const slides = [...stage.children];
    const thumbs = [...root.querySelectorAll('.merch-thumb')];
    const counter = root.querySelector('[data-merch-count]');
    const pad = number => String(number).padStart(2, '0');
    let selected = 0;
    let start = null;
    function show(index) {
      selected = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.hidden = i !== selected; });
      thumbs.forEach((thumb, i) => {
        if (i === selected) thumb.setAttribute('aria-current', 'true');
        else thumb.removeAttribute('aria-current');
      });
      counter.textContent = `${pad(selected + 1)} / ${pad(slides.length)}`;
    }
    root.querySelectorAll('[data-merch-step]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', () => show(selected + Number(button.dataset.merchStep)));
    });
    thumbs.forEach((thumb, i) => {
      thumb.disabled = false;
      thumb.addEventListener('click', () => show(i));
    });
    root.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      show(selected + (event.key === 'ArrowRight' ? 1 : -1));
    });
    stage.addEventListener('pointerdown', event => { start = {x: event.clientX, y: event.clientY}; });
    stage.addEventListener('pointercancel', () => { start = null; });
    stage.addEventListener('pointerup', event => {
      if (!start) return;
      const dx = event.clientX - start.x, dy = event.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(selected + (dx < 0 ? 1 : -1));
    });
    show(0);
  });
})();
