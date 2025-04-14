"use client";

import { Button } from "@/components/ui/button";
import type { Music } from "@/types/global";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Slider } from "../ui/slider";
import { musics } from "@/data/music";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
} from "lucide-react";
import { cn, getAudioUrl } from "@/lib/utils";
import { usePlayerStore } from "@/stores/player";
import { useLikedMusicStore } from "@/stores/liked-music";

interface MusicCardProps {
  music: Music;
  onClose: () => void;
}

export const MusicCard = ({
  music,
  onClose,
}: MusicCardProps): React.JSX.Element => {
  const {
    music: previouslyPlayedMusic,
    setMusic,
    progress,
    setProgress,
    volume,
    setVolume,
  } = usePlayerStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    audioRef.current = new Audio(audioUrl);

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

    audioRef.current.addEventListener("loadedmetadata", handleMetadata);
    audioRef.current.addEventListener("durationchange", handleMetadata);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return (): void => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("loadedmetadata", handleMetadata);
        audioRef.current.removeEventListener("durationchange", handleMetadata);
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
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
        await audioRef.current.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
    setIsPlaying(!isPlaying);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm backdrop-brightness-75"
    >
      <motion.div
        layoutId={`card-${music.id}`}
        className="mx-4 w-full max-w-lg rounded-sm border border-border/60 bg-card p-6 shadow dark:bg-card/80"
        onClick={(e): void => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <motion.div
            layoutId={`image-${music.id}`}
            className="relative aspect-square w-full"
          >
            <Image
              src={music.cover}
              alt={music.title}
              fill
              className="rounded-[20px] object-cover"
            />
          </motion.div>
          <div className="flex flex-col gap-1">
            <motion.h2
              layoutId={`title-${music.id}`}
              className="font-bold text-2xl"
            >
              {music.title}
            </motion.h2>
            <motion.p
              layoutId={`artist-${music.id}`}
              className="text-muted-foreground text-sm"
            >
              {music.artist.join(", ")}
            </motion.p>
          </div>
          <motion.div layoutId={`playing-${music.id}`}>
            <div className="space-y-2">
              <Slider
                value={[progress]}
                max={duration}
                step={0.1} // Make steps smaller for smoother movement
                onValueChange={handleProgressChange}
                className={cn(
                  "cursor-pointer",
                  isLoading && "pointer-events-none opacity-50",
                  // Add custom styles to remove thumb and modify track
                  "relative flex w-full touch-none select-none items-center",
                  "[&_.pulse]:animate-pulse",
                  "[&_[role=slider]]:h-full [&_[role=slider]]:w-full",
                  "[&_[role=slider]]:cursor-pointer",
                  // Remove thumb styles
                  "[&_[role=slider]]:opacity-0",
                  // Customize track
                  "[&_.track]:h-1 [&_.track]:rounded-full [&_.track]:bg-muted",
                  // Customize range (filled part)
                  "[&_.range]:h-1 [&_.range]:rounded-full [&_.range]:bg-primary",
                )}
              />
              <div className="flex justify-between text-muted-foreground text-xs tabular-nums">
                <span>{formatTime(progress)}</span>
                <span
                  className={cn(
                    "w-8",
                    isLoading && "h-4 animate-pulse rounded bg-gray-300",
                  )}
                >
                  {!isLoading && formatTime(duration)}
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(): void => toggleLikedMusic(music.id)}
                >
                  <Heart
                    className={`h-6 w-6 ${isLiked ? "fill-current text-red-500" : ""}`}
                  />
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={playPreviousTrack}
                  >
                    <SkipBack className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    disabled={isLoading}
                    className={cn(isLoading && "animate-pulse bg-muted")}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={playNextTrack}>
                    <SkipForward className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <div className="flex w-32 items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
