import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { Follow, FollowStats, FollowResponse } from "@/interfaces/follows/followData.interface";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export class FollowsService {
  static async createFollow(id: string): Promise<ServiceResponse<Follow>> {
    const token = await this.getToken();

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        error: "Unauthorized user",
      };
    }

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/follows/${id}`, {
        method: "POST",
        headers: {
          "Cookie": `auth-token=${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        return {
          statusCode: resp.status,
          success: false,
          error: "The follow could not be created, please try later",
        };
      }

      const data = await resp.json();
      revalidatePath(`/wa/profile/${id}`);
      return {
        success: true,
        statusCode: 201,
        data: data.data,
      };
      
    } catch (error) {
      console.error("Connection failed:", error);

      return {
        statusCode: 503,
        error: "Connection failed",
        success: false,
      };
    }
  }

  static async isFollowed(id: string): Promise<ServiceResponse<boolean>> {
    const token = await this.getToken();

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        error: "Unauthorized user",
      };
    }

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/follows/is-followed/${id}`, {
        method: "GET",
        headers: {
          "Cookie": `auth-token=${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!resp.ok) {
        return {
          statusCode: resp.status,
          success: false,
          error: "Request failed",
        };
      }

      const data = await resp.json();
      return {
        success: true,
        statusCode: 200,
        data: data.data,
      };
    } catch (error) {
      console.error("Connection failed:", error);

      return {
        statusCode: 503,
        error: "Connection failed",
        success: false,
      };
    }
  }

  static async unfollow(id: string): Promise<ServiceResponse<FollowResponse>> {
    const token = await this.getToken();

    if (!token) {
      return {
        statusCode: 401,
        success: false,
        error: "User Unauthorized",
      };
    }

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/follows/${id}`, {
        method: "DELETE",
        headers: {
          "Cookie": `auth-token=${token}`,
        },
      });

      if (!resp.ok) {
        return {
          statusCode: resp.status,
          success: false,
          error: "The unfollow could not be completed",
        };
      }

      const data = await resp.json();
      revalidatePath(`/wa/profile/${id}`);
      return {
        success: true,
        statusCode: 200,
        data: data.data,
      };
    } catch (error) {
      console.error("Connection failed:", error);

      return {
        statusCode: 500,
        success: false,
        error: "Request failed, please try later",
      };
    }
  }

  static async getFollowStats(id: string): Promise<ServiceResponse<FollowStats>> {
    const token = await this.getToken();

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        error: "Unauthorized user",
      };
    }

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/follows/stats/${id}`, {
        method: "GET",
        headers: {
          "Cookie": `auth-token=${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!resp.ok) {
        return {
          statusCode: resp.status,
          success: false,
          error: "Request failed",
        };
      }

      const data = await resp.json();

      return {
        success: true,
        statusCode: 200,
        data: data.data,
      };
    } catch (error) {
      console.error("Connection failed:", error);

      return {
        statusCode: 503,
        error: "Connection failed",
        success: false,
      };
    }
  }

  private static async getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    return token;
  }
}