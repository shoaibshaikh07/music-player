"use client";

import MusicList from "@/components/music-list";
import TitleView from "@/components/common/title-view";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLikedMusicStore } from "@/stores/liked-music";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOutLeft } from "@/lib/animation";

const LikedMusic = (): React.JSX.Element => {
  const router = useTransitionRouter();
  const { likedMusics } = useLikedMusicStore();

  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col gap-1 px-1 pb-20">
      <Separator className="bg-accent" />
      <TitleView title="Library" />
      <Separator className="bg-accent" />
      {likedMusics.length > 0 ? (
        <MusicList musics={likedMusics} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <p>No liked musics</p>
          <Button
            className="text-xs"
            variant="secondary"
            size="sm"
            onClick={(): void => {
              router.push("/explore", {
                onTransitionReady: slideInOutLeft,
              });
            }}
          >
            Add Now
          </Button>
        </div>
      )}
    </section>
  );
};
export default LikedMusic;
