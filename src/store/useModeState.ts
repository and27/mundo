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

// Estado legacy (solo tenía isSchoolMode)
type LegacyModeState = {
  isSchoolMode: boolean;
};

export const useModeStore = create<ModeState>()(
  persist(
    (set, get) => ({
      mode: "individual",

      setMode: (mode) => set({ mode }),

      get isSchoolMode() {
        return get().mode === "educator";
      },

      get isChildMode() {
        return get().mode === "child";
      },

      get isIndividualMode() {
        return get().mode === "individual";
      },

      setSchoolMode: (isSchool) => {
        set({ mode: isSchool ? "educator" : "individual" });
      },

      toggleMode: () => {
        const current = get().mode;
        set({ mode: current === "educator" ? "individual" : "educator" });
      },
    }),
    {
      name: "mundo-interior-mode",
      migrate: (persistedState: unknown): Partial<ModeState> => {
        if (
          typeof persistedState === "object" &&
          persistedState !== null &&
          "isSchoolMode" in persistedState &&
          typeof (persistedState as LegacyModeState).isSchoolMode === "boolean"
        ) {
          return {
            mode: (persistedState as LegacyModeState).isSchoolMode
              ? "educator"
              : "individual",
          };
        }

        if (
          typeof persistedState === "object" &&
          persistedState !== null &&
          "mode" in persistedState &&
          typeof (persistedState as { mode: unknown }).mode === "string"
        ) {
          return {
            mode: (persistedState as { mode: string }).mode as Mode,
          };
        }

        return { mode: "individual" };
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
