import HeroLottie from "@/components/lottie/hero";
import ScribbleCurlyLine from "@/components/scribbles/curly-line";
import { Button } from "@/components/ui/button";
import HeroCTA from "@/components/sections/hero-cta";
import Link from "next/link";

export default function Home(): React.JSX.Element {
  return (
    <section className="bg-aurora-gradient p-4">
      <main className="mx-auto flex max-w-xl flex-col gap-4 md:max-w-6xl">
        <div className="grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:px-8">
          <div className="mx-auto transition duration-300 md:size-[300px] lg:size-[400px]">
            <HeroLottie />
          </div>
          <div className="flex flex-col gap-6 md:order-first md:justify-around">
            <HeroCTA />
            <Link href="/explore">
              <Button className="w-fit px-8">Explore</Button>
            </Link>
          </div>
          <ScribbleCurlyLine />
        </div>
        <div className="relative mx-auto p-6">
          <blockquote className="relative border-accent border-l-4 py-2 pr-2 pl-4 font-light text-lg italic leading-relaxed">
            &quot;Music speaks where words fall silent.&quot;{" "}
          </blockquote>
        </div>
      </main>
    </section>
  );
}
