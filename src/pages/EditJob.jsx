// src/pages/EditJob.jsx

import { useEditJob } from "../hooks/useEditJob";
import {
  SuccessMessage,
  ErrorMessage,
  BasicInfoSection,
  JobDetailsSection,
  CompensationSection,
  StatusSection,
  FormSkeleton,
} from "../components/jobs";

const EditJob = () => {
  const {
    form,
    isLoadingJob,
    isUpdating,
    isError,
    error,
    logoPreview,
    submitSuccess,
    submitError,
    setSubmitSuccess,
    setSubmitError,
    handleLogoChange,
    onSubmit,
    handleCancel,
  } = useEditJob();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // Loading state
  if (isLoadingJob) {
    return (
      <section className="animate-fade-in">
        <FormSkeleton />
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="animate-fade-in max-w-4xl mx-auto pb-8">
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
            Failed to load job
          </h3>
          <p className="text-sm text-red-600 mb-4">
            {error?.message || "Job not found or something went wrong."}
          </p>
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition"
          >
            Back to Manage Jobs
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-fade-in max-w-4xl mx-auto pb-8">
      {/* Page Header */}
      <div className="mb-6">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4"
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
          Back to Manage Jobs
        </button>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <SuccessMessage
          message="Job updated successfully!"
          submessage="Your changes have been saved."
          onClose={() => setSubmitSuccess(false)}
        />
      )}

      {/* Error Message */}
      {submitError && (
        <ErrorMessage
          message={submitError}
          onClose={() => setSubmitError(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoSection
          register={register}
          errors={errors}
          logoPreview={logoPreview}
          onLogoChange={handleLogoChange}
        />

        <JobDetailsSection register={register} errors={errors} />

        <CompensationSection register={register} errors={errors} />

        <StatusSection register={register} errors={errors} />

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-brand-green hover:bg-brand-hover shadow-lg shadow-green-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isUpdating ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditJob;
