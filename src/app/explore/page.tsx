"use client";

import TitleView from "@/components/common/title-view";
import { Separator } from "@/components/ui/separator";
import MusicList from "@/components/music-list";
import { musics } from "@/data/music";

const Explore = (): React.JSX.Element => {
  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col gap-1 px-1 pb-6">
      <Separator className="bg-accent" />
      <TitleView title="Explore" />
      <Separator className="bg-accent" />
      <MusicList musics={musics} />
    </section>
  );
};

export default Explore;
