import { House, Pen, Telescope, User } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu } from "../../ui/sidebar"
import SideBarItem from "./sidebar-item"

const options = [
    {
      name: "For you",
      href: "/wa/for-you",
      icon: <House/> 
    },
    {
        name: "Explore",
        href: "/wa/explore",
        icon: <Telescope/> 
    },
    {
        name: "Followed",
        href: "/wa/followed",
        icon: <User/>
    },
    {
      name: "Make Opinion",
      href: "/wa/make",
      icon: <Pen/>
    }
]

export const AppSideBar = () => {

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-xl">What About?</span>
        <span className="text-sm text-violet-600">By diogenes fermin</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
          <SidebarGroupLabel>Features</SidebarGroupLabel>
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