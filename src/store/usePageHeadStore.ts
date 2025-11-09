import { create } from "zustand";

interface PageHeadStore {
  title: string;
  description: string;
  setPageHead: (title: string, description: string) => void;
  resetPageHead: () => void;
}

export const usePageHeadStore = create<PageHeadStore>((set) => ({
  title: "",
  description: "",
  setPageHead: (title, description) => set({ title, description }),
  resetPageHead: () => set({ title: "", description: "" }),
}));
