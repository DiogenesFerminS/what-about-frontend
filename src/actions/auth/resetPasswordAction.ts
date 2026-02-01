"use server"

import { ResetForm } from "@/schemas/auth/reset-password.schema"
import { AuthService } from "@/services/auth.service"

export const resetPasswordAction = async (data: ResetForm, token: string) => {
  const response = await AuthService.resetPassword(data, token);
  return response;
}