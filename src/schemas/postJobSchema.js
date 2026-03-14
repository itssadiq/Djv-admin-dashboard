import { z } from "zod";

const JOB_TYPES = ["Full Time", "Part Time", "Internship", "Workstudent"];
const EXPERIENCE_LEVELS = [
  "Entry Level",
  "Junior",
  "Mid Level",
  "Senior",
  "Lead",
  "Executive",
];

const postJobSchema = z
  .object({
    title: z.string().trim().min(3, "Job title is required").max(100),
    company_name: z.string().trim().min(2, "Company name is required").max(100),
    industry: z.string().trim().min(2, "Industry is required").max(50),
    company_logo: z.any().optional(),
    job_type: z.string().min(1, "Please select a job type"),
    experience_level: z.string().min(1, "Please select an experience level"),
    location: z.string().trim().min(2, "Location is required"),
    skills: z
      .string()
      .trim()
      .min(1, "Skills are required")
      .transform((val) =>
        val
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
      ),
    description: z
      .string()
      .trim()
      .min(50, "Description must be at least 50 characters"),
    salary_min: z.string().optional(),
    salary_max: z.string().optional(),
    hourly_wage: z.string().optional(),
    is_featured: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.job_type === "Workstudent") {
      if (!data.hourly_wage || Number(data.hourly_wage) <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hourly wage is required",
          path: ["hourly_wage"],
        });
      }
    } else {
      if (!data.salary_min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Min salary required",
          path: ["salary_min"],
        });
      }
      if (!data.salary_max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Max salary required",
          path: ["salary_max"],
        });
      }
      if (Number(data.salary_min) > Number(data.salary_max)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Max must be > Min",
          path: ["salary_max"],
        });
      }
    }
  });

export const jobTypes = JOB_TYPES;
export const experienceLevels = EXPERIENCE_LEVELS;
export default postJobSchema;
