import { AppSideBar } from "@/components/common/sideBar/sidebar-app";
import Topbar from "@/components/common/topbar/topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NotificationProvider } from "@/context/notification/notification-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "What-About?",
    template: "%s | What-about?",
  },
  description:
    "This is a social network created by the developer Diogenes Fermin, geared towards the tech community.",
  keywords: ["docial media", "social network", "tech", "developers", "tech"],
  robots: {
    index: true,
    follow: true,
  },
};

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <NotificationProvider>
        <AppSideBar />
        <Topbar />

        <main className="w-full dark:bg-stone-950 bg-gray-100 pt-13 relative min-h-screen">
          {children}
        </main>
      </NotificationProvider>
    </SidebarProvider>
  );
};

export default AuthLayout;
