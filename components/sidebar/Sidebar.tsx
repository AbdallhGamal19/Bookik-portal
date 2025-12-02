"use client";
import { useAppContext } from "@/context/appContext";
import { usePathname } from "next/navigation";
import { CiBullhorn, CiStar } from "react-icons/ci";
import { FaUser } from "react-icons/fa6";
import {
  FiHome,
  FiLayers,
  FiMenu,
  FiUsers,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { PiVibrateBold } from "react-icons/pi";
import { TbBuildings } from "react-icons/tb";
import SidebarLink from "../ui/SidebarLink";
import { AiOutlineMessage } from "react-icons/ai";
import { IoGiftOutline, IoPersonOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

import { SidebarProps } from "@/interface";

const Sidebar = ({ className = "w-bookik-w-3xl" }: SidebarProps) => {
  const { isMenuOpen, setIsMenuOpen, currentUser, isAuthenticated } =
    useAppContext();
  const pathname = usePathname();
  const icon_size = 20;
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const sidebarRef = useRef<any>(null);

  const toggleDiscover = () => {
    setIsDiscoverOpen(!isDiscoverOpen);
  };

  // Close sidebar on outside click (mobile/tablet)
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: any) => {
      if (!sidebarRef.current) return;
      if (sidebarRef.current.contains(e.target)) return;
      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, setIsMenuOpen]);

  // Close when resizing to desktop widths
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <>
      <div
        className={`bg-theme-bg-card md:sticky rounded-tl-bookik-rounded-2xl md:-ms-[calc(238px/4)*3] transition-all duration-300 md:hover:ms-0 py-6 hover:px-4  ${" top-[96px]  md:h-[calc(100vh-96px)] h-[calc(100vh-107px)]"} `}
        dir="rtl"
      >
        <div
          ref={sidebarRef}
          className={`fixed md:sticky bg-theme-bg-card rounded-bookik-rounded-2xl transition-all duration-300 text-theme-text-primary z-40 px-4 py-6 md:p-0 ${className} ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 md:translate-x-0 md:opacity-100"
          }`}
        >
          <nav className="flex flex-col space-y-4">
            <SidebarLink
              href="/Explorer"
              icon={<FiHome size={icon_size} />}
              text="الرئيسية"
              active={pathname == "/Explorer"}
            />

            {/* Discover Dropdown */}
            <div className="relative">
              <div
                onClick={toggleDiscover}
                className={`w-full flex items-center justify-between px-5 py-3 rounded-bookik-rounded-lg transition-colors duration-200 hover:bg-theme-bg-hover cursor-pointer `}
              >
                <div className="flex items-center gap-bookik-gap-md">
                  <span className="text-text5 font-bold text-theme-text-primary">
                    استكشف
                  </span>
                  <FiChevronDown
                    size={16}
                    className={`transition-transform duration-300 text-theme-text-secondary w-1/4 flex justify-center items-center ${
                      isDiscoverOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <PiVibrateBold
                  size={icon_size}
                  className="text-theme-text-secondary"
                />
              </div>

              {/* Dropdown Menu with smooth transition */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isDiscoverOpen
                    ? "max-h-64 opacity-100 mt-2 pointer-events-auto visible"
                    : "max-h-0 opacity-0 mt-0 pointer-events-none invisible"
                }`}
              >
                <div className="mr-4 space-y-1">
                  <SidebarLink
                    href="/Discover/top-Advertiser"
                    icon={<FiUsers size={icon_size} />}
                    text="أفضل المبدعين"
                    active={pathname == "/Discover/top-Advertiser"}
                  />
                  <SidebarLink
                    href="/Discover/NewOffers"
                    icon={<IoGiftOutline size={icon_size} />}
                    text="جديد العروض"
                    active={pathname == "/Discover/NewOffers"}
                  />
                  <SidebarLink
                    href="/Discover/FeaturedDeals"
                    icon={<CiStar size={icon_size} />}
                    text="العروض المميزة"
                    active={pathname == "/Discover/FeaturedDeals"}
                  />
                  <SidebarLink
                    href="/Discover/Categories"
                    icon={<FiLayers size={icon_size} />}
                    text="الأقسام"
                    active={pathname == "/Discover/Categories"}
                  />
                </div>
              </div>
            </div>

            {/* <SidebarLink
              href="/messaging"
              icon={<AiOutlineMessage size={icon_size} />}
              text="آمر تدلل"
              active={pathname == "/messaging"}
            /> */}
            <SidebarLink
              href="/join-creators"
              icon={<FiUsers size={icon_size} />}
              text="انضم للمبدعين"
              active={pathname == "/join-creators"}
            />
            {/* {currentUser?.is_company == 1 && (
              <SidebarLink
                href="/Company-Statistics"
                icon={<TbBuildings size={icon_size} />}
                text="قسم الشركات"
                active={pathname == "/Company-Statistics"}
              />
            )} */}

            {isAuthenticated && (
              <SidebarLink
                href="/profile"
                icon={<IoPersonOutline size={icon_size} />}
                text="الملف الشخصي"
                active={pathname == "/profile"}
              />
            )}
            {/* {user ? (
              <SidebarLink
                href={user.is_company == 1 ? "/Company-Statistics" : "/profile"}
                icon={<FaUser />}
                text={user.name}
                active={pathname == "/Company-Statistics"}
              />
            ) : (
              <SidebarLink
                href="/login"
                icon={<FaUser />}
                text="تسجيل الدخول"
                active={pathname == "/login"}
              />
            )} */}
            <SidebarLink
              href="https://gate.bookik.net/survey/dc900a51-24b4-4094-b681-c71d95397e4c/988d0803-b61a-4c67-83c0-4bae25a35ed6"
              icon={<CiBullhorn size={icon_size} />}
              text="اطلب اعلانك"
            />
            {/* <SidebarLink
              href={
                "/profile"
                user
                  ? user.is_company == 1
                    ? "/Company-Statistics"
                    : "/profile"
              }
              icon={<FaUser />}
              text="بروفايلك"
              active={pathname == "/profile"}
            /> */}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
