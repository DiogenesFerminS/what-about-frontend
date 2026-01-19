"use server"

import { CommentsService } from "@/services/comments.service"

export const getCommentsByOpinionAction = async (opinionId: string, page: number) => {
  const response = await CommentsService.getCommentsByOpinionId(opinionId, { page });
  return response;
}