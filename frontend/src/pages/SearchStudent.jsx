// import { useState } from "react";
// import api from "../services/api";
// import Layout from "../components/Layout";
//
// export default function SearchStudent() {
//
// const [rollNo, setRollNo] = useState("");
// const [student, setStudent] = useState(null);
// const [history, setHistory] = useState([]);
//
// const search = async () => {
//
//
// if (!rollNo.trim()) {
//   alert("Please enter a roll number");
//   return;
// }
//
// try {
//
//   const studentRes = await api.get(`/admin/students/${rollNo}`);
//   setStudent(studentRes.data);
//
//   const historyRes = await api.get(`/students/${rollNo}/history`);
//   setHistory(Array.isArray(historyRes.data) ? historyRes.data : []);
//
// } catch (err) {
//
//   console.error(err);
//   alert("Student not found");
//   setStudent(null);
//   setHistory([]);
// }
//
//
// };
//
// const badgeColor = (status) => {
//
//
// switch (status) {
//
//   case "SELECTED":
//     return "bg-green-100 text-green-700";
//
//   case "INTERVIEW":
//     return "bg-yellow-100 text-yellow-700";
//
//   case "REJECTED":
//     return "bg-red-100 text-red-700";
//
//   default:
//     return "bg-blue-100 text-blue-700";
// }
//
//
// };
//
// return ( <Layout title="Search Student">
//
//
//   <div className="max-w-6xl mx-auto space-y-8">
//
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//
//       <h2 className="text-2xl font-bold text-slate-800 mb-2">
//         Student Lookup
//       </h2>
//
//       <p className="text-slate-500 mb-6">
//         Search by roll number to view profile and placement history.
//       </p>
//
//       <div className="flex flex-col md:flex-row gap-4">
//
//         <input
//           value={rollNo}
//           onChange={(e) => setRollNo(e.target.value)}
//           placeholder="Enter roll number (e.g. 23R21A05D6)"
//           className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />
//
//         <button
//           onClick={search}
//           className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
//         >
//           Search Student
//         </button>
//
//       </div>
//
//     </div>
//
//     {student && (
//       <>
//
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//
//           <div className="flex items-start justify-between flex-col md:flex-row gap-6">
//
//             <div>
//
//               <h2 className="text-3xl font-bold text-slate-800">
//                 {student.name}
//               </h2>
//
//               <p className="text-slate-500 mt-1">
//                 Student Profile
//               </p>
//
//             </div>
//
//             <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
//               {student.name?.charAt(0)?.toUpperCase()}
//             </div>
//
//           </div>
//
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//
//             <div className="bg-slate-50 rounded-xl p-5">
//
//               <p className="text-sm text-slate-500">Roll Number</p>
//               <p className="text-xl font-semibold text-slate-800 mt-1">
//                 {student.rollNo}
//               </p>
//
//             </div>
//
//             <div className="bg-slate-50 rounded-xl p-5">
//
//               <p className="text-sm text-slate-500">Branch</p>
//               <p className="text-xl font-semibold text-slate-800 mt-1">
//                 {student.branch}
//               </p>
//
//             </div>
//
//             <div className="bg-slate-50 rounded-xl p-5">
//
//               <p className="text-sm text-slate-500">CGPA</p>
//               <p className="text-xl font-semibold text-slate-800 mt-1">
//                 {student.cgpa}
//               </p>
//
//             </div>
//
//             <div className="bg-slate-50 rounded-xl p-5">
//
//               <p className="text-sm text-slate-500">Backlogs</p>
//               <p className="text-xl font-semibold mt-1">
//                 {student.backlog ? "Yes" : "No"}
//               </p>
//
//             </div>
//
//           </div>
//
//         </div>
//
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//
//           <div className="flex items-center justify-between mb-6">
//
//             <h2 className="text-2xl font-bold text-slate-800">
//               Placement History
//             </h2>
//
//             <span className="text-sm text-slate-500">
//               {history.length} records
//             </span>
//
//           </div>
//
//           {history.length === 0 ? (
//             <div className="text-center py-10 text-slate-500">
//               No placement history available for this student.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//
//               <table className="w-full border-collapse">
//
//                 <thead>
//                   <tr className="border-b bg-slate-50">
//                     <th className="text-left p-4 text-slate-700">Company</th>
//                     <th className="text-left p-4 text-slate-700">Role</th>
//                     <th className="text-left p-4 text-slate-700">Status</th>
//                   </tr>
//                 </thead>
//
//                 <tbody>
//                   {history.map((h) => (
//                     <tr key={h.id} className="border-b hover:bg-slate-50 transition">
//
//                       <td className="p-4 font-medium text-slate-800">
//                         {h.drive?.companyName}
//                       </td>
//
//                       <td className="p-4 text-slate-700">
//                         {h.drive?.role}
//                       </td>
//
//                       <td className="p-4">
//                         <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(h.resultStatus)}`}>
//                           {h.resultStatus}
//                         </span>
//                       </td>
//
//                     </tr>
//                   ))}
//                 </tbody>
//
//               </table>
//
//             </div>
//           )}
//
//         </div>
//
//       </>
//     )}
//
//   </div>
//
// </Layout>
//
//
// );
// }

