import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Link } from "react-router-dom";
import { Twitter, Youtube, FileText, Link2 } from "lucide-react";

const navItems = [
  {
    icon: <Twitter className="w-5 h-5" />,
    label: "Tweets",
    href: "/Home/tweets",
  },
  {
    icon: <Youtube className="w-5 h-5" />,
    label: "Videos",
    href: "/Home/videos",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Documents",
    href: "/Home/documents",
  },
  { icon: <Link2 className="w-5 h-5" />, label: "Links", href: "/Home/links" },
];

const Sidebar = () => {
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col w-64 border-r bg-white h-screen fixed"
      )}
    >
      <div className="p-4 mt-4">
        <div className="text-center">
          <Link to="/Home">
            <span className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              100xBrainly
            </span>
          </Link>
        </div>
      </div>
      <nav className="flex-1 p-4">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 mb-1"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
