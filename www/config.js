window.SORA_API = 'https://tiny-mouse-bcd6.belyashkinchinese.workers.dev/';
/* Встроенный ключ Gemini: вставь свой ключ между кавычками, например 'AIza...'. Тогда вводить его в профиле не нужно. */
window.SORA_GEMINI_KEY = '';
/* Страховка для Android WebView: если видео не стартует напрямую, пробуем загрузить его целиком и играть из памяти. */
(function () {
  function note(msg) {
    try {
      var d = document.createElement('div');
      d.textContent = msg;
      d.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:99999;background:rgba(20,0,0,.92);color:#fff;font:12px/1.35 monospace;padding:8px 10px;border-radius:8px;pointer-events:none;word-break:break-all';
      document.body.appendChild(d); setTimeout(function () { d.remove(); }, 9000);
    } catch (e) {}
  }
  document.addEventListener('error', function (e) {
    var v = e.target;
    if (!v || v.tagName !== 'VIDEO' || v.__soraTried) return;
    var src = v.getAttribute('src') || '';
    if (!src || src.indexOf('blob:') === 0) return;
    v.__soraTried = true;
    var clean = src.split('#')[0], code = v.error ? v.error.code : '?', wasPlaying = !v.paused;
    fetch(clean).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.blob();
    }).then(function (b) {
      v.src = URL.createObjectURL(new Blob([b], { type: 'video/mp4' }));
      v.load();
      if (wasPlaying || v.autoplay) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    }).catch(function (err) {
      note('Видео не загрузилось: ' + clean + ' (код ' + code + ', ' + (err && err.message || err) + ')');
    });
  }, true);
})();
