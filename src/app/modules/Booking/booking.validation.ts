import { object, string, date } from "zod";

export const bookingValidationSchema = object({
  facility: string().regex(/^[a-f\d]{24}$/i, 'Invalid facility ID format'), // Assuming MongoDB ObjectId format
  date: string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  startTime: string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid startTime format (HH:MM)'),
  endTime: string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid endTime format (HH:MM)'),
});
