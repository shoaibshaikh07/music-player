import type { Music } from "@/types/global";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LikedMusicStore {
  likedMusics: Music[];
  addLikedMusic: (music: Music) => void;
  removeLikedMusic: (music: Music) => void;
  toggleLikedMusic: (music: Music) => void;
}

export const useLikedMusicStore = create<LikedMusicStore>()(
  persist(
    (set) => ({
      likedMusics: [],
      addLikedMusic: (music: Music): void => {
        set((state) => ({
          likedMusics: [...state.likedMusics, music],
        }));
      },
      removeLikedMusic: (music: Music): void => {
        set((state) => ({
          likedMusics: state.likedMusics.filter((m) => m.id !== music.id),
        }));
      },
      toggleLikedMusic: (music: Music): void => {
        set((state) => {
          const index = state.likedMusics.findIndex((m) => m.id === music.id);
          if (index === -1) {
            return {
              likedMusics: [...state.likedMusics, music],
            };
          }
          return {
            likedMusics: state.likedMusics.filter((m) => m.id !== music.id),
          };
        });
      },
    }),
    {
      name: "liked-music",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
