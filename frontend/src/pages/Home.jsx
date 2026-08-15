// import { Link } from "react-router-dom";
//
// export default function Home() {
// return ( <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
//
//
//   <div className="bg-white rounded-3xl shadow-2xl p-12 text-center w-[500px]">
//
//     <h1 className="text-4xl font-bold text-gray-800 mb-4">
//       Campus Recruitment Portal
//     </h1>
//
//     <p className="text-gray-500 mb-8">
//       Welcome to the Placement Management System
//     </p>
//
//     <div className="flex flex-col gap-4">
//
//      <Link
//        to="/admin/login"
//        className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//      >
//        Admin Portal
//      </Link>
//
//
//       <Link
//         to="/student/login"
//         className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
//       >
//         Student Portal
//       </Link>
//
//     </div>
//
//   </div>
//
// </div>
//
//
// );
// }
// import { Link } from "react-router-dom";
// import { Building2, Users, Briefcase, ChevronRight } from "lucide-react";
//
// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Decorative blobs */}
//       <div className="absolute top-[-150px] right-[-150px] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-[-150px] left-[-150px] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
//
//       <div className="relative z-10 w-full max-w-2xl animate-fade-in-up">
//         {/* Brand Header */}
//         <div className="text-center mb-10">
//           <div className="flex justify-center mb-4">
//             <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
//               <Building2 className="h-10 w-10 text-white" />
//             </div>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
//             CampusRecruit
//           </h1>
//           <p className="text-blue-100 mt-2 text-lg md:text-xl font-light">
//             Placement Management System
//           </p>
//           <div className="mt-3 flex items-center justify-center gap-2 text-blue-200/70 text-sm">
//             <span className="w-8 h-px bg-blue-300/30"></span>
//             Streamline your campus recruitment
//             <span className="w-8 h-px bg-blue-300/30"></span>
//           </div>
//         </div>
//
//         {/* Feature Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Admin Card */}
//           <Link
//             to="/admin/login"
//             className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-blue-500/30 rounded-xl">
//                   <Users className="h-8 w-8 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-white">Admin</h2>
//                   <p className="text-blue-100/70 text-sm">Manage drives & students</p>
//                 </div>
//               </div>
//               <ChevronRight className="h-6 w-6 text-white/50 group-hover:text-white transition-colors" />
//             </div>
//             <div className="mt-4 text-blue-100/60 text-sm border-t border-white/10 pt-4">
//               Create drives, view results, manage placements
//             </div>
//           </Link>
//
//           {/* Student Card */}
//           <Link
//             to="/student/login"
//             className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-green-500/30 rounded-xl">
//                   <Briefcase className="h-8 w-8 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-white">Student</h2>
//                   <p className="text-blue-100/70 text-sm">Apply & track status</p>
//                 </div>
//               </div>
//               <ChevronRight className="h-6 w-6 text-white/50 group-hover:text-white transition-colors" />
//             </div>
//             <div className="mt-4 text-blue-100/60 text-sm border-t border-white/10 pt-4">
//               View drives, apply, check results & updates
//             </div>
//           </Link>
//         </div>
//
//         {/* Footer Stats (optional decorative) */}
//         <div className="mt-10 text-center text-blue-200/40 text-xs">
//           <p>© {new Date().getFullYear()} CampusRecruit — Secure &amp; Reliable</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { Building2, Users, Briefcase, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-150px] right-[-150px] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-2xl animate-fade-in-up">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
              <Building2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            CampusRecruit
          </h1>
          <p className="text-blue-100 mt-2 text-lg md:text-xl font-light">
            Placement Management System
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-blue-200/70 text-sm">
            <span className="w-8 h-px bg-blue-300/30"></span>
            Streamline your campus recruitment
            <span className="w-8 h-px bg-blue-300/30"></span>
          </div>
        </div>

        {/* Feature Cards – both now blue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/login"
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/30 rounded-xl">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Admin</h2>
                  <p className="text-blue-100/70 text-sm">Manage drives & students</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-white/50 group-hover:text-white transition-colors" />
            </div>
            <div className="mt-4 text-blue-100/60 text-sm border-t border-white/10 pt-4">
              Create drives, view results, manage placements
            </div>
          </Link>

          <Link
            to="/student/login"
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Changed green-500/30 to blue-500/30 */}
                <div className="p-3 bg-blue-500/30 rounded-xl">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Student</h2>
                  <p className="text-blue-100/70 text-sm">Apply & track status</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-white/50 group-hover:text-white transition-colors" />
            </div>
            <div className="mt-4 text-blue-100/60 text-sm border-t border-white/10 pt-4">
              View drives, apply, check results & updates
            </div>
          </Link>
        </div>

        <div className="mt-10 text-center text-blue-200/40 text-xs">
          <p>© {new Date().getFullYear()} CampusRecruit — Secure &amp; Reliable</p>
        </div>
      </div>
    </div>
  );
}