// src/hooks/useLogout.js

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../features/authSlice";
import { supabase } from "../lib/config";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = useCallback(async () => {
    // Clear Redux state first
    dispatch(logoutAction());

    // Try to sign out from Supabase (ignore errors - session might already be gone)
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.log("Supabase signout:", error.message);
    }

    // Always redirect to login
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return { logout };
}
