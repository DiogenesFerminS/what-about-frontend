"use server"

import { OpinionsService } from "@/services/opinions.service"

export const updateOpinionAction = async (formData:FormData, id: string) => {
  const resp = await OpinionsService.updateOpinion(formData, id);
  return resp;
}