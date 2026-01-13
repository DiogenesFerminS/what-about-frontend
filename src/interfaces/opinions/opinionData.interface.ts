export interface Opinion {
  content: string,
  createdAt: string,
  id: string,
  imageUrl: string,
  isEdited: boolean,
  user: {
    email: string,
    id: string,
    name: string,
    username: string,
    avatarUrl: string,
  }
  likesCount: number,
	isLiked: boolean,
}

export interface OpinionData {
  data: Opinion[];
  meta: {
    page: number,
    limit: number,
    total?: number,
  };
}