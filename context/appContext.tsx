"use client";
import { SimpleAuthService } from "@/services/simpleAuth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AppContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  // Authentication state
  isAuthenticated: boolean;
  currentUser: any | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  // Navigation tracking
  lastPage: string;
  setLastPage: (page: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [lastPage, setLastPage] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("lastPage") || "/";
    }
    return "/";
  });

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const updateLastPage = (page: string) => {
    setLastPage(page);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("lastPage", page);
    }
  };

  // Simple login function
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await SimpleAuthService.login({ email, password });

      if (response.success && response.user) {
        setIsAuthenticated(true);
        setCurrentUser(response.user);
        closeLoginModal();

        return { success: true };
      }

      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: "Login failed. Please try again." };
    }
  };

  // Simple logout function
  const logout = () => {
    SimpleAuthService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    closeLoginModal();

    // Redirect to home
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = SimpleAuthService.isAuthenticated();
      const user = SimpleAuthService.getCurrentUser();

      if (user) {
        // User found
      } else {
      }

      setIsAuthenticated(authenticated);
      setCurrentUser(user);
    };

    checkAuth();
  }, []);

  // Listen for storage changes (for cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_token" || e.key === "auth_user") {
        const authenticated = SimpleAuthService.isAuthenticated();
        const user = SimpleAuthService.getCurrentUser();

        setIsAuthenticated(authenticated);
        setCurrentUser(user);

        setIsAuthenticated(authenticated);
        setCurrentUser(user);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Track page changes for navigation after login/logout
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPage && currentPath !== "/login") {
        setLastPage(currentPath);
      }
    }
  }, [lastPage]);

  return (
    <AppContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isAuthenticated,
        currentUser,
        login,
        logout,
        lastPage,
        setLastPage: updateLastPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used inside AppProvider");
  return context;
};
