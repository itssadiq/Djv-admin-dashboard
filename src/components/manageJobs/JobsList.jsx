// src/components/manageJobs/JobsList.jsx

import JobCard from "./JobCard";

const JobsList = ({ jobs, isLoading, onDelete }) => {
  if (isLoading) {
    return (
      <div className="space-y-4 pt-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-lg bg-slate-200" />
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
        <svg
          className="w-16 h-16 text-slate-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">
          No jobs found
        </h3>
        <p className="text-sm text-slate-500">
          Try adjusting your filters or add a new job listing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default JobsList;
