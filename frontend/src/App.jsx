// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//
// import Home from "./pages/Home";
// import AdminDashboard from "./pages/AdminDashboard";
// import CreateDrive from "./pages/CreateDrive";
// import SearchStudent from "./pages/SearchStudent";
// import StudentDashboard from "./pages/StudentDashboard";
// import AdminLogin from "./pages/AdminLogin";
// import StudentLogin from "./pages/StudentLogin";
// import PlacementHistory from "./pages/PlacementHistory";
// import ResultManagement from "./pages/ResultManagement";
// import UploadStudents from "./pages/UploadStudents";
//
//
//
//
// function App() {
// return ( <BrowserRouter>
//
//
//   <Routes>
//
//     <Route path="/" element={<Home />} />
//
//     <Route
//       path="/admin"
//       element={
//         <div>
//           <nav className="bg-blue-700 text-white px-8 py-4 flex gap-6">
//             <Link to="/admin">Dashboard</Link>
//             <Link to="/admin/create-drive">Create Drive</Link>
//             <Link to="/admin/search-student">Search Student</Link>
//             <Link to="/">Logout</Link>
//           </nav>
//
//           <AdminDashboard />
//         </div>
//       }
//     />
//
//     <Route
//       path="/admin/create-drive"
//       element={
//         <div>
//           <nav className="bg-blue-700 text-white px-8 py-4 flex gap-6">
//             <Link to="/admin">Dashboard</Link>
//             <Link to="/admin/create-drive">Create Drive</Link>
//             <Link to="/admin/search-student">Search Student</Link>
//             <Link to="/">Logout</Link>
//           </nav>
//
//           <CreateDrive />
//         </div>
//       }
//     />
//
//     <Route
//       path="/admin/search-student"
//       element={
//         <div>
//           <nav className="bg-blue-700 text-white px-8 py-4 flex gap-6">
//             <Link to="/admin">Dashboard</Link>
//             <Link to="/admin/create-drive">Create Drive</Link>
//             <Link to="/admin/search-student">Search Student</Link>
//             <Link to="/">Logout</Link>
//           </nav>
//
//           <SearchStudent />
//         </div>
//       }
//     />
//
//     <Route path="/student" element={<StudentDashboard />} />
//     <Route path="/admin/login" element={<AdminLogin />} />
//     <Route path="/student/login" element={<StudentLogin />} />
//
//       <Route path="/admin" element={<AdminDashboard />} />
//       <Route path="/admin/create-drive" element={<CreateDrive />} />
//       <Route path="/admin/search-student" element={<SearchStudent />} />
//       <Route path="/student/history" element={<PlacementHistory />} />
//       <Route
//         path="/admin/results"
//         element={<ResultManagement />}
//       />
//       <Route
//         path="/admin/upload-students"
//         element={<UploadStudents />}
//       />
//
//   </Routes>
//
// </BrowserRouter>
//
// );
// }
//
// export default App;
import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import CreateDrive from "./pages/CreateDrive";
import SearchStudent from "./pages/SearchStudent";
import StudentDashboard from "./pages/StudentDashboard";
import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import PlacementHistory from "./pages/PlacementHistory";
import ResultManagement from "./pages/ResultManagement";
import UploadStudents from "./pages/UploadStudents";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-drive" element={<CreateDrive />} />
        <Route path="/admin/search-student" element={<SearchStudent />} />
        <Route path="/admin/results" element={<ResultManagement />} />
        <Route path="/admin/upload-students" element={<UploadStudents />} />

        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/history" element={<PlacementHistory />} />
      </Routes>
    </HashRouter>
  );
}

export default App;