import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Email is required"),
  password: z.string().min(2, "Password must be at least 6 characters"),
});
export const SignupSchema = z.object({
  email: z.string().min(3, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  re_password: z.string().min(6, "Password must be at least 6 characters"),
  username:
    z.string().min(6, "Password must be at least 5 characters")
    .max(15, "Username should't be more than 15 charcters"),
});
