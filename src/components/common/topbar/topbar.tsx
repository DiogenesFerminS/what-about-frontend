"use client"

import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import ProfileMenu from "./profileMenu";

const Topbar = () => {

  const { toggleSidebar } = useSidebar();

  return (
    <div className='bg-sidebar flex justify-between items-center py-2 w-full fixed top-0 z-20 h-12'>
        <div>
            <button 
                className="p-1 cursor-pointer"
                onClick={toggleSidebar}
            >
                <Menu/>
            </button>
        </div>

        <div className="mr-3">
            <ProfileMenu/>
        </div>
        
    </div>
  )
}

export default Topbar