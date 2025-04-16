"use client";

import { useState } from "react";
import MusicList from "@/components/music-list";
import TitleView from "@/components/common/title-view";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLikedMusicStore } from "@/stores/liked-music";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOutLeft } from "@/lib/animation";
import { useFilteredMusics } from "@/hooks/use-filtered-musics";
import SearchInput from "@/components/search-input";

const LikedMusic = (): React.JSX.Element => {
  const router = useTransitionRouter();
  const { likedMusics } = useLikedMusicStore();

  const [search, setSearch] = useState("");
  const searchedMusics = useFilteredMusics(search, likedMusics);

  const hasLiked = likedMusics.length > 0;
  const hasSearch = search.trim().length > 0;

  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col gap-1 px-1 pb-6">
      <Separator className="bg-accent" />
      <TitleView title="Library" />
      {!hasLiked && <Separator className="bg-accent" />}
      {hasLiked ? (
        <>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search in your library"
          />
          {hasSearch ? (
            searchedMusics === null ? (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Loading...
                </span>
              </div>
            ) : searchedMusics.length > 0 ? (
              <MusicList musics={searchedMusics} />
            ) : (
              <div className="mt-16 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  No results found.
                </span>
              </div>
            )
          ) : (
            <MusicList musics={likedMusics} />
          )}
        </>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <p className="text-black">No liked musics</p>
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
