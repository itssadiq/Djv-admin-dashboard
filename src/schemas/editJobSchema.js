// src/schemas/editJobSchema.js

import { z } from "zod";

const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Internship",
  "Workstudent",
  "Contract",
  "Freelance",
];
const EXPERIENCE_LEVELS = [
  "Entry Level",
  "Junior",
  "Mid Level",
  "Senior",
  "Lead",
  "Executive",
];
const JOB_STATUSES = ["active", "closed"]; // Defined here...

const editJobSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Job title must be at least 3 characters")
      .max(100),
    company_name: z
      .string()
      .trim()
      .min(2, "Company name must be at least 2 characters")
      .max(100),
    industry: z
      .string()
      .trim()
      .min(2, "Industry must be at least 2 characters")
      .max(50),
    company_logo: z.any().optional(),
    job_type: z
      .string()
      .refine((val) => JOB_TYPES.includes(val), "Select valid job type"),
    experience_level: z
      .string()
      .refine((val) => EXPERIENCE_LEVELS.includes(val), "Select valid level"),
    location: z.string().trim().min(2, "Location is required"),
    skills: z.union([
      z.array(z.string()),
      z.string().transform((val) =>
        val
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
      ),
    ]),
    description: z.string().trim().min(50, "Min 50 characters required"),
    salary_min: z.any().optional(),
    salary_max: z.any().optional(),
    hourly_wage: z.any().optional(),
    is_featured: z.boolean().default(false),
    status: z
      .string()
      .refine((val) => JOB_STATUSES.includes(val), "Select valid status"),
  })
  .superRefine((data, ctx) => {
    if (data.job_type === "Workstudent") {
      const wage = Number(data.hourly_wage);
      if (!data.hourly_wage || isNaN(wage) || wage <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Valid hourly wage required",
          path: ["hourly_wage"],
        });
      }
    } else {
      if (!data.salary_min)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Min required",
          path: ["salary_min"],
        });
      if (!data.salary_max)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Max required",
          path: ["salary_max"],
        });
      if (Number(data.salary_min) > Number(data.salary_max)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Max must be > Min",
          path: ["salary_max"],
        });
      }
    }
  });

// ADD THESE EXPORT LINES AT THE BOTTOM
export const jobStatuses = JOB_STATUSES;
export const jobTypes = JOB_TYPES;
export const experienceLevels = EXPERIENCE_LEVELS;

export default editJobSchema;
