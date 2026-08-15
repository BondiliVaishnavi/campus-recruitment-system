// import { useEffect, useState } from "react";
// import api from "../services/api";
// import Layout from "../components/Layout";
//
// export default function ResultManagement() {
//
// const [results, setResults] = useState([]);
//
// const loadResults = async () => {
//
//
// try {
//
//   const res = await api.get("/admin/results");
//   setResults(res.data);
//
// } catch (err) {
//
//   console.error(err);
// }
//
//
// };
//
// useEffect(() => {
// loadResults();
// }, []);
//
// const updateStatus = async (id, status) => {
//
//
// try {
//
//   await api.put(`/admin/results/${id}`, { status });
//
//   setResults((prev) =>
//     prev.map((r) =>
//       r.id === id ? { ...r, resultStatus: status } : r
//     )
//   );
//
// } catch (err) {
//
//   console.error(err);
//   alert("Failed to update result");
// }
//
//
// };
//
// return ( <Layout title="Result Management">
//
//
//   <div className="bg-white rounded-2xl shadow-lg p-6">
//
//     <h2 className="text-2xl font-bold mb-6">
//       Update Student Results
//     </h2>
//
//     <table className="w-full border-collapse">
//
//       <thead>
//         <tr className="border-b bg-gray-50">
//           <th className="text-left p-3">Roll No</th>
//           <th className="text-left p-3">Student</th>
//           <th className="text-left p-3">Company</th>
//           <th className="text-left p-3">Role</th>
//           <th className="text-left p-3">Status</th>
//         </tr>
//       </thead>
//
//       <tbody>
//         {results.map((r) => (
//           <tr key={r.id} className="border-b hover:bg-gray-50">
//
//             <td className="p-3">{r.student.rollNo}</td>
//             <td className="p-3">{r.student.name}</td>
//             <td className="p-3">{r.drive.companyName}</td>
//             <td className="p-3">{r.drive.role}</td>
//
//             <td className="p-3">
//               <select
//                 value={r.resultStatus}
//                 onChange={(e) =>
//                   updateStatus(r.id, e.target.value)
//                 }
//                 className="border rounded-lg px-3 py-2"
//               >
//                 <option value="ELIGIBLE">ELIGIBLE</option>
//                 <option value="INTERVIEW">INTERVIEW</option>
//                 <option value="SELECTED">SELECTED</option>
//                 <option value="REJECTED">REJECTED</option>
//               </select>
//             </td>
//
//           </tr>
//         ))}
//       </tbody>
//
//     </table>
//
//   </div>
//
// </Layout>
//
//
// );
// }
import { useEffect, useState, useCallback } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  UserCheck,
  Users,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ResultManagement() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState(null);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const statusOptions = ["ELIGIBLE", "INTERVIEW", "SELECTED", "REJECTED"];

  // Status badge configuration
  const getStatusConfig = (status) => {
    const configs = {
      ELIGIBLE: { label: "Eligible", color: "bg-blue-100 text-blue-800 border-blue-200", icon: UserCheck },
      INTERVIEW: { label: "Interview", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Clock },
      SELECTED: { label: "Selected", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle },
      REJECTED: { label: "Rejected", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
    };
    return configs[status] || configs.ELIGIBLE;
  };

  const loadResults = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/results");
      setResults(res.data);
      setFilteredResults(res.data);
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Failed to load results." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  // Apply search & filter
  useEffect(() => {
    let filtered = results;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.student?.rollNo?.toLowerCase().includes(term) ||
          r.student?.name?.toLowerCase().includes(term) ||
          r.drive?.companyName?.toLowerCase().includes(term) ||
          r.drive?.role?.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((r) => r.resultStatus === statusFilter);
    }
    setFilteredResults(filtered);
  }, [searchTerm, statusFilter, results]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.put(`/admin/results/${id}`, { status });
      setResults((prev) =>
        prev.map((r) => (r.id === id ? { ...r, resultStatus: status } : r))
      );
      setNotification({ type: "success", message: "Status updated successfully!" });
      setTimeout(() => setNotification({ type: "", message: "" }), 4000);
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Failed to update status." });
    } finally {
      setUpdatingId(null);
    }
  };

  const clearNotification = () => setNotification({ type: "", message: "" });

  return (
    <Layout title="Result Management">
      <div className="space-y-6">
        {/* Notification */}
        {notification.message && (
          <div
            className={`px-4 py-3 rounded-xl flex items-center justify-between ${
              notification.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            <span className="text-sm flex items-center gap-2">
              {notification.type === "success" ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              {notification.message}
            </span>
            <button onClick={clearNotification} className="text-slate-400 hover:text-slate-600">
              ✕
            </button>
          </div>
        )}

        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Student Results</h2>
            <p className="text-sm text-slate-500">
              Manage and update placement results for students
            </p>
          </div>
          <button
            onClick={loadResults}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by roll no, student name, company, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50/80"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-slate-400 whitespace-nowrap">
            {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center p-12">
              <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">No Results Found</h3>
              <p className="text-slate-500 text-sm mt-1">
                {results.length === 0
                  ? "No placement results available yet."
                  : "Try adjusting your search or filter."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Student
                    </th>
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
                  {filteredResults.map((r) => {
                    const statusConfig = getStatusConfig(r.resultStatus);
                    const Icon = statusConfig.icon;
                    return (
                      <tr
                        key={r.id}
                        className="hover:bg-slate-50/70 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 font-mono text-sm text-slate-700">
                          {r.student?.rollNo || "N/A"}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {r.student?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {r.drive?.companyName || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {r.drive?.role || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={r.resultStatus}
                            onChange={(e) => updateStatus(r.id, e.target.value)}
                            disabled={updatingId === r.id}
                            className={`
                              appearance-none px-3 py-1.5 rounded-xl text-xs font-semibold border-2
                              focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                              ${statusConfig.color}
                              ${updatingId === r.id ? "opacity-60 cursor-wait" : ""}
                            `}
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 0.75rem center",
                              backgroundSize: "12px",
                              paddingRight: "2.5rem",
                            }}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {!loading && filteredResults.length > 0 && (
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200/60 text-xs text-slate-500 flex justify-between">
              <span>Showing {filteredResults.length} of {results.length} total</span>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
