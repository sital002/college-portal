import { z } from "zod";

export const CourseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  courseCode: z.nullable(z.string()),
});

export type CourseType = z.infer<typeof CourseSchema>;
