"use client";

import { fadeScale, slideInOutLeft, slideInOutRight } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

const LINKS = [
  {
    name: "Explore",
    href: "/explore",
  },
  {
    name: "Liked Musics",
    href: "/liked",
  },
];

const BottomNavigation = (): React.JSX.Element | null => {
  const pathname = usePathname();
  const router = useTransitionRouter();

  if (pathname === "/") return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto mb-4 flex w-max select-none items-center justify-center rounded-full border bg-background p-1 shadow-sm">
      {LINKS.map((link) => (
        <motion.div key={link.name} className="relative will-change-transform">
          {pathname === link.href && (
            <motion.div
              layoutId="navigation-active"
              className="absolute inset-0 rounded-full bg-accent"
            />
          )}
          <Button
            key={link.name}
            onClick={(): void => {
              router.push(link.href, {
                scroll: true,
                onTransitionReady:
                  link.href === "/liked"
                    ? slideInOutRight
                    : link.href === "/explore"
                      ? slideInOutLeft
                      : fadeScale,
              });
            }}
            className="relative"
          >
            {link.name}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

const Button = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}): React.JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("cursor-pointer px-4 py-2 text-sm", className)}
    >
      {children}
    </button>
  );
};

export default BottomNavigation;
