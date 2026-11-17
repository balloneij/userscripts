// ==UserScript==
// @name         Gmail: a archives
// @namespace    https://github.com/balloneij/userscripts
// @version      1
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

  const archiveButton = () =>
    [...document.querySelectorAll('[role="button"][data-tooltip^="Archive"], [role="button"][aria-label^="Archive"]')]
      .find((b) => b.offsetParent && !b.closest('tr') && b.getAttribute('aria-disabled') !== 'true');

  const press = (el) => {
    for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
      el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window }));
    }
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
