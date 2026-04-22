// lib/animations.ts
import { Variants } from 'motion/react';

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const fadeSlideLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: { 
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { 
    transition: { staggerChildren: 0.08, delayChildren: 0.2 } 
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } 
  }
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { delay: i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  })
};

export const cardHover: Variants = {
  rest: { y: 0, borderColor: 'rgba(148,163,183,0.12)' },
  hover: { 
    y: -4, 
    borderColor: 'rgba(34,211,238,0.22)',
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const pageVariants: Variants = {
  initial: { opacity: 0, filter: 'blur(8px)', scale: 0.99 },
  animate: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, 
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } 
  }
};
