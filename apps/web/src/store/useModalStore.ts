import { create } from "zustand";
import { ActionableGuide } from "@/types/ai";

interface ModalState {
  currentGuide: ActionableGuide | null;

  // Future modals
  journeyModalOpen: boolean;
  openJourneyModal: (guide: ActionableGuide) => void;
  closeJourneyModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  currentGuide: null,
  journeyModalOpen: false,

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
