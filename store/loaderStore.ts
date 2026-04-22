import { create } from 'zustand';

interface LoaderState {
  phase: number;
  done: boolean;
  actions: {
    nextPhase: () => void;
    complete: () => void;
    reset: () => void;
  };
}

export const useLoaderStore = create<LoaderState>((set) => ({
  phase: 0,
  done: false,
  actions: {
    nextPhase: () => set((s) => ({ phase: s.phase + 1 })),
    complete: () => set({ done: true }),
    reset: () => set({ phase: 0, done: false }),
  },
}));
