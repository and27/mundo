import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  name: string;
  emotion: string;
  guide: string;
  setName: (name: string) => void;
  setEmotion: (emotion: string) => void;
  setGuide: (guide: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      name: "",
      emotion: "",
      guide: "",
      setName: (name) => set({ name }),
      setEmotion: (emotion) => set({ emotion }),
      setGuide: (guide) => set({ guide }),
      reset: () => set({ name: "", emotion: "", guide: "" }),
    }),
    {
      name: "onboarding-storage", //local storage key
    }
  )
);
