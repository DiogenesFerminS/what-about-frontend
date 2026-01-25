export interface Opinion {
  content: string,
  createdAt: string,
  title: string,
  id: string,
  imageUrl: string,
  isEdited: boolean,
  originalOpinion: Opinion,
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

export interface SimpleOpinion {
  content: string;
  createdAt: Date,
  deletedAt: Date | null,
  id: string,
  imageUrl: string | null,
  isEdited: boolean,
  updatedAt: Date,
  user: {id: string}
};