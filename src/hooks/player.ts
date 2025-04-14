"use client";

import { useRef, useState, useEffect } from "react";
import { musics } from "@/data/music";

import { getAudioUrl } from "@/lib/utils";
import { usePlayerStore } from "@/stores/player";
import { useLikedMusicStore } from "@/stores/liked-music";
import type { Music } from "@/types/global";

export const usePlayer = (music: Music) => {
  const {
    music: previouslyPlayedMusic,
    setMusic,
    progress,
    setProgress,
    volume,
    setVolume,
    muted,
    setMuted,
  } = usePlayerStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  const { likedMusic, toggleLikedMusic } = useLikedMusicStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = musics.find((track) => track.id === music.id);

  const isLiked = likedMusic.some(
    (track) => track.id === music.id && track.liked,
  );

  const audioUrl = getAudioUrl(currentTrack?.id || null);

  useEffect(() => {
    setIsLoading(true);
    setDuration(0);

    const audio = new Audio();
    audio.preload = "auto"; // Preload the audio data
    audio.src = audioUrl;
    audioRef.current = audio;

    const handleTimeUpdate = (): void => {
      if (audioRef.current) {
        setProgress(Math.floor(audioRef.current.currentTime));
      }
    };

    const handleMetadata = (): void => {
      if (audioRef.current) {
        const audioDuration = Math.floor(audioRef.current.duration);
        if (!Number.isNaN(audioDuration)) {
          setDuration(audioDuration);
          setIsLoading(false);
        }
      }
    };

    const handleWaiting = (): void => {
      setIsBuffering(true);
    };

    const handlePlaying = (): void => {
      setIsBuffering(false);
    };

    const handleError = (e: ErrorEvent): void => {
      console.error("Audio error:", e);
      setIsLoading(false);
      setIsBuffering(false);
    };

    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("durationchange", handleMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("error", handleError);

    // Pre-buffer some data
    audio.load();

    return (): void => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("loadedmetadata", handleMetadata);
        audioRef.current.removeEventListener("durationchange", handleMetadata);
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("waiting", handleWaiting);
        audioRef.current.removeEventListener("playing", handlePlaying);
        audioRef.current.removeEventListener("error", handleError);
        audioRef.current = null;
      }
    };
  }, [audioUrl, setProgress]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(1, Math.max(0, volume / 100));
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (music.id === previouslyPlayedMusic?.id) {
        audioRef.current.currentTime = progress;
      } else {
        setProgress(0);
        setMusic(music);
      }
    }
  }, [music, previouslyPlayedMusic?.id, progress, setMusic, setProgress]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = async (): Promise<void> => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setProgress(audioRef.current.currentTime);
    } else {
      try {
        audioRef.current.currentTime = progress;
        // Add a small delay before playing to ensure buffer is ready
        setTimeout(async () => {
          try {
            await audioRef.current?.play();
          } catch (error) {
            console.error("Error playing audio:", error);
          }
        }, 100);
      } catch (error) {
        console.error("Error setting current time:", error);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (): void => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.muted = !muted;
    }
  };

  const handleProgressChange = (value: number[]): void => {
    if (!audioRef.current) return;
    const newProgress = value[0];
    audioRef.current.currentTime = newProgress;
    setProgress(newProgress);
  };

  const handleVolumeChange = (value: number[]): void => {
    if (!audioRef.current) return;
    const newVolume = Math.max(0, Math.min(100, value[0]));
    audioRef.current.volume = newVolume / 100;
    setVolume(newVolume);
  };

  const playNextTrack = (): void => {
    const currentIndex = musics.findIndex((track) => track.id === music.id);
    const nextTrack = musics[(currentIndex + 1) % musics.length];
    setMusic(nextTrack);
    setProgress(0);
    setIsPlaying(true);
  };

  const playPreviousTrack = (): void => {
    const currentIndex = musics.findIndex((track) => track.id === music.id);
    const prevTrack =
      musics[(currentIndex - 1 + musics.length) % musics.length];
    setMusic(prevTrack);
    setProgress(0);
    setIsPlaying(true);
  };

  return {
    progress,
    duration,
    handleProgressChange,
    isLoading,
    toggleLikedMusic,
    isLiked,
    audioRef,
    playPreviousTrack,
    playNextTrack,
    togglePlay,
    handleVolumeChange,
    volume,
    muted,
    toggleMute,
    formatTime,
    isBuffering,
    isPlaying,
  };
};
