import { Bell, Book, LayoutDashboard, Monitor, Pen, User } from "lucide-react";

export const navList = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard strokeWidth={2} />,
  },
  {
    name: "Assignments",
    url: "/assignment",
    icon: <Pen strokeWidth={2} />,
  },
  {
    name: "Teachers",
    url: "/teachers",
    icon: <User strokeWidth={2} />,
  },
  {
    name: "Live Classroom",
    url: "/live-classroom",
    icon: <Monitor strokeWidth={2} />,
  },
  {
    name: "Result",
    url: "/result",
    icon: <Book strokeWidth={2} />,
  },
  {
    name: "Notice",
    url: "/notice",
    icon: <Bell strokeWidth={2} />,
  },
];
