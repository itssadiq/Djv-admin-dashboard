// src/components/applications/ApplicationDetailModal.jsx

import { useState } from "react";
import { createPortal } from "react-dom";
import {
  APPLICATION_STATUSES,
  STATUS_CONFIG,
} from "../../constants/applicationStatus";

const ApplicationDetailModal = ({
  isOpen,
  application,
  onClose,
  onUpdateStatus,
  onDelete,
  isUpdating,
  isDeleting,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen || !application) return null;

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

  const documents = [
    { label: "Resume", url: profiles?.resume_url, icon: "📄" },
    {
      label: "Enrollment Certificate",
      url: profiles?.enrollment_cert_url,
      icon: "🎓",
    },
    {
      label: "Health Insurance",
      url: profiles?.health_insurance_url,
      icon: "🏥",
    },
    { label: "Passport", url: profiles?.passport_url, icon: "🛂" },
    { label: "Valid Permit", url: profiles?.valid_permit_url, icon: "📋" },
  ].filter((doc) => doc.url);

  const handleStatusChange = async (newStatus) => {
    await onUpdateStatus(application.job_id, application.user_id, newStatus);
  };

  const handleDelete = async () => {
    await onDelete(application.job_id, application.user_id);
  };

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 99999,
        padding: "16px",
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              {profiles?.avatar_url ? (
                <img
                  src={profiles.avatar_url}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-green text-white font-semibold">
                  {initials}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{fullName}</h2>
              <p className="text-sm text-slate-500">{profiles?.email}</p>
              {profiles?.phone && (
                <p className="text-sm text-slate-500">{profiles.phone}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Job Applied For */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">
              Applied For
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                {jobs?.company_logo ? (
                  <img
                    src={jobs.company_logo}
                    alt={jobs.company_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-slate-500">
                    {jobs?.company_name?.charAt(0) || "?"}
                  </span>
                )}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{jobs?.title}</p>
                <p className="text-sm text-slate-500">
                  {jobs?.company_name} • {jobs?.location}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-3">
              Application Status
            </p>
            <div className="flex flex-wrap gap-2">
              {APPLICATION_STATUSES.map((statusOption) => {
                const config = STATUS_CONFIG[statusOption];
                const isActive = status === statusOption;

                return (
                  <button
                    key={statusOption}
                    onClick={() => handleStatusChange(statusOption)}
                    disabled={isUpdating}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-50 ${
                      isActive
                        ? `${config.bgColor} ${config.textColor} ring-2 ring-offset-1 ${config.borderColor}`
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
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

          {/* Portfolio */}
          {profiles?.portfolio_link && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                Portfolio
              </p>
              <a
                href={profiles.portfolio_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-green hover:underline flex items-center gap-1"
              >
                {profiles.portfolio_link}
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
              </a>
            </div>
          )}

          {/* Documents */}
          {documents.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-3">
                Documents
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documents.map((doc) => (
                  <a
                    key={doc.label}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition group"
                  >
                    <span className="text-xl">{doc.icon}</span>
                    <span className="flex-1 text-sm font-medium text-slate-700">
                      {doc.label}
                    </span>
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-brand-green"
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
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
          {showDeleteConfirm ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">
                Delete application?
              </span>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
            >
              Delete Application
            </button>
          )}

          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-brand-green rounded-xl hover:bg-brand-hover transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ApplicationDetailModal;
