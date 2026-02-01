"use server"

import { LoginForm } from "@/schemas/auth/login.schema"
import { AuthService } from "@/services/auth.service"

export const loginAction = async (data: LoginForm) => {
  const response = await AuthService.login(data);
  return response;
}