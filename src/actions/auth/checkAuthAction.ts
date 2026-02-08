"use server"

import { AuthService } from "@/services/auth.service"

export const checkAuthAction = async () => {
  return AuthService.checkAuth();
}