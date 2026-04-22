import { create } from 'zustand';

interface EasterEggState {
  unlocked: Set<string>;
  toastMessage: string | null;
  unlock: (id: string) => void;
  isUnlocked: (id: string) => boolean;
  clearToast: () => void;
}

const EGG_MESSAGES: Record<string, string> = {
  'konami': '🎮 KONAMI CODE ACTIVATED! You found the classic!',
  'matrix': '💊 The Matrix has you... follow the green code.',
  'byte-awaken': '🤖 BYTE has been awakened! Say hello.',
  'sudo-mode': '🔓 SUDO MODE: root access granted.',
  'click-logo-7': '✨ 7 clicks! You found the hidden theme.',
  'scroll-bottom': '🏁 You scrolled to the very end. Here lies a secret.',
  'dark-pattern': '🌙 The dark side is strong with you.',
  'speed-reader': '⚡ Speed reader detected! Slow down and enjoy.',
  'night-owl': '🦉 Browsing past midnight? Fellow night owl!',
  'mobile-shake': '📱 Shake detected! Easter egg mobile mode.',
  'triple-click-bio': '📋 Bio copied to clipboard. You know what to do.',
  'five-star': '⭐ 5 stars! You rated the portfolio.',
};

export const useEasterEggStore = create<EasterEggState>((set, get) => ({
  unlocked: new Set<string>(),
  toastMessage: null,
  unlock: (id: string) => {
    const current = get().unlocked;
    if (current.has(id)) return;
    const newSet = new Set(current);
    newSet.add(id);
    const message = EGG_MESSAGES[id] || `🥚 Easter egg "${id}" discovered!`;
    set({ unlocked: newSet, toastMessage: message });
    // Auto-clear toast after 4s
    setTimeout(() => set({ toastMessage: null }), 4000);
  },
  isUnlocked: (id: string) => get().unlocked.has(id),
  clearToast: () => set({ toastMessage: null }),
}));
