import { z } from "zod";

export const formSchema = z.object({
  service: z.number().min(1, "Service is required"),
  material: z.number().min(1, "Material is required"),
  editing: z.boolean(),
  quantity: z.number().min(1, "Minimum quantity is 1"),
  city: z.string().min(1, "City is required"),
  longitude: z.number(),
  latitude: z.number(),
  setting: z.array(z.string()).min(1, "At least one setting is required"),
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Date is required"),
});

export type FormValues = z.infer<typeof formSchema>;