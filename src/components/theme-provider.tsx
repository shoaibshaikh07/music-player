"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>): React.JSX.Element {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
