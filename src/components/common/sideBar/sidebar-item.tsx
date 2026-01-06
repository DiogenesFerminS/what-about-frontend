"use client"
import { SidebarMenuButton } from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  href: string;
  name: string;
  icon: React.ReactNode;
}

const SideBarItem = ({href, name, icon}: Props) => {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(`${href}/`)
  return (
    <SidebarMenuButton asChild size={"lg"} isActive={isActive}>
        <Link href={href}>
            <span className="[&_svg]:size-6"> 
             {icon}
            </span>
            <span className='text-lg'>{name}</span>
        </Link>
    </SidebarMenuButton>
  )
}

export default SideBarItem