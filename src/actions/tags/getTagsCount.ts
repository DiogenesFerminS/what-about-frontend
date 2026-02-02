"use server"

import { TagsService } from "@/services/tags.service"

export const getCountTagsByName = async (name: string) => {
  const response = await TagsService.getCountTagsByName(name);
  return response;
}