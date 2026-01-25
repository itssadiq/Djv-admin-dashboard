import FormSection from "./FormSection";
import { jobTypes, experienceLevels } from "../../schemas/postJobSchema";
import {
  inputClass,
  inputErrorClass,
  selectClass,
  selectErrorClass,
  labelClass,
  errorClass,
} from "./formStyles";

const JobDetailsSection = ({ register, errors }) => {
  return (
    <FormSection
      number="2"
      title="Job Details"
      subtitle="Type, experience, location and skills"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Type */}
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

        {/* Experience Level */}
        <div>
          <label className={labelClass}>Experience Level</label>
          <select
            {...register("experience_level")}
            className={errors.experience_level ? selectErrorClass : selectClass}
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

        {/* Location */}
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

        {/* Skills */}
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

        {/* Job Description */}
        <div className="md:col-span-2">
          <label className={labelClass}>Job Description</label>
          <textarea
            rows="6"
            {...register("description")}
            className={`${
              errors.description ? inputErrorClass : inputClass
            } resize-y min-h-37.5`}
            placeholder="Describe the role, responsibilities, and requirements..."
          />
          {errors.description && (
            <p className={errorClass}>{errors.description.message}</p>
          )}
        </div>
      </div>
    </FormSection>
  );
};

export default JobDetailsSection;
