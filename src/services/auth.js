import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // Login mutation
    // In the login mutation, add console logs:
    login: builder.mutation({
      async queryFn({ email, password }) {
        try {
          // Step 1: Sign in with Supabase Auth
          const { data: authData, error: authError } =
            await supabase.auth.signInWithPassword({
              email,
              password,
            });

          if (authError) {
            console.log("Auth Error");
            return {
              error: {
                message: authError.message,
                status: "AUTH_ERROR",
              },
            };
          }

          const userId = authData.user.id;

          // Step 2: Check if user exists in admins table
          const { data: adminData, error: adminError } = await supabase
            .from("admins")
            .select("*")
            .eq("UUID", userId); // Check column name!

          if (adminError) {
            console.log("❌ Admin table query error:", adminError);
            await supabase.auth.signOut();
            return {
              error: {
                message: "Database error: " + adminError.message,
                status: "UNAUTHORIZED",
              },
            };
          }

          if (!adminData || adminData.length === 0) {
            console.log(
              "❌ You don't have permission to access the admin dashboard.",
            );
            await supabase.auth.signOut();
            return {
              error: {
                message: "Unauthorized: You don't have admin access.",
                status: "UNAUTHORIZED",
              },
            };
          }

          // Step 3: Return user data
          return {
            data: {
              user: {
                id: authData.user.id,
                email: authData.user.email,
                accessToken: authData.session.access_token,
              },
            },
          };
        } catch (error) {
          console.log("Unexpected error:", error);
          return {
            error: {
              message: error.message || "An unexpected error occurred",
              status: "UNKNOWN_ERROR",
            },
          };
        }
      },
    }),

    // Logout mutation
    logout: builder.mutation({
      async queryFn() {
        try {
          const { error } = await supabase.auth.signOut();

          if (error) {
            return { error: { message: error.message } };
          }

          return { data: { success: true } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),

    // Get current session (for persistence)
    getSession: builder.query({
      async queryFn() {
        try {
          const { data: sessionData, error: sessionError } =
            await supabase.auth.getSession();

          if (sessionError || !sessionData.session) {
            return { error: { message: "No active session" } };
          }

          const userId = sessionData.session.user.id;

          // Verify admin status
          const { data: adminData, error: adminError } = await supabase
            .from("admins")
            .select("*")
            .eq("UUID", userId)
            .single();

          if (adminError || !adminData) {
            await supabase.auth.signOut();
            return { error: { message: "Not an admin" } };
          }

          return {
            data: {
              user: {
                id: sessionData.session.user.id,
                email: sessionData.session.user.email,
                accessToken: sessionData.session.access_token,
              },
            },
          };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetSessionQuery } =
  authApi;
