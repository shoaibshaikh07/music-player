import type { Metadata } from "next";
import "./globals.css";
import { inconsolata, inter, montserrat } from "@/lib/font";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Soulplay - Music Player",
    absolute: "Soulplay - Music Player",
    template: "%s - Soulplay",
  },
  description:
    "Soulplay is a music player that allows you to listen to your favorite songs. Built with Next.js, Tailwind, Shadcn/ui for the Frontend UI Hackathon 2025 #2 by outlier.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${inconsolata.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <Navbar />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
