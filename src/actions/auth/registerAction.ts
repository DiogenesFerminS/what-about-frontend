"use server"

import { RegisterForm } from "@/schemas/auth/register.schema"
import { AuthService } from "@/services/auth.service"

export const registerAction = async (data: RegisterForm) => {
  const response = await AuthService.register(data);
  return response;
}