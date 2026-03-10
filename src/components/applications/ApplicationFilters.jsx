// src/components/applications/ApplicationFilters.jsx

import {
  APPLICATION_STATUSES,
  STATUS_CONFIG,
} from "../../constants/applicationStatus";

const selectClass =
  "w-full bg-white border border-slate-300 rounded-lg px-4 h-12 text-sm text-slate-800 shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none appearance-none bg-select-arrow bg-[length:1.5em_1.5em] bg-no-repeat bg-[right_0.75rem_center] cursor-pointer";

const ApplicationFilters = ({
  searchQuery,
  setSearchQuery,
  jobFilter,
  setJobFilter,
  statusFilter,
  setStatusFilter,
  jobOptions,
  clearFilters,
}) => {
  const hasActiveFilters = searchQuery || jobFilter || statusFilter;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Job Filter */}
        <select
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          className={selectClass}
        >
          <option value="">All Jobs</option>
          {jobOptions.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title} - {job.company}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClass}
        >
          <option value="">All Statuses</option>
          {APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_CONFIG[status].label}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="relative md:col-span-2">
          <input
            type="text"
            placeholder="Search applicant name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 h-12 text-sm text-slate-800 shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none"
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
            />
          </svg>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={clearFilters}
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationFilters;
