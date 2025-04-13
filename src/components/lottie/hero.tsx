"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import Image from "next/image";

const Lottie = dynamic(() => import("@lottielab/lottie-player/react"), {
  ssr: false,
  loading: (): React.JSX.Element => {
    return <PlaceholderLottie />;
  },
});

const HeroLottie = (): React.JSX.Element => {
  const { systemTheme } = useTheme();

  return (
    <Lottie
      frame={100}
      autoplay
      loop
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
