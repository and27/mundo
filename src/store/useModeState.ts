import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Mode = "individual" | "educator" | "child";

interface ModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;

  get isSchoolMode(): boolean;
  get isChildMode(): boolean;
  get isIndividualMode(): boolean;

  setSchoolMode: (isSchoolMode: boolean) => void;
  toggleMode: () => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set, get) => ({
      mode: "individual" as Mode,

      setMode: (mode: Mode) => set({ mode }),

      get isSchoolMode() {
        return get().mode === "educator";
      },

      get isChildMode() {
        return get().mode === "child";
      },

      get isIndividualMode() {
        return get().mode === "individual";
      },

      setSchoolMode: (isSchoolMode: boolean) => {
        set({ mode: isSchoolMode ? "educator" : "individual" });
      },

      toggleMode: () => {
        const currentMode = get().mode;
        if (currentMode === "educator") {
          set({ mode: "individual" });
        } else {
          set({ mode: "educator" });
        }
      },
    }),
    {
      name: "mundo-interior-mode",
      migrate: (persistedState: any, version: number) => {
        if (
          persistedState &&
          typeof persistedState.isSchoolMode === "boolean"
        ) {
          return {
            mode: persistedState.isSchoolMode ? "educator" : "individual",
          };
        }
        return persistedState;
      },
    }
  )
);

export const useIsChildMode = () =>
  useModeStore((state) => state.mode === "child");
export const useIsEducatorMode = () =>
  useModeStore((state) => state.mode === "educator");
export const useIsIndividualMode = () =>
  useModeStore((state) => state.mode === "individual");
