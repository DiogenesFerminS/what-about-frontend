import z from "zod/v4";

export const updateOpinionSchema = z.object({
    title: z
      .string()
      .nonempty('You cannot post a opinion with an empty title.')
      .min(3, "the title must have minimum 3 characters")
      .max(100, "the title must have maximum 100 characters"),
  content: z
        .string()
        .nonempty('You cannot post an empty opinion')
        .min(3, 'The content must have minimum 3 characters')
        .max(2700, 'The opinion must have maximum 500 characters'),
    file: z
    .instanceof(File, { message: "Invalid format" })
    .refine((file) => file.size <= 5000000, "Maximum 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png o .webp format"
    )
    .optional(),
    deleteImage: z.boolean().optional(),
})

export type UpdateOpinionForm = z.infer<typeof updateOpinionSchema>;