import { create } from "zustand";
import { ActionableGuide } from "@/types/ai";

type ExperienceType = "shared" | "digital" | null;

interface ModalState {
  experienceModalOpen: boolean;
  currentGuide: ActionableGuide | null;
  selectedExperience: ExperienceType;

  openExperienceModal: (guide: ActionableGuide) => void;
  closeExperienceModal: () => void;
  setSelectedExperience: (experience: ExperienceType) => void;
  resetExperienceSelection: () => void;

  // Future modals
  journeyModalOpen: boolean;
  openJourneyModal: (guide: ActionableGuide) => void;
  closeJourneyModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  experienceModalOpen: false,
  currentGuide: null,
  selectedExperience: null,
  journeyModalOpen: false,

  openExperienceModal: (guide: ActionableGuide) =>
    set({
      experienceModalOpen: true,
      currentGuide: guide,
      selectedExperience: null,
    }),

  closeExperienceModal: () =>
    set({
      experienceModalOpen: false,
      currentGuide: null,
      selectedExperience: null,
    }),

  setSelectedExperience: (experience: ExperienceType) =>
    set({ selectedExperience: experience }),

  resetExperienceSelection: () => set({ selectedExperience: null }),

  openJourneyModal: (guide: ActionableGuide) =>
    set({
      journeyModalOpen: true,
      currentGuide: guide,
    }),

  closeJourneyModal: () =>
    set({
      journeyModalOpen: false,
      currentGuide: null,
    }),
}));

export default useModalStore;
