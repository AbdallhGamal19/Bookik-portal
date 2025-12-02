"use client";
import { useAppContext } from "@/context/appContext";
import Sidebar from "./Sidebar";

const SidebarWrapper = () => {
  const { isAuthenticated, currentUser } = useAppContext();

  // Create a key that changes when authentication state changes
  // This forces the Sidebar component to re-render
  const sidebarKey = `${
    isAuthenticated ? "authenticated" : "unauthenticated"
  }-${currentUser?.id || "no-user"}`;

  return <Sidebar key={sidebarKey} />;
};

export default SidebarWrapper;
