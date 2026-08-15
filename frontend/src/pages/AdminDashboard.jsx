// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import api from "../services/api";
//
// export default function Dashboard() {
// const [dashboard, setDashboard] = useState({
// totalStudents: 0,
// totalDrives: 0,
// activeDrives: 0,
// selectedStudents: 0,
// interviewStudents: 0,
// notSelectedStudents: 0,
// });
//
// useEffect(() => {
// const loadDashboard = async () => {
// try {
// const res = await api.get("/admin/dashboard");
// setDashboard(res.data);
// } catch (err) {
// console.error(err);
// }
// };
//
//
// loadDashboard();
//
//
// }, []);
//
// const cards = [
// {
// title: "Total Students",
// value: dashboard.totalStudents,
// color: "from-blue-500 to-indigo-600",
// icon: "👨‍🎓",
// },
// {
// title: "Total Drives",
// value: dashboard.totalDrives,
// color: "from-purple-500 to-pink-600",
// icon: "🏢",
// },
// {
// title: "Active Drives",
// value: dashboard.activeDrives,
// color: "from-emerald-500 to-green-600",
// icon: "🚀",
// },
// {
// title: "Selected Students",
// value: dashboard.selectedStudents,
// color: "from-orange-500 to-red-500",
// icon: "🎉",
// },
// ];
//
// return ( <Layout title="Admin Dashboard"> <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
// {cards.map((card) => (
// <div
// key={card.title}
// className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r ${card.color}`}
// > <div className="flex items-center justify-between"> <div> <p className="text-white/80 text-sm">{card.title}</p> <h2 className="text-4xl font-bold mt-2">{card.value}</h2> </div> <div className="text-4xl">{card.icon}</div> </div> </div>
// ))} </div>
//
// ```
//   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h3 className="text-xl font-bold text-slate-800 mb-4">
//         Recruitment Overview
//       </h3>
//
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <span className="text-slate-600">Interview Students</span>
//           <span className="font-bold text-lg">
//             {dashboard.interviewStudents}
//           </span>
//         </div>
//
//         <div className="flex justify-between items-center">
//           <span className="text-slate-600">Not Selected</span>
//           <span className="font-bold text-lg">
//             {dashboard.notSelectedStudents}
//           </span>
//         </div>
//
//         <div className="pt-4 border-t">
//           <div className="w-full bg-gray-200 rounded-full h-3">
//             <div
//               className="bg-blue-600 h-3 rounded-full"
//               style={{
//                 width:
//                   dashboard.totalStudents === 0
//                     ? "0%"
//                     : `${(dashboard.selectedStudents /
//                         dashboard.totalStudents) *
//                         100}%`,
//               }}
//             />
//           </div>
//
//           <p className="text-sm text-slate-500 mt-2">
//             Selection progress across all students
//           </p>
//         </div>
//       </div>
//     </div>
//
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h3 className="text-xl font-bold text-slate-800 mb-4">
//         Quick Actions
//       </h3>
//
//       <div className="space-y-3">
//         <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
//           Create New Recruitment Drive
//         </button>
//
//         <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
//           Search Student
//         </button>
//
//         <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
//           Manage Results
//         </button>
//       </div>
//     </div>
//   </div>
// </Layout>
//
//
// );
// }
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";
import {
  Users,
  Building2,
  Rocket,
  Award,
  TrendingUp,
  UserX,
  PlusCircle,
  Search,
  BarChart3,
} from "lucide-react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    totalDrives: 0,
    activeDrives: 0,
    selectedStudents: 0,
    interviewStudents: 0,
    notSelectedStudents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setDashboard(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  // Stats cards configuration with icons
  const cards = [
    {
      title: "Total Students",
      value: dashboard.totalStudents,
      gradient: "from-blue-500 to-indigo-600",
      icon: Users,
      bgIcon: "from-blue-500/20 to-indigo-600/20",
    },
    {
      title: "Total Drives",
      value: dashboard.totalDrives,
      gradient: "from-purple-500 to-pink-600",
      icon: Building2,
      bgIcon: "from-purple-500/20 to-pink-600/20",
    },
    {
      title: "Active Drives",
      value: dashboard.activeDrives,
      gradient: "from-emerald-500 to-green-600",
      icon: Rocket,
      bgIcon: "from-emerald-500/20 to-green-600/20",
    },
    {
      title: "Selected Students",
      value: dashboard.selectedStudents,
      gradient: "from-orange-500 to-red-500",
      icon: Award,
      bgIcon: "from-orange-500/20 to-red-500/20",
    },
  ];

  // Calculate selection percentage
  const selectionRate =
    dashboard.totalStudents > 0
      ? ((dashboard.selectedStudents / dashboard.totalStudents) * 100).toFixed(1)
      : 0;

  return (
    <Layout title="Admin Dashboard">
      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Background gradient glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <div className="relative p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 tracking-wide">
                        {card.title}
                      </p>
                      <h3 className="text-3xl font-bold text-slate-800 mt-1">
                        {card.value}
                      </h3>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.bgIcon} flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 text-slate-700`} />
                    </div>
                  </div>
                  {/* Decorative bar at bottom */}
                  <div
                    className={`h-1 w-full bg-gradient-to-r ${card.gradient}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Grid: Overview & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recruitment Overview */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Recruitment Overview
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Interview Students
                  </span>
                  <span className="font-bold text-lg text-slate-800">
                    {dashboard.interviewStudents}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    Not Selected
                  </span>
                  <span className="font-bold text-lg text-slate-800">
                    {dashboard.notSelectedStudents}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Selection Rate</span>
                    <span className="font-semibold">{selectionRate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${selectionRate}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    {dashboard.selectedStudents} selected out of{" "}
                    {dashboard.totalStudents} total students
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-purple-600" />
                Quick Actions
              </h3>

              <div className="space-y-3">
                <Link
                  to="/admin/create-drive"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <PlusCircle className="h-5 w-5" />
                  Create Recruitment Drive
                </Link>
                <Link
                  to="/admin/search-student"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-600/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Search className="h-5 w-5" />
                  Search Student
                </Link>
                <Link
                  to="/admin/results"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-600/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <BarChart3 className="h-5 w-5" />
                  Manage Results
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
