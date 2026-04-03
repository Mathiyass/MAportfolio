export const lerp = (start, end, t) => start * (1 - t) + end * t;

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const remap = (val, inMin, inMax, outMin, outMax) => {
  return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
};

export const easeOutExpo = (x) => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

export const easeInOutQuad = (x) => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export const random = (min, max) => Math.random() * (max - min) + min;

export const randomInt = (min, max) => Math.floor(random(min, max));

export const vec2 = (x, y) => ({ x, y });

export const addVec2 = (v1, v2) => vec2(v1.x + v2.x, v1.y + v2.y);

export const scaleVec2 = (v, s) => vec2(v.x * s, v.y * s);

export const distVec2 = (v1, v2) => {
  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;
  return Math.sqrt(dx * dx + dy * dy);
};
