"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

import { ThemeProviderProps } from "@/interface";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
      themes={["light", "dark", "national-day-light", "national-day-dark"]}
      storageKey="bookik-theme"
      enableColorScheme={false}
      forcedTheme={undefined}
    >
      {children}
    </NextThemesProvider>
  );
};
