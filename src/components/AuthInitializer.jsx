// src/components/AuthInitializer.jsx

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../lib/config";
import { setCredentials, logout, setLoading } from "../features/authSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial session check on app load
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          // Verify admin status
          const { data: adminData } = await supabase
            .from("admins")
            .select("UUID")
            .eq("UUID", session.user.id)
            .single();

          if (adminData) {
            dispatch(
              setCredentials({
                id: session.user.id,
                email: session.user.email,
                accessToken: session.access_token,
              }),
            );
          } else {
            await supabase.auth.signOut();
            dispatch(logout());
          }
        } else {
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        dispatch(setLoading(false));
      }
    };

    initializeAuth();

    // Listen for auth state changes (handles session expiry, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        dispatch(logout());
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        // Verify admin status
        const { data: adminData } = await supabase
          .from("admins")
          .select("UUID")
          .eq("UUID", session.user.id)
          .single();

        if (adminData) {
          dispatch(
            setCredentials({
              id: session.user.id,
              email: session.user.email,
              accessToken: session.access_token,
            }),
          );
        } else {
          await supabase.auth.signOut();
          dispatch(logout());
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  return children;
}

export default AuthInitializer;
