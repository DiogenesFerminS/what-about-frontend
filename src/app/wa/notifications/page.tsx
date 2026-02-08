import ErrorHandler from "@/components/common/others/errorhandler";
import NotificationsFeed from "@/components/notifications/notification-feed";
import { NotificationsService } from "@/services/notifications.service";

export const metadata = {
  title: "Notifications",
  description: "",
};

interface PageProps { 
  searchParams: Promise<{page?: string}>
}

const NotificationsPage = async ({searchParams}: PageProps) => {
  const { page } = await searchParams;
  const currentPage = page ? Number(page): 1;


  const { success, data, error } =
    await NotificationsService.getNotifications(currentPage);

  if (!success && error) {
    return <ErrorHandler errorMessage={error} />;
  }

  if (!data) {
    return <ErrorHandler errorMessage="Notifications not found" />;
  }

  return (
    <div className="mx-auto flex flex-col justify-start w-full lg:max-w-6/12 sm:max-w-110 px-3 gap-5 md:border-x border-gray-600 h-full">
      <span className="text-xl font-bold text-center mt-2">
        Your Notifications
      </span>

      <NotificationsFeed initialNotifications={data.data}/>
    </div>
  );
};

export default NotificationsPage;
