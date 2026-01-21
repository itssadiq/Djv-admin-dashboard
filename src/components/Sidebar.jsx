import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const getLinkClass = ({ isActive }) => {
    const baseClass =
      "group flex w-full items-center gap-4 rounded-lg px-4 py-3.5 text-sm font-medium transition-all border";
    const activeClass =
      "text-brand-green bg-slate-800 border-slate-700 shadow-sm";
    const inactiveClass =
      "text-slate-400 hover:text-white hover:bg-slate-800 border-transparent";

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <aside className="w-72 bg-brand-dark text-white flex flex-col shrink-0 z-30 shadow-2xl">
      <div className="h-20 flex items-center px-8 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight">
          Dejob<span className="text-brand-green">.</span>
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
        {/* 1. Dashboard Root (Note the 'end' prop for exact matching) */}
        <NavLink to="/dashboard" end className={getLinkClass}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path>
          </svg>
          Dashboard
        </NavLink>

        <div className="pt-6 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          Management
        </div>

        {/* 2. Nested Routes */}
        <NavLink to="/dashboard/post-job" className={getLinkClass}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Post a Job
        </NavLink>
        <NavLink to="/dashboard/manage-jobs" className={getLinkClass}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          Manage Jobs
        </NavLink>
        <NavLink to="/dashboard/applications" className={getLinkClass}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
          Applications
        </NavLink>
        <NavLink to="/dashboard/industries" className={getLinkClass}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            ></path>
          </svg>
          Industries
        </NavLink>
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold border border-slate-600">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
