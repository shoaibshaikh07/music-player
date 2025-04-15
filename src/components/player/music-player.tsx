"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VibrateOffIcon as VolumeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/hooks/player";
import { usePlayerStore } from "@/stores/player";
import Image from "next/image";

export function MusicPlayer(): React.JSX.Element | null {
  const { currentMusic } = usePlayerStore();
  const [mounted, setMounted] = useState(false);

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
    toggleMute,
    playNextTrack,
    playPreviousTrack,
  } = usePlayer();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Don't render player if no music is selected
  if (!currentMusic) return null;

  return (
    <div className="border-border/20 border-t bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center gap-4 p-2">
        <div className="flex min-w-[180px] items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded">
            <Image
              src={currentMusic.cover || "/placeholder.svg"}
              alt={currentMusic.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="line-clamp-1 font-medium text-sm">
              {currentMusic.title}
            </p>
            <p className="line-clamp-1 text-muted-foreground text-xs">
              {currentMusic.artist.join(", ")}
            </p>
          </div>
        </div>

        <div className="flex grow flex-col gap-1">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={playPreviousTrack}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={togglePlay}
              disabled={isBuffering || isLoading}
            >
              {isBuffering || isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={playNextTrack}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs tabular-nums">
              {formatTime(progress)}
            </span>
            <Slider
              value={[progress]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleProgressChange}
              className={cn(
                "cursor-pointer",
                isLoading && "pointer-events-none opacity-50",
                "[&_[role=slider]]:h-3 [&_[role=slider]]:w-3",
              )}
            />
            <span className="text-muted-foreground text-xs tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex min-w-[120px] items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleMute}
          >
            {muted ? (
              <VolumeOff className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
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
    </div>
  );
}
