"use client";

import { useEffect, useState } from "react";
import LoadingComponent from "@/components/ui/Loading";

import { ServerAuthData } from "@/interface";

export const useServerAuth = (): ServerAuthData => {
  const [authData, setAuthData] = useState<ServerAuthData>(() => {
    // دائماً نبدأ بـ loading: true لإظهار صفحة loading
    return {
      isAuthenticated: false,
      user: null,
      isLoading: true, // دائماً يبدأ بـ true
    };
  });

  useEffect(() => {
    const checkServerAuth = async () => {
      try {
        // أولاً: قراءة البيانات من localStorage
        const token = localStorage.getItem("auth_token");
        const userStr = localStorage.getItem("auth_user");

        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);

            setAuthData({
              isAuthenticated: true,
              user: {
                id: user.id || "",
                name: user.name || "",
                email: user.email || "",
              },
              isLoading: false,
            });
            return; // خروج مبكر إذا وجدنا بيانات
          } catch (error) {}
        }

        // ثانياً: محاولة الوصول للـ API
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          setAuthData({
            isAuthenticated: data.isAuthenticated,
            user: data.user,
            isLoading: false,
          });
        } else {
          // إذا فشل API، نستخدم البيانات الموجودة في state

          setAuthData((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        // في حالة الخطأ، نستخدم البيانات الموجودة في state

        setAuthData((prev) => ({ ...prev, isLoading: false }));
      }
    };

    // تأخير بسيط لإظهار loading
    const timer = setTimeout(() => {
      checkServerAuth();
    }, 2000); // زيادة التأخير إلى 2 ثانية

    return () => clearTimeout(timer);
  }, []);

  return authData;
};

// Hook لعرض loading component
export const useAuthWithLoading = () => {
  const authData = useServerAuth();

  if (authData.isLoading) {
    return { Component: LoadingComponent, ...authData };
  }

  return { Component: null, ...authData };
};
