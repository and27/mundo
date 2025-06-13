import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModeState {
  isSchoolMode: boolean;
  setSchoolMode: (isSchoolMode: boolean) => void;
  toggleMode: () => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      isSchoolMode: false,
      setSchoolMode: (isSchoolMode: boolean) => set({ isSchoolMode }),
      toggleMode: () => set((state) => ({ isSchoolMode: !state.isSchoolMode })),
    }),
    {
      name: "mundo-interior-mode",
    }
  )
);