import { useState } from "react";
import {
  Search,
  User,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  AlertCircle,
  Building2,
  Briefcase,
} from "lucide-react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function SearchStudent() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (!rollNo.trim()) {
      setError("Please enter a roll number");
      return;
    }

    setLoading(true);
    setError("");
    setStudent(null);
    setHistory([]);

    try {
      const studentRes = await api.get(`/admin/students/${rollNo}`);
      setStudent(studentRes.data);

      const historyRes = await api.get(`/students/${rollNo}/history`);
      setHistory(Array.isArray(historyRes.data) ? historyRes.data : []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Student not found");
      setStudent(null);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const badgeColor = (status) => {
    switch (status) {
      case "SELECTED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "INTERVIEW":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "SELECTED":
        return <CheckCircle className="h-4 w-4" />;
      case "INTERVIEW":
        return <Clock className="h-4 w-4" />;
      case "REJECTED":
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Layout title="Search Student">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Student Lookup</h2>
              <p className="text-sm text-slate-500">
                Search by roll number to view profile and placement history.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <input
              value={rollNo}
              onChange={(e) => {
                setRollNo(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter roll number (e.g. 23R21A05D6)"
              className="flex-1 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/80"
              onKeyDown={(e) => e.key === "Enter" && search()}
            />
            <button
              onClick={search}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Search Student
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>

        {/* Student Profile */}
        {student && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 md:p-8 animate-fade-in-up">
              <div className="flex items-start justify-between flex-col md:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                    {student.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {student.name}
                    </h2>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Student Profile
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                  <span className="text-xs font-medium text-slate-600">Roll No:</span>
                  <span className="font-mono font-semibold text-slate-800">{student.rollNo}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    Branch
                  </p>
                  <p className="text-lg font-semibold text-slate-800 mt-1">{student.branch || "N/A"}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    CGPA
                  </p>
                  <p className="text-lg font-semibold text-slate-800 mt-1">{student.cgpa || "N/A"}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Backlogs
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    {student.backlog ? (
                      <span className="text-red-600">Yes</span>
                    ) : (
                      <span className="text-emerald-600">No</span>
                    )}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Applications
                  </p>
                  <p className="text-lg font-semibold text-slate-800 mt-1">{history.length}</p>
                </div>
              </div>
            </div>

            {/* Placement History */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden animate-fade-in-up">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Placement History
                </h2>
                <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {history.length} {history.length === 1 ? "record" : "records"}
                </span>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p>No placement history available for this student.</p>
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
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {history.map((h) => (
                        <tr key={h.id} className="hover:bg-slate-50/70 transition-colors duration-150">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-slate-400" />
                              <span className="font-medium text-slate-800">
                                {h.drive?.companyName || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-700">{h.drive?.role || "N/A"}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor(
                                h.resultStatus
                              )}`}
                            >
                              {getStatusIcon(h.resultStatus)}
                              {h.resultStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
