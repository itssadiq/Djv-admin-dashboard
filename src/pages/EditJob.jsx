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
    handleLogoChange,
    onSubmit,
    handleCancel,
  } = useEditJob();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = form;

  if (isLoadingJob) return <FormSkeleton />;

  if (isError) {
    return (
      <section className="animate-fade-in max-w-4xl mx-auto pb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-1">
            Failed to load job
          </h3>
          <p className="text-sm text-red-600 mb-4">
            {error?.message || "Job not found."}
          </p>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Back to Manage Jobs
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-fade-in max-w-4xl mx-auto pb-8">
      <button
        onClick={handleCancel}
        className="flex items-center gap-2 text-sm text-slate-500 mb-6"
      >
        Back to Manage Jobs
      </button>

      {submitSuccess && (
        <SuccessMessage
          message="Job updated successfully!"
          submessage="Redirecting..."
        />
      )}

      {submitError && (
        <ErrorMessage
          message={submitError}
          onClose={() => setSubmitError(null)}
        />
      )}

      {!submitSuccess && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoSection
            register={register}
            errors={errors}
            logoPreview={logoPreview}
            onLogoChange={handleLogoChange}
          />
          <JobDetailsSection register={register} errors={errors} />
          <CompensationSection
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            clearErrors={clearErrors}
          />
          <StatusSection register={register} errors={errors} />

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-8 py-3 bg-brand-green text-white rounded-xl disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EditJob;
