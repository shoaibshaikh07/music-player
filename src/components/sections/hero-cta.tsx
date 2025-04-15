"use client";

import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"; // assuming you have framer-motion installed

const TEXT_SIZES = {
  base: "text-5xl", // simplified text sizes
  md: "md:text-6xl",
  lg: "lg:text-7xl",
};

const GradientText = ({
  children,
}: { children: React.ReactNode }): React.JSX.Element => (
  <span className="bg-gradient-to-br from-slate-900 to-slate-500 bg-clip-text text-4xl text-transparent xs:text-5xl md:text-4xl lg:text-5xl dark:from-slate-50 dark:to-slate-300">
    {children}
  </span>
);

const FloatingIcon = ({
  children,
}: { children: React.ReactNode }): React.JSX.Element => (
  <motion.span
    className="inline-flex text-accent will-change-transform"
    animate={{
      y: [-5, 5, -5],
      rotate: [-5, 5, -5],
    }}
    transition={{
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.span>
);

export default function HeroCTA(): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "flex flex-col items-start gap-4 will-change-transform",
        "font-black font-heading",
        "tracking-tight",
        Object.values(TEXT_SIZES).join(" "),
      )}
    >
      <div className="flex flex-col">
        <span className="mb-1 font-normal text-base xs:text-lg">
          Experience the Magic of
        </span>
        <GradientText>Music in Motion</GradientText>
      </div>

      <div className="flex items-center gap-0 xs:gap-2">
        <blockquote className="relative animate-fade-in-scale border-accent border-l-4 py-2 pr-2 pl-4 font-medium text-base italic leading-relaxed tracking-normal md:p-0 md:pl-2 md:text-sm lg:py-2 lg:pr-2 lg:pl-4 lg:text-lg">
          &quot;Music connects souls eternally.&quot;
        </blockquote>
        <FloatingIcon>
          <MusicNoteIcon
            fontSize="large"
            className="text-slate-900 dark:text-slate-100"
          />
        </FloatingIcon>
        <FloatingIcon>
          <FavoriteIcon fontSize="large" className="text-red-500" />
        </FloatingIcon>
      </div>

      <p className="mt-2 hidden max-w-xl font-medium text-muted-foreground tracking-normal md:block md:text-xs lg:text-base ">
        Discover, play, and immerse yourself in a world where every beat tells a
        story and every melody creates a moment.
      </p>
    </motion.div>
  );
}
