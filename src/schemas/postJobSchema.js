// src/schemas/postJobSchema.js

import { z } from "zod";

// Constants matching database constraints exactly
const JOB_TYPES = ["Full Time", "Part Time", "Internship", "Workstudent"];
const EXPERIENCE_LEVELS = ["Entry Level", "Junior", "Mid Level", "Senior"];
const JOB_STATUSES = ["active", "closed"];
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
];

const postJobSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Job title is required")
      .min(3, "Job title must be at least 3 characters")
      .max(100, "Job title cannot exceed 100 characters"),

    company_name: z
      .string()
      .trim()
      .min(1, "Company name is required")
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name cannot exceed 100 characters"),

    industry: z
      .string()
      .trim()
      .min(1, "Industry is required")
      .min(2, "Industry must be at least 2 characters")
      .max(50, "Industry cannot exceed 50 characters"),

    company_logo: z
      .custom()
      .optional()
      .refine((file) => !file || file instanceof File, "Invalid file")
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        "File size must be less than 2MB",
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only PNG, JPG, SVG or WebP formats are accepted",
      ),

    job_type: z
      .string()
      .min(1, "Please select a job type")
      .refine(
        (val) => JOB_TYPES.includes(val),
        "Please select a valid job type",
      ),

    experience_level: z
      .string()
      .min(1, "Please select an experience level")
      .refine(
        (val) => EXPERIENCE_LEVELS.includes(val),
        "Please select a valid experience level",
      ),

    location: z
      .string()
      .trim()
      .min(1, "Location is required")
      .min(2, "Location must be at least 2 characters")
      .max(100, "Location cannot exceed 100 characters"),

    skills: z
      .string()
      .trim()
      .min(1, "Skills are required")
      .transform((val) =>
        val
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0),
      )
      .refine((skills) => skills.length >= 1, "Please add at least one skill")
      .refine((skills) => skills.length <= 15, "Cannot add more than 15 skills")
      .refine(
        (skills) => skills.every((skill) => skill.length >= 2),
        "Each skill must be at least 2 characters",
      )
      .refine(
        (skills) => skills.every((skill) => skill.length <= 30),
        "Each skill cannot exceed 30 characters",
      ),

    description: z
      .string()
      .trim()
      .min(1, "Job description is required")
      .min(50, "Job description must be at least 50 characters")
      .max(5000, "Job description cannot exceed 5000 characters"),

    salary_min: z
      .string()
      .min(1, "Minimum salary is required")
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), "Please enter a valid number")
      .refine((val) => val >= 0, "Salary cannot be negative")
      .refine((val) => val <= 10000000, "Please enter a realistic salary"),

    salary_max: z
      .string()
      .min(1, "Maximum salary is required")
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), "Please enter a valid number")
      .refine((val) => val >= 0, "Salary cannot be negative")
      .refine((val) => val <= 10000000, "Please enter a realistic salary"),

    is_featured: z.boolean().default(false),
  })
  .refine((data) => data.salary_max >= data.salary_min, {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["salary_max"],
  });

export const jobTypes = JOB_TYPES;
export const experienceLevels = EXPERIENCE_LEVELS;
export const jobStatuses = JOB_STATUSES;

export default postJobSchema;
