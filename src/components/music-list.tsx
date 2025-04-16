"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBasicStore } from "@/stores/basic";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Music } from "@/types/global";
import Image from "next/image";
import { toast } from "sonner";
import { usePlayer } from "@/hooks/player";
import { MusicCard } from "./player/music-card";
import { Play } from "lucide-react";

const MusicList = ({
  musics,
}: {
  musics: Music[];
}): React.JSX.Element => {
  const [musicHover, setMusicHover] = useState<string | null>(null);
  // const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);

  const { view } = useBasicStore();
  const { playMusic } = usePlayer(musics);

  return (
    <>
      <ul
        className={cn(
          "grid",
          view === "grid"
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1",
        )}
      >
        {musics.map((music) => {
          return (
            <motion.li
              layoutId={`card-${music.id}`}
              key={music.id}
              onClick={(): void => {
                playMusic(music);
              }}
              onMouseEnter={(): void => setMusicHover(music.id)}
              onMouseLeave={(): void => setMusicHover(null)}
              onDrag={(e): void => {
                e.preventDefault();
                e.stopPropagation();
                toast.info("Drag and drop is not supported yet.");
              }}
              className={cn(
                "relative flex cursor-pointer select-none gap-4 rounded transition-colors will-change-transform",
                view === "grid"
                  ? "h-full flex-col border border-border/10 p-2"
                  : "flex-row items-center p-4",
              )}
            >
              {/* Pill */}
              {musicHover === music.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeInOut" }}
                  layoutId="pill"
                  className="absolute inset-0 rounded bg-accent will-change-transform"
                />
              )}
              <motion.div layoutId={`image-${music.id}`} className="relative">
                <Image
                  src={music.cover}
                  alt={music.title}
                  width={440}
                  height={440}
                  className={cn(
                    "mx-auto rounded will-change-transform",
                    view === "list" && "size-[48px]",
                  )}
                />
              </motion.div>
              <div
                className={cn(
                  "relative flex flex-col",
                  view === "grid" ? "items-start" : "",
                )}
              >
                <motion.h2
                  layoutId={`title-${music.id}`}
                  className={cn(
                    "font-bold",
                    view === "grid" ? "text-sm" : "text-base md:text-lg",
                  )}
                >
                  {music.title}
                </motion.h2>
                <motion.p
                  layoutId={`artist-${music.id}`}
                  className="text-muted-foreground text-xs md:text-sm"
                >
                  {music.artist.join(", ")}
                </motion.p>
              </div>
              <div
                className={cn(
                  "relative flex grow justify-end",
                  view === "grid" ? "items-end" : "",
                )}
              >
                <Button
                  className="text-xs"
                  variant="secondary"
                  size={view === "grid" ? "icon" : "sm"}
                >
                  {view === "grid" ? <Play className="size-5" /> : "Play"}
                </Button>
              </div>
            </motion.li>
          );
        })}
      </ul>
      <AnimatePresence mode="wait">
        <MusicCard musics={musics} onClose={(): void => playMusic(null)} />
      </AnimatePresence>
    </>
  );
};
export default MusicList;
