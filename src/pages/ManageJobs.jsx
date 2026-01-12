import React from "react";

const ManageJobs = () => {
  const selectClass =
    "w-full bg-white border border-slate-300 rounded-lg px-4 h-12 text-sm text-slate-800 transition-all shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none appearance-none bg-select-arrow bg-[length:1.5em_1.5em] bg-no-repeat bg-[right_0.75rem_center] cursor-pointer";

  return (
    <section className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative md:col-span-1">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 h-12 text-sm text-slate-800 transition-all shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none"
          />
          <svg
            className="absolute left-3 top-3.5 w-5 h-5 text-slate-400"
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
        <select className={selectClass}>
          <option>All Companies</option>
          <option>Dejob Inc.</option>
          <option>Zalando</option>
        </select>
        <select className={selectClass}>
          <option>All Industries</option>
          <option>Technology</option>
          <option>Finance</option>
        </select>
        <select className={selectClass}>
          <option>All Statuses</option>
          <option>Active</option>
          <option>Closed</option>
        </select>
        <select className={selectClass}>
          <option>All Types</option>
          <option>Full-time</option>
          <option>Contract</option>
        </select>
      </div>

      <div className="space-y-4 pt-2">
        {/* Active Job 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-px flex flex-col md:flex-row items-center justify-between gap-6 group">
          <div className="flex items-center gap-5 w-full md:w-1/3">
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200">
              Z
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800 group-hover:text-brand-green transition">
                Product Designer
              </h4>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">
                Zalando • Berlin
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full md:w-2/3">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Type
              </span>
              <span className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                Full-time
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Status
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-none bg-green-100 text-green-800 border border-green-200">
                Active
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Applicants
              </span>
              <span className="text-lg font-bold text-slate-800">48</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition">
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              </button>
              <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition">
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Active Job 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-px flex flex-col md:flex-row items-center justify-between gap-6 group">
          <div className="flex items-center gap-5 w-full md:w-1/3">
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200">
              N
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800 group-hover:text-brand-green transition">
                Frontend Developer
              </h4>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">
                N26 • Remote
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full md:w-2/3">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Type
              </span>
              <span className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                Contract
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Status
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-none bg-green-100 text-green-800 border border-green-200">
                Active
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Applicants
              </span>
              <span className="text-lg font-bold text-slate-800">124</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition">
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              </button>
              <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition">
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Inactive Job */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-px flex flex-col md:flex-row items-center justify-between gap-6 group">
          <div className="flex items-center gap-5 w-full md:w-1/3 opacity-70">
            <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400 font-bold text-lg border border-slate-300">
              D
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-600">
                Marketing Lead
              </h4>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mt-1">
                Delivery Hero • Munich
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full md:w-2/3">
            <div className="opacity-70">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Type
              </span>
              <span className="text-sm font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded border border-slate-300">
                Part-time
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Status
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-none bg-slate-100 text-slate-600 border border-slate-200">
                Closed
              </span>
            </div>
            <div className="text-center opacity-70">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Applicants
              </span>
              <span className="text-lg font-bold text-slate-600">12</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition">
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageJobs;
