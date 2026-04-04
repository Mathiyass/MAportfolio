export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
export const remap = (v, a, b, c, d) => c + (v - a) / (b - a) * (d - c);

export const easeOutExpo = (x) => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};
export const easeInOutQuad = (x) => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export const random = (min, max) => Math.random() * (max - min) + min;
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const vec2 = (x, y) => ({ x, y });
export const addVec2 = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
export const scaleVec2 = (v, s) => ({ x: v.x * s, y: v.y * s });
export const distVec2 = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
