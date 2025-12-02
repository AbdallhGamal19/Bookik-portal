"use client";
import { useServerAuth } from "@/hooks/useServerAuth";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";
import LoginModalWrapper from "@/components/loginModal/LoginModalWrapper";
import { ToastContainer } from "react-toastify";

import { AppContentWrapperProps } from "@/interface";

const AppContentWrapper = ({ children }: AppContentWrapperProps) => {
  const { isLoading } = useServerAuth();

  // إذا كان التحميل جارٍ، لا نعرض أي شيء
  if (isLoading) {
    return null;
  }

  // إذا انتهى التحميل، اعرض كل المحتوى
  return (
    <>
      <div className="flex justify-between bg-theme-bg-primary">
        <SidebarWrapper />
        <div className="min-w-[90%] flex-1 bg-theme-bg-primary">
          {children}
          <ToastContainer
            toastClassName="bg-theme-bg-card text-theme-text-primary border border-theme-border-primary"
            progressClassName="bg-theme-accent-primary"
          />
        </div>
      </div>
      <LoginModalWrapper />
    </>
  );
};

export default AppContentWrapper;
