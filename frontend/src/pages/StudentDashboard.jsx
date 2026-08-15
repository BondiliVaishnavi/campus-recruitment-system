// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../services/api";
//
// export default function StudentDashboard() {
//
// const navigate = useNavigate();
// const student = JSON.parse(localStorage.getItem("student"));
// const [drives, setDrives] = useState([]);
//
// useEffect(() => {
//
//
// if (!student) {
//   navigate("/student/login");
//   return;
// }
//
// const loadDrives = async () => {
//
//   try {
//
//     const res = await api.get(`/students/${student.rollNo}/drives`);
//     setDrives(res.data);
//
//   } catch (err) {
//
//     console.error(err);
//   }
// };
//
// loadDrives();
//
//
// }, [student, navigate]);
//
// const logout = () => {
//
//
// localStorage.removeItem("student");
// navigate("/");
//
//
// };
//
// return ( <div className="min-h-screen bg-gray-100">
//
//   {/* Navbar */}
//   <nav className="bg-green-700 text-white px-8 py-4 flex justify-between items-center">
//
//     <div className="flex gap-6">
//       <Link to="/student" className="font-semibold hover:text-green-200">
//         Dashboard
//       </Link>
//
//       <Link
//         to="/student/history"
//         className="font-semibold hover:text-green-200"
//       >
//         Placement History
//       </Link>
//     </div>
//
//     <button
//       onClick={logout}
//       className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
//     >
//       Logout
//     </button>
//
//   </nav>
//
//   {/* Content */}
//   <div className="p-10">
//
//     <h1 className="text-4xl font-bold text-gray-800 mb-2">
//       Welcome, {student?.name}
//     </h1>
//
//     <p className="text-gray-600 mb-8">
//       Roll No: {student?.rollNo}
//     </p>
//
//     {/* Student Info Cards */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h3 className="text-xl font-semibold text-gray-800">Branch</h3>
//         <p className="text-gray-600 mt-2 text-lg">{student?.branch}</p>
//       </div>
//
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h3 className="text-xl font-semibold text-gray-800">CGPA</h3>
//         <p className="text-gray-600 mt-2 text-lg">{student?.cgpa}</p>
//       </div>
//
//     </div>
//
//     {/* Eligible Drives */}
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">
//         Eligible Recruitment Drives
//       </h2>
//
//       {drives.length === 0 ? (
//         <p className="text-gray-600">No eligible drives available.</p>
//       ) : (
//         <table className="w-full border-collapse">
//
//           <thead>
//             <tr className="border-b bg-gray-50">
//               <th className="text-left p-3">Company</th>
//               <th className="text-left p-3">Role</th>
//               <th className="text-left p-3">Minimum CGPA</th>
//               <th className="text-left p-3">Backlog Allowed</th>
//             </tr>
//           </thead>
//
//           <tbody>
//             {drives.map((drive) => (
//               <tr key={drive.id} className="border-b hover:bg-gray-50 transition">
//                 <td className="p-3 font-medium">{drive.companyName}</td>
//                 <td className="p-3">{drive.role}</td>
//                 <td className="p-3">{drive.minimumCgpa}</td>
//                 <td className="p-3">
//                   {drive.allowBacklog ? "Yes" : "No"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//
//         </table>
//       )}
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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  BookOpen,
  Briefcase,
  Building2,
  LogOut,
  LayoutDashboard,
  History,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import api from "../services/api";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    selected: 0,
    pending: 0,
  });

  useEffect(() => {
    if (!student) {
      navigate("/student/login");
      return;
    }

    const loadDrives = async () => {
      try {
        const res = await api.get(`/students/${student.rollNo}/drives`);
        setDrives(res.data);
        // Calculate stats (you can adjust based on your data structure)
        const total = res.data.length;
        // Assuming drives have an 'applied' or 'status' field – adjust as needed
        // For now, we'll just show total and infer others from your data
        setStats({
          total: total,
          applied: 0, // Replace with actual applied count
          selected: 0, // Replace with actual selected count
          pending: total, // Replace with actual pending count
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDrives();
  }, [student, navigate]);

  const logout = () => {
    localStorage.removeItem("student");
    navigate("/");
  };

  // Status badge helper
  const getStatusBadge = (status) => {
    if (!status) return null;
    const configs = {
      ELIGIBLE: { label: "Eligible", color: "bg-blue-100 text-blue-800 border-blue-200" },
      APPLIED: { label: "Applied", color: "bg-amber-100 text-amber-800 border-amber-200" },
      INTERVIEW: { label: "Interview", color: "bg-purple-100 text-purple-800 border-purple-200" },
      SELECTED: { label: "Selected", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
      REJECTED: { label: "Rejected", color: "bg-red-100 text-red-800 border-red-200" },
    };
    const matched = configs[status] || configs.ELIGIBLE;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${matched.color}`}
      >
        {status === "SELECTED" && <CheckCircle className="h-3 w-3" />}
        {status === "INTERVIEW" && <Clock className="h-3 w-3" />}
        {status === "REJECTED" && <XCircle className="h-3 w-3" />}
        {status === "APPLIED" && <TrendingUp className="h-3 w-3" />}
        {matched.label}
      </span>
    );
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Not Logged In</h2>
          <p className="text-slate-500 mt-2">Please log in to access your dashboard.</p>
          <Link to="/student/login" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/80">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  CR
                </div>
                <span className="text-lg font-bold text-slate-800 hidden sm:block">CampusRecruit</span>
              </div>
              <div className="flex gap-1">
                <Link
                  to="/student"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/student/history"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <History className="h-4 w-4" />
                  History
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 hidden md:inline">
                {student.rollNo}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 md:p-8 text-white mb-8">
          <div className="flex items-start justify-between flex-col md:flex-row gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold shadow-lg">
                  {student.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Welcome back, {student.name}
                  </h1>
                  <p className="text-blue-100 text-sm mt-0.5">
                    {student.branch} • Roll No: {student.rollNo}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
              <GraduationCap className="h-5 w-5 text-blue-200" />
              <span className="text-sm font-medium">CGPA: {student.cgpa || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Drives</p>
              <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-xl">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Pending</p>
              <p className="text-2xl font-bold text-slate-800">{stats.pending}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Selected</p>
              <p className="text-2xl font-bold text-slate-800">{stats.selected}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Applied</p>
              <p className="text-2xl font-bold text-slate-800">{stats.applied}</p>
            </div>
          </div>
        </div>

        {/* Eligible Drives Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Eligible Recruitment Drives
            </h2>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {drives.length} {drives.length === 1 ? "drive" : "drives"}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : drives.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p>No eligible drives available at the moment.</p>
              <p className="text-sm mt-1">Check back later for new opportunities.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Min. CGPA
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Backlog
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {drives.map((drive) => (
                    <tr key={drive.id} className="hover:bg-slate-50/70 transition-colors duration-150">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {drive.companyName}
                      </td>
                      <td className="px-6 py-4 text-slate-700">{drive.role}</td>
                      <td className="px-6 py-4 text-slate-700">{drive.minimumCgpa}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            drive.allowBacklog
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {drive.allowBacklog ? "Allowed" : "Not Allowed"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(drive.status || "ELIGIBLE")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!loading && drives.length > 0 && (
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200/60 text-xs text-slate-500">
              Showing {drives.length} eligible drive{drives.length > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
