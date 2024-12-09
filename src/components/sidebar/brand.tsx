"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BrandIcons } from "../icons/brand-icons";
import Link from "next/link";

export function SidebarBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link href={"/"}>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <BrandIcons.logo className="size-10 dark:invert" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
              <span className="truncate text-xs">Dashboard</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
