import { create } from 'zustand';

interface CursorState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  isHovering: boolean;
  hoverTarget: string | null;
  isVisible: boolean;
  actions: {
    setPosition: (x: number, y: number) => void;
    setVelocity: (vx: number, vy: number) => void;
    setHovering: (hovering: boolean, target?: string) => void;
    setVisible: (visible: boolean) => void;
  };
}

export const useCursorStore = create<CursorState>((set) => ({
  x: 0,
  y: 0,
  velocityX: 0,
  velocityY: 0,
  isHovering: false,
  hoverTarget: null,
  isVisible: true,
  actions: {
    setPosition: (x, y) => set({ x, y }),
    setVelocity: (velocityX, velocityY) => set({ velocityX, velocityY }),
    setHovering: (isHovering, hoverTarget) => set({ isHovering, hoverTarget: hoverTarget ?? null }),
    setVisible: (isVisible) => set({ isVisible }),
  },
}));
