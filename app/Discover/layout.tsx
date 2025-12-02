import type { Metadata } from "next";
import "../globals.css"; // Import global styles
import Footer from "../../components/common/Footer";
import DiscoverSaidebar from "./_components/DiscoverSaidebar";

export const metadata: Metadata = {
  title: "Discover - BOOKIK | بوكك",
  description:
    "Discover users | جديد العروض | المبدعين المميزين | اقسام العروض",
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
  // Define consistent width for both sidebars
  const sidebarWidth = "w-64";

  return (
    <div lang="ar" dir="rtl" className="">
      {/* <DiscoverSaidebar sidebarWidth={sidebarWidth} /> */}
      {/* lg:ml-64 */}
      <div className=" md:py-6  ">
        <main className="full-height-minus-header hide-scrollbar overflow-y-auto ">
          {children}
        </main>

        {/* <div className="lg:hidden">
          <Footer />
        </div> */}
      </div>
      {/* <div
        className={`hidden lg:block lg:fixed lg:right-0 lg:top-0 lg:h-full ${sidebarWidth} lg:border-l lg:border-text-neutral-300`}
      >
        <Footer sidebarWidth={sidebarWidth} />
      </div> */}
    </div>
  );
}
