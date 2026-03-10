// src/components/applications/ApplicationCard.jsx

import { STATUS_CONFIG } from "../../constants/applicationStatus";

const ApplicationCard = ({ application, onClick }) => {
  const { profiles, jobs, status, created_at } = application;

  const fullName =
    `${profiles?.first_name || ""} ${profiles?.last_name || ""}`.trim() ||
    "Unknown";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  const isRejected = status === "rejected";

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      onClick={onClick}
      className={`${
        isRejected ? "bg-slate-50 opacity-80 hover:opacity-100" : "bg-white"
      } border border-slate-200 rounded-xl p-5 transition-all hover:border-brand-green hover:shadow-md flex items-center justify-between cursor-pointer group`}
    >
      {/* Left Section - Profile Info */}
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200 ${
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
            <div className="w-full h-full flex items-center justify-center bg-brand-green text-white font-semibold text-sm">
              {initials}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3">
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
        <button
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
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
