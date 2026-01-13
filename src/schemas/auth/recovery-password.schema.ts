import z from "zod/v4";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const recoverySchema = z.object({
  email: z.string()
      .nonempty('The email is required')
      .regex(emailRegex, 'Invalid Email')
      .max(255, 'The email is too long')
      .trim()
      .toLowerCase(),
});

export type RecoveryForm = z.infer< typeof recoverySchema>;