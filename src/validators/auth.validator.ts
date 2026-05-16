import { email, z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2).max(100),
  birthDate: z.coerce.date(),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(72),
});

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(72),
});
