import z from "zod/v4";

export const loginSchema = z.object(
  {
    term: z
      .string()
      .nonempty('The username or email is required')
      .min(6, 'The username or email es too short')
      .max(255, 'The username or password is too long')
      .trim()
      .toLowerCase(),
    password: z.string()
      .nonempty('The password is required')
      .min(8, 'The password is too short')
      .max(16, 'The password is too long')
      .trim(),
  },
  'Invalid Object',
);

export type LoginForm = z.infer<typeof loginSchema>;