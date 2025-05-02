import type React from "react";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  DollarSign,
  FileText,
  Calendar,
  BookOpen,
  MessageSquare,
  Settings,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router";

interface NavItemProps {
  icon: React.ElementType;
  text: string;
  href?: string;
  active?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: { text: string; href: string }[];
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  text,
  href,
  active,
  hasSubmenu,
  submenuItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg ${
          active
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Icon className="h-5 w-5 mr-3" />
        <span className="flex-1 text-left">{text}</span>
        {hasSubmenu &&
          (isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ))}
      </button>
      {hasSubmenu && isOpen && (
        <div className="ml-8 space-y-1">
          {submenuItems?.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed z-20 top-4 left-4 p-2 rounded-md bg-white shadow-md text-gray-600"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 sticky left-0 top-0 bg-white lg:block hidden transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center h-16 px-6 border-b">
          <Link to="/" className="flex items-center">
            <span className="text-blue-500 font-bold text-xl">SchoolHub</span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="lg:hidden ml-auto p-1 rounded-md text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-3 py-4">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Menu
          </p>
          <div className="space-y-1">
            <NavItem icon={LayoutDashboard} text="Dashboard" href="/" active />

            {/* Teachers Submenu */}
            <NavItem
              icon={Users}
              text="Teachers"
              hasSubmenu
              submenuItems={[
                { text: "Add Teacher", href: "/teacher/add" },
                { text: "Manage Teachers", href: "/teacher/manage" },
              ]}
            />

            {/* Students Submenu */}
            <NavItem
              icon={GraduationCap}
              text="Students"
              hasSubmenu
              submenuItems={[
                { text: "Add Student", href: "/student/add" },
                { text: "Manage Students", href: "/student/manage" },
              ]}
            />

            {/* Courses Submenu */}
            <NavItem
              icon={BookOpen}
              text="Courses"
              hasSubmenu
              submenuItems={[
                { text: "Add Course", href: "/course/add" },
                { text: "Manage Courses", href: "/course/manage" },
              ]}
            />
            <NavItem
              icon={BookOpen}
              text="Books"
              hasSubmenu
              submenuItems={[
                { text: "Add Book", href: "/book/add" },
                { text: "Manage Books", href: "/book/manage" },
              ]}
            />

            <NavItem
              icon={ClipboardCheck}
              text="Attendance"
              href="/attendance"
            />
            <NavItem icon={DollarSign} text="Finance" href="/finance" />
            <NavItem
              icon={FileText}
              text="Notice"
              hasSubmenu
              submenuItems={[
                { text: "Publish Notice", href: "/notice/publish" },
                { text: "Manage Notice", href: "/notice/manage" },
              ]}
            />
            <NavItem icon={Calendar} text="Calendar" href="/calendar" />
            <NavItem icon={MessageSquare} text="Messages" href="/messages" />
          </div>

          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8 mb-2">
            Settings
          </p>
          <div className="space-y-1">
            <NavItem icon={Settings} text="Profile" href="/profile" />
          </div>
        </div>
      </aside>
    </>
  );
}
