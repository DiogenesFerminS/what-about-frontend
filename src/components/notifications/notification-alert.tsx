import { formatDate } from "@/helpers/formatDateSmart";
import { Notification, NotificationType } from "@/interfaces/notifications/notifications.schema"
import Image from "next/image";
import Link from "next/link";

interface Props {
  notification: Notification
}

const NotificationAlert = ({notification}: Props ) => {
  const {createdAt, creator, type, opinion} = notification;

  const date = formatDate(createdAt);

  let notificationText: React.ReactNode;
  
  switch (type) {
    case NotificationType.FOLLOW:
      notificationText = (
        <div>
          <span>
            <Link
              href={`/wa/profile/${creator.id}`}
              className="text-violet-500 font-bold hover:underline"
            >{creator.username} </Link> 
            has started following you
          </span>
        </div>
      )
    break;
    case NotificationType.LIKE: 

    notificationText = (
      <div className="flex gap-3 items-center">
       {
        opinion.imageUrl && (
        <Link
          href={`/wa/opinions/${opinion.id}`}
        >
          <Image
            width={60}
            height={60}
            src={opinion.imageUrl}
            alt="Post image"
            className="aspect-square object-cover"
          />
        </Link>
        )
       }
        <span>
          <Link
            href={`/wa/profile/${creator.id}`}
            className="text-violet-500 font-bold hover:underline"

          >{creator.username} </Link> 
          has indicated that he likes your
          <Link
            href={`/wa/opinions/${opinion.id}`}
            className="text-violet-500 font-bold hover:underline"
          > post</Link>
        </span>
      </div>
    )
    break;
    case NotificationType.COMMENT:
      notificationText = (
      <div className="flex gap-3 items-center">
       {
        opinion.imageUrl && (
        <Link
          href={`/wa/opinions/${opinion.id}`}
        >
          <Image
            width={60}
            height={60}
            src={opinion.imageUrl}
            alt="Post image"
            className="aspect-square object-cover"
          />
        </Link>
        )
       }
        <span>
          <Link
            href={`/wa/profile/${creator.id}`}
            className="text-violet-500 font-bold hover:underline"

          >{creator.username} </Link> 
          has commented on your
          <Link
            href={`/wa/opinions/${opinion.id}`}
            className="text-violet-500 font-bold hover:underline"
          > post</Link>
        </span>
      </div>
    )
    break;

    case NotificationType.REPOST:
      notificationText = (
      <div className="flex gap-3 items-center">
       {
        opinion.imageUrl && (
        <Link
          href={`/wa/opinions/${opinion.id}`}
        >
          <Image
            width={60}
            height={60}
            src={opinion.imageUrl}
            alt="Post image"
            className="aspect-square object-cover"
          />
        </Link>
        )
       }
        <span>
          <Link
            href={`/wa/profile/${creator.id}`}
            className="text-violet-500 font-bold hover:underline"

          >{creator.username} </Link> 
          has reposted your
          <Link
            href={`/wa/opinions/${opinion.id}`}
            className="text-violet-500 font-bold hover:underline"
          > post</Link>
        </span>
      </div>
    )
    break;
  }

  return (
    <div className="bg-stone-900 rounded-lg my-3 p-3 flex flex-col gap-2 max-w-140 mx-auto">
      <span className="text-violet-300 font-bold text-xs">{date}</span>
      {notificationText}
    </div>
  )
}

export default NotificationAlert