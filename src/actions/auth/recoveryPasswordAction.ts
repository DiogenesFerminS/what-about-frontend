"use server"

import { RecoveryForm } from "@/schemas/auth/recovery-password.schema"
import { AuthService } from "@/services/auth.service"

export const recoveryPasswordAction = async (data: RecoveryForm) => {
  const response = await AuthService.recoveryPassword(data);
  return response;
}