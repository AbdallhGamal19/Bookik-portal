import HeaderWrapper from "@/components/common/HeaderWrapper";
import AppContentWrapper from "@/components/common/AppContentWrapper";
import { AppProvider } from "@/context/appContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import ThemeInitializer from "@/components/ui/ThemeInitializer";

import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Profile - BOOKIK | بوكك",
  description:
    "Explore Bookik for the best offers and deals, find the best deals and offers in your area",
  icons: {
    icon: "/SmallTr.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      dir="rtl"
      className={`${cairo.variable} bg-theme-bg-primary overflow-x-scroll`}
      suppressHydrationWarning
    >
      <body className="font-cairo bg-theme-bg-primary">
        <AppProvider>
          <ThemeProvider>
            <ThemeInitializer />
            <HeaderWrapper />
            <AppContentWrapper>{children}</AppContentWrapper>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
