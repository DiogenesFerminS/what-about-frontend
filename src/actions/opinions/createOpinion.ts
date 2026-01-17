"use server"

import { OpinionsService } from "@/services/opinions.service"

export const createOpinionAction = async (formdata: FormData) => {
    const response = await OpinionsService.createOpinion(formdata);
    return response
}