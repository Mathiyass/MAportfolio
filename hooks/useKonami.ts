'use client';
import { useEffect, useRef, useState } from 'react';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function useKonami(callback: () => void) {
  const [triggered, setTriggered] = useState(false);
  const index = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index.current]) {
        index.current++;
        if (index.current === KONAMI.length) {
          setTriggered(true);
          callback();
          index.current = 0;
        }
      } else {
        index.current = 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);

  return triggered;
}
