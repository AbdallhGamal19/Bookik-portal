"use client";
import { useServerAuth } from "@/hooks/useServerAuth";
import Header from "../ui/Header";
import LoadingComponent from "@/components/ui/Loading";

const HeaderWrapper = () => {
  const { isAuthenticated, user, isLoading } = useServerAuth();

  // إذا كان التحميل جارٍ، اعرض loading فقط
  if (isLoading) {
    console.log("HeaderWrapper: Showing LoadingComponent");
    return <LoadingComponent />;
  }

  // Create a key that changes when authentication state changes
  // This forces the Header component to re-render
  const headerKey = `${isAuthenticated ? "authenticated" : "unauthenticated"}-${
    user?.id || "no-user"
  }`;

  return <Header key={headerKey} />;
};

export default HeaderWrapper;
