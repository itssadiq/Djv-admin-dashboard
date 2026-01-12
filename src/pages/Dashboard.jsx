import React from "react";

const Dashboard = () => {
  return (
    <section className="animate-fade-in space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Jobs
          </span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-800">1,248</span>
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
              +12%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 border-b-4 border-b-brand-green">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Active Jobs
          </span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-brand-green">856</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Inactive
          </span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-400">392</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Applicants
          </span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-800">12.5k</span>
            <svg
              className="w-5 h-5 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 h-96 flex items-center justify-center flex-col text-slate-300">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          ></path>
        </svg>
        <span className="text-sm font-medium">Analytics Chart Placeholder</span>
      </div>
    </section>
  );
};

export default Dashboard;
