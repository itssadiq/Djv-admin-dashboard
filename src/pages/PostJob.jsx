// src/pages/PostJob.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import postJobSchema, {
  jobTypes,
  experienceLevels,
} from "../schemas/postJobSchema";
import { supabase } from "../lib/config";

const PostJob = () => {
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      is_remote: false,
      is_featured: false,
    },
  });

  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("company_logo", file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Upload logo to Supabase Storage
  const uploadLogo = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `company-logos/${fileName}`;

    const { data, error } = await supabase.storage
      .from("logos")
      .upload(filePath, file);

    if (error) throw new Error("Failed to upload logo");

    const { data: urlData } = supabase.storage
      .from("logos")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  // Reset form to initial state
  const resetForm = () => {
    reset();
    setLogoPreview(null);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      // Step 1: Upload logo if provided
      let logoUrl = null;
      if (data.company_logo) {
        logoUrl = await uploadLogo(data.company_logo);
      }

      // Step 2: Destructure only the fields we need
      const {
        title,
        company_name,
        industry,
        job_type,
        experience_level,
        location,
        skills,
        description,
        salary_min,
        salary_max,
        is_remote,
        is_featured,
      } = data;

      // Step 3: Prepare job data
      const jobData = {
        title,
        company_name,
        industry,
        company_logo: logoUrl,
        job_type,
        experience_level,
        location,
        skills,
        description,
        salary_min,
        salary_max,
        is_remote,
        is_featured,
        status: "active",
      };

      // Step 4: Insert into database
      const { error: insertError } = await supabase
        .from("jobs")
        .insert(jobData);

      if (insertError) throw insertError;

      // Step 5: Show success message and reset form
      setSubmitSuccess(true);
      resetForm();

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error posting job:", error);
      setSubmitError(error.message || "Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Style classes
  const inputClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/10 focus:outline-none placeholder:text-slate-400";
  const inputErrorClass =
    "w-full bg-white border border-red-300 rounded-xl px-4 py-3.5 text-sm text-slate-800 shadow-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 focus:outline-none placeholder:text-slate-400";
  const selectClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/10 focus:outline-none appearance-none bg-select-arrow bg-[length:1.25em] bg-no-repeat bg-[right_1rem_center] cursor-pointer";
  const selectErrorClass =
    "w-full bg-white border border-red-300 rounded-xl px-4 py-3.5 text-sm text-slate-800 shadow-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 focus:outline-none appearance-none bg-select-arrow bg-[length:1.25em] bg-no-repeat bg-[right_1rem_center] cursor-pointer";
  const labelClass =
    "block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider";
  const errorClass = "mt-1.5 text-xs text-red-500 font-medium";

  return (
    <section className="animate-fade-in max-w-4xl mx-auto pb-8">
      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Job added successfully!
                </p>
                <p className="text-xs text-green-600">
                  Your job listing is now live.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="text-green-600 hover:text-green-800"
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
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-red-600">{submitError}</p>
            </div>
            <button
              onClick={() => setSubmitError(null)}
              className="text-red-600 hover:text-red-800"
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
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-8 py-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Basic Information
                </h3>
                <p className="text-xs text-slate-500">
                  Job title and company details
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelClass}>Job Title</label>
              <input
                type="text"
                {...register("title")}
                className={errors.title ? inputErrorClass : inputClass}
                placeholder="e.g. Senior Product Designer"
              />
              {errors.title && (
                <p className={errorClass}>{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Company Name</label>
              <input
                type="text"
                {...register("company_name")}
                className={errors.company_name ? inputErrorClass : inputClass}
                placeholder="e.g. Dejob Inc."
              />
              {errors.company_name && (
                <p className={errorClass}>{errors.company_name.message}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Industry</label>
              <input
                type="text"
                {...register("industry")}
                className={errors.industry ? inputErrorClass : inputClass}
                placeholder="e.g. Technology, Healthcare"
              />
              {errors.industry && (
                <p className={errorClass}>{errors.industry.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Company Logo <span className="text-slate-400">(Optional)</span>
              </label>
              <div
                className={`flex items-center gap-6 p-4 rounded-xl border-2 border-dashed ${
                  errors.company_logo ? "border-red-300" : "border-slate-200"
                }`}
              >
                <div className="w-20 h-20 rounded-xl border border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-green file:text-white hover:file:bg-brand-hover file:cursor-pointer cursor-pointer"
                  />
                  <p className="mt-2 text-xs text-slate-400">
                    PNG, JPG or SVG • Max 2MB
                  </p>
                  {errors.company_logo && (
                    <p className={errorClass}>{errors.company_logo.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Job Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-8 py-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Job Details
                </h3>
                <p className="text-xs text-slate-500">
                  Type, experience, location and skills
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Job Type</label>
              <select
                {...register("job_type")}
                className={errors.job_type ? selectErrorClass : selectClass}
              >
                <option value="">Select Job Type...</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.job_type && (
                <p className={errorClass}>{errors.job_type.message}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Experience Level</label>
              <select
                {...register("experience_level")}
                className={
                  errors.experience_level ? selectErrorClass : selectClass
                }
              >
                <option value="">Select Experience...</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.experience_level && (
                <p className={errorClass}>{errors.experience_level.message}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                {...register("location")}
                className={errors.location ? inputErrorClass : inputClass}
                placeholder="e.g. Berlin, Germany"
              />
              {errors.location && (
                <p className={errorClass}>{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Skills</label>
              <input
                type="text"
                {...register("skills")}
                className={errors.skills ? inputErrorClass : inputClass}
                placeholder="e.g. React, Node.js, TypeScript"
              />
              <p className="mt-1.5 text-xs text-slate-400">
                Separate skills with commas
              </p>
              {errors.skills && (
                <p className={errorClass}>{errors.skills.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Job Description</label>
              <textarea
                rows="6"
                {...register("description")}
                className={`${
                  errors.description ? inputErrorClass : inputClass
                } resize-y min-h-[150px]`}
                placeholder="Describe the role, responsibilities, and requirements..."
              />
              {errors.description && (
                <p className={errorClass}>{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Compensation & Options */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-8 py-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Compensation & Options
                </h3>
                <p className="text-xs text-slate-500">
                  Salary range and listing preferences
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Minimum Salary</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    {...register("salary_min")}
                    className={`${
                      errors.salary_min ? inputErrorClass : inputClass
                    } pl-9 pr-16`}
                    placeholder="80000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    /year
                  </span>
                </div>
                {errors.salary_min && (
                  <p className={errorClass}>{errors.salary_min.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Maximum Salary</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    {...register("salary_max")}
                    className={`${
                      errors.salary_max ? inputErrorClass : inputClass
                    } pl-9 pr-16`}
                    placeholder="120000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    /year
                  </span>
                </div>
                {errors.salary_max && (
                  <p className={errorClass}>{errors.salary_max.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-brand-green cursor-pointer">
                <input
                  type="checkbox"
                  {...register("is_remote")}
                  className="w-5 h-5 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
                />
                <div>
                  <span className="block text-sm font-semibold text-slate-700">
                    Remote Position
                  </span>
                  <span className="text-xs text-slate-400">
                    Can be performed from anywhere
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-brand-green cursor-pointer">
                <input
                  type="checkbox"
                  {...register("is_featured")}
                  className="w-5 h-5 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
                />
                <div>
                  <span className="block text-sm font-semibold text-slate-700">
                    Featured Listing
                  </span>
                  <span className="text-xs text-slate-400">
                    Highlight in search results
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-brand-green hover:bg-brand-hover shadow-lg shadow-green-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? (
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
                Publishing...
              </span>
            ) : (
              "Publish Listing"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostJob;
