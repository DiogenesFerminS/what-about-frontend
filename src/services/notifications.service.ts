import { type NotificationsResponse } from "@/interfaces/notifications/notifications.schema";
import { HttpClient } from "./http-client";

export class NotificationsService {
  static getNotifications(page: number) {
    return HttpClient.punchEndPoint<undefined, NotificationsResponse>({
        method: 'GET',
        url: '/notifications/stats',
        params: {limit: 10, page: page},
    })
  }

  static getCountNotRead() {
    return HttpClient.punchEndPoint<undefined, {count: number}>({
      method: 'GET',
      url: '/notifications/not-read'
    })
  }
}