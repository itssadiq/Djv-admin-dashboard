import * as z from "zod";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Must include a lowercase letter")
    .regex(/(?=.*[A-Z])/, "Must include an uppercase letter")
    .regex(/(?=.*\d)/, "Must include a number")
    .regex(/(?=.*[^A-Za-z0-9])/, "Must include a special character"),
});

export default loginSchema;
