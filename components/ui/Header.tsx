"use client";
import SearchView from "@/components/ui/SearchView";
import { useAppContext } from "@/context/appContext";
import ThemeToggle from "@/components/ui/ThemeToggle";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FiLogOut, FiMessageCircle, FiShoppingCart, FiX } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiRobot3Fill } from "react-icons/ri";
import Button from "./Button";
import CartDrawer from "./CartDrawer";

const Header: React.FC<any> = ({ className = "", username }: any) => {
  const [searchValue, setSearchValue] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const handleCartClick = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);
  const {
    setIsMenuOpen,
    isMenuOpen,
    openLoginModal,
    currentUser,
    isAuthenticated,
    logout,
    setLastPage,
  } = useAppContext();
  const pathname = usePathname();

  const handleSearch = (value: string) => {};

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleLogout = () => {
    logout();
  };

  const handleOpenLoginModal = () => {
    // Store current page before opening login modal
    if (pathname && pathname !== "/login") {
      setLastPage(pathname);
      sessionStorage.setItem("lastPage", pathname);
    }
    openLoginModal();
  };

  // Track page changes for navigation after login/logout
  useEffect(() => {
    if (pathname && pathname !== "/login") {
      setLastPage(pathname);
      sessionStorage.setItem("lastPage", pathname);
    }
  }, [pathname, setLastPage]);

  return (
    <div
    // className={`${
    //   pathname === "/profile" || pathname === "/Explorer" ? "block" : "hidden"
    // }`}
    >
      <div className={`h-[108px] md:h-[72px] bg-theme-bg-primary`} />
      <header
        className={`
      w-full  
      shadow-theme-shadow-md 
      p-2
      sm:p-4
      flex
      flex-col
      justify-between
      fixed
      top-0
      z-50
      bg-theme-bg-card 
      ${className}
    `
          .trim()
          .replace(/\s+/g, " ")}
      >
        <div className="flex items-center justify-between gap-bookik-gap-sm sm:gap-bookik-gap-md md:gap-bookik-gap-lg lg:gap-bookik-gap-xl">
          {/* Mobile Menu Button */}

          {/* User Section */}

          <div className="flex items-center justify-between gap-bookik-gap-sm">
            <button
              className="block md:hidden p-2"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX size={16} className="text-theme-text-secondary" />
              ) : (
                <FaEllipsisVertical
                  size={16}
                  className="text-theme-text-secondary"
                />
              )}
            </button>
            {isAuthenticated && currentUser ? (
              <>
                <div className="relative overflow-hidden w-[25px] sm:w-[36px] md:w-[40px] h-[25px] sm:h-[36px] md:h-[40px] bg-theme-bg-tertiary rounded-bookik-rounded-full">
                  <Link href={"/profile"}>
                    <Image
                      src={
                        currentUser.avatar || currentUser.image
                          ? `${process.env.NEXT_PUBLIC_WEB_URL}/images/user/${
                              currentUser.image || currentUser.avatar
                            }`
                          : "/testImages/test.jpeg"
                      }
                      alt="User Profile"
                      fill
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-theme-text-primary">
                    {currentUser.name || username || "احمد محمد"}
                  </p>
                </div>
                <div className=" flex items-center  gap-bookik-gap-lg ">
                  <ThemeToggle />
                  <IoNotificationsOutline
                    className="cursor-pointer text-theme-text-primary"
                    title="الإشعارات"
                  />
                  <FiMessageCircle
                    className="cursor-pointer text-theme-text-primary"
                    title="الرسائل"
                  />
                  <FiShoppingCart
                    className="cursor-pointer text-theme-text-primary"
                    title="سلة المشتريات"
                    onClick={handleCartClick}
                  />
                  <FiLogOut
                    className="cursor-pointer text-theme-text-primary transform scale-x-[-1]"
                    onClick={handleLogout}
                  />
                </div>
              </>
            ) : (
              <>
                <Button
                  size="xs"
                  className="text-[12px] whitespace-nowrap"
                  onClick={handleOpenLoginModal}
                >
                  تسجيل الدخول
                </Button>

                <button
                  className="text-[12px] underline text-theme-text-secondary hover:text-theme-text-primary"
                  onClick={handleOpenLoginModal}
                >
                  ليس لدى حساب
                </button>
                <ThemeToggle />
                {/* <IoNotificationsOutline
                  className="cursor-pointer text-theme-text-primary"
                  title="الإشعارات"
                  size={24}
                />
                <FiShoppingCart
                  className="cursor-pointer text-theme-text-primary"
                  title="سلة المشتريات"
                  size={24}
                  onClick={handleCartClick}
                /> */}
              </>
            )}

            {/* CartDrawer - Always rendered for both authenticated and non-authenticated users */}
            <CartDrawer open={cartOpen} onClose={handleCartClose} />
          </div>

          {/* Search - Hidden on mobile, visible on larger screens */}
          <div className="hidden sm:flex flex-1 max-w-[50%] ">
            <SearchView
              placeholder="...Search with AI Booky"
              value={searchValue}
              onChange={handleSearchChange}
              onSearch={handleSearch}
              leftIcon={
                <RiRobot3Fill size={24} className="text-theme-text-primary" />
              }
              // className="w-[70%] m-auto"
            />
          </div>
          {/* Logo */}
          <Link
            href="/"
            className=" relative w-[70px] md:w-[120px] lg:w-[150px] h-[20px] md:h-[35px] lg:h-[40px]"
          >
            <Image src="/Bookik.svg" alt="Bookik Logo" fill className="" />
          </Link>
        </div>

        {/* Mobile Search - Shown when menu is open */}
        <div
          className={`
          mt-4 
          pb-2 
          sm:hidden
         
        `}
        >
          <SearchView
            placeholder="...Search with AI Booky"
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            leftIcon={
              <RiRobot3Fill size={20} className="text-theme-text-primary" />
            }
            className="w-full"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
