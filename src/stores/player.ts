import type { Music } from "@/types/global";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PlayerState {
  music: Music | null;
  currentMusicIndex: number;
  isPlaying: boolean;
  muted: boolean;
  progress: number;
  duration: number;
  volume: number;

  setMusic: (music: Music | null) => void;
  setCurrentMusicIndex: (currentMusicIndex: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setMuted: (isMuted: boolean) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      music: null,
      currentMusicIndex: 0,
      isPlaying: false,
      muted: false,
      progress: 0,
      duration: 0,
      volume: 80,

      setMusic: (music: Music | null): void => set({ music }),
      setCurrentMusicIndex: (currentMusicIndex: number): void =>
        set({ currentMusicIndex }),
      setIsPlaying: (isPlaying: boolean): void => set({ isPlaying }),
      setMuted: (muted: boolean): void => set({ muted }),
      setProgress: (progress: number): void => set({ progress }),
      setDuration: (duration): void => set({ duration }),
      setVolume: (volume): void => set({ volume }),
      reset: (): void => {
        set({
          music: null,
          currentMusicIndex: 0,
          isPlaying: false,
          progress: 0,
          duration: 0,
        });
      },
    }),
    {
      name: "player",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
