"use server"

import { CommentsService } from "@/services/comments.service"
import { CreateComment } from "@/interfaces/comments/commentData.interface"

export const createCommentAction = async (commentData: CreateComment) => {
  const response = await CommentsService.createComment(commentData);
  return response;
}