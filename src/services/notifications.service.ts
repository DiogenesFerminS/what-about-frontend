import { type Notification } from "@/interfaces/notifications/notifications.schema";
import { HttpClient } from "./http-client";

export class NotificationsService {
  static getNotifications() {
    return HttpClient.punchEndPoint<undefined, Notification[]>({
        method: 'GET',
        url: '/notifications/stats'
    })
  }
}