"use client";

import { Button } from "@/components/ui/button";
import type { Music } from "@/types/global";
import { motion } from "framer-motion";
import Image from "next/image";
import { Slider } from "../ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  VolumeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/hooks/player";

interface MusicCardProps {
  music: Music;
  onClose: () => void;
}

export const MusicCard = ({
  music,
  onClose,
}: MusicCardProps): React.JSX.Element => {
  const {
    progress,
    isLoading,
    isBuffering,
    toggleLikedMusic,
    isLiked,
    handleProgressChange,
    formatTime,
    togglePlay,
    handleVolumeChange,
    volume,
    muted,
    toggleMute,
    playNextTrack,
    playPreviousTrack,
    duration,
    isPlaying,
  } = usePlayer(music);

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
                    disabled={isBuffering || isLoading}
                    className={cn(
                      (isLoading || isBuffering) && "animate-pulse bg-muted",
                      "relative",
                    )}
                  >
                    {isBuffering || isLoading ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : isPlaying ? (
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
                <Button
                  variant="ghost"
                  className={cn("px-4", muted && "bg-muted")}
                  size="icon"
                  onClick={toggleMute}
                >
                  {muted ? (
                    <VolumeOff className="size-4" />
                  ) : (
                    <Volume2 className="size-4" />
                  )}
                </Button>
                <Slider
                  value={[muted ? 0 : volume]}
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
