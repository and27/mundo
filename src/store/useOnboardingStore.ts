import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  name: string;
  emotion: string;
  guide: string;
  showSubtitles: boolean;
  setName: (name: string) => void;
  setEmotion: (emotion: string) => void;
  setGuide: (guide: string) => void;
  toggleSubtitles: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      name: "",
      emotion: "",
      guide: "",
      showSubtitles: true,

      setName: (name) => set({ name }),
      setEmotion: (emotion) => set({ emotion }),
      setGuide: (guide) => set({ guide }),

      toggleSubtitles: () =>
        set((state) => ({ showSubtitles: !state.showSubtitles })),

      reset: () => set({ name: "", emotion: "", guide: "" }),
    }),
    {
      name: "onboarding-storage",
    }
  )
);
