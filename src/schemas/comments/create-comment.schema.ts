import z from "zod/v4";

export const createCommentSchema = z.object({
    content: z.string()
        .min(1, "The comment must have one character at least")
        .max(500, "The comment must have maximum 500")
        .trim()
});

export type CreateCommentForm = z.infer<typeof createCommentSchema>;