"use client";
import { useAppContext } from "@/context/appContext";
import React, { useEffect, useRef } from "react";
import LoginModal from "./LoginModal";

const LoginModalWrapper: React.FC = () => {
  const { isLoginModalOpen, openLoginModal, closeLoginModal, setLastPage } =
    useAppContext();
  const failedRequestRef = useRef<any>(null);

  useEffect(() => {
    const handleShowLoginModal = (event: CustomEvent) => {
      // Store the failed request details if available
      if (event.detail && event.detail.request) {
        failedRequestRef.current = event.detail.request;
      }

      // Store current page before opening login modal
      const currentPath = window.location.pathname;
      if (currentPath !== "/login") {
        sessionStorage.setItem("lastPage", currentPath);
        setLastPage(currentPath);
      }

      openLoginModal();
    };

    // Listen for custom event from axios interceptor
    window.addEventListener(
      "showLoginModal",
      handleShowLoginModal as EventListener
    );

    return () => {
      window.removeEventListener(
        "showLoginModal",
        handleShowLoginModal as EventListener
      );
    };
  }, [openLoginModal, setLastPage]);

  const handleLoginSuccess = async () => {
    // Handle successful login

    // For now, we'll just log the failed request instead of retrying
    if (failedRequestRef.current) {
      console.log(
        "Failed request details (not retrying):",
        failedRequestRef.current
      );
      // Clear the failed request reference
      failedRequestRef.current = null;
    }
  };

  return (
    <LoginModal
      isOpen={isLoginModalOpen}
      onClose={closeLoginModal}
      onLoginSuccess={handleLoginSuccess}
    />
  );
};

export default LoginModalWrapper;
