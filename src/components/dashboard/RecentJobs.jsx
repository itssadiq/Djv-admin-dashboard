// src/components/dashboard/RecentJobs.jsx

import { useNavigate } from "react-router-dom";

const RecentJobs = ({ jobs, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="h-5 bg-slate-200 rounded w-32 animate-pulse" />
        </div>
        <div className="divide-y divide-slate-100">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-200" />
                <div className="flex-1">
                  <div className="h-4 bg-slate-200 rounded w-40 mb-2" />
                  <div className="h-3 bg-slate-200 rounded w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800">Recent Jobs</h3>
        <button
          onClick={() => navigate("/dashboard/manage-jobs")}
          className="text-sm text-brand-green hover:text-brand-hover font-medium cursor-pointer"
        >
          View all
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="p-8 text-center">
          <svg
            className="w-12 h-12 text-slate-300 mx-auto mb-3"
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
          <p className="text-sm text-slate-500">No jobs posted yet</p>
          <button
            onClick={() => navigate("/dashboard/post-job")}
            className="mt-3 text-sm text-brand-green hover:text-brand-hover font-medium cursor-pointer"
          >
            Post your first job
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 hover:bg-slate-50 transition cursor-pointer"
              onClick={() => navigate(`/dashboard/edit-job/${job.id}`)}
            >
              <div className="flex items-center gap-4">
                {/* Company Logo */}
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                  {job.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={job.company_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-slate-500">
                      {job.company_name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-800 truncate">
                    {job.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {job.company_name} • {job.location}
                  </p>
                </div>

                {/* Status & Date */}
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {job.status}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    {formatDate(job.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentJobs;
