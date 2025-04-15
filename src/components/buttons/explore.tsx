"use client";

import { Button } from "@/components/ui/button";
import { fadeScale } from "@/lib/animation";
import { ArrowRight } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";

export const ExploreButton = (): React.JSX.Element => {
  const router = useTransitionRouter();

  return (
    <Button
      className="w-fit animate-fade-in-bottom"
      onClick={(e): void => {
        e.preventDefault();
        router.push("/explore", {
          onTransitionReady: fadeScale,
        });
      }}
    >
      Explore{" "}
      <span>
        <ArrowRight />
      </span>
    </Button>
  );
};
