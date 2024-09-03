import { object, string, number } from "zod";

export const facilityValidationSchema = object({
  name: string().min(6, 'Name must be at least 6 characters long'),
  description: string(),
  pricePerHour: number(),
  location: string(),
});
