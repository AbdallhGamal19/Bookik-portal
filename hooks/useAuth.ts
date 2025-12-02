import { useAppContext } from "@/context/appContext";

export const useAuth = () => {
  const { isAuthenticated, currentUser, login, logout } = useAppContext();

  return {
    isAuthenticated,
    currentUser,
    login,
    logout,
    isLoggedIn: isAuthenticated && !!currentUser,
  };
};
