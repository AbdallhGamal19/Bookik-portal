"use client";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

import { AuthGuardProps } from "@/interface";

const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-bookik-rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">يرجى تسجيل الدخول للوصول لهذه الصفحة</p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
