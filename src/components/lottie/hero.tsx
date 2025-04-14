"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import type { ILottie } from "@lottielab/lottie-player/react";

const Lottie = dynamic(() => import("@lottielab/lottie-player/react"), {
  ssr: false,
});

const HeroLottie = (): React.JSX.Element => {
  const { systemTheme } = useTheme();
  const ref = React.useRef<ILottie | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <>
      {!isLoaded && <PlaceholderLottie />}
      <Lottie
        ref={ref}
        frame={100}
        autoplay
        loop
        style={{ display: isLoaded ? "block" : "none" }}
        onLoad={(): void => {
          if (ref.current) {
            ref.current.play();
            setIsLoaded(true);
          }
        }}
        preserveAspectRatio="xMidYMid meet"
        src={
          systemTheme === "dark"
            ? "https://cdn.lottielab.com/l/9rD29BPqsEAdUJ.json"
            : "https://cdn.lottielab.com/l/6Vi5j1t2DSMEEg.json"
        }
      />
    </>
  );
};

const PlaceholderLottie = (): React.JSX.Element => {
  return (
    <Image
      src="/placeholder/hero-lottie.jpg"
      alt="hero-lottie"
      width={450}
      height={300}
      className="mx-auto animate-pulse md:size-[250px] lg:size-[400px]"
    />
  );
};

export default HeroLottie;
