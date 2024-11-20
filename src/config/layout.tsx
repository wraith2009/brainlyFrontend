import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { cn } from "../lib/utils";

import { Twitter, Youtube, FileText, Link2, Menu, X } from "lucide-react";

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
const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex">
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-50 flex items-center justify-between p-4 w-full h-16">
        <Link to="/Home">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            100xBrainly
          </span>
        </Link>
        <button onClick={toggleMobileMenu} className="p-2 focus:outline-none">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

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

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-16">
          <nav className="p-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={toggleMobileMenu}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 mb-2"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-1 w-full md:ml-64 pt-16 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
