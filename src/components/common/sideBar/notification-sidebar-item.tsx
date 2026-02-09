"use client"
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { useNotificationContext } from '@/context/notification/notification-context';
import { Bell } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NotificationSideBarItem = () => {
  const pathname = usePathname();
  const { notRead } = useNotificationContext();
  const isActive = pathname === '/wa/notifications' || pathname.startsWith(`/wa/notifications/`)
  return (
    <SidebarMenuButton asChild size={"lg"} isActive={isActive}>
        <Link
          className='relative' 
          href={'/wa/notifications'}
        >

            {
                notRead > 0 &&
                    <div className='absolute top-1 left-1 bg-red-600 rounded-full h-4 w-4 flex justify-center items-center text-sm font-bold'>{notRead}</div>
            }

            <span className="[&_svg]:size-6"> 
             <Bell/>
            </span>
            <span>Notifications</span>

        </Link>
    </SidebarMenuButton>
  )
}

export default NotificationSideBarItem