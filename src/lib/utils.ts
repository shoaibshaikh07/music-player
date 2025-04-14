import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getAudioUrl(id: string | null): string {
  return `https://x1u0.a1.e2-8.dev/hackathon/${id || "1d420f6e-d4d0-4915-99af-63e3a8136530"}.mp3`;
}
