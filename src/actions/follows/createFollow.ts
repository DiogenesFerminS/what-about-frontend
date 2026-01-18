"use server"

import { FollowsService } from "@/services/follows.service"

export const createFollowAction = async (id: string) => {
  const response = await FollowsService.createFollow(id);
  return response;
}