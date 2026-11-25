(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let chosen;
  try {
    chosen = localStorage.getItem('color-theme');
  } catch { /* The OS preference still works when storage is unavailable. */ }

  function updateTheme() {
    const dark = chosen === 'dark' || (chosen !== 'light' && preference.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = dark
        ? (themeColor.dataset.dark || '#101720')
        : (themeColor.dataset.light || '#fafbfc');
    }
    const button = document.querySelector('.theme');
    if (button) {
      const label = dark ? 'Switch to light theme' : 'Switch to dark theme';
      button.setAttribute('aria-label', label);
      button.title = label;
      button.hidden = false;
    }
  }
  updateTheme();
  preference.addEventListener('change', updateTheme);
  document.addEventListener('DOMContentLoaded', () => {
    updateTheme();
    document.querySelector('.theme')?.addEventListener('click', () => {
      chosen = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('color-theme', chosen); } catch {}
      updateTheme();
    });
  });
})();
