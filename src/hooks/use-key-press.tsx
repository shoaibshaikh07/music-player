"use client";

import { useEffect } from "react";

export function useKeyPress(
  targetKeys: string | string[],
  callback: (event: KeyboardEvent) => void,
): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (Array.isArray(targetKeys)) {
        if (targetKeys.includes(event.key)) {
          callback(event);
        }
      } else if (event.key === targetKeys) {
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return (): void => window.removeEventListener("keydown", handleKeyDown);
  }, [targetKeys, callback]);
}
