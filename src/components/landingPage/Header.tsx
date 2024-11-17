import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-[#f4f7f9] text-gray-800"
      } shadow-md transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">
              <span className="text-blue-600">100x</span>Brainly
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/features"
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="/upcoming"
              className="hover:text-blue-600 transition-colors"
            >
              Upcoming
            </a>
            <a
              href="/pricing"
              className="hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
            <a href="/blog" className="hover:text-blue-600 transition-colors">
              Blog
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href="/signin"
              className="px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Register
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div
              className={`px-2 pt-2 pb-3 space-y-1 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <a
                href="/features"
                className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Features
              </a>
              <a
                href="/upcoming"
                className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Upcoming
              </a>
              <a
                href="/pricing"
                className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Pricing
              </a>
              <a
                href="/blog"
                className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Blog
              </a>
              <a
                href="/signin"
                className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:text-blue-600 transition-colors"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="block px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Register
              </a>
              <button
                onClick={toggleDarkMode}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
              >
                {isDarkMode ? (
                  <Sun size={20} className="mr-2" />
                ) : (
                  <Moon size={20} className="mr-2" />
                )}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
