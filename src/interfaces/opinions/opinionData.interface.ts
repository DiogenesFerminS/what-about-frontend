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
    username: string
  }
}

export interface OpinionData {
  data: Opinion[];
  meta: {
    lastPage: number,
    page: number,
    total: number,
  };
}