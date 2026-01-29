import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import { HttpClient } from "./http-client";

export class RepostsService {
  static async createRepost(opinionId:string, title:string, content:string ): Promise<ServiceResponse<Opinion>> {
    const body = {
        title,
        content
    }

    const response = HttpClient.punchEndPoint<{title:string, content:string}, Opinion>({body, method: 'POST', url: `/opinions/repost/${opinionId}`});
    return response; 
  }

  static async deleteRepost(opinionId:string): Promise<ServiceResponse<{success: boolean}>> {
    const response = HttpClient.punchEndPoint<undefined, {success:boolean} >({method: 'DELETE', url:`/opinions/repost/${opinionId}`})
    return response;
  }

  static async getStats(opinionId: string): Promise<ServiceResponse<{total: number, myRepost:boolean}>> {
    const response = HttpClient.punchEndPoint<undefined, {total: number, myRepost:boolean}>({
        method: 'GET',
        url: `/opinions/repost/stats/${opinionId}`,
    });

    return response
  }
}