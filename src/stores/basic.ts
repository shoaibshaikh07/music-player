import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BasicState {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}

export const useBasicStore = create<BasicState>()(
  persist(
    (set) => ({
      view: "grid",
      setView: (view: "grid" | "list"): void => set({ view }),
    }),
    {
      name: "basic",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
