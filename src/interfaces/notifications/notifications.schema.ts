import { User } from "../common/user-interface";
import { Opinion } from "../opinions/opinionData.interface";

export enum NotificationType {
  LIKE = 'LIKE',
  FOLLOW = 'FOLLOW',
  REPOST = 'REPOST',
}

export interface Notification {
  id: string,
  type: NotificationType,
  owner: User,
  creator: User,
  isRead: boolean,
  createdAt: Date,
  opinion: Opinion,
}

export interface NotificationsResponse {
  meta: {
    total: number,
    page: number,
    limit: number,
    totalPage: number
  }, 
  data: Notification[]
}