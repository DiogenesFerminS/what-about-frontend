"use server"
import { NotificationsService } from "@/services/notifications.service"

export const getNotificationsAction = async (page: number) => {
  const response = await NotificationsService.getNotifications(page);
  return response;
}