"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
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
  X,
  Shuffle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/hooks/player";
import CardAurora from "../animated/card-aurora";
import { useEffect, useState } from "react";
import { usePlayerStore } from "@/stores/player";
import { useLikedMusicStore } from "@/stores/liked-music";
import { toast } from "sonner";
import type { Music } from "@/types/global";

interface MusicCardProps {
  musics: Music[];
  onClose: () => void;
}

export const MusicCard = ({
  musics,
  onClose,
}: MusicCardProps): React.JSX.Element | null => {
  //   const [lastWarningTime, setLastWarningTime] = useState(0);
  //   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const { currentMusic } = usePlayerStore();
  const { toggleLikedMusic, likedMusics } = useLikedMusicStore();
  const [mounted, setMounted] = useState(false);
  const [lastWarningTime, setLastWarningTime] = useState(0);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const isLiked = likedMusics.some((track) => track.id === currentMusic?.id);

  const {
    progress,
    duration,
    isLoading,
    isBuffering,
    isPlaying,
    formatTime,
    togglePlay,
    handleProgressChange,
    handleVolumeChange,
    volume,
    muted,
    shuffle,
    toggleMute,
    toggleShuffle,
    playNextTrack,
    playPreviousTrack,
    colors,
  } = usePlayer(musics);

  useEffect(() => {
    console.log("Shuffle", shuffle);
  }, [shuffle]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Don't render player if no music is selected
  if (!currentMusic) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm backdrop-brightness-75 will-change-transform"
    >
      <CardAurora colors={colors} className="pointer-events-auto">
        <motion.div onTap={onClose} className="-top-8 absolute right-4 z-50">
          <X className="size-6 cursor-pointer" />
        </motion.div>
        <div className="flex flex-col gap-4">
          <motion.div
            layoutId={`image-${currentMusic.id}`}
            className="relative aspect-square w-full"
          >
            <Image
              src={currentMusic.cover}
              alt={currentMusic.title}
              fill
              className="rounded-[20px] object-cover"
            />
          </motion.div>
          <div className="flex flex-col gap-1">
            <motion.h2
              layoutId={`title-${currentMusic.id}`}
              className="font-bold text-2xl"
            >
              {currentMusic.title}
            </motion.h2>
            <motion.p
              layoutId={`artist-${currentMusic.id}`}
              className="text-muted-foreground text-sm"
            >
              {currentMusic.artist.join(", ")}
            </motion.p>
          </div>
          <motion.div
            layoutId={`playing-${currentMusic.id}`}
            className="space-y-3"
          >
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
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={(): void => toggleLikedMusic(currentMusic)}
              >
                <Heart
                  className={`h-6 w-6 ${isLiked ? "fill-current text-red-500" : ""}`}
                />
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={playPreviousTrack}>
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  disabled={isBuffering || isLoading}
                  onKeyDownCapture={(e): void => {
                    if (e.key === "Space") {
                      togglePlay();
                    }
                  }}
                  className={cn(
                    (isLoading || isBuffering) && "animate-pulse bg-muted",
                    "relative bg-foreground text-background",
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
              <Button
                variant="ghost"
                size="icon"
                onClick={(): void => toggleShuffle()}
                className={cn("", shuffle && "bg-foreground text-background")}
              >
                <Shuffle className={"h-6 w-6"} />
              </Button>
            </div>
            <div className="flex items-center justify-end">
              <div className="flex w-32 items-center gap-2">
                <Button
                  variant="ghost"
                  className={cn(
                    "px-4",
                    muted && "bg-foreground text-background",
                  )}
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
                  onValueChange={(value): void => {
                    if (isIOS) {
                      const currentTime = Date.now();
                      if (currentTime - lastWarningTime >= 5000) {
                        // 5000ms = 5 seconds
                        setLastWarningTime(currentTime);
                        toast.info("Please use device volume controls.", {
                          description:
                            "Due to ios limitations, you have to use the device volume controls to change the volume.",
                          action: {
                            label: "Got it",
                            onClick: (): void => {
                              setLastWarningTime(0);
                            },
                          },
                        });
                      }
                      return;
                    }
                    handleVolumeChange(value);
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
            {/* <div className="mt-4 flex items-center justify-between">
            </div> */}
          </motion.div>
        </div>
      </CardAurora>
    </motion.div>
  );
};
