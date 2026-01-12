import React from "react";

const Industries = () => {
  return (
    <section className="animate-fade-in space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search industries..."
            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 h-10 text-sm text-slate-800 transition-all shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div>
          <button className="h-10 px-4 rounded-lg text-sm font-semibold text-white bg-brand-green hover:bg-brand-hover shadow-lg shadow-green-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>{" "}
            Add Industry
          </button>
        </div>
      </div>

      {/* Industries List */}
      <div className="grid grid-cols-1 gap-4">
        {/* Industry 1: Tech */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 transition-all hover:border-brand-green hover:shadow-md hover:-translate-y-px flex flex-col md:flex-row items-center justify-between gap-6 group">
          <div className="w-full md:w-1/2">
            <h4 className="text-base font-bold text-slate-800 group-hover:text-brand-green transition">
              Technology & SaaS
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Software, IT, and Cloud Services
            </p>
          </div>

          <div className="flex items-center justify-between w-full md:w-1/2 gap-8 px-4">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Active Jobs
              </span>
              <span className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 mt-1">
                12 Openings
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Applications
              </span>
              <p className="text-xl font-bold text-slate-800">1,204</p>
            </div>
          </div>
        </div>

        {/* Industry 2: Finance */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 transition-all hover:border-brand-green hover:shadow-md hover:-translate-y-px flex flex-col md:flex-row items-center justify-between gap-6 group">
          <div className="w-full md:w-1/2">
            <h4 className="text-base font-bold text-slate-800 group-hover:text-brand-green transition">
              Finance & Fintech
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Banking, Investment, Crypto
            </p>
          </div>

          <div className="flex items-center justify-between w-full md:w-1/2 gap-8 px-4">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Active Jobs
              </span>
              <span className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 mt-1">
                5 Openings
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Applications
              </span>
              <p className="text-xl font-bold text-slate-800">842</p>
            </div>
          </div>
        </div>

        {/* Industry 3: Healthcare */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 transition-all hover:border-brand-green hover:shadow-md hover:-translate-y-px flex flex-col md:flex-row items-center justify-between gap-6 group">
          <div className="w-full md:w-1/2">
            <h4 className="text-base font-bold text-slate-800 group-hover:text-brand-green transition">
              Healthcare
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Medical, Hospitals, Care
            </p>
          </div>

          <div className="flex items-center justify-between w-full md:w-1/2 gap-8 px-4">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Active Jobs
              </span>
              <span className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 mt-1">
                3 Openings
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Applications
              </span>
              <p className="text-xl font-bold text-slate-800">320</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
