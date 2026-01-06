import { AppSideBar } from "@/components/common/sideBar/sidebar-app"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UsersService } from "@/services/users.service";

const AuthLayout = async ({ children }: { children: React.ReactNode}) => {

  const user = await UsersService.getUser();
  console.log(user);

  return (
    <SidebarProvider>
      <AppSideBar/>
      <main className="w-full">
        <SidebarTrigger/>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default AuthLayout