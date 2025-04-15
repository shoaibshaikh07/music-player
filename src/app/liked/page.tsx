"use client";

import MusicList from "@/components/music-list";
import TitleView from "@/components/common/title-view";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLikedMusicStore } from "@/stores/liked-music";
import { Link } from "next-view-transitions";

const LikedMusic = (): React.JSX.Element => {
  const { likedMusics } = useLikedMusicStore();

  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col gap-1 px-1 pb-6">
      <Separator className="bg-accent" />
      <TitleView title="Liked Musics" />
      <Separator className="bg-accent" />
      {likedMusics.length > 0 ? (
        <MusicList musics={likedMusics} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <p className="text-black">No liked musics</p>
          <Link href="/explore">
            <Button className="text-xs" variant="secondary" size="sm">
              Add Now
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};
export default LikedMusic;
