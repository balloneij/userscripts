// ==UserScript==
// @name         Gmail: a archives
// @namespace    https://github.com/balloneij/userscripts
// @version      4
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
    [...document.querySelectorAll('[role="button"][data-tooltip^="Archive"], [role="button"][aria-label^="Archive"]')]
      .find((b) => !b.closest('tr') && b.getAttribute('aria-disabled') !== 'true' && onTop(b));

  const press = (el) => {
    const { x, y } = center(el);
    const at = { bubbles: true, cancelable: true, composed: true, view: window, clientX: x, clientY: y, button: 0 };
    const enter = { ...at, bubbles: false, cancelable: false };
    const mousePointer = { pointerId: 1, pointerType: 'mouse', isPrimary: true };
    const pointer = (type, init, target = el) => target.dispatchEvent(new PointerEvent(type, { ...init, ...mousePointer }));
    const mouse = (type, init, target = el) => target.dispatchEvent(new MouseEvent(type, init));
    const enteredFromBody = [];
    for (let node = el; node !== document.body; node = node.parentElement) enteredFromBody.unshift(node);
    pointer('pointerover', at);
    enteredFromBody.forEach((node) => pointer('pointerenter', enter, node));
    mouse('mouseover', at);
    enteredFromBody.forEach((node) => mouse('mouseenter', enter, node));
    pointer('pointermove', at);
    mouse('mousemove', at);
    pointer('pointerdown', { ...at, buttons: 1 });
    mouse('mousedown', { ...at, buttons: 1 });
    pointer('pointerup', at);
    mouse('mouseup', at);
    mouse('click', at);
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
