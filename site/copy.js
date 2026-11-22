(() => {
  'use strict';
  if (!navigator.clipboard) return;
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.hidden = false;
    const label = button.textContent;
    button.addEventListener('click', async () => {
      const text = document.getElementById(button.dataset.copy);
      try {
        await navigator.clipboard.writeText(text.textContent.trim());
        button.textContent = 'copied';
      } catch (_) {
        getSelection().selectAllChildren(text);
        button.textContent = 'selected';
      }
      setTimeout(() => { button.textContent = label; }, 2000);
    });
  });
})();
