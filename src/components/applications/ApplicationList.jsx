// src/components/applications/ApplicationList.jsx

import ApplicationCard from "./ApplicationCard";

const ApplicationList = ({ applications, isLoading, onSelect }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-slate-200" />
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded w-40 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">
          No applications found
        </h3>
        <p className="text-sm text-slate-500">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard
          key={`${application.job_id}-${application.user_id}`}
          application={application}
          onClick={() => onSelect(application)}
        />
      ))}
    </div>
  );
};

export default ApplicationList;
