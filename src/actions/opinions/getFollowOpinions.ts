"use server"

import { OpinionsService } from "@/services/opinions.service"

export const getFollowOpinionsAction = async (page: number) => {
  const response = await OpinionsService.getFollowOpinions({page});
  if(!response.success || !response.data) {
    return [];
};

  return response.data.data;
}