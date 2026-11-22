(() => {
  'use strict';
  if (!navigator.clipboard) return;
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.hidden = false;
    const label = button.textContent;
    button.addEventListener('click', async () => {
      const text = document.getElementById(button.dataset.copy);
      try {
        const paras = text.querySelectorAll('p');
        const value = paras.length ? [...paras].map(p => p.textContent.trim()).join('\n\n') : text.textContent.trim();
        await navigator.clipboard.writeText(value);
        button.textContent = 'copied';
      } catch (_) {
        getSelection().selectAllChildren(text);
        button.textContent = 'selected';
      }
      setTimeout(() => { button.textContent = label; }, 2000);
    });
  });
})();
