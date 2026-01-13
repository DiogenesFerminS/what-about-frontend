import { AppSideBar } from "@/components/common/sideBar/sidebar-app"
import Topbar from "@/components/common/topbar/topbar";
import { SidebarProvider } from "@/components/ui/sidebar"

const AuthLayout = async ({ children }: { children: React.ReactNode}) => {

  return (
    <SidebarProvider>
      <AppSideBar/>
        <Topbar/>

        <main className="w-full dark:bg-stone-950 bg-gray-100 pt-13">
          {children}
        </main>

    </SidebarProvider>
  )
}

export default AuthLayout