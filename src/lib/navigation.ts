import {
  LayoutDashboard,
  Mic,
  Clock,
  Search,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  shortLabel: string;
  path: string;
}

export const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", shortLabel: "Home", path: "/" },
  { icon: Mic, label: "Live Meeting", shortLabel: "Live", path: "/live" },
  { icon: Clock, label: "History", shortLabel: "History", path: "/history" },
  { icon: Search, label: "Search", shortLabel: "Search", path: "/search" },
  { icon: Settings, label: "Settings", shortLabel: "Settings", path: "/settings" },
];

export const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/live": "Live Meeting",
  "/history": "History",
  "/search": "Search",
  "/settings": "Settings",
};

export function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/meeting/")) return "Meeting";
  return pageTitles[pathname] ?? "MeetIQ";
}
