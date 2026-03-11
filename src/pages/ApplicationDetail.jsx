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
  } = useApplicationDetail();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) {
    return (
      <section className="animate-fade-in max-w-5xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-48" />
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-slate-200" />
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
      <section className="animate-fade-in max-w-5xl mx-auto">
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

  // Helper functions
  const fullName =
    `${profiles?.first_name || ""} ${profiles?.last_name || ""}`.trim() ||
    "Unknown";

  const getInitials = () => {
    if (profiles?.first_name || profiles?.last_name) {
      const first = profiles.first_name?.charAt(0) || "";
      const last = profiles.last_name?.charAt(0) || "";
      return (first + last).toUpperCase() || "?";
    }
    return "?";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatJobPreference = (pref) => {
    if (!pref) return "N/A";
    return pref
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const calculateAge = (dob) => {
    if (!dob) return null;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Documents list
  const documents = [
    {
      label: "Resume / CV",
      url: profiles?.resume_url,
      icon: "📄",
      description: "Candidate's resume or curriculum vitae",
    },
    {
      label: "Enrollment Certificate",
      url: profiles?.enrollment_cert_url,
      icon: "🎓",
      description: "Proof of enrollment in educational institution",
    },
    {
      label: "Health Insurance",
      url: profiles?.health_insurance_url,
      icon: "🏥",
      description: "Health insurance documentation",
    },
    {
      label: "Passport",
      url: profiles?.passport_url,
      icon: "🛂",
      description: "Passport identification document",
    },
    {
      label: "Valid Permit",
      url: profiles?.valid_permit_url,
      icon: "📋",
      description: "Work or residence permit",
    },
  ].filter((doc) => doc.url);

  return (
    <section className="animate-fade-in max-w-5xl mx-auto pb-8">
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
        {/* ==================== APPLICANT PROFILE SECTION ==================== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header with Avatar */}
          <div className="bg-gradient-to-r from-slate-50 to-white p-8 border-b border-slate-100">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden border-4 border-white shadow-lg flex items-center justify-center shrink-0">
                {profiles?.avatar_url ? (
                  <img
                    src={profiles.avatar_url}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-brand-green">
                    {getInitials()}
                  </span>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-slate-800">
                    {fullName}
                  </h1>
                  {profiles?.role && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase">
                      {profiles.role}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 mt-1">
                  {profiles?.email || "No email"}
                </p>

                {/* Quick Stats */}
                <div className="flex items-center gap-6 mt-4 flex-wrap">
                  {profiles?.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {profiles.phone}
                    </div>
                  )}
                  {profiles?.date_of_birth && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(profiles.date_of_birth)} (
                      {calculateAge(profiles.date_of_birth)} years old)
                    </div>
                  )}
                </div>
              </div>

              {/* Portfolio Link */}
              {profiles?.portfolio_link && (
                <a
                  href={profiles.portfolio_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-brand-green border border-brand-green rounded-lg hover:bg-green-50 transition flex items-center gap-2 shrink-0"
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

          {/* Detailed Information Grid */}
          <div className="p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* First Name */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  First Name
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {profiles?.first_name || "N/A"}
                </p>
              </div>

              {/* Last Name */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Last Name
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {profiles?.last_name || "N/A"}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Email Address
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {profiles?.email || "N/A"}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Phone Number
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {profiles?.phone || "N/A"}
                </p>
              </div>

              {/* Date of Birth */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Date of Birth
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {profiles?.date_of_birth ? (
                    <>
                      {formatDate(profiles.date_of_birth)}
                      <span className="text-slate-400 ml-1">
                        ({calculateAge(profiles.date_of_birth)} yrs)
                      </span>
                    </>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>

              {/* Address */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Address
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {profiles?.address || "N/A"}
                </p>
              </div>

              {/* Job Preference */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Job Preference
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {formatJobPreference(profiles?.job_preference)}
                </p>
              </div>

              {/* Tax ID */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Tax ID
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {profiles?.tax_id || "N/A"}
                </p>
              </div>

              {/* Social Security Number */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Social Security Number
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {profiles?.social_security_number || "N/A"}
                </p>
              </div>

              {/* Account Created */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Account Created
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {formatDate(profiles?.created_at)}
                </p>
              </div>

              {/* Onboarding Status */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Onboarding Status
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    profiles?.is_onboarded
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {profiles?.is_onboarded ? "Completed" : "Pending"}
                </span>
              </div>

              {/* Portfolio */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Portfolio
                </p>
                {profiles?.portfolio_link ? (
                  <a
                    href={profiles.portfolio_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-green hover:underline font-medium"
                  >
                    View Portfolio →
                  </a>
                ) : (
                  <p className="text-sm text-slate-800 font-medium">N/A</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== JOB INFORMATION SECTION ==================== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Applied For
            </h2>
          </div>

          <div className="p-6">
            {/* Job Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                {jobs?.company_logo ? (
                  <img
                    src={jobs.company_logo}
                    alt={jobs.company_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-slate-500">
                    {jobs?.company_name?.charAt(0) || "?"}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800">
                  {jobs?.title || "Unknown Position"}
                </h3>
                <p className="text-slate-500 mt-1">
                  {jobs?.company_name || "Unknown Company"}
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  {jobs?.is_featured && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                      ⭐ Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      jobs?.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {jobs?.status
                      ? jobs.status.charAt(0).toUpperCase() +
                        jobs.status.slice(1)
                      : "Unknown"}
                  </span>
                </div>
              </div>
            </div>
            {/* Job Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Location
                </p>
                <p className="text-sm text-slate-800 font-medium flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {jobs?.location || "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Job Type
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {jobs?.job_type || "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Experience
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {jobs?.experience_level || "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Industry
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {jobs?.industry || "N/A"}
                </p>
              </div>
            </div>
            {/* Skills */}
            {jobs?.skills && jobs.skills.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-3">
                  Required Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {jobs.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Description */}
            {jobs?.description && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-3">
                  Job Description
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {jobs.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ==================== APPLICATION STATUS SECTION ==================== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Application Status
          </h2>

          <div className="flex flex-wrap gap-2 mb-6">
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

          {/* Application Dates */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                Applied On
              </p>
              <p className="text-sm text-slate-700 font-medium">
                {formatDateTime(created_at)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                Last Updated
              </p>
              <p className="text-sm text-slate-700 font-medium">
                {formatDateTime(updated_at)}
              </p>
            </div>
          </div>
        </div>

        {/* ==================== DOCUMENTS SECTION ==================== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
            Submitted Documents ({documents.length})
          </h2>

          {documents.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-slate-500 font-medium">
                No documents uploaded
              </p>
              <p className="text-sm text-slate-400 mt-1">
                This applicant hasn't uploaded any documents yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.label}
                  className="flex items-center justify-between p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl">
                      {doc.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {doc.label}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-slate-400 hover:text-brand-green hover:bg-green-50 rounded-xl transition cursor-pointer"
                    title="View Document"
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ==================== DANGER ZONE ==================== */}
        <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4">
            Danger Zone
          </h2>

          {showDeleteConfirm ? (
            <div className="flex items-center gap-4 flex-wrap">
              <p className="text-sm text-slate-600">
                Are you sure you want to delete this application? This action
                cannot be undone.
              </p>
              <div className="flex gap-2">
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
