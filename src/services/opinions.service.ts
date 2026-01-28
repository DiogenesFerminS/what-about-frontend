import { HttpClient } from "@/services/http-client";
import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { Opinion, OpinionData, SimpleOpinion } from "@/interfaces/opinions/opinionData.interface";
import { Pagination } from "@/interfaces/common/pagination.interface";

export class OpinionsService {
  static async getOpinions({
    limit = 10,
    page,
  }: Pagination): Promise<ServiceResponse<OpinionData>> {
    return HttpClient.punchEndPoint<undefined, OpinionData>({
      url: "/opinions",
      method: "GET",
      params: { limit, page },
      nextOptions: { cache: "no-store" }
    });
  }
  static async getOpinionsByUser(
    { limit = 10, page }: Pagination,
    userId: string
  ): Promise<ServiceResponse<OpinionData>> {
    return HttpClient.punchEndPoint<undefined, OpinionData>({
      url: `/opinions/user/${userId}`,
      method: "GET",
      params: { limit, page },
      nextOptions: { cache: "no-store" }
    });
  }

  static async getFollowOpinions({
    limit = 10,
    page,
  }: Pagination): Promise<ServiceResponse<OpinionData>> {
    return HttpClient.punchEndPoint<undefined, OpinionData>({
      url: "/opinions/follow-opinions",
      method: "GET",
      params: { limit, page },
      nextOptions: { cache: "no-store" }
    });
  }

  static async createOpinion(formData: FormData): Promise<ServiceResponse<SimpleOpinion>> {
    return HttpClient.punchEndPoint<FormData, SimpleOpinion>({
      url: "/opinions/create",
      method: "POST",
      body: formData,
      isFormData: true
    });
  }

  static async deleteOpinion(id: string): Promise<ServiceResponse<{ success: boolean }>> {
    return HttpClient.punchEndPoint<undefined, { success: boolean }>({
      url: `/opinions/${id}`,
      method: "DELETE"
    });
  }

  static async findOneById(id: string): Promise<ServiceResponse<Opinion>> {
    return HttpClient.punchEndPoint<undefined, Opinion>({
      url: `/opinions/${id}`,
      method: "GET"
    });
  }

  static async getAllOneById(id: string): Promise<ServiceResponse<Opinion>> {
    return HttpClient.punchEndPoint<undefined, Opinion>({
      url: `/opinions/get/${id}`,
      method: "GET"
    });
  }

  static async findByterm(term: string, {limit = 10, page}: Pagination): Promise<ServiceResponse<OpinionData>> {
    return HttpClient.punchEndPoint<undefined, OpinionData>({
      url: "/opinions/search",
      method: "GET",
      params: { term, limit, page }
    });
  }

  static async updateOpinion(formData: FormData, id: string) {
    return HttpClient.punchEndPoint<FormData, SimpleOpinion>({
      url: `/opinions/${id}`,
      method: "PATCH",
      body: formData,
      isFormData: true
    });
  }
}
