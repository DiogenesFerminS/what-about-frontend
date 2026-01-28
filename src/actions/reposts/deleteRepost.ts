"use server"

import { RepostsService } from "@/services/reposts.service"

export const deleteRepostAction = async (opinionId: string) => {
  const response = await RepostsService.deleteRepost(opinionId);
  return response;
}