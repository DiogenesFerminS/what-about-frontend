"use server"

import { FollowsService } from "@/services/follows.service"

export const getFollowStatsAction = async (id: string) => {
  const response = await FollowsService.getFollowStats(id);
  return response;
}