import { Pagination } from "@/interfaces/common/pagination.interface";
import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { Opinion, OpinionData, SimpleOpinion } from "@/interfaces/opinions/opinionData.interface";
import { cookies } from "next/headers";

export class OpinionsService {
  static async getOpinions({
    limit = 10,
    page,
  }: Pagination): Promise<ServiceResponse<OpinionData>> {
    const token = await this.getToken();

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        error: "Unauthorized user",
      };
    }

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/opinions?limit=${limit}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Cookie": `auth-token=${token}`,
            "Content-Type": "application/json",
          },
          //   next: {revalidate: 300},
          cache: "no-store",
        }
      );

      const res: { MessageChannel: string; ok: boolean; data: OpinionData } =
        await resp.json();
      return {
        success: true,
        statusCode: 200,
        data: res.data,
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
  static async getOpinionsByUser(
    { limit = 10, page }: Pagination,
    userId: string
  ): Promise<ServiceResponse<OpinionData>> {
    const token = await this.getToken();

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        error: "Unauthorized user",
      };
    }
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/opinions/user/${userId}?limit=${limit}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Cookie": `auth-token=${token}`,
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
          error: "Request failed",
        };
      }

      return {
        success: true,
        statusCode: 200,
        data: data.data,
      };
    } catch {
      return {
        success: false,
        statusCode: 400,
        error: "Request failed",
      }
    }
  }

  static createOpinion = async(formData: FormData): Promise<ServiceResponse<SimpleOpinion>> => {
    const token = await this.getToken();

    if(!token) {
      return {
        success: false,
        error: 'User Unauthorized',
        statusCode: 401,
      }
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/opinions/create`, {
        method: "POST",
        headers: {
          "Cookie": `auth-token=${token}`,
        },
        body: formData,
      });

      if(!response.ok) {
        return {
          statusCode: 400,
          success: false,
          error: 'The opinion could not be created, please try later',
        }
      }

      return {
        statusCode: 200,
        success: true,
      }
    } catch {
      return {
        statusCode: 500,
        success: false,
        error: 'Request failed, please try later'
      }
    }
  }

  static deleteOpinion = async (id: string): Promise<ServiceResponse<{ success:boolean }>> => {
    const token = await this.getToken();

    if(!token) {
      return {
        statusCode: 401,
        success: false,
        error: 'User Unauthorized'
      };
    };

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/opinions/${id}`, {
        method: 'DELETE',
        headers: {
          "Cookie": `auth-token=${token}`,
        },
      });

      if(!resp.ok) {
        return {
          statusCode: 400,
          success: false,
          error: 'The opinion could not be deleted'
        }
      };
      
      const data = await resp.json();

      return {
        success: true,
        statusCode: 200,
        data: data.data,
      }

    } catch {
      return {
        statusCode: 500,
        success: false,
        error: 'Request failed, please try later'
      }
    }
  }

  static findOneById = async(id: string): Promise<ServiceResponse<Opinion>> => {
    const token = await this.getToken();

    if(!token) {
      return {
        statusCode: 401,
        success: false,
        error: 'User Unauthorized',
      }
    };

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/opinions/${id}`, {
        method: 'GET',
        headers: {
          "Cookie": `auth-token=${token}`
        }
      });

      if(!resp.ok) {
        return {
          statusCode: 400,
          success: false,
          error: 'The opinion could not be retrieved.'
        };
      };

      const data = await resp.json();

      return {
        success: true,
        statusCode: 200,
        data: data.data,
      };
    } catch {
      return {
        statusCode: 500,
        success: false,
        error: "Request failed, please try later",
      };
    }
  }

  static updateOpinion = async (formData: FormData, id: string) => {
    const token = await this.getToken();

    if(!token) {
      return {
        statusCode: 401,
        success: false,
        error: 'User Unauthorized',
      }
    };

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/opinions/${id}`, {
        method: 'PATCH',
        headers: {
          'Cookie': `auth-token=${token}`,
        },
        body: formData,
      });

      if (!resp.ok) {
        return {
          statusCode: 500,
          success: false,
          error: "Request failed, please try later",
        };
      }

      const response = await resp.json();

      if(!response.ok) {
        return {
          statusCode: 400,
          success: false,
          error: response.error,
        };
      };

      return {
        statusCode: 200,
        success: true,
        data: response.data
      };
      
    } catch {
      return {
        statusCode: 500,
        success: false,
        error: "Request failed, please try later",
      };
    }
  }

  private static async getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    return token;
  }
}
