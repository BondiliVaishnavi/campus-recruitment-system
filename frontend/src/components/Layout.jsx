// import Sidebar from "./Sidebar";
// import Header from "./Header";
//
// export default function Layout({ title, children }) {
// return ( <div className="flex bg-gray-100 min-h-screen">
//
//
//   <Sidebar />
//
//   <div className="flex-1">
//     <Header title={title} />
//
//     <div className="p-8">
//       {children}
//     </div>
//   </div>
//
// </div>
//
//
// );
// }
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ title, children, fullWidth = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/80 overflow-x-hidden">
      {/* Sidebar – slides in on mobile, always visible on desktop */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <Header title={title} toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-0">
          <div
            className={`
              mx-auto
              ${fullWidth ? "max-w-full" : "max-w-7xl"}
              bg-white/80 backdrop-blur-sm
              rounded-2xl shadow-sm
              border border-slate-200/60
              p-4 sm:p-6 lg:p-8
              transition-all duration-200
              min-w-0
            `}
          >
            {children}
          </div>
        </main>

        <footer className="flex-shrink-0 text-center text-xs text-slate-400/80 py-3 px-4 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm mt-4">
          <div className="max-w-7xl mx-auto overflow-hidden">
            <p className="truncate sm:whitespace-normal">
              © {new Date().getFullYear()} CampusRecruit — All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}