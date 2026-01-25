// src/components/jobs/StatusSection.jsx

import FormSection from "./FormSection";
import { jobStatuses } from "../../schemas/editJobSchema";
import {
  selectClass,
  selectErrorClass,
  labelClass,
  errorClass,
} from "./formStyles";

const StatusSection = ({ register, errors }) => {
  return (
    <FormSection
      number="4"
      title="Job Status"
      subtitle="Control the visibility of this listing"
    >
      <div className="max-w-md">
        <label className={labelClass}>Status</label>
        <select
          {...register("status")}
          className={errors.status ? selectErrorClass : selectClass}
        >
          {jobStatuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        {errors.status && <p className={errorClass}>{errors.status.message}</p>}
        <p className="mt-2 text-xs text-slate-400">
          Closed jobs won't appear in search results
        </p>
      </div>
    </FormSection>
  );
};

export default StatusSection;
