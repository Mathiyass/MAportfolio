import { create } from 'zustand';

interface SpeechItem {
  id: string;
  text: string;
}

interface ByteState {
  mood: 'idle' | 'happy' | 'sad' | 'surprised' | 'sleeping' | 'excited';
  mouthState: 'neutral' | 'happy' | 'sad' | 'surprised' | 'speaking';
  isVisible: boolean;
  isCollapsed: boolean;
  isSleeping: boolean;
  blinkCount: number;
  speechQueue: SpeechItem[];
  currentSpeech: SpeechItem | null;
  actions: {
    setMood: (mood: ByteState['mood']) => void;
    showSpeech: (text: string, duration?: number) => void;
    queueSpeech: (text: string, duration?: number) => void;
    dismissSpeech: () => void;
    celebrate: () => void;
    jump: () => void;
    wave: () => void;
    sleep: () => void;
    wake: () => void;
    toggleCollapsed: () => void;
  };
}

export const useByteStore = create<ByteState>((set, get) => ({
  mood: 'idle',
  mouthState: 'neutral',
  isVisible: true,
  isCollapsed: false,
  isSleeping: false,
  blinkCount: 0,
  speechQueue: [],
  currentSpeech: null,
  actions: {
    setMood: (mood) => set({ mood }),
    showSpeech: (text, duration = 4000) => {
      const item = { id: Math.random().toString(36), text };
      set({ currentSpeech: item, mouthState: 'speaking' });
      setTimeout(() => {
        if (get().currentSpeech?.id === item.id) {
          get().actions.dismissSpeech();
        }
      }, duration);
    },
    queueSpeech: (text, duration = 4000) => {
      const item = { id: Math.random().toString(36), text };
      const state = get();
      if (!state.currentSpeech) {
        get().actions.showSpeech(text, duration);
      } else {
        set({ speechQueue: [...state.speechQueue, item] });
      }
    },
    dismissSpeech: () => {
      const queue = get().speechQueue;
      if (queue.length > 0) {
        const [next, ...rest] = queue;
        set({ currentSpeech: next, speechQueue: rest, mouthState: 'speaking' });
        setTimeout(() => {
          if (get().currentSpeech?.id === next.id) {
            get().actions.dismissSpeech();
          }
        }, 4000);
      } else {
        set({ currentSpeech: null, mouthState: 'neutral' });
      }
    },
    celebrate: () => {
      set({ mood: 'excited', mouthState: 'happy' });
      get().actions.showSpeech('🎉 Amazing!', 3000);
      setTimeout(() => set({ mood: 'idle', mouthState: 'neutral' }), 3000);
    },
    jump: () => {
      set({ mood: 'excited' });
      setTimeout(() => set({ mood: 'idle' }), 1000);
    },
    wave: () => {
      set({ mood: 'happy' });
      get().actions.showSpeech('👋 Hey there!', 2000);
      setTimeout(() => set({ mood: 'idle' }), 2000);
    },
    sleep: () => set({ isSleeping: true, mood: 'sleeping' }),
    wake: () => set({ isSleeping: false, mood: 'idle' }),
    toggleCollapsed: () => set((s) => ({ isCollapsed: !s.isCollapsed })),
  },
}));
