import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LikedMusic {
  id: string;
  liked: boolean;
}

interface LikedMusicStore {
  likedMusic: LikedMusic[];
  addLikedMusic: (id: string) => void;
  removeLikedMusic: (id: string) => void;
  toggleLikedMusic: (id: string) => void;
}

export const useLikedMusicStore = create<LikedMusicStore>()(
  persist(
    (set) => ({
      likedMusic: [],
      addLikedMusic: (id: string): void => {
        set((state) => ({
          likedMusic: [...state.likedMusic, { id, liked: true }],
        }));
      },
      removeLikedMusic: (id: string): void => {
        set((state) => ({
          likedMusic: state.likedMusic.filter((music) => music.id !== id),
        }));
      },
      toggleLikedMusic: (id: string): void => {
        set((state) => {
          const index = state.likedMusic.findIndex((music) => music.id === id);
          if (index === -1) {
            return {
              likedMusic: [...state.likedMusic, { id, liked: true }],
            };
          }
          return {
            likedMusic: [
              ...state.likedMusic.slice(0, index),
              {
                ...state.likedMusic[index],
                liked: !state.likedMusic[index].liked,
              },
              ...state.likedMusic.slice(index + 1),
            ],
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
