import FormSection from "./FormSection";
import {
  inputClass,
  inputErrorClass,
  labelClass,
  errorClass,
} from "./formStyles";

const BasicInfoSection = ({ register, errors, logoPreview, onLogoChange }) => {
  return (
    <FormSection
      number="1"
      title="Basic Information"
      subtitle="Job title and company details"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Title */}
        <div className="md:col-span-2">
          <label className={labelClass}>Job Title</label>
          <input
            type="text"
            {...register("title")}
            className={errors.title ? inputErrorClass : inputClass}
            placeholder="e.g. Senior Product Designer"
          />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Company Name */}
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

        {/* Industry */}
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

        {/* Company Logo */}
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
                onChange={onLogoChange}
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
    </FormSection>
  );
};

export default BasicInfoSection;
