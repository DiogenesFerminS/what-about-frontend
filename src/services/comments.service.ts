import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { Comment, CommentData, CreateComment, CommentResponse } from "@/interfaces/comments/commentData.interface";
import { Pagination } from "@/interfaces/common/pagination.interface";
import { cookies } from "next/headers";

export class CommentsService {
  static async getCommentsByOpinionId(
    opinionId: string,
    { limit = 10, page }: Pagination
  ): Promise<ServiceResponse<CommentData>> {
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/opinion/${opinionId}?limit=${limit}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Cookie": `auth-token=${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!resp.ok) {
        return {
          statusCode: resp.status,
          success: false,
          error: "Request failed",
        };
      }

      const { ok, data } = await resp.json();

      if (!ok) {
        return {
          success: false,
          statusCode: 400,
          error: "Request failed",
        };
      }

      return {
        success: true,
        statusCode: 200,
        data: data,
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

  static async createComment(commentData: CreateComment): Promise<ServiceResponse<Comment>> {
    const token = await this.getToken();

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        error: "Unauthorized user",
      };
    }

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comments`, {
        method: "POST",
        headers: {
          "Cookie": `auth-token=${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!resp.ok) {
        return {
          statusCode: resp.status,
          success: false,
          error: "The comment could not be created, please try later",
        };
      }

      const { ok, data } = await resp.json();

      if (!ok) {
        return {
          success: false,
          statusCode: 400,
          error: "The comment could not be created",
        };
      }

      return {
        success: true,
        statusCode: 201,
        data: data,
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

  static async deleteComment(id: string): Promise<ServiceResponse<CommentResponse>> {
    const token = await this.getToken();

    if (!token) {
      return {
        statusCode: 401,
        success: false,
        error: "User Unauthorized",
      };
    }

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Cookie": `auth-token=${token}`,
        },
      });

      if (!resp.ok) {
        return {
          statusCode: resp.status,
          success: false,
          error: "The comment could not be deleted",
        };
      }

      const { ok, data } = await resp.json();

      if (!ok) {
        return {
          success: false,
          statusCode: 400,
          error: "The comment could not be deleted",
        };
      }

      return {
        success: true,
        statusCode: 200,
        data: data,
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

  private static async getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    return token;
  }
}