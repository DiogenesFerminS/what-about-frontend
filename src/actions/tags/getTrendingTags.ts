import { TagsService } from "@/services/tags.service"

export const getTrendingTagsActions = async () => {
    const response = await TagsService.getTagsTrending();
    return response;
}