"use server"

import { AuthService } from "@/services/auth.service"

export const logoutAction = async () => {
  return AuthService.logout();
}