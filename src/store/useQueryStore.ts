import { create } from "zustand";

interface QueryStore {
  originalQuery: string;
  setOriginalQuery: (query: string) => void;
  clearQuery: () => void;
}

export const useQueryStore = create<QueryStore>((set) => ({
  originalQuery: "",
  setOriginalQuery: (query: string) => set({ originalQuery: query }),
  clearQuery: () => set({ originalQuery: "" }),
}));
