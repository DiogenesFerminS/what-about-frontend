import { User } from "../common/user-interface";
import { Opinion } from "../opinions/opinionData.interface";

export enum NotificationType {
  LIKE = 'LIKE',
  FOLLOW = 'FOLLOW',
  COMMENT = 'COMMENT',
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
  ok: boolean,
  message: string,
  data: Notification[]
}