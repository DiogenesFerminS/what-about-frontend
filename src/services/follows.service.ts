import { HttpClient } from "@/services/http-client";
import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { Follow, FollowStats, FollowResponse } from "@/interfaces/follows/followData.interface";
import { revalidatePath } from "next/cache";

export class FollowsService {
  static async createFollow(id: string): Promise<ServiceResponse<Follow>> {
    const response = await HttpClient.punchEndPoint<undefined, Follow>({
      url: `/follows/${id}`,
      method: "POST"
    });
    
    if (response.success) {
      revalidatePath(`/wa/profile/${id}`);
    }
    
    return response;
  }

  static async isFollowed(id: string): Promise<ServiceResponse<boolean>> {
    return HttpClient.punchEndPoint<undefined, boolean>({
      url: `/follows/is-followed/${id}`,
      method: "GET",
      nextOptions: { cache: "no-store" }
    });
  }

  static async unfollow(id: string): Promise<ServiceResponse<FollowResponse>> {
    const response = await HttpClient.punchEndPoint<undefined, FollowResponse>({
      url: `/follows/${id}`,
      method: "DELETE"
    });
    
    if (response.success) {
      revalidatePath(`/wa/profile/${id}`);
    }
    
    return response;
  }

  static async getFollowStats(id: string): Promise<ServiceResponse<FollowStats>> {
    return HttpClient.punchEndPoint<undefined, FollowStats>({
      url: `/follows/stats/${id}`,
      method: "GET",
      nextOptions: { cache: "no-store" }
    });
  }
}