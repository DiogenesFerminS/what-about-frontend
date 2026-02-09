"use client"

import { createContext, useContext } from "react";

interface NotificationContext {
  notRead: number;
  loadNotRead: () => void;
};

export const NotificationContext = createContext<NotificationContext | undefined >(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("You are trying to use the context outside the provider. (NOTIFICATION PROVIDER)")
  }

  return context;
}