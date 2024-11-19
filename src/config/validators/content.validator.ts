import { z } from "zod";

export const ContentSchema = z.object({
  title: z.string().min(1, "please insert title"),
  type: z.string().min(1, "please insert type").max(10, "type is too big"),
  tags: z.array(z.string().min(1, "please insert tags")).optional(),
  userId: z.string().optional(),
  content: z.string().optional(),
  link: z.string().optional(),
  _id: z.string().optional(),
  dateAdded: z.date().optional(),
});

export type ContentSchemaType = z.infer<typeof ContentSchema>;
