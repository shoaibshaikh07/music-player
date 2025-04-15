"use client";

import { Grid2x2, List } from "lucide-react";
import { Button } from "../ui/button";
import { useBasicStore } from "@/stores/basic";

const TitleView = ({
  title,
}: {
  title: string;
}): React.JSX.Element => {
  const { view, setView } = useBasicStore();

  return (
    <div className="flex items-center justify-between">
      <h1 className="px-4 font-medium text-lg">{title}</h1>
      {view === "list" ? (
        <Button
          className="px-4"
          variant="ghost"
          onClick={(): void => setView("grid")}
        >
          <Grid2x2 className="size-4" />
        </Button>
      ) : (
        <Button
          className="px-4"
          variant="ghost"
          onClick={(): void => setView("list")}
        >
          <List className="size-4" />
        </Button>
      )}
    </div>
  );
};
export default TitleView;
