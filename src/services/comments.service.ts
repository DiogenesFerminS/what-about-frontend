import { HttpClient } from "@/services/http-client";
import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { Comment, CommentData, CreateComment, CommentResponse } from "@/interfaces/comments/commentData.interface";
import { Pagination } from "@/interfaces/common/pagination.interface";

export class CommentsService {
  static async getCommentsByOpinionId(
    opinionId: string,
    { limit = 10, page }: Pagination
  ): Promise<ServiceResponse<CommentData>> {
    return HttpClient.punchEndPoint<undefined, CommentData>({
      url: `/comments/opinion/${opinionId}`,
      method: "GET",
      params: { limit, page },
      nextOptions: { cache: "no-store" }
    });
  }

  static async createComment(commentData: CreateComment): Promise<ServiceResponse<Comment>> {
    return HttpClient.punchEndPoint<CreateComment, Comment>({
      url: "/comments",
      method: "POST",
      body: commentData
    });
  }

  static async deleteComment(id: string): Promise<ServiceResponse<CommentResponse>> {
    return HttpClient.punchEndPoint<undefined, CommentResponse>({
      url: `/comments/${id}`,
      method: "DELETE"
    });
  }

  static async getCommentsCountByOpinionId(opinionId: string): Promise<ServiceResponse<{ count: number }>> {
    return HttpClient.punchEndPoint<undefined, { count: number }>({
      url: `/comments/count/opinion/${opinionId}`,
      method: "GET",
      nextOptions: { cache: "no-store" }
    });
  }
}