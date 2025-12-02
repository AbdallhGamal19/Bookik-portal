"use client";

import { useAppContext } from "@/context/appContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiDatabase, FiHome, FiLogOut, FiSearch, FiUser } from "react-icons/fi";
import Button from "../../components/ui/Button";

const Footer = () => {
  const router = useRouter();
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

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Clear session
    sessionStorage.removeItem("token"); // Clear session
    openLoginModal(); // Open login modal instead of redirecting
  };
  if (!currentUser) return null;
  return (
    <div>
      <div className="fixed bottom-0 w-full border-t border-theme-border-primary py-2 flex justify-around bg-theme-bg-card text-theme-text-primary">
        <Link href="/Explorer" className="flex flex-col items-center">
          <FiHome size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="#" className="flex flex-col items-center">
          <FiSearch size={24} />
          <span className="text-xs">Company Details</span>
        </Link>
        {/* Center Floating Button */}
        <div className="bg-theme-bg-card w-[100px] h-[100px] absolute top-[-50px] rounded-full flex items-center justify-center border-2 border-theme-border-primary">
          <Link
            href="/Company-Statistics"
            className="flex flex-col items-center justify-center p-2 w-[70px] h-[70px] rounded-full bg-gradient-to-l from-theme-accent-primary to-theme-accent-secondary text-theme-text-inverse"
          >
            <FiDatabase size={24} />
            <span className="text-text8 text-theme-text-inverse">Company</span>
          </Link>
        </div>
        {/* User Profile Link */}
        {currentUser ? (
          <Link href="/profile" className="flex flex-col items-center">
            <FiUser size={24} />
            <span className="text-xs">{currentUser.name}</span>
          </Link>
        ) : (
          <button
            onClick={handleOpenLoginModal}
            className="flex flex-col items-center"
          >
            <FiUser size={24} />
            <span className="text-xs">Login</span>
          </button>
        )}
        {/* Logout Button */}
        {currentUser && (
          <Button
            variant="outline"
            onClick={handleLogout}
            icon={<FiLogOut size={24} />}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Footer;
