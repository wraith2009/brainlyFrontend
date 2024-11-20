import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">
              <span className="text-blue-600">100x</span>Brainly
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="hover:text-blue-600">
              Features
            </Link>
            <Link to="/upcoming" className="hover:text-blue-600">
              Upcoming
            </Link>
            <Link to="/pricing" className="hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/blog" className="hover:text-blue-600">
              Blog
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/sign-in"
              className="px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white shadow-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/features"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Features
              </Link>
              <Link
                to="/upcoming"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Upcoming
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Pricing
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Blog
              </Link>
              <Link
                to="/sign-in"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="block px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
