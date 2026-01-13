import z from "zod/v4";

export const createOpinionSchema = z.object({
  content: z
        .string()
        .nonempty('You cannot post an empty opinion')
        .max(500, 'The opinion must have maximum 500 characters'),
    file: z
    .instanceof(File, { message: "Invalid format" })
    .refine((file) => file.size <= 5000000, "Maximum 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png o .webp format"
    )
    .optional(),
})

export type CreateOpinionForm = z.infer<typeof createOpinionSchema>;