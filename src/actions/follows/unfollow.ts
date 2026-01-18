"use server"

import { FollowsService } from "@/services/follows.service"

export const unfollowAction = async (id: string) => {
  const response = await FollowsService.unfollow(id);
  return response;
}