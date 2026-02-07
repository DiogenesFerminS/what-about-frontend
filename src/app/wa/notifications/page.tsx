import ErrorHandler from "@/components/common/others/errorhandler";
import NotificationAlert from "@/components/notifications/notification-alert";
import { NotificationsService } from "@/services/notifications.service";

export const metadata = {
  title: "Notifications",
  description: "",
};

const NotificationsPage = async () => {
  const { success, data, error } =
    await NotificationsService.getNotifications();

  if (!success && error) {
    return <ErrorHandler errorMessage={error} />;
  }

  if (!data) {
    return <ErrorHandler errorMessage="Notifications not found" />;
  }

  return (
    <div className="mx-auto flex flex-col justify-start w-full lg:max-w-6/12 sm:max-w-110 px-3 gap-5 py-1 md:border-x border-gray-600 h-full">
      <span className="text-xl font-bold text-center mt-2">
        Your Notifications
      </span>

      <div>
        {data.map((notification) => (
          <NotificationAlert key={notification.id} notification={notification}/>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
