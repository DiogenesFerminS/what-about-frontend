import z from "zod/v4";

export const createRepostSchema = z.object({
  title: z
    .string()
    .nonempty('You cannot post a opinion with an empty title.')
    .min(3, "the title must have minimum 3 characters")
    .max(100, "the title must have maximum 100 characters"),
  content: z
    .string()
    .nonempty("You cannot post an empty opinion")
    .min(3, "The content must have minimum 3 characters")
    .max(2700, "The opinion must have maximum 2700 characters"),
});

export type CreateRepostForm = z.infer<typeof createRepostSchema>;
