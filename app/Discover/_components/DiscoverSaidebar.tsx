"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoStar, IoGift, IoFlash, IoList } from "react-icons/io5";
import Image from "next/image";

// Add prop for consistent width
const DiscoverSaidebar = ({ sidebarWidth = "w-64" }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const menuToggleHandler = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <>
      {/* Mobile Toggle Button (Left Side) */}
      <span
        className="lg:hidden fixed top-4 left-4 z-50  text-global-text4 p-2 rounded-lg cursor-pointer"
        onClick={() => menuToggleHandler()}
      >
        {openMenu ? <IoMdClose size={24} /> : <FaEllipsisVertical size={24} />}
      </span>

      {/* Sidebar (Vertical Navigation on the Left) */}
      <aside
        className={`fixed top-0 left-0 h-full ${sidebarWidth} bg-CategoryDetails text-global-text4 shadow-md flex flex-col items-center p-6 border-r border-secondaryColor transition-transform duration-500 z-40 ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/Bookik.svg" alt="Bookik Icon" width={120} height={120} />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 w-full">
          <NavLink
            href="/Discover/top-Advertiser"
            text="أفضل البدعين"
            icon={<IoStar size={20} className="m-3" />}
            onClick={() => menuToggleHandler()}
            active={
              pathname === "/Discover/top-Advertiser" ||
              pathname === "/Discover"
            }
          />
          <NavLink
            href="/Discover/NewOffers"
            text="جديد العروض"
            icon={<IoGift size={20} className="m-3" />}
            active={pathname === "/Discover/NewOffers"}
            onClick={() => menuToggleHandler()}
          />
          <NavLink
            href="/Discover/FeaturedDeals"
            text="عروض مميزه"
            icon={<IoFlash size={20} className="m-3" />}
            active={pathname === "/Discover/FeaturedDeals"}
            onClick={() => menuToggleHandler()}
          />
          <NavLink
            href="/Discover/Categories"
            text="الاقسام"
            icon={<IoList size={20} className="m-3" />}
            active={pathname === "/Discover/Categories"}
            onClick={() => menuToggleHandler()}
          />
        </nav>
      </aside>
    </>
  );
};

// Reusable Link Component with Icon
const NavLink = ({
  href,
  text,
  icon,
  active,
  onClick,
}: {
  href: string;
  text: string;
  icon: JSX.Element;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 rounded-lg py-2 px-4 text-center transition duration-400 hover:bg-headerLinkBg w-full ${
        active ? "bg-headerLinkBg text-black" : "text-global-text4"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default DiscoverSaidebar;
