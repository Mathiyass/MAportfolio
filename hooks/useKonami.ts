'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { useEasterEggStore } from '@/store/easterEggStore';
import { useByteStore } from '@/store/byteStore';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export function useKonami() {
  const [input, setInput] = useState<string[]>([]);
  const { actions: themeActions } = useThemeStore();
  const { unlock } = useEasterEggStore();
  const { actions: byteActions } = useByteStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key].slice(-KONAMI_CODE.length);
      setInput(newInput);

      if (newInput.join(',') === KONAMI_CODE.join(',')) {
        themeActions.toggleRetroMode();
        unlock('konami');
        byteActions.showSpeech("RETRO_SYSTEM_OVERRIDE: ACTIVE", 5000);
        setInput([]); // Reset after success
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, themeActions, unlock, byteActions]);

  return null;
}
