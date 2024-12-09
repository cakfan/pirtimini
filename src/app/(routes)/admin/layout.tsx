import { getMe } from "@/actions/user/me";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import NavItem from "@/components/sidebar/nav-item";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  navDashboardAdmin,
  // navMainAdmin,
  // navUserAdmin,
} from "@/config/nav/admin";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  if (!me) {
    redirect("/signin");
  }

  if (me.role !== "admin") {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar
        menuItems={
          <>
            <NavItem items={navDashboardAdmin} />
            {/* <NavItem label="Products" items={navMainAdmin} /> */}
            {/* <NavItem label="Users" items={navUserAdmin} /> */}
          </>
        }
      />
      <SidebarInset className="min-h-screen w-full">{children}</SidebarInset>
    </SidebarProvider>
  );
}
