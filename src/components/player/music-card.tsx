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
import { cn } from "@/lib/utils";

interface MusicCardProps {
  music: Music;
  onClose: () => void;
}

export const MusicCard = ({
  music,
  onClose,
}: MusicCardProps): React.JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [liked, setLiked] = useState(false);
  const [duration, setDuration] = useState(0); // Add this state
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = musics.filter((track) => track.id === music.id)[0];
  console.log(currentTrack);
  const audioUrl = `https://x1u0.a1.e2-8.dev/hackathon/${currentTrack.id}.mp3`;

  useEffect(() => {
    setIsLoading(true);
    setDuration(0); // Reset duration when loading new track
    audioRef.current = new Audio(audioUrl);

    const handleMetadata = (): void => {
      if (audioRef.current) {
        const audioDuration = Math.floor(audioRef.current.duration);
        if (Number.isNaN(audioDuration)) {
          return; // Don't update if duration is not valid
        }
        setDuration(audioDuration);
        setIsLoading(false);
      }
    };

    // Add metadata loaded event listener
    audioRef.current.addEventListener("loadedmetadata", handleMetadata);
    audioRef.current.addEventListener("durationchange", handleMetadata);

    // If it was playing before, start playing the new track
    if (isPlaying) {
      audioRef.current.play();
      progressInterval.current = setInterval((): void => {
        if (audioRef.current) {
          setProgress(Math.floor(audioRef.current.currentTime));
        }
      }, 1000);
    }

    return (): void => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("loadedmetadata", handleMetadata);
        audioRef.current.removeEventListener("durationchange", handleMetadata);
        audioRef.current = null;
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [audioUrl, currentTrackIndex, isPlaying]);

  // Add separate effect for volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  // Update the formatTime function to handle decimals

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60); // Add Math.floor here
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Update the togglePlay function to maintain position
  const togglePlay = async (): Promise<void> => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    } else {
      try {
        audioRef.current.currentTime = progress; // Set the current time before playing
        await audioRef.current.play();
        progressInterval.current = setInterval((): void => {
          if (audioRef.current) {
            setProgress(Math.floor(audioRef.current.currentTime));
          }
        }, 1000);
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
    const newVolume = value[0];
    audioRef.current.volume = newVolume / 100;
    setVolume(newVolume);
  };

  const playNextTrack = (): void => {
    const nextIndex = (currentTrackIndex + 1) % musics.length;
    setCurrentTrackIndex(nextIndex);
    setProgress(0);
    setIsPlaying(false);
  };

  const playPreviousTrack = (): void => {
    const prevIndex = (currentTrackIndex - 1 + musics.length) % musics.length;
    setCurrentTrackIndex(prevIndex);
    setProgress(0);
    setIsPlaying(false);
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
                  onClick={(): void => setLiked(!liked)}
                >
                  <Heart
                    className={`h-6 w-6 ${liked ? "fill-current text-red-500" : ""}`}
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
