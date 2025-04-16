"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/stores/player";
import type { Music } from "@/types/global";
import { getAudioUrl } from "@/lib/utils";
import { extractColors } from "extract-colors";

type ReturnType = {
  progress: number;
  duration: number;
  isLoading: boolean;
  isBuffering: boolean;
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  colors: string[];
  isLiked: boolean;

  formatTime: (seconds: number) => string;
  togglePlay: () => void;
  handleProgressChange: (value: number[]) => void;
  handleVolumeChange: (value: number[]) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  playMusic: (music: Music | null) => void;
  toggleLikedMusic: (music: Music) => void;
  playNextTrack: () => void;
  setColors: (colors: string[]) => void;
  playPreviousTrack: () => void;
};

export function usePlayer(musics: Music[], initialMusic?: Music): ReturnType {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  const {
    currentMusic,
    isPlaying,
    volume,
    muted,
    shuffle,
    likedMusic,
    setCurrentMusic,
    togglePlay,
    setIsPlaying,
    setVolume,
    setMuted,
    setShuffle,
    playNext,
    toggleLiked,
    colors,
    setColors,
  } = usePlayerStore();

  const music = currentMusic || initialMusic;

  // Initialize audio element
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    return (): void => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle music change
  useEffect(() => {
    if (!audioRef.current || !music) return;

    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
      navigator.mediaSession.setActionHandler("play", () => {
        togglePlay();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        togglePlay();
      });

      const image = new Image();

      image.src = `http://localhost:3000/_next/image?url=${encodeURIComponent(
        music.cover,
      )}&w=1200&q=75`;

      extractColors(image).then((colorData) => {
        const hexcolors = colorData.map((color) => color.hex);
        setColors(hexcolors);
      });

      navigator.mediaSession.metadata = new MediaMetadata({
        title: music.title,
        artist: music.artist.join(", "),
        artwork: [
          {
            src: music.cover,
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: music.cover,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: music.cover,
            sizes: "128x128",
            type: "image/png",
          },
        ],
      });
    }

    if (isPlaying) {
      setIsLoading(false); // Set loading to false when playing
      setTimeout(async () => {
        if (!audioRef.current) return;
        await audioRef.current
          .play()
          .catch((err) => console.error("Video play error:", err));
      }, 150);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, music, setColors, togglePlay]);

  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = Math.min(1, Math.max(0, volume / 100));
  }, [volume]);

  // Handle mute change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted; // Set muted per state
    setMuted(muted); // Update muted state
  }, [muted, setMuted]);

  // Handle shuffle change
  useEffect(() => {
    if (!audioRef.current) return;
  }, [shuffle, setShuffle]);

  // Set up audio event listeners
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    audioRef.current.src = getAudioUrl(music?.id || null);

    const handleTimeUpdate = (): void => {
      setProgress(audio.currentTime);
    };

    const handleDurationChange = (): void => {
      setDuration(audio.duration);
    };

    const handleLoadedData = (): void => {
      setIsLoading(false);
      setIsBuffering(false);
      setDuration(audio.duration);

      // Reset loading state to false if audio is playing
      if (audioRef.current && !audio.paused) {
        setIsLoading(false);
      }
    };

    const handleEnded = (): void => {
      // Try to play next track
      const hasNextTrack = playNext();

      // If no next track, pause
      if (!hasNextTrack) {
        setIsPlaying(false);
        setProgress(0);
        audio.currentTime = 0;
      }
    };

    const handleWaiting = (): void => {
      setIsBuffering(true);
      setIsLoading(false);
    };

    const handlePlaying = (): void => {
      setIsBuffering(false);
      setIsLoading(false);
    };

    // Add event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);

    // Clean up event listeners
    return (): void => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
    };
  }, [playNext, setIsPlaying, music]);

  // Format time (seconds) to MM:SS
  const formatTime = (time: number): string => {
    if (Number.isNaN(time) || time === Number.POSITIVE_INFINITY) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle progress change (seek)
  const handleProgressChange = (value: number[]): void => {
    if (!audioRef.current || isLoading) return;

    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  // Handle volume change
  const handleVolumeChange = useCallback(
    (value: number[]) => {
      const newVolume = Math.min(100, Math.max(0, value[0])); // Limit to 0-100
      setVolume(newVolume); // Update volume state

      if (audioRef.current) {
        audioRef.current.volume = newVolume / 100; // Adjust for HTMLMediaElement
      }
    },
    [setVolume],
  );

  // Play a specific music
  const playMusic = (music: Music | null): void => {
    setCurrentMusic(music);
  };

  // Toggle like for current music
  const toggleLikedMusic = (music: Music): void => {
    if (!music) return;
    toggleLiked(music.id);
  };

  const toggleMute = (): void => {
    const prevMuted = muted;
    setMuted(!prevMuted); // Toggle muted state
  };

  const toggleShuffle = (): void => {
    const prevShuffle = shuffle;
    setShuffle(!prevShuffle); // Toggle muted state
  };

  // Play next track
  const playNextTrack = (): void => {
    const currentMusicIndex = musics.findIndex(
      (track) => track.id === currentMusic?.id,
    );
    const nextMusicIndex =
      currentMusicIndex + 1 === musics.length ? 0 : currentMusicIndex + 1;

    const nextMusic = musics[nextMusicIndex];
    playMusic(nextMusic);
  };

  // Play previous track
  const playPreviousTrack = (): void => {
    const currentMusicIndex = musics.findIndex(
      (track) => track.id === currentMusic?.id,
    );

    const nextMusicIndex =
      currentMusicIndex - 1 === -1 ? musics.length - 1 : currentMusicIndex - 1;

    const nextMusic = musics[nextMusicIndex];
    playMusic(nextMusic);
  };

  return {
    progress,
    duration,
    isLoading,
    isBuffering,
    isPlaying,
    volume,
    muted,
    shuffle,
    colors: colors.reverse(),
    isLiked: music ? likedMusic.includes(music.id) : false,

    // Methods
    formatTime,
    togglePlay,
    handleProgressChange,
    handleVolumeChange,
    toggleMute,
    toggleShuffle,
    playMusic,
    toggleLikedMusic,
    playNextTrack,
    setColors,
    playPreviousTrack,
  };
}
