"use server"

import { FollowsService } from "@/services/follows.service"

export const isFollowedAction = async (id: string) => {
  const response = await FollowsService.isFollowed(id);
  return response;
}