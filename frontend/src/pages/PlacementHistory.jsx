// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../services/api";
//
// export default function PlacementHistory() {
//
// const student = JSON.parse(localStorage.getItem("student"));
// const [history, setHistory] = useState([]);
//
// useEffect(() => {
//
//
// const loadHistory = async () => {
//
//   try {
//
//     const res = await api.get(`/students/${student.rollNo}/history`);
//     setHistory(res.data);
//
//   } catch (err) {
//
//     console.error(err);
//   }
// };
//
// if (student) {
//   loadHistory();
// }
//
//
// }, [student]);
//
// return ( <div className="min-h-screen bg-gray-100">
//
//
//   <nav className="bg-green-700 text-white px-8 py-4 flex justify-between items-center">
//
//     <Link to="/student" className="font-semibold hover:text-green-200">
//       Back to Dashboard
//     </Link>
//
//   </nav>
//
//   <div className="p-10">
//
//     <h1 className="text-3xl font-bold text-gray-800 mb-6">
//       Placement History
//     </h1>
//
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//
//       {history.length === 0 ? (
//         <p className="text-gray-600">No placement history available.</p>
//       ) : (
//         <table className="w-full border-collapse">
//
//           <thead>
//             <tr className="border-b bg-gray-50">
//               <th className="text-left p-3">Company</th>
//               <th className="text-left p-3">Role</th>
//               <th className="text-left p-3">Status</th>
//             </tr>
//           </thead>
//
//           <tbody>
//             {history.map((item) => (
//               <tr key={item.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3 font-medium">
//                   {item.drive.companyName}
//                 </td>
//                 <td className="p-3">
//                   {item.drive.role}
//                 </td>
//                 <td className="p-3">
//                   <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-semibold">
//                     {item.resultStatus}
//                   </span>
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
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  User,
  AlertCircle,
} from "lucide-react";
import api from "../services/api";

export default function PlacementHistory() {
  const student = JSON.parse(localStorage.getItem("student"));
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      if (!student) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/students/${student.rollNo}/history`);
        setHistory(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load placement history.");
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [student]);

  // Status badge helper
  const getStatusBadge = (status) => {
    const statusMap = {
      SELECTED: { label: "Selected", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
      SHORTLISTED: { label: "Shortlisted", color: "bg-blue-100 text-blue-800 border-blue-200" },
      REJECTED: { label: "Rejected", color: "bg-red-100 text-red-800 border-red-200" },
      PENDING: { label: "Pending", color: "bg-amber-100 text-amber-800 border-amber-200" },
      OFFERED: { label: "Offered", color: "bg-purple-100 text-purple-800 border-purple-200" },
    };
    const matched = statusMap[status?.toUpperCase()] || statusMap.PENDING;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${matched.color}`}
      >
        {status?.toUpperCase() === "SELECTED" && <CheckCircle className="h-3 w-3" />}
        {status?.toUpperCase() === "SHORTLISTED" && <Clock className="h-3 w-3" />}
        {status?.toUpperCase() === "REJECTED" && <XCircle className="h-3 w-3" />}
        {status?.toUpperCase() === "PENDING" && <AlertCircle className="h-3 w-3" />}
        {status?.toUpperCase() === "OFFERED" && <FileText className="h-3 w-3" />}
        {matched.label}
      </span>
    );
  };

  // If not logged in
  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Not Logged In</h2>
          <p className="text-slate-500 mt-2">Please log in as a student to view your placement history.</p>
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
            <Link
              to="/student"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Student:</span>
              <span className="font-semibold text-slate-800">{student.rollNo}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-xl">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Placement History</h1>
            <p className="text-sm text-slate-500">
              Your application status across all drives
            </p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-12 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-3" />
            <p className="text-red-600">{error}</p>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-12 text-center">
            <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700">No Placement History</h3>
            <p className="text-slate-500 mt-1">
              You haven't applied to any drives yet.
            </p>
            <Link
              to="/student/drives"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition shadow-md"
            >
              Browse Drives
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden animate-fade-in-up">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="hover:bg-slate-50/70 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-slate-400" />
                          <span className="font-medium text-slate-800">
                            {item.drive?.companyName || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {item.drive?.role || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(item.resultStatus)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200/60 text-xs text-slate-500">
              Showing {history.length} record{history.length > 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
