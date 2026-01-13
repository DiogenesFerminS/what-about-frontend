"use server"

import { Opinion } from "@/interfaces/opinions/opinionData.interface"
import { OpinionsService } from "@/services/opinions.service"

const loadOpinionsByUser = async (page: number, userId: string): Promise<Opinion[]> => {
    const response = await OpinionsService.getOpinionsByUser({page: page}, userId );

    if(!response.success || !response.data) {
        return [];
    };

    return response.data.data;
};

export default loadOpinionsByUser;