import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Link } from "react-router-dom";
import { Twitter, Youtube, FileText, Link2, Hash } from "lucide-react";

const navItems = [
  { icon: <Twitter className="w-5 h-5" />, label: "Tweets", href: "/tweets" },
  { icon: <Youtube className="w-5 h-5" />, label: "Videos", href: "/videos" },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Documents",
    href: "/documents",
  },
  { icon: <Link2 className="w-5 h-5" />, label: "Links", href: "/links" },
  { icon: <Hash className="w-5 h-5" />, label: "Tags", href: "/tags" },
];

const Sidebar = () => {
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col w-64 border-r bg-white h-screen fixed"
      )}
    >
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img src="/api/placeholder/32/32" alt="Logo" className="rounded" />
          </div>
          <span className="font-semibold">100xBrainly</span>
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
