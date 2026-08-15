import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Search,
  BarChart3,
  Upload,
  LogOut,
  User,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Create Drive", path: "/admin/create-drive", icon: PlusCircle },
    { name: "Search Student", path: "/admin/search-student", icon: Search },
    { name: "Result Management", path: "/admin/results", icon: BarChart3 },
    { name: "Upload Students", path: "/admin/upload-students", icon: Upload },
  ];

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem("role");
    // Navigate to home page
    navigate("/");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen sticky top-0 flex flex-col shadow-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800/50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
          CR
        </div>
        <div>
          <p className="text-lg font-bold tracking-tight">CampusRecruit</p>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }
              `}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-8 bg-white rounded-full shadow-sm" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: User + Logout */}
      <div className="border-t border-slate-800/50 px-4 py-4 space-y-3">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800/60 transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold text-sm shadow-md">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin</p>
            <p className="text-xs text-slate-400 truncate">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-red-500/20 rounded-xl transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}