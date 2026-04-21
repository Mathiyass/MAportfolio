// math.js
export const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
export const remap = (value, srcMin, srcMax, dstMin, dstMax) => srcMin === srcMax ? dstMin : dstMin + ((value - srcMin) * (dstMax - dstMin)) / (srcMax - srcMin);
export const easeOutExpo = x => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
export const easeInOutQuad = x => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
export const random = (min, max) => Math.random() * (max - min) + min;
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const vec2 = (x, y) => ({ x, y });
export const addVec2 = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
export const scaleVec2 = (v, s) => ({ x: v.x * s, y: v.y * s });
export const distVec2 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
