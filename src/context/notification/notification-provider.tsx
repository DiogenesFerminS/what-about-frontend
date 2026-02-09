"use client"
import { useCallback, useEffect, useState } from "react";
import { NotificationContext } from "./notification-context";
import { getNotReadAction } from "@/actions/notifications/getNotReadAction";

interface Props {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
  const [notRead, setNotRead] = useState<number>(0);

  const loadNotRead = useCallback( async () => {
  const { success, data, error } = await getNotReadAction();

  if (!success && error) {
    setNotRead(0);
    return;
  }

  if (!data) return;

  setNotRead(data.count);
}, [setNotRead])

  useEffect(() => {
    const init = async () => {
      await loadNotRead();
    }

    init();
  }, [loadNotRead]);

  return (
    <NotificationContext.Provider value={{ notRead, loadNotRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
