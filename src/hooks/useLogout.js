import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/auth";

export function useLogout() {
  const navigate = useNavigate();
  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      // Force navigation even if logout fails
      navigate("/login", { replace: true });
    }
  };

  return { logout: handleLogout, isLoading };
}
