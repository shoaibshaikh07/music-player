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
            className="flex cursor-pointer items-center gap-4 rounded bg-card p-4 transition-colors hover:bg-accent"
          >
            <motion.div layoutId={`image-${music.id}`}>
              <Image
                src={music.cover}
                alt={music.title}
                width={48}
                height={48}
                className="rounded-md"
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.h2
                layoutId={`title-${music.id}`}
                className="font-bold text-lg"
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
            <div className="flex grow justify-end">
              <Button variant="secondary" className="text-xs" size="sm">
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
