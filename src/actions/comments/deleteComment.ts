"use server"

import { CommentsService } from "@/services/comments.service"

export const deleteCommentAction = async (id: string) => {
  const response = await CommentsService.deleteComment(id);
  return response;
}