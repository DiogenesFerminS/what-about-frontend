"use server"

import { RepostsService } from "@/services/reposts.service"

export const createRepostAction = async (opinionId: string, title: string, content: string) => {
  const response = await RepostsService.createRepost(opinionId, title, content);
  
  return response;
}