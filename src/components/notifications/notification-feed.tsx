"use client";

import { useEffect, useState } from "react";
import NotificationAlert from "./notification-alert";
import { Notification } from "@/interfaces/notifications/notifications.schema";
import { getNotificationsAction } from "@/actions/notifications/getNotificationsAction";
import { Button } from "../ui/button";
import { useNotificationContext } from "@/context/notification/notification-context";
import { BellOff } from "lucide-react";

interface Props {
  initialNotifications: Notification[];
}

export default function NotificationsFeed({ initialNotifications }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [page, setPage] = useState<number>(2);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {loadNotRead} = useNotificationContext();

  const loadMoreNotifications = async () => {
    if( !hasMore || loading ) return;

    setLoading(true)
    const {success, data, error} = await getNotificationsAction(page);
    if(!success && error) {
      setError(true);
      return;
    };

    if(!data) {
      setError(true);
      return;
    }

    setNotifications((prev) => [...prev, ...data.data]);
    if(page === data.meta.totalPage) {
        setHasMore(false);
    }else {
        setPage((prev) => prev +1);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (notifications.length > 0) {
      loadNotRead()
    }
  }, [loadNotRead, notifications]);
  
 return (
    <div className="py-2">
      {notifications.map((notification) => (
        <NotificationAlert key={notification.id} notification={notification}/>
      ))}

      {
        error && (
          <div className="text-center">
              <span className="text-sm text-red-600">An error occurred while retrieving your notifications.</span>
          </div>
        )
      }
      
      {
        (hasMore && !error) && (notifications.length > 10) &&
        <div>
            <Button
              onClick={loadMoreNotifications}
              className="mx-auto block my-2"
            >
                Load more...
            </Button>
        </div>
      }

      {
        !hasMore &&
        <div className="text-center">
            <span className="text-sm text-gray-400">You have reached the end of notifications</span>
        </div>
      }

      {
        notifications.length === 0 &&
        (
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="text-sm text-gray-400">No notifications were found.</span>
            <BellOff className="text-violet-600"/>
          </div>
        )
      }
    </div>
 )
}