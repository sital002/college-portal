import { z } from "zod";

export const assignmentSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  description: z.string(),
  deadLine: z.string(),
  room: z.string(),
  attachments: z.union([z.string(), z.instanceof(File)]).optional(),
});
export type Assignment = z.infer<typeof assignmentSchema>;
