// src/components/manageJobs/JobCard.jsx

import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();
  const isActive = job.status === "active";

  const handleEdit = () => {
    navigate(`/dashboard/edit-job/${job.id}`);
  };

  return (
    <div
      className={`${
        isActive ? "bg-white" : "bg-slate-50"
      } border border-slate-200 rounded-xl p-5 transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-px flex flex-col md:flex-row items-center justify-between gap-6 group`}
    >
      {/* Job Info */}
      <div
        className={`flex items-center gap-5 w-full md:w-1/3 ${
          !isActive ? "opacity-70" : ""
        }`}
      >
        <div
          className={`w-12 h-12 rounded-lg ${
            isActive ? "bg-slate-100" : "bg-slate-200"
          } flex items-center justify-center overflow-hidden border ${
            isActive ? "border-slate-200" : "border-slate-300"
          }`}
        >
          {job.company_logo ? (
            <img
              src={job.company_logo}
              alt={job.company_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className={`font-bold text-lg ${
                isActive ? "text-slate-500" : "text-slate-400"
              }`}
            >
              {job.company_name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <h4
            className={`text-base font-bold ${
              isActive
                ? "text-slate-800 group-hover:text-brand-green"
                : "text-slate-600"
            } transition`}
          >
            {job.title}
          </h4>
          <p
            className={`text-xs font-medium ${
              isActive ? "text-slate-500" : "text-slate-400"
            } uppercase tracking-wide mt-1`}
          >
            {job.company_name} • {job.location}
          </p>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex items-center justify-between w-full md:w-2/3">
        <div className={!isActive ? "opacity-70" : ""}>
          <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
            Type
          </span>
          <span
            className={`text-sm font-medium ${
              isActive
                ? "text-slate-700 bg-slate-100 border-slate-200"
                : "text-slate-500 bg-slate-200 border-slate-300"
            } px-2 py-1 rounded border`}
          >
            {job.job_type}
          </span>
        </div>

        <div>
          <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
            Status
          </span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-none ${
              isActive
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-slate-100 text-slate-600 border-slate-200"
            } border`}
          >
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>
        </div>

        <div className={`text-center ${!isActive ? "opacity-70" : ""}`}>
          <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
            Applicants
          </span>
          <span
            className={`text-lg font-bold ${
              isActive ? "text-slate-800" : "text-slate-600"
            }`}
          >
            {job.applicants_count || 0}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition cursor-pointer"
            title="Edit job"
          >
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
              />
            </svg>
          </button>

          <button
            onClick={() => onDelete(job.id, job.title)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition cursor-pointer"
            title="Delete job"
          >
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
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
