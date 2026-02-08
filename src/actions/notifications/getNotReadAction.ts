"use server"

import { NotificationsService } from "@/services/notifications.service"

export const getNotReadAction = async () => {
  const response = await NotificationsService.getCountNotRead();

  return response
}