import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SpeechItem {
  id: string;
  text: string;
  role?: 'user' | 'assistant';
}

interface ByteState {
  mood: 'idle' | 'happy' | 'sad' | 'surprised' | 'sleeping' | 'excited';
  mouthState: 'neutral' | 'happy' | 'sad' | 'surprised' | 'speaking';
  isVisible: boolean;
  isCollapsed: boolean;
  isSleeping: boolean;
  isGenerating: boolean;
  contextualPrompt: string;
  blinkCount: number;
  lastInteraction: number;
  speechQueue: SpeechItem[];
  currentSpeech: SpeechItem | null;
  history: { role: 'user' | 'assistant'; text: string }[];
  actions: {
    setMood: (mood: ByteState['mood']) => void;
    setIsGenerating: (isGenerating: boolean) => void;
    setContextualPrompt: (prompt: string) => void;
    updateInteraction: () => void;
    showSpeech: (text: string, duration?: number, role?: 'user' | 'assistant') => void;
    queueSpeech: (text: string, duration?: number) => void;
    dismissSpeech: () => void;
    clearHistory: () => void;
    celebrate: () => void;
    jump: () => void;
    wave: () => void;
    sleep: () => void;
    wake: () => void;
    toggleCollapsed: () => void;
  };
}

export const useByteStore = create<ByteState>()(
  persist(
    (set, get) => ({
      mood: 'idle',
      mouthState: 'neutral',
      isVisible: true,
      isCollapsed: false,
      isSleeping: false,
      isGenerating: false,
      contextualPrompt: '',
      blinkCount: 0,
      lastInteraction: Date.now(),
      speechQueue: [],
      currentSpeech: null,
      history: [],
      actions: {
        setMood: (mood) => set({ mood }),
        setIsGenerating: (isGenerating) => set({ isGenerating }),
        setContextualPrompt: (contextualPrompt) => set({ contextualPrompt }),
        updateInteraction: () => set({ lastInteraction: Date.now() }),
        showSpeech: (text, duration = 4000, role = 'assistant') => {
          const item = { id: Math.random().toString(36), text, role };
          set({ currentSpeech: item, mouthState: 'speaking' });
          
          if (role === 'assistant' || role === 'user') {
            const newHistory = [...get().history, { role, text }].slice(-10);
            set({ history: newHistory });
          }

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
        clearHistory: () => set({ history: [] }),
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
    }),
    {
      name: 'byte-neural-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        history: state.history,
        isCollapsed: state.isCollapsed
      }),
    }
  )
);
