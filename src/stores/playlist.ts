import type { Music } from "@/types/global";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Playlist {
  id: string;
  name: string;
  playlist: Music[];
  createdAt: Date;
  updatedAt?: Date;
}

interface PlaylistState {
  playlist: Playlist[];
  createPlaylist: (name: string) => void;
  updatePlaylist: (id: string) => void;
  removePlaylist: (id: string) => void;

  addToPlaylist: (music: Music, playlistId: string) => void;
  removeFromPlaylist: (music: Music, playlistId: string) => void;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set) => ({
      playlist: [],
      createPlaylist: (name: string): void => {
        set((state) => ({
          playlist: [
            ...state.playlist,
            {
              id: Date.now().toString(),
              name,
              playlist: [],
              createdAt: new Date(),
            },
          ],
        }));
      },
      removePlaylist: (id: string): void => {
        set((state) => ({
          playlist: state.playlist.filter((playlist) => playlist.id !== id),
        }));
      },
      updatePlaylist: (id: string): void => {
        set((state) => {
          const playlist = state.playlist.find(
            (playlist) => playlist.id === id,
          );
          if (playlist) {
            playlist.updatedAt = new Date();
            return {
              playlist: state.playlist,
            };
          }
          return state;
        });
      },

      addToPlaylist: (music: Music, playlistId: string): void => {
        set((state) => {
          const playlist = state.playlist.find(
            (playlist) => playlist.id === playlistId,
          );
          if (playlist) {
            playlist.playlist = [...playlist.playlist, music];
            return {
              playlist: state.playlist,
            };
          }
          return state;
        });
      },

      removeFromPlaylist: (music: Music, playlistId: string): void => {
        set((state) => {
          const playlist = state.playlist.find(
            (playlist) => playlist.id === playlistId,
          );
          if (playlist) {
            playlist.playlist = playlist.playlist.filter(
              (track) => track.id !== music.id,
            );
            return {
              playlist: state.playlist,
            };
          }
          return state;
        });
      },
    }),
    {
      name: "playlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
