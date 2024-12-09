import { Ban, Flag, LayoutDashboard, ShoppingCart, Users } from "lucide-react";

export const navDashboardAdmin = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <LayoutDashboard />,
  },
  {
    title: "Transactions",
    url: "/admin/transactions",
    icon: <ShoppingCart />,
  },
];

// export const navMainAdmin = [
//   {
//     title: "Items",
//     url: "/admin/items",
//     icon: <Shirt />,
//   },
// ];

export const navUserAdmin = [
  {
    title: "Users",
    url: "/admin/users",
    icon: <Users />,
  },
  {
    title: "Reported",
    url: "/admin/reported",
    icon: <Flag />,
  },
  {
    title: "Blocked",
    url: "/admin/blocked",
    icon: <Ban />,
  },
];
