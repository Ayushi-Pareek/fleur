/* ============================================================
   FLEUR — prototype geo-currency display
   ------------------------------------------------------------
   How it works:
   - Any element carrying data-price-usd="240" has its text
     rewritten into the visitor's display currency.
   - Detection order: ?currency=USD|EUR|INR URL override, then
     browser timezone (Europe/* → EUR, Asia/Kolkata → INR),
     else USD.
   - Rates below are prototype placeholders. Real build should
     replace detection with IP geolocation (server-side or
     edge function) and pull live FX rates from an API.
   Usage in markup:
     <p class="meta">from <span data-price-usd="18">$18</span></p>
     <p class="meta">Prices in <span data-currency-name>USD</span></p>
   ============================================================ */

(function () {
  'use strict';

  var RATES   = { USD: 1,    EUR: 0.92, INR: 83.5 };  /* prototype rates — replace with live FX at build */
  var SYMBOLS = { USD: '$',  EUR: '\u20AC', INR: '\u20B9' };

  function detectCurrency() {
    var override;
    try {
      override = new URLSearchParams(window.location.search).get('currency');
    } catch (e) { override = null; }
    if (override) {
      override = override.toUpperCase();
      if (RATES.hasOwnProperty(override)) return override;
    }
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'INR';
      if (tz.indexOf('Europe/') === 0) return 'EUR';
    } catch (e) { /* fall through to USD */ }
    return 'USD';
  }

  function format(usd, code) {
    var amount;
    if (code === 'USD') {
      amount = usd;
    } else if (code === 'EUR') {
      amount = Math.round((usd * RATES.EUR) / 10) * 10;
    } else {
      amount = Math.round((usd * RATES.INR) / 100) * 100;
    }
    var str = (code === 'INR') ? amount.toLocaleString('en-IN') : String(amount);
    return SYMBOLS[code] + str;
  }

  var code = detectCurrency();

  document.querySelectorAll('[data-price-usd]').forEach(function (el) {
    var usd = parseFloat(el.getAttribute('data-price-usd'));
    if (!isNaN(usd)) el.textContent = format(usd, code);
  });

  document.querySelectorAll('[data-currency-name]').forEach(function (el) {
    el.textContent = code;
  });

  /* exposed for testing: fleurCurrency, and /?currency=EUR|INR|USD */
  window.fleurCurrency = code;
})();
