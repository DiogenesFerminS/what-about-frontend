"use server";
import { OpinionsService } from "@/services/opinions.service";

export const loadOpinionsByTermAction = async (term: string, page: number) => {
  const response = await OpinionsService.findByterm(term, { page });
  if (!response.success || !response.data) {
    return [];
  }

  return response.data.data;
};
