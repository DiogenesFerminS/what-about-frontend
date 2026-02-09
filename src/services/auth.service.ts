import { LoginForm } from "@/schemas/auth/login.schema";
import { HttpClient } from "./http-client";
import { cookies } from "next/headers";
import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { RegisterForm } from "@/schemas/auth/register.schema";
import { User } from "@/interfaces/common/user-interface";
import { ResetForm } from "@/schemas/auth/reset-password.schema";
import { RecoveryForm } from "@/schemas/auth/recovery-password.schema";

export class AuthService {

  static async checkAuth() {
    return HttpClient.punchEndPoint<undefined, User>({
      url: '/users/profile',
      method: "GET",
    });
  }

  static async logout() {
    const response = await HttpClient.punchEndPoint<undefined, undefined>({
      url: '/auth/logout',
      method: 'POST',
    });

    if( response.success ) {
      const cookiesStore = await cookies();
      cookiesStore.delete("auth-token");
      cookiesStore.delete("refresh-token");
    }

    return response;
  }

  static async login(data: LoginForm):Promise<ServiceResponse<undefined>> {
    const response = await HttpClient.punchEndPoint<LoginForm, {accessToken: string, refreshToken: string}>({
        url:'/auth/login',
        method: "POST",
        body: data,
        isPublic: true,
    });

    if (response.success && response.data) {
      const cookiesStore = await cookies();
      cookiesStore.set("auth-token", response.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 15,
      });

      cookiesStore.set("refresh-token", response.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    };

    return {
        success: response.success,
        statusCode: response.statusCode,
        data: undefined,
        error: response.error,
    };
  }

  static async register(data: RegisterForm) {
    return HttpClient.punchEndPoint<RegisterForm, string>({
      body: data,
      method: 'POST',
      url: '/auth/create-account',
      isPublic: true,
    });
  }

  static async verifyAccount(token: string) {
    return HttpClient.punchEndPoint<undefined,User>({
      method: 'GET',
      url: `/auth/verify-account/${token}`,
      isPublic: true,
    });
  }

  static async resetPassword(data: ResetForm, token: string) {
    return HttpClient.punchEndPoint<{password:string}, User>({
      url: `/auth/reset-password/${token}`,
      method: 'POST',
      body: {password: data.password},
      isPublic: true,
    })
  }

  static async recoveryPassword(data: RecoveryForm) {
    return HttpClient.punchEndPoint<RecoveryForm, string>({
      url: '/auth/reset-password',
      method: "POST",
      body: data,
      isPublic: true,
    });
  }
}