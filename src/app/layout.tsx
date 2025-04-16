import type { Metadata } from "next";
import "./globals.css";
import { inconsolata, inter, montserrat } from "@/lib/font";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { ViewTransitions } from "next-view-transitions";
import BottomNavigation from "@/components/bottom-navigation";
import { Analytics } from "@vercel/analytics/react";
import { Constant } from "@/lib/constant";

export const metadata: Metadata = {
  title: {
    default: "Soulplay - Music Player",
    absolute: "Soulplay - Music Player",
    template: "%s - Soulplay",
  },
  description:
    "Soulplay is a beautifully crafted music player featuring a sleek interface, smooth animations, and soothing color palette. Immerse yourself in your favorite tunes with this modern and intuitive music experience.",
  applicationName: "Soulplay",
  abstract:
    "Soulplay is a beautifully crafted music player featuring a sleek interface, smooth animations, and soothing color palette. Immerse yourself in your favorite tunes with this modern and intuitive music experience",
  creator: "Shoaib Shaikh",
  metadataBase: new URL(Constant.PRODUCTION_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: Constant.PRODUCTION_URL,
    title: "Soulplay - Music Player",
    description:
      "Soulplay is a beautifully crafted music player featuring a sleek interface, smooth animations, and soothing color palette. Immerse yourself in your favorite tunes with this modern and intuitive music experience",
    images: [
      {
        url: `${Constant.PRODUCTION_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Soulplay - Music Player",
      },
    ],
  },
  alternates: {
    canonical: `${Constant.PRODUCTION_URL}`,
  },
  authors: [
    {
      name: "Shoaib Shaikh",
      url: "https://shoaibshaikh.in",
    },
  ],
  icons: {
    icon: `${Constant.PRODUCTION_URL}/logo.png`,
    shortcut: `${Constant.PRODUCTION_URL}/logo.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </head>
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
            <Analytics />
            <Toaster />
            <BottomNavigation />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
