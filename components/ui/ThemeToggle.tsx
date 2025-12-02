"use client";

import { useTheme } from "next-themes";
import { FaSun, FaMoon, FaFlag } from "react-icons/fa";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug theme changes
  useEffect(() => {
    if (mounted) {
      console.log("Theme changed to:", theme);
      console.log("Resolved theme:", resolvedTheme);
      console.log(
        "Document data-theme:",
        document.documentElement.getAttribute("data-theme")
      );
    }
  }, [theme, resolvedTheme, mounted]);

  const themes = [
    { id: "light", name: "فاتح", icon: FaSun, color: "text-yellow-500" },
    { id: "dark", name: "داكن", icon: FaMoon, color: "text-blue-500" },
    // {
    //   id: "national-day-light",
    //   name: "اليوم الوطني فاتح",
    //   icon: FaFlag,
    //   color: "text-green-500",
    // },
    // {
    //   id: "national-day-dark",
    //   name: "اليوم الوطني غامق",
    //   icon: FaFlag,
    //   color: "text-green-600",
    // },
  ];

  const currentTheme = themes.find((t) => t.id === (theme || "light"));

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-24 h-10 bg-gray-200 rounded-bookik-rounded-lg animate-pulse" />
    );
  }

  const handleThemeChange = (newTheme: string) => {
    console.log("Changing theme to:", newTheme);
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded-bookik-rounded-lg bg-theme-bg-card border border-theme-border-primary text-theme-text-primary hover:bg-theme-bg-hover transition-all duration-200"
        title={`الثيم الحالي: ${currentTheme?.name}`}
      >
        {currentTheme && (
          <currentTheme.icon className={`text-xs ${currentTheme.color}`} />
        )}

        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-theme-bg-card border border-theme-border-primary rounded-bookik-rounded-lg shadow-theme-shadow-lg z-50">
          <div className="py-2">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => handleThemeChange(themeOption.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-theme-bg-hover transition-colors duration-200 ${
                  theme === themeOption.id
                    ? "bg-theme-accent-primary/10 text-theme-accent-primary"
                    : "text-theme-text-primary"
                }`}
              >
                <themeOption.icon className={`text-lg ${themeOption.color}`} />
                <span className="font-medium">{themeOption.name}</span>
                {theme === themeOption.id && (
                  <div className="ml-auto w-2 h-2 bg-theme-accent-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default ThemeToggle;
