import { useEffect, useState } from "react";
import type { Music } from "@/types/global";

export function useFilteredMusics(
  search: string,
  data: Music[],
): Music[] | null {
  const [results, setResults] = useState<Music[] | null>(null);

  useEffect(() => {
    if (search.trim().length > 0) {
      const filtered = data.filter((music) =>
        music.title.toLowerCase().includes(search.toLowerCase()),
      );
      setResults(filtered);
    } else {
      setResults(null);
    }
  }, [search, data]);

  return results;
}
