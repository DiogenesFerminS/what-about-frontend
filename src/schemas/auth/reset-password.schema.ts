import z from "zod/v4";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .nonempty("The password is required")
    .min(8, "The password is too short")
    .max(16, "The password is too long")
    .regex(
      passwordRegex,
      "Invalid password the password must include: lowercase letters, uppercase letters, and special characters "
    )
    .trim(),
  confirmPassword: z
    .string()
    .nonempty("Confirming the password is required")
    .min(8, "The password must have at least 8 characters"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"]
});

export type ResetForm = z.infer<typeof resetPasswordSchema>;