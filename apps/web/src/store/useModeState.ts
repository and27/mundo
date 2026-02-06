import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Mode = "family" | "school" | "child";

interface ModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;

  get isSchoolMode(): boolean;
  get isChildMode(): boolean;
  get isfamilyMode(): boolean;

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
      mode: "family",

      setMode: (mode) => set({ mode }),

      get isSchoolMode() {
        return get().mode === "school";
      },

      get isChildMode() {
        return get().mode === "child";
      },

      get isfamilyMode() {
        return get().mode === "family";
      },

      setSchoolMode: (isSchool) => {
        set({ mode: isSchool ? "school" : "family" });
      },

      toggleMode: () => {
        const current = get().mode;
        set({ mode: current === "school" ? "family" : "school" });
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
              ? "school"
              : "family",
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

        return { mode: "family" };
      },
    }
  )
);

export const useIsChildMode = () =>
  useModeStore((state) => state.mode === "child");
export const useIsschoolMode = () =>
  useModeStore((state) => state.mode === "school");
export const useIsfamilyMode = () =>
  useModeStore((state) => state.mode === "family");
