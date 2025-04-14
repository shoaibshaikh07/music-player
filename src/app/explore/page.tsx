"use client";

import { MusicCard } from "@/components/player/music-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { musics } from "@/data/music";
import type { Music } from "@/types/global";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const Explore = (): React.JSX.Element => {
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);
  const [musicHover, setMusicHover] = useState<string | null>(null);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4 px-1">
      <Separator />
      <h1 className="px-4 font-medium text-lg">Explore</h1>
      <ul className="grid">
        {musics.map((music) => (
          <motion.li
            layoutId={`card-${music.id}`}
            key={music.id}
            onClick={(): void => setSelectedMusic(music)}
            onMouseEnter={(): void => setMusicHover(music.id)}
            onMouseLeave={(): void => setMusicHover(null)}
            className="relative flex cursor-pointer items-center gap-4 rounded p-4 transition-colors "
          >
            {/* Pill */}
            {musicHover === music.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut" }}
                layoutId="pill"
                className="absolute inset-0 rounded bg-accent"
              />
            )}
            <motion.div layoutId={`image-${music.id}`} className="relative">
              <Image
                src={music.cover}
                alt={music.title}
                width={48}
                height={48}
                className="rounded"
              />
            </motion.div>
            <div className="relative flex flex-col">
              <motion.h2
                layoutId={`title-${music.id}`}
                className="font-bold text-base md:text-lg"
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
            <div className="relative flex grow justify-end">
              <Button className="text-xs" variant="secondary">
                Play
              </Button>
            </div>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {selectedMusic && (
          <MusicCard
            music={selectedMusic}
            onClose={(): void => setSelectedMusic(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Explore;
