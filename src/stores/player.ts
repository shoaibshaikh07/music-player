import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Music } from "@/types/global";

interface PlayerState {
  currentMusic: Music | null;
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  queue: Music[];
  history: Music[];
  likedMusic: string[];

  // Actions
  setCurrentMusic: (music: Music | null) => void;
  togglePlay: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
  addToQueue: (music: Music) => void;
  removeFromQueue: (musicId: string) => void;
  clearQueue: () => void;
  playNext: () => boolean;
  playPrevious: () => boolean;
  toggleLiked: (musicId: string) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentMusic: null,
      isPlaying: false,
      volume: 50,
      muted: false,
      queue: [],
      history: [],
      likedMusic: [],

      setCurrentMusic: (music): void => {
        const { currentMusic, history } = get();

        // Add current music to history if it exists
        if (currentMusic) {
          set({
            history: [currentMusic, ...history.slice(0, 9)], // Keep last 10 items
          });
        }

        set({ currentMusic: music, isPlaying: !!music });
      },

      togglePlay: (): void => set((state) => ({ isPlaying: !state.isPlaying })),

      setIsPlaying: (isPlaying): void => set({ isPlaying }),

      setVolume: (volume: number): void => set({ volume }),

      toggleMute: (): void => set((state) => ({ muted: !state.muted })),

      setMuted: (muted: boolean): void => set({ muted }),

      addToQueue: (music: Music): void =>
        set((state) => ({
          queue: [...state.queue, music],
        })),

      removeFromQueue: (musicId: string): void =>
        set((state) => ({
          queue: state.queue.filter((item) => item.id !== musicId),
        })),

      clearQueue: (): void => set({ queue: [] }),

      playNext: (): boolean => {
        const { queue, currentMusic } = get();

        if (queue.length > 0) {
          const nextMusic = queue[0];
          const newQueue = queue.slice(1);

          // Add current music to history if it exists
          if (currentMusic) {
            set((state) => ({
              history: [currentMusic, ...state.history.slice(0, 9)], // Keep last 10 items
            }));
          }

          set({
            currentMusic: nextMusic,
            queue: newQueue,
            isPlaying: true,
          });

          return true;
        }

        return false;
      },

      playPrevious: (): boolean => {
        const { history } = get();

        if (history.length > 0) {
          const previousMusic = history[0];
          const newHistory = history.slice(1);

          // Add current music to queue
          set((state) => {
            if (state.currentMusic) {
              return {
                currentMusic: previousMusic,
                history: newHistory,
                queue: [state.currentMusic, ...state.queue],
                isPlaying: true,
              };
            }
            return {
              currentMusic: previousMusic,
              history: newHistory,
              isPlaying: true,
            };
          });

          return true;
        }

        return false;
      },

      toggleLiked: (musicId): void =>
        set((state) => {
          if (state.likedMusic.includes(musicId)) {
            return {
              likedMusic: state.likedMusic.filter((id) => id !== musicId),
            };
          }
          return { likedMusic: [...state.likedMusic, musicId] };
        }),
    }),
    {
      name: "music-player-storage",
      partialize: (state): unknown => ({
        volume: state.volume,
        muted: state.muted,
        likedMusic: state.likedMusic,
        // We don't persist currentMusic, isPlaying, queue, or history
        // to avoid unexpected audio playback when the user returns
      }),
    },
  ),
);
