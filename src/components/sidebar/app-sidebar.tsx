import * as React from "react";

import { NavUser } from "@/components/sidebar/nav-user";
import { SidebarBrand } from "@/components/sidebar/brand";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getMe } from "@/actions/user/me";

export async function AppSidebar({
  menuItems,
  ...props
}: React.ComponentProps<typeof Sidebar> & { menuItems: React.ReactNode }) {
  const me = await getMe();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>{menuItems}</SidebarContent>
      <SidebarFooter>
        <NavUser user={me} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
