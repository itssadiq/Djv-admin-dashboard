import React from "react";
import { useLogout } from "../hooks/useLogout";

const Header = ({ title }) => {
  const { logout, isLoading } = useLogout();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0 z-20">
      <div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <p className="text-xs text-slate-500 mt-1">
          Welcome back to your command center.
        </p>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-brand-green transition">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </button>
        <button
          className="text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer disabled:opacity-50"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </header>
  );
};

export default Header;
