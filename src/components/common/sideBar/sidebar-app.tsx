import { House, Pen, Search, User } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu } from "../../ui/sidebar"
import SideBarItem from "./sidebar-item"
import { FieldSeparator } from "@/components/ui/field"

const options = [
    {
      name: "For you",
      href: "/wa/for-you",
      icon: <House strokeWidth={1.2}/> 
    },
    {
        name: "Explore",
        href: "/wa/explore",
        icon: <Search strokeWidth={1.2}/> 
    },
    {
        name: "Followed",
        href: "/wa/followed",
        icon: <User strokeWidth={1.2}/>
    },
    {
      name: "Make Opinion",
      href: "/wa/opinions/make",
      icon: <Pen strokeWidth={1.2}/>
    },
]

export const AppSideBar = () => {

  return (
    <Sidebar>
      <SidebarHeader className="pt-12">
        <div className="flex flex-col gap-2 py-3 justify-center items-center">
          <span className="text-xl font-bold text-center">What About?</span>
          <span className="text-sm text-violet-600 font-bold text-center">By diogenes fermin</span>
        </div>
        
      </SidebarHeader>
      <FieldSeparator/>
      <SidebarContent>
        <SidebarGroup />
          <SidebarGroupContent>
            <SidebarMenu>
              {
                options.map((item) => (
                  <SideBarItem 
                    key={item.name}
                    {...item}
                  />
                ))
              }
              
            </SidebarMenu>
          </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}