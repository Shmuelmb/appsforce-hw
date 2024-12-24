import { z } from "zod";

export const userFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address format"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  streetName: z.string().min(1, "Street name is required"),
  streetNumber: z.string().min(1, "Street number is required"),
  picture: z.string().url("Invalid picture URL"),
});

export type UserFormData = z.infer<typeof userFormSchema>;
