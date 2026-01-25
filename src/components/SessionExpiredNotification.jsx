// src/components/SessionExpiredNotification.jsx

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, logout } from "../features/authSlice";
import { supabase } from "../lib/config";

const SessionExpiredNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // Show notification only if user was authenticated and session is now invalid
      if (event === "SIGNED_OUT" && isAuthenticated) {
        setShowNotification(true);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [isAuthenticated]);

  const handleRedirect = () => {
    dispatch(logout());
    setShowNotification(false);
    navigate("/login", { replace: true });
  };

  if (!showNotification) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          maxWidth: "400px",
          width: "calc(100% - 32px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-slate-800 text-center mb-2">
          Session Expired
        </h3>
        <p className="text-sm text-slate-500 text-center mb-6">
          Your session has expired or was invalidated. Please log in again to
          continue.
        </p>

        {/* Action */}
        <button
          onClick={handleRedirect}
          className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-green hover:bg-brand-hover transition cursor-pointer"
        >
          Go to Login
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default SessionExpiredNotification;
