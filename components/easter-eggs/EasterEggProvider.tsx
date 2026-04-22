"use client";
import { useEffect, useCallback, useRef } from 'react';
import { useEasterEggStore } from '@/store/easterEggStore';

// Konami Code: ↑↑↓↓←→←→BA
const KONAMI_CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

// Matrix rain: type "matrix"
const MATRIX_WORD = ['m','a','t','r','i','x'];

// BYTE awakening: type "byte"
const BYTE_WORD = ['b','y','t','e'];

// Dev mode: type "sudo"
const SUDO_WORD = ['s','u','d','o'];

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const bufferRef = useRef<string[]>([]);
  const { unlock } = useEasterEggStore();

  const checkSequence = useCallback((sequence: string[], eggId: string) => {
    const buffer = bufferRef.current;
    const tail = buffer.slice(-sequence.length);
    if (tail.length === sequence.length && tail.every((k, i) => k === sequence[i])) {
      unlock(eggId);
      bufferRef.current = [];
      return true;
    }
    return false;
  }, [unlock]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      bufferRef.current.push(e.key);
      if (bufferRef.current.length > 20) {
        bufferRef.current = bufferRef.current.slice(-20);
      }

      checkSequence(KONAMI_CODE, 'konami');
      checkSequence(MATRIX_WORD, 'matrix');
      checkSequence(BYTE_WORD, 'byte-awaken');
      checkSequence(SUDO_WORD, 'sudo-mode');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [checkSequence]);

  return <>{children}</>;
}
