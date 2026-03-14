import FormSection from "./FormSection";
import {
  inputClass,
  inputErrorClass,
  labelClass,
  errorClass,
  checkboxClass,
} from "./formStyles";

const CompensationSection = ({ register, errors, watch }) => {
  const isWorkstudent = watch("job_type") === "Workstudent";

  return (
    <FormSection
      number="3"
      title="Compensation & Options"
      subtitle="Salary details"
    >
      <div className="space-y-6">
        {isWorkstudent ? (
          <div>
            <label className={labelClass}>Hourly Wage</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                €
              </span>
              <input
                type="number"
                step="0.01"
                {...register("hourly_wage")}
                className={`${errors.hourly_wage ? inputErrorClass : inputClass} pl-9 pr-16`}
                placeholder="15.50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                /hour
              </span>
            </div>
            {errors.hourly_wage && (
              <p className={errorClass}>{errors.hourly_wage.message}</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Min Salary</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  €
                </span>
                <input
                  type="number"
                  {...register("salary_min")}
                  className={`${errors.salary_min ? inputErrorClass : inputClass} pl-9 pr-16`}
                  placeholder="40000"
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
              <label className={labelClass}>Max Salary</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  €
                </span>
                <input
                  type="number"
                  {...register("salary_max")}
                  className={`${errors.salary_max ? inputErrorClass : inputClass} pl-9 pr-16`}
                  placeholder="60000"
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
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
