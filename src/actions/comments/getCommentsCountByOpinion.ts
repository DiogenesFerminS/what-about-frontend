"use server"

import { CommentsService } from "@/services/comments.service"

export const getCommentsCountByOpinionAction = async (opinionId: string) => {
  const response = await CommentsService.getCommentsCountByOpinionId(opinionId);
  return response;
}