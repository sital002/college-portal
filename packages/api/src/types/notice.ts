import { z } from "zod";

export const NoticeSchema = z.object({
  id: z.union([z.number(), z.string()]),
  title: z.string(),
  content: z.string(),
  createdBy: z.any(),
  createdDate: z.string(),
});

export type NoticeType = z.infer<typeof NoticeSchema>;
