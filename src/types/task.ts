import { z } from "zod";

export const TaskSchema = z.object({
  _id: z.any().optional(),
  userId: z.string().nullable().optional(),
  title: z.string().min(1).max(200),
  done: z.boolean().default(false),
  createdAt: z.number(),
  updatedAt: z.number(),
});
export type Task = z.infer<typeof TaskSchema>;
