import { z } from "zod";

export const assignmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  deadLine: z.string(),
  room: z.string(),
  attachments: z.string(),
});
export type Assignment = z.infer<typeof assignmentSchema>;
