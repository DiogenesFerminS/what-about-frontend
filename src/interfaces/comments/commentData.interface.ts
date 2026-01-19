import { User } from "../common/user-interface";
import { Opinion } from "../opinions/opinionData.interface";

export interface Comment {
  id: string;
  content: string;
  opinion: Opinion;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentData {
  data: Comment[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateComment {
  content: string;
  opinionId: string;
}

export interface CommentResponse {
  message: string;
}