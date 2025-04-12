import { create } from "zustand";

interface AppState {
  emotion: string | null;
  setEmotion: (emotion: string) => void;

  guideId: string | null;
  setGuideId: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  emotion: null,
  setEmotion: (emotion) => set({ emotion }),

  guideId: null,
  setGuideId: (id) => set({ guideId: id }),
}));
