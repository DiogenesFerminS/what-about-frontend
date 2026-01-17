import z from "zod/v4";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .max(16, "The name is too long")
    .trim(),
  bio: z
    .string()
    .max(160, "The biography is too long")
    .trim(),
  location: z
    .string()
    .max(60, "the location is too long")
    .trim(),
  file: z
    .instanceof(File, { message: "Invalid format" })
    .refine((file) => file.size <= 5000000, "Maximum 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png o .webp format"
    )
    .optional(),
});

export type UpdateProfileForm = z.infer<typeof updateProfileSchema>;
