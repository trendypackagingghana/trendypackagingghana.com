import type { UserRole } from "@/lib/auth";

export interface NavItem {
  href: string;
  icon: string;
  label: string;
  roles?: UserRole[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export type NavEntry = NavItem | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

export const NAV_ITEMS: NavEntry[] = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/dashboard/analytics", icon: "bar_chart_4_bars", label: "Analytics", roles: ["admin"] },
  {
    label: "Operations",
    items: [
      { href: "/dashboard/inventory", icon: "inventory_2", label: "Inventory" },
      { href: "/dashboard/production", icon: "precision_manufacturing", label: "Production" },
      { href: "/dashboard/staff", icon: "badge", label: "Staff" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { href: "/dashboard/customers", icon: "groups", label: "Customers" },
      { href: "/dashboard/sales", icon: "point_of_sale", label: "Sales" },
    ],
  },
];
