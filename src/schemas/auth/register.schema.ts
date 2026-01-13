import z from "zod/v4";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const registerSchema = z.object({
  email: z.string()
    .nonempty('The email is required')
    .regex(emailRegex, 'Invalid Email')
    .max(255, 'The email is too long')
    .trim()
    .toLowerCase(),
  username: z
    .string()
    .nonempty('The username is required')
    .min(6, 'The username is too short')
    .max(16, 'The username is too long')
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .nonempty('The password is required')
    .min(8, 'The password is too short')
    .max(16, 'The password is too long')
    .regex(
      passwordRegex,
      'Invalid password the password must include: lowercase letters, uppercase letters, and special characters ',
    )
    .trim(),
});

export type RegisterForm = z.infer<typeof registerSchema>;