import { z } from "zod";

export const BookSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
  available: z.boolean(),
  addedDate: z.string(),
});

export type BookType = z.infer<typeof BookSchema>;
