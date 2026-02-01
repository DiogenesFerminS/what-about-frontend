"use server"

import { AuthService } from "@/services/auth.service"

export const verifyAccountAction = async (token: string) => {
  const response = await AuthService.verifyAccount(token);
  return response;
}