import { ExploreButton } from "@/components/buttons/explore";
import HeroLottie from "@/components/lottie/hero";
import ScribbleCurlyLine from "@/components/scribbles/curly-line";
import HeroCTA from "@/components/sections/hero-cta";
import AuroraSection from "@/components/animated/section-aurora";

export default function Home(): React.JSX.Element {
  return (
    <AuroraSection className="p-4">
      <main className="mx-auto flex min-h-svh max-w-xl animate-fade-in flex-col gap-4 md:mt-16 md:max-w-6xl">
        <div className="grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:px-8">
          <div className="mx-auto transition duration-300 md:size-[300px] lg:size-[400px]">
            <HeroLottie />
          </div>
          <div className="flex flex-col gap-6 md:order-first md:justify-around">
            <HeroCTA />
            <ExploreButton />
          </div>
          <ScribbleCurlyLine />
        </div>
      </main>
    </AuroraSection>
  );
}
