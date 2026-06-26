import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Email is required"),
  password: z.string().min(2, "Password must be at least 6 characters"),
});
export const SignupSchema = z.object({
  email: z.string().min(3, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  re_password: z.string().min(6, "Password must be at least 6 characters"),
  username: z
    .string()
    .min(6, "Password must be at least 5 characters")
    .max(15, "Username should't be more than 15 charcters"),
});
export const infoSchema = z.object({
  image: z.instanceof(File).optional(),
  username: z
    .string()
    .min(6, "Password must be at least 5 characters")
    .max(15, "Username should't be more than 15 charcters"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  bio: z.string().optional(),
  age: z.number().optional(),
  job: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  lat: z.string().optional(),
  lon: z.string().optional(),
  ip: z.string().optional(),
  biography: z.string().optional(),
  birthday: z.string().optional(),
  sex: z.string().optional(),
});
