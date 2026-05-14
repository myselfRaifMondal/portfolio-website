import { create } from 'zustand';

interface MouseStore {
  mouse: { x: number; y: number };
  setMouse: (x: number, y: number) => void;
}

export const useMouseStore = create<MouseStore>((set) => ({
  mouse: { x: 0, y: 0 },
  setMouse: (x: number, y: number) => set({ mouse: { x, y } }),
}));
