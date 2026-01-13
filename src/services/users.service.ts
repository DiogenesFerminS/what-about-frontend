import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { User } from "@/interfaces/common/user-interface";
import { cookies } from "next/headers";

export class UsersService {

  async getUser(): Promise<ServiceResponse<User>> {
    const token = await this.getToken();
    if(!token) {
      return {
        success: false,
        error: 'Unauthorized user',
        statusCode: 401,
      };
    };

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
        {
          method: "GET",
          headers: {
            Cookie: `auth-token=${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const data = await resp.json();

      if (!resp.ok) {
        return {
          success: false,
          statusCode: 400,
          error: 'Request failed'
        }
      }
      return {
        success: true,
        statusCode: 200,
        data: data.data
      }
    } catch (error) {
      console.error("Error conectando al backend:", error);
      return {
        success: false,
        statusCode: 400,
        error: 'Request failed'
      }
    }
  }

  getUserById = async (id: string): Promise<ServiceResponse<User>> => {
    const token = await this.getToken();

    if(!token) {
      return {
        success: false,
        error: 'Unauthorized user',
        statusCode: 401,
      };
    };

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`,
        {
          method: "GET",
          headers: {
            Cookie: `auth-token=${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const data = await resp.json();

      if (!resp.ok) {
        return {
          success: false,
          statusCode: 400,
          error: 'Request failed'
        }
      }

      return {
        success: true,
        data: data.data,
        statusCode: 200,
      }
    } catch {
      return {
          success: false,
          statusCode: 400,
          error: 'Request failed'
        }
    }
  };

  private getToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    return token;
    }
}
