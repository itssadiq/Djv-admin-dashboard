import React from "react";

const Applications = () => {
  const selectClass =
    "w-full bg-white border border-slate-300 rounded-lg px-4 h-12 text-sm text-slate-800 transition-all shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none appearance-none bg-select-arrow bg-[length:1.5em_1.5em] bg-no-repeat bg-[right_0.75rem_center] cursor-pointer";

  return (
    <section className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-2">
        <select className={selectClass}>
          <option>Filter by Job: All</option>
          <option>Product Designer</option>
          <option>Frontend Developer</option>
        </select>
        <select className={selectClass}>
          <option>Filter by Status: All</option>
          <option>New</option>
          <option>Interviewing</option>
          <option>Rejected</option>
        </select>
        <div className="relative md:col-span-2">
          <input
            type="text"
            placeholder="Search applicant name or email..."
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
      </div>

      <div className="space-y-4">
        {/* Applicant 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 transition-all hover:border-brand-green hover:shadow-md flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <img
                src="https://ui-avatars.com/api/?name=Sarah+J&background=random"
                className="w-full h-full object-cover"
                alt="Sarah J"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition">
                  Sarah Jenkins
                </h4>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-none bg-green-100 text-green-800 border border-green-200">
                  New
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Applied for{" "}
                <span className="font-semibold text-slate-700">
                  Product Designer
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-400 uppercase">
                Applied On
              </p>
              <p className="text-sm font-semibold text-slate-700">
                Oct 24, 2023
              </p>
            </div>
            <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-brand-green group-hover:bg-green-50 transition">
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
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Applicant 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 transition-all hover:border-brand-green hover:shadow-md flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <img
                src="https://ui-avatars.com/api/?name=David+C&background=random"
                className="w-full h-full object-cover"
                alt="David C"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition">
                  David Chen
                </h4>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-none bg-blue-100 text-blue-800 border border-blue-200">
                  Interviewing
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Applied for{" "}
                <span className="font-semibold text-slate-700">
                  Frontend Developer
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-400 uppercase">
                Applied On
              </p>
              <p className="text-sm font-semibold text-slate-700">
                Oct 23, 2023
              </p>
            </div>
            <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-brand-green group-hover:bg-green-50 transition">
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
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Applicant 3 */}
        <div className="bg-slate-50 opacity-80 hover:opacity-100 border border-slate-200 rounded-xl p-5 transition-all hover:border-brand-green hover:shadow-md flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200 grayscale">
              <img
                src="https://ui-avatars.com/api/?name=Marcus+R&background=random"
                className="w-full h-full object-cover"
                alt="Marcus R"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h4 className="text-base font-bold text-slate-700 group-hover:text-brand-green transition">
                  Marcus Reid
                </h4>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-none bg-red-100 text-red-800 border border-red-200">
                  Rejected
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Applied for{" "}
                <span className="font-semibold text-slate-600">
                  Product Designer
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-400 uppercase">
                Applied On
              </p>
              <p className="text-sm font-semibold text-slate-600">
                Oct 20, 2023
              </p>
            </div>
            <button className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 group-hover:text-brand-green group-hover:bg-green-50 transition">
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
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Applications;
