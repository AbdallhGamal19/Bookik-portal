"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeInitializer = () => {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    // Check if it's National Day (September 23rd)
    const today = new Date();
    const isNationalDay = today.getMonth() === 8 && today.getDate() === 23; // Month is 0-indexed

    if (isNationalDay && !theme?.includes("national-day")) {
      // Set national day theme but only if user hasn't manually set a theme
      const savedTheme = localStorage.getItem("bookik-theme");
      if (!savedTheme || savedTheme === "system") {
        // Use setTimeout to avoid hydration issues
        setTimeout(() => {
          // Choose light or dark based on user's system preference
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          const nationalDayTheme = prefersDark
            ? "national-day-dark"
            : "national-day-light";
          setTheme(nationalDayTheme);
        }, 100);
      }
    }
  }, [setTheme, theme]);

  return null; // This component doesn't render anything
};

export default ThemeInitializer;
