import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../lib/config";
import { setCredentials, logout, setLoading } from "../features/authSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          // Verify admin status
          const { data: adminData } = await supabase
            .from("admins")
            .select("*")
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
        dispatch(setLoading(false));
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_OUT") {
        dispatch(logout());
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  return children;
}

export default AuthInitializer;
