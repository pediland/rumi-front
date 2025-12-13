import { StaticImageData } from "next/image";
import { create } from "zustand";

type PageHeadStore = {
  title?: string;
  backgroundImage: StaticImageData | string | null;
  description?: string;

  isReady: boolean;

  setPageHead: (data: {
    title?: string;
    backgroundImage?: StaticImageData | string | null;
    description?: string;
  }) => void;

  resetPageHead: () => void;
};

export const usePageHeadStore = create<PageHeadStore>((set) => ({
  title: undefined,
  backgroundImage: null,
  description: undefined,

  isReady: false,

  setPageHead: (data) =>
    set((state) => ({
      ...state,
      ...data,
      isReady: true,
    })),

  resetPageHead: () =>
    set({
      title: undefined,
      backgroundImage: null,
      description: undefined,
      isReady: false,
    }),
}));
