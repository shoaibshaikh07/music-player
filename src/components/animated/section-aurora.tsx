"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { useEffect } from "react";

const COLORS = ["#d89883", "#98533d", "#f8ece8"];

const AuroraSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element => {
  const color = useMotionValue(COLORS[0]);

  const backgroundImage = useMotionTemplate`radial-gradient(78.44% 10.98% at 35.59% 4.81%, ${color} 0%, hsl(var(--background)) 100%)`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
    });
  }, [color]);

  return (
    <motion.section
      className={cn("", className)}
      style={{
        backgroundImage,
      }}
    >
      {children}
    </motion.section>
  );
};
export default AuroraSection;
