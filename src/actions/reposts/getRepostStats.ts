"use server"

import { RepostsService } from "@/services/reposts.service"

export const getRepostStatsAction = async (opinionId: string) => {
  const response = await RepostsService.getStats(opinionId);
  return response;
}