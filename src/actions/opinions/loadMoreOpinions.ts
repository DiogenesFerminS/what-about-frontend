"use server"

import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import { OpinionsService } from "@/services/opinions.service";

const loadMoreOpinions = async (page: number): Promise<Opinion[]> => {
    const response = await OpinionsService.getOpinions({page: page});

    if(!response.success || !response.data) {
        return [];
    };

    return response.data.data;
};

export default loadMoreOpinions;