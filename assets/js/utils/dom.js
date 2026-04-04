export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

export const on = (el, event, handler, options = false) => {
    if(!el) return;
    el.addEventListener(event, handler, options);
    return () => el.removeEventListener(event, handler, options);
};

export const once = (el, event, handler) => {
    if(!el) return;
    const h = (e) => {
        handler(e);
        el.removeEventListener(event, h);
    };
    el.addEventListener(event, h);
};

export const createElement = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    for (const [key, val] of Object.entries(attrs)) {
        if (key === 'className') el.className = val;
        else if (key === 'style') Object.assign(el.style, val);
        else if (key.startsWith('data-')) el.dataset[key.replace('data-', '')] = val;
        else el.setAttribute(key, val);
    }
    children.forEach(child => {
        if (typeof child === 'string') el.appendChild(document.createTextNode(child));
        else el.appendChild(child);
    });
    return el;
};

export const addStyles = (el, styleObject) => {
    if(!el) return;
    Object.assign(el.style, styleObject);
};

export const animate = (el, keyframes, options) => {
    if(!el) return Promise.resolve();
    return new Promise(resolve => {
        const anim = el.animate(keyframes, options);
        anim.onfinish = resolve;
    });
};
