export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

export const on = (el, event, handler, options = false) => {
  el.addEventListener(event, handler, options);
};

export const once = (el, event, handler) => {
  el.addEventListener(event, handler, { once: true });
};

export const createElement = (tag, attrs = {}, children = []) => {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    if (key === 'className') el.className = val;
    else if (key === 'dataset') {
      for (const [dKey, dVal] of Object.entries(val)) {
        el.dataset[dKey] = dVal;
      }
    } else el.setAttribute(key, val);
  }
  for (const child of children) {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  }
  return el;
};

export const addStyles = (el, styleObject) => {
  Object.assign(el.style, styleObject);
};

export const animate = (el, keyframes, options) => {
  return el.animate(keyframes, options).finished;
};
