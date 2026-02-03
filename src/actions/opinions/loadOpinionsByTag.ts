"use server"

import { OpinionsService } from "@/services/opinions.service"

export const loadOpinionsByTagAction = async (tag: string, page: number) => {
  const { success, data } = await OpinionsService.getOpinionsByTag(tag, {page});

  if(!success || !data) {
    return [];
  };

  return data.data
}