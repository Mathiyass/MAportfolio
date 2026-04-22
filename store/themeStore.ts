'use client';
import { create } from 'zustand';

interface ThemeState {
  theme: 'dark' | 'light';
  accentColor: 'cyan' | 'red' | 'dual';
  reducedMotion: boolean;
  actions: {
    setTheme: (theme: ThemeState['theme']) => void;
    setAccentColor: (color: ThemeState['accentColor']) => void;
    setReducedMotion: (val: boolean) => void;
  };
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'dark',
  accentColor: 'cyan',
  reducedMotion: false,
  actions: {
    setTheme: (theme) => set({ theme }),
    setAccentColor: (accentColor) => set({ accentColor }),
    setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  },
}));
