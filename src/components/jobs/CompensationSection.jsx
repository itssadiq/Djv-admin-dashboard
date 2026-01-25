import FormSection from "./FormSection";
import {
  inputClass,
  inputErrorClass,
  labelClass,
  errorClass,
  checkboxClass,
} from "./formStyles";

const CompensationSection = ({ register, errors }) => {
  return (
    <FormSection
      number="3"
      title="Compensation & Options"
      subtitle="Salary range and listing preferences"
    >
      <div className="space-y-6">
        {/* Salary Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Salary Min */}
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

          {/* Salary Max */}
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

        {/* Toggle Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Remote */}
          <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-brand-green cursor-pointer">
            <input
              type="checkbox"
              {...register("is_remote")}
              className={checkboxClass}
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

          {/* Featured */}
          <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-brand-green cursor-pointer">
            <input
              type="checkbox"
              {...register("is_featured")}
              className={checkboxClass}
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
    </FormSection>
  );
};

export default CompensationSection;
