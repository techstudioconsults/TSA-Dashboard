import {
  BookOpen,
  FileSpreadsheet,
  LayoutDashboard,
  LucideIcon,
  Users,
} from "lucide-react";

// Update the type to use LucideIcon
export type NavItem = {
  icon: LucideIcon;
  label: string;
  path: string;
  subPath: string;
};

// Update the NAV_ITEMS with appropriate icons
export const NAV_ITEMS: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
    subPath: "",
  },
  {
    icon: BookOpen,
    label: "Courses",
    path: "/courses",
    subPath: "/createcourse",
  },
  {
    icon: Users,
    label: "Classes",
    path: "/classes",
    subPath: "/createclass",
  },

  {
    icon: FileSpreadsheet,
    label: "Sheets",
    path: "/sheets",
    subPath: "/createsheet",
  },
];
