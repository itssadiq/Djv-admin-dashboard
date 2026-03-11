// src/pages/ApplicationDetail.jsx

import { useState } from "react";
import { useApplicationDetail } from "../hooks/useApplicationDetail";
import {
  APPLICATION_STATUSES,
  STATUS_CONFIG,
} from "../constants/applicationStatus";

const ApplicationDetail = () => {
  const {
    application,
    isLoading,
    isError,
    error,
    isUpdating,
    isDeleting,
    handleUpdateStatus,
    handleDelete,
    goBack,
    downloadDocument,
    downloadAllDocuments,
  } = useApplicationDetail();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) {
    return (
      <section className="animate-fade-in max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-48" />
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-slate-200" />
              <div className="flex-1">
                <div className="h-6 bg-slate-200 rounded w-48 mb-2" />
                <div className="h-4 bg-slate-200 rounded w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !application) {
    return (
      <section className="animate-fade-in max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <svg
            className="w-12 h-12 text-red-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-red-800 mb-1">
            Application not found
          </h3>
          <p className="text-sm text-red-600 mb-4">
            {error?.message ||
              "The application you're looking for doesn't exist."}
          </p>
          <button
            onClick={goBack}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            Back to Applications
          </button>
        </div>
      </section>
    );
  }

  const { profiles, jobs, status, created_at, updated_at } = application;

  const fullName =
    `${profiles?.first_name || ""} ${profiles?.last_name || ""}`.trim() ||
    "Unknown";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Prepare documents list
  const documents = [
    {
      label: "Resume / CV",
      url: profiles?.resume_url,
      icon: "📄",
      filename: `${fullName}_Resume.pdf`,
    },
    {
      label: "Enrollment Certificate",
      url: profiles?.enrollment_cert_url,
      icon: "🎓",
      filename: `${fullName}_Enrollment_Certificate.pdf`,
    },
    {
      label: "Health Insurance",
      url: profiles?.health_insurance_url,
      icon: "🏥",
      filename: `${fullName}_Health_Insurance.pdf`,
    },
    {
      label: "Passport",
      url: profiles?.passport_url,
      icon: "🛂",
      filename: `${fullName}_Passport.pdf`,
    },
    {
      label: "Valid Permit",
      url: profiles?.valid_permit_url,
      icon: "📋",
      filename: `${fullName}_Valid_Permit.pdf`,
    },
  ].filter((doc) => doc.url);

  return (
    <section className="animate-fade-in max-w-4xl mx-auto pb-8">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 cursor-pointer"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Applications
      </button>

      <div className="space-y-6">
        {/* Applicant Info Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden border-2 border-slate-200 flex items-center justify-center shrink-0">
                {profiles?.avatar_url ? (
                  <img
                    src={profiles.avatar_url}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-brand-green">
                    {initials}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-800">
                  {fullName}
                </h1>
                <p className="text-slate-500 mt-1">{profiles?.email}</p>
                {profiles?.phone && (
                  <p className="text-slate-500">{profiles.phone}</p>
                )}
                {profiles?.address && (
                  <p className="text-slate-500 mt-2">{profiles.address}</p>
                )}
              </div>

              {/* Portfolio Link */}
              {profiles?.portfolio_link && (
                <a
                  href={profiles.portfolio_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-brand-green border border-brand-green rounded-lg hover:bg-green-50 transition flex items-center gap-2"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Job Applied For */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Applied For
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
              {jobs?.company_logo ? (
                <img
                  src={jobs.company_logo}
                  alt={jobs.company_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-slate-500">
                  {jobs?.company_name?.charAt(0) || "?"}
                </span>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-800">
                {jobs?.title || "Unknown Position"}
              </p>
              <p className="text-sm text-slate-500">
                {jobs?.company_name} • {jobs?.location}
              </p>
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Application Status
          </h2>
          <div className="flex flex-wrap gap-2">
            {APPLICATION_STATUSES.map((statusOption) => {
              const config = STATUS_CONFIG[statusOption];
              const isActive = status === statusOption;

              return (
                <button
                  key={statusOption}
                  onClick={() => handleUpdateStatus(statusOption)}
                  disabled={isUpdating}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    isActive
                      ? `${config.bgColor} ${config.textColor} ring-2 ring-offset-2 ${config.borderColor}`
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {config.label}
                </button>
              );
            })}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                Applied On
              </p>
              <p className="text-sm text-slate-700">{formatDate(created_at)}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                Last Updated
              </p>
              <p className="text-sm text-slate-700">{formatDate(updated_at)}</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Documents ({documents.length})
            </h2>
            {documents.length > 0 && (
              <button
                onClick={() => downloadAllDocuments(documents)}
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-green rounded-lg hover:bg-brand-hover transition flex items-center gap-2 cursor-pointer"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download All
              </button>
            )}
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-8">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-sm text-slate-500">No documents uploaded</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.label}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{doc.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {doc.label}
                      </p>
                      <p className="text-xs text-slate-400">PDF Document</p>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadDocument(doc.url, doc.filename)}
                    className="p-2 text-slate-400 hover:text-brand-green hover:bg-green-50 rounded-lg transition cursor-pointer"
                    title="Download"
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4">
            Danger Zone
          </h2>

          {showDeleteConfirm ? (
            <div className="flex items-center gap-4">
              <p className="text-sm text-slate-600">
                Are you sure you want to delete this application?
              </p>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition cursor-pointer"
            >
              Delete Application
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationDetail;
