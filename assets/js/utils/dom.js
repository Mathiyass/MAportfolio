// dom.js
export const $ = (selector, parent = document) => parent.querySelector(selector);
export const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
export const on = (el, event, handler, options) => el?.addEventListener(event, handler, options);
export const once = (el, event, handler, options) => el?.addEventListener(event, handler, { ...options, once: true });
export const createElement = (tag, attrs = {}, ...children) => {
  const el = document.createElement(tag);
  Object.keys(attrs).forEach(key => {
    if (key.startsWith('data-')) el.dataset[key.replace('data-', '')] = attrs[key];
    else if (key === 'className') el.className = attrs[key];
    else el.setAttribute(key, attrs[key]);
  });
  children.forEach(child => el.append(child));
  return el;
};
export const addStyles = (el, styles) => Object.assign(el.style, styles);
export const animate = (el, keyframes, options) => {
  const animation = el.animate(keyframes, options);
  return new Promise(resolve => animation.onfinish = resolve);
};
