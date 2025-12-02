import type { Metadata } from "next";
import "../globals.css"; // Make sure to import global styles
import Sidebar from "../../components/sidebar/Sidebar";
import DiscoverSidbar from "../../components/ui/DiscoverSidbar";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "Company statistics - BOOKIK | بوكك",
  description: "company statistics",
  icons: {
    icon: "/SmallTr.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full justify-center items-center">
      {children}
      <Footer />
    </div>
  );
}
