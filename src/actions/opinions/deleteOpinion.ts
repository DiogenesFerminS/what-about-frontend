"use server";

import { OpinionsService } from "@/services/opinions.service";

export const deleteOpinionAction = async (id: string) => {
  const resp = await OpinionsService.deleteOpinion(id);
  return resp;
}