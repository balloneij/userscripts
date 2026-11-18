// ==UserScript==
// @name         Gmail: a archives
// @namespace    https://github.com/balloneij/userscripts
// @version      5
// @downloadURL  https://raw.githubusercontent.com/balloneij/userscripts/main/gmail-a-archive.user.js
// @updateURL    https://raw.githubusercontent.com/balloneij/userscripts/main/gmail-a-archive.user.js
// @match        https://mail.google.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(() => {
  const typing = (el) =>
    el instanceof Element &&
    !!el.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"], [role="textbox"], [role="combobox"], [role="searchbox"]');

  const center = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, empty: r.width === 0 || r.height === 0 };
  };

  const onTop = (el) => {
    const { x, y, empty } = center(el);
    if (empty || x < 0 || y < 0 || x > innerWidth || y > innerHeight) return false;
    const hit = document.elementFromPoint(x, y);
    return !!hit && (hit === el || el.contains(hit));
  };

  const archiveButton = () =>
    [...document.querySelectorAll('[role="button"]:is([data-tooltip^="Archive"], [aria-label^="Archive"], [title^="Archive"])')]
      .find((b) => !b.closest('tr') && b.getAttribute('aria-disabled') !== 'true' && onTop(b));

  const press = (el) => {
    const { x, y } = center(el);
    const at = { bubbles: true, cancelable: true, composed: true, view: window, clientX: x, clientY: y, button: 0 };
    el.dispatchEvent(new PointerEvent('pointerover', at));
    el.dispatchEvent(new MouseEvent('mouseover', at));
    el.dispatchEvent(new PointerEvent('pointerdown', { ...at, buttons: 1 }));
    el.dispatchEvent(new MouseEvent('mousedown', { ...at, buttons: 1 }));
    el.dispatchEvent(new PointerEvent('pointerup', at));
    el.dispatchEvent(new MouseEvent('mouseup', at));
    el.dispatchEvent(new MouseEvent('click', at));
  };

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'a' || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.repeat || e.isComposing) return;
    if (typing(e.target) || typing(document.activeElement)) return;
    const btn = archiveButton();
    if (!btn) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    press(btn);
  }, true);
})();
