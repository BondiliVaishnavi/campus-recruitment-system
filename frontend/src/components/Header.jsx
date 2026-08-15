import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu, // added
} from "lucide-react";

export default function Header({
  title = "Dashboard",
  logoText = "CampusRecruit",
  notificationCount = 0,
  userInitials = "AD",
  userName = "Admin",
  userRole = "Placement Administrator",
  onSearch,
  onLogout,
  toggleSidebar, // new prop
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header
      className={`bg-white/90 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50 transition-shadow duration-300 overflow-hidden ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 min-w-0">
          {/* Left section: Hamburger + Logo & Title */}
          <div className="flex items-center gap-3 min-w-0 flex-shrink">
            {/* Hamburger button – visible on mobile */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 -ml-2 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0">
              CR
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-slate-800 leading-tight truncate">
                {logoText}
              </p>
              <p className="text-xs text-slate-500 leading-tight hidden sm:block truncate">
                Campus Recruitment Management
              </p>
            </div>
            {title && (
              <>
                <span className="hidden md:inline text-slate-300 mx-2 flex-shrink-0">|</span>
                <h1 className="hidden md:block text-lg font-semibold text-slate-700 truncate min-w-0 flex-shrink">
                  {title}
                </h1>
              </>
            )}
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-md mx-4 min-w-0"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students, drives, or companies..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
                aria-label="Search"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              className="relative p-2 text-slate-500 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-200"
              aria-label={`Notifications (${notificationCount} unread)`}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full ring-2 ring-white animate-pulse">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-sm">
                    {userInitials}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                </div>
                <div className="hidden md:block text-left min-w-0">
                  <p className="text-sm font-semibold text-slate-800 leading-tight truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-slate-500 leading-tight truncate">
                    {userRole}
                  </p>
                </div>
                <ChevronDown
                  className={`hidden md:block h-4 w-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-1.5 origin-top-right animate-fade-in-down">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">
                      {userName}
                    </p>
                    <p className="text-xs text-slate-500">{userRole}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      admin@campusrecruit.com
                    </p>
                  </div>
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-colors duration-150">
                    <User className="h-4 w-4 text-slate-400" />
                    Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-colors duration-150">
                    <Settings className="h-4 w-4 text-slate-400" />
                    Settings
                  </button>
                  <hr className="my-1 border-slate-100" />
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout?.();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle (now handled by hamburger in left section) */}
            {/* Removed the old separate menu button, as we now have the hamburger on the left */}
          </div>
        </div>

        {/* Mobile search dropdown (preserved) */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/60 animate-fade-in-down">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search"
              />
            </form>
            <div className="flex flex-col space-y-1">
              <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 rounded-xl transition-colors">
                <User className="h-4 w-4 text-slate-400" />
                Profile
              </button>
              <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 rounded-xl transition-colors">
                <Settings className="h-4 w-4 text-slate-400" />
                Settings
              </button>
              <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}