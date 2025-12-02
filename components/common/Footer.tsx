"use client";
import { useAppContext } from "@/context/appContext";
import Link from "next/link.js";
import {
  FiHome,
  FiMessageCircle,
  FiPlusCircle,
  FiSearch,
  FiUser,
} from "react-icons/fi";

import { FooterProps } from "@/interface";

const Footer = ({ sidebarWidth = "w-64" }: FooterProps) => {
  const { openLoginModal, currentUser, setLastPage } = useAppContext();

  const handleOpenLoginModal = () => {
    // Store current page before opening login modal
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath !== "/login") {
        setLastPage(currentPath);
        sessionStorage.setItem("lastPage", currentPath);
      }
    }
    openLoginModal();
  };

  return (
    <div
      className={`w-full bg-theme-bg-card text-theme-text-primary h-16
                    fixed bottom-0 z-40 border-t border-theme-border-primary py-2
                    lg:h-full lg:static lg:border-t-0 lg:border-l lg:py-8 lg:${sidebarWidth}`}
    >
      <nav
        className="flex justify-around w-full 
                      lg:flex-col lg:items-center lg:gap-8 lg:mt-8"
      >
        <NavLink href="/Explorer" text="الرئيسية" icon={<FiHome size={24} />} />
        <NavLink
          href="/Discove"
          text="استكشف"
          icon={<FiSearch size={24} />}
          isButton
        />
        <div
          className="bg-theme-bg-tertiary w-[90px] h-[90px] rounded-bookik-rounded-full flex items-center justify-center 
                fixed bottom-14 right-1/2 translate-x-1/2 
                lg:hidden"
        >
          <NavLink
            href="https://gate.bookik.net/company-registration-form"
            text="انضم للمبدعين"
            icon={<FiPlusCircle size={28} />}
            className="flex flex-col items-center justify-center p-4
                        w-[80px] h-[80px] rounded-bookik-rounded-full 
                        bg-gradient-to-l from-theme-accent-primary to-theme-accent-secondary text-theme-text-inverse
                        text-text8 font-medium"
          />
        </div>
        <div className="hidden lg:flex items-center justify-center my-4">
          <NavLink
            href="https://gate.bookik.net/company-registration-form"
            text="انضم للمبدعين"
            icon={<FiPlusCircle size={24} />}
          />
        </div>
        <NavLink
          href="https://gate.bookik.net/survey/dc900a51-24b4-4094-b681-c71d95397e4c/988d0803-b61a-4c67-83c0-4bae25a35ed6"
          text="اطلب اعلانك"
          icon={<FiMessageCircle size={24} />}
        />
        {currentUser ? (
          <NavLink
            href={
              currentUser.is_company == 1 ? "/Company-Statistics" : "/profile"
            }
            text="بروفايلك"
            icon={<FiUser size={24} />}
          />
        ) : (
          <button
            onClick={handleOpenLoginModal}
            className="flex flex-col items-center justify-center"
          >
            <FiUser size={24} />
            <span className="text-xs mt-1 lg:text-sm lg:mt-2 text-center">
              بروفايلك
            </span>
          </button>
        )}
      </nav>
    </div>
  );
};

const NavLink = ({
  href,
  text,
  icon,
  isButton = false,
  className,
}: {
  href: string;
  text: string;
  icon: JSX.Element;
  isButton?: boolean;
  className?: string;
}) => {
  return isButton ? (
    <button className={`flex flex-col items-center ${className}`}>
      {icon}
      <span className="text-xs mt-1 lg:text-sm lg:mt-2">{text}</span>
    </button>
  ) : (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center ${className}`}
    >
      {icon}
      <span className="text-xs mt-1 lg:text-sm lg:mt-2 text-center">
        {text}
      </span>
    </Link>
  );
};

export default Footer;
