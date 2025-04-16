"use client";

import TitleView from "@/components/common/title-view";
import { Separator } from "@/components/ui/separator";
import MusicList from "@/components/music-list";
import { musics } from "@/data/music";
import { useState } from "react";
import SearchInput from "@/components/search-input";
import { useFilteredMusics } from "@/hooks/use-filtered-musics";

const Explore = (): React.JSX.Element => {
  const [search, setSearch] = useState("");
  const searchedMusics = useFilteredMusics(search, musics);

  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col gap-1 px-1 pb-20">
      <Separator className="bg-accent" />
      <TitleView title="Explore" />
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search for music"
      />
      {search.length > 0 ? (
        searchedMusics === null ? (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-muted-foreground text-sm">Loading...</span>
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
        <MusicList musics={musics} />
      )}
    </section>
  );
};

export default Explore;
