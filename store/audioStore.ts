'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AudioState {
  isEnabled: boolean;
  volume: number;
  isMuted: boolean;
  actions: {
    toggle: () => void;
    setVolume: (v: number) => void;
    mute: () => void;
    unmute: () => void;
  };
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      isEnabled: false,
      volume: 0.3,
      isMuted: false,
      actions: {
        toggle: () => set((s) => ({ isEnabled: !s.isEnabled })),
        setVolume: (volume) => set({ volume }),
        mute: () => set({ isMuted: true }),
        unmute: () => set({ isMuted: false }),
      },
    }),
    {
      name: 'nexus-audio-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        volume: state.volume, 
        isMuted: state.isMuted,
        isEnabled: state.isEnabled 
      }),
    }
  )
);
