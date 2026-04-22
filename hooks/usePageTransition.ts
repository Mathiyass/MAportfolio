'use client';
import { pageVariants } from '@/lib/animations';

export function usePageTransition() {
  return {
    variants: pageVariants,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
  };
}
