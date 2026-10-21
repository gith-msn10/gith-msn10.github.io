(function () {
  // Change these two file names if yours are different
  var PAGES = { dark: 'index.html', light: 'index-light.html' };
  var KEY = 'theme';
  var root = document.documentElement;
  var current = root.dataset.page === 'light' ? 'light' : 'dark';

  function getSaved() {
    try {
      var v = localStorage.getItem(KEY);
      return v === 'light' || v === 'dark' ? v : null;
    } catch (e) { return null; }
  }

  function save(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function go(theme) {
    location.replace(PAGES[theme] + location.search + location.hash);
  }

  var wanted = getSaved() || systemTheme();

  if (wanted !== current) {
    go(wanted);
  } else {
    root.dataset.theme = current;
  }

  window.Theme = {
    current: current,
    toggle: function () {
      var next = current === 'dark' ? 'light' : 'dark';
      save(next);
      go(next);
    }
  };
})();