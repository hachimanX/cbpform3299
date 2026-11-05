/* Loads Google Analytics only after Accept Analytics. Essential Only never loads it.
   Cookie settings reopens this banner. Withdrawing consent stops Analytics for
   the rest of the session and deletes its cookies. */
(function () {
  var KEY = 'cbp_3299_cookie_consent';
  var GA_ID = 'G-53QTDCN8S3';

  function readChoice() {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }

  function writeChoice(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* Storage can be blocked. The banner still works for this visit. */
    }
  }

  function loadAnalytics() {
    if (window.__cbpGaLoaded) return;
    window.__cbpGaLoaded = true;
    window['ga-disable-' + GA_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);
  }

  function clearAnalyticsCookies() {
    var host = location.hostname;
    var domains = ['', host];
    var parts = host.split('.');
    if (parts.length >= 2) domains.push('.' + parts.slice(-2).join('.'));
    document.cookie.split(';').forEach(function (part) {
      var name = part.split('=')[0].trim();
      if (name !== '_gid' && name.indexOf('_ga') !== 0 && name.indexOf('_gat') !== 0) return;
      domains.forEach(function (domain) {
        document.cookie =
          name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      });
    });
  }

  function stopAnalytics() {
    window['ga-disable-' + GA_ID] = true;
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    // Drop any later Analytics calls for the rest of this page.
    window.gtag = function () {};
    clearAnalyticsCookies();
  }

  function ensureBanner() {
    var existing = document.getElementById('cbp-cookie-banner');
    if (existing) return existing;
    var banner = document.createElement('div');
    banner.id = 'cbp-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie settings');
    banner.style.cssText =
      'position:fixed;z-index:70;left:0;right:0;bottom:0;background:#0f172a;color:#e2e8f0;padding:14px 16px;font:14px/1.45 "Segoe UI",sans-serif;box-shadow:0 -4px 16px rgba(0,0,0,.25);';
    banner.innerHTML =
      '<div style="max-width:52rem;margin:0 auto;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;">' +
      '<p style="margin:0;max-width:40rem;">We use Google Analytics only if you accept. No advertising cookies. Your form draft stays in your browser. <a href="/privacy/" style="color:#fbbf24;">Privacy policy</a></p>' +
      '<div style="display:flex;gap:8px;">' +
      '<button type="button" data-choice="accepted" style="background:#fbbf24;color:#0f172a;border:0;border-radius:8px;padding:8px 12px;font-weight:700;cursor:pointer;">Accept Analytics</button>' +
      '<button type="button" data-choice="essential" style="background:#1e293b;color:#e2e8f0;border:0;border-radius:8px;padding:8px 12px;cursor:pointer;">Essential Only</button>' +
      '</div></div>';
    document.body.appendChild(banner);
    banner.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-choice]');
      if (!button) return;
      var choice = button.getAttribute('data-choice');
      var previous = readChoice();
      writeChoice(choice);
      banner.hidden = true;
      if (choice === 'accepted') {
        loadAnalytics();
        return;
      }
      stopAnalytics();
      if (previous === 'accepted') location.reload();
    });
    return banner;
  }

  function openSettings() {
    ensureBanner().hidden = false;
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-cookie-settings]');
    if (!trigger) return;
    event.preventDefault();
    openSettings();
  });

  function start() {
    if (readChoice() === 'accepted') loadAnalytics();
    else if (!readChoice()) openSettings();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
