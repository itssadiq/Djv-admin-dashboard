// src/pages/PostJob.jsx

import { usePostJob } from "../hooks/usePostJob";
import {
  SuccessMessage,
  ErrorMessage,
  BasicInfoSection,
  JobDetailsSection,
  CompensationSection,
  SubmitButton,
} from "../components/jobs";

const PostJob = () => {
  const {
    form,
    formContainerRef,
    logoPreview,
    submitSuccess,
    submitError,
    setSubmitSuccess,
    setSubmitError,
    handleLogoChange,
    onSubmit,
  } = usePostJob();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <section
      ref={formContainerRef}
      className="animate-fade-in max-w-4xl mx-auto pb-8"
    >
      {/* Success Message */}
      {submitSuccess && (
        <SuccessMessage
          message="Job added successfully!"
          submessage="Your job listing is now live."
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

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </section>
  );
};

export default PostJob;
