"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { useEffect, useMemo } from "react";

const CardAurora = ({
  children,
  className,
  colors,
}: {
  children: React.ReactNode;
  className?: string;
  colors: string[];
}): React.JSX.Element => {
  const COLORS = useMemo(() => colors.slice(0, 5), [colors]);
  const color = useMotionValue(COLORS[0]);

  const backgroundImage = useMotionTemplate`
  radial-gradient(100% 60% at var(--mouse-x, 10%) var(--mouse-y, 10%), ${color} 0%, hsl(var(--background)) 100%)
  `;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
    });
  }, [COLORS, color]);

  return (
    <motion.section
      className={cn(
        "relative mx-4 mb-8 w-full max-w-lg rounded-[26px] border border-border/60 bg-card p-6 shadow",
        className,
      )}
      style={{
        backgroundImage,
      }}
      onClick={(e): void => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onKeyDown={(e): void => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {children}
    </motion.section>
  );
};

export default CardAurora;
