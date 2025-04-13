"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import type { ILottie } from "@lottielab/lottie-player/react";

const Lottie = dynamic(() => import("@lottielab/lottie-player/react"), {
  ssr: true,
  loading: (): React.JSX.Element => {
    return <PlaceholderLottie />;
  },
});

const HeroLottie = (): React.JSX.Element => {
  const { systemTheme } = useTheme();
  const ref = React.useRef<ILottie>(null);

  return (
    <Lottie
      ref={ref}
      frame={100}
      loop
      onLoad={(): void => {
        if (ref.current) {
          ref.current.play();
        }
      }}
      preserveAspectRatio="xMidYMid meet"
      src={
        systemTheme === "dark"
          ? "https://cdn.lottielab.com/l/9rD29BPqsEAdUJ.json"
          : "https://cdn.lottielab.com/l/6Vi5j1t2DSMEEg.json"
      }
    />
  );
};

const PlaceholderLottie = (): React.JSX.Element => {
  return (
    <Image
      src="/placeholder/hero-lottie.jpg"
      alt="hero-lottie"
      width={450}
      height={300}
      className="mx-auto animate-pulse md:size-[300px] lg:size-[400px]"
    />
  );
};

export default HeroLottie;
