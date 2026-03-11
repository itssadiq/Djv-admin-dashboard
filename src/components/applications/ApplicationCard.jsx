// src/components/applications/ApplicationCard.jsx

import { useNavigate } from "react-router-dom";
import { STATUS_CONFIG } from "../../constants/applicationStatus";

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();
  const { profiles, jobs, status, created_at, job_id, user_id } = application;

  const getDisplayName = () => {
    if (profiles?.first_name || profiles?.last_name) {
      return `${profiles.first_name || ""} ${profiles.last_name || ""}`.trim();
    }
    return "Unknown Applicant";
  };

  const fullName = getDisplayName();

  const getInitials = () => {
    if (profiles?.first_name || profiles?.last_name) {
      const first = profiles.first_name?.charAt(0) || "";
      const last = profiles.last_name?.charAt(0) || "";
      return (first + last).toUpperCase() || "?";
    }
    return "?";
  };

  const initials = getInitials();
  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const isRejected = status === "rejected";

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleClick = () => {
    navigate(`/dashboard/applications/${job_id}/${user_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        isRejected ? "bg-slate-50 opacity-80 hover:opacity-100" : "bg-white"
      } border border-slate-200 rounded-xl p-5 transition-all hover:border-brand-green hover:shadow-md flex items-center justify-between cursor-pointer group`}
    >
      {/* Left Section - Profile Info */}
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center ${
            isRejected ? "grayscale" : ""
          }`}
        >
          {profiles?.avatar_url ? (
            <img
              src={profiles.avatar_url}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-brand-green bg-green-50 w-full h-full flex items-center justify-center">
              {initials}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h4
              className={`text-base font-bold ${
                isRejected ? "text-slate-700" : "text-slate-900"
              } group-hover:text-brand-green transition`}
            >
              {fullName}
            </h4>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-none ${statusConfig.bgColor} ${statusConfig.textColor} border ${statusConfig.borderColor}`}
            >
              {statusConfig.label}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Applied for{" "}
            <span
              className={`font-semibold ${
                isRejected ? "text-slate-600" : "text-slate-700"
              }`}
            >
              {jobs?.title || "Unknown Position"}
            </span>
            {jobs?.company_name && (
              <span className="text-slate-400"> at {jobs.company_name}</span>
            )}
          </p>
        </div>
      </div>

      {/* Right Section - Date & Arrow */}
      <div className="flex items-center gap-8">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-slate-400 uppercase">
            Applied On
          </p>
          <p
            className={`text-sm font-semibold ${
              isRejected ? "text-slate-600" : "text-slate-700"
            }`}
          >
            {formatDate(created_at)}
          </p>
        </div>
        <div
          className={`w-8 h-8 rounded-full ${
            isRejected ? "bg-slate-200" : "bg-slate-50"
          } flex items-center justify-center text-slate-400 group-hover:text-brand-green group-hover:bg-green-50 transition`}
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
