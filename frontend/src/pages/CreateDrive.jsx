// import { useState } from "react";
// import api from "../services/api";
// import Layout from "../components/Layout";
//
// export default function CreateDrive() {
//
// const [form, setForm] = useState({
// companyName: "",
// role: "",
// minimumCgpa: "",
// allowBacklog: false,
// pptDate: "",
// assessmentDate: "",
// expectedMonth: "",
// venue: "",
// groupLink: "",
// active: true,
// allowedBranches: [],
// });
//
// const branches = ["CSE", "ECE", "IT", "AIML", "CSM", "CSD"];
//
// const handleChange = (e) => {
// const { name, value, type, checked } = e.target;
//
//
// setForm({
//   ...form,
//   [name]: type === "checkbox" ? checked : value,
// });
//
//
// };
//
// const toggleBranch = (branch) => {
//
// const exists = form.allowedBranches.includes(branch);
//
// setForm({
//   ...form,
//   allowedBranches: exists
//     ? form.allowedBranches.filter((b) => b !== branch)
//     : [...form.allowedBranches, branch],
// });
//
//
// };
//
// const submit = async (e) => {
//
//
// e.preventDefault();
//
// try {
//
//   await api.post("/admin/drives", form);
//
//   alert("Recruitment drive created successfully!");
//
//   setForm({
//     companyName: "",
//     role: "",
//     minimumCgpa: "",
//     allowBacklog: false,
//     pptDate: "",
//     assessmentDate: "",
//     expectedMonth: "",
//     venue: "",
//     groupLink: "",
//     active: true,
//     allowedBranches: [],
//   });
//
// } catch (err) {
//
//   console.error(err);
//   alert("Failed to create drive");
// }
//
//
// };
//
// return ( <Layout title="Create Recruitment Drive">
//
//
//   <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
//
//     <h2 className="text-2xl font-bold text-slate-800 mb-6">
//       New Recruitment Drive
//     </h2>
//
//     <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Company Name
//         </label>
//         <input
//           name="companyName"
//           value={form.companyName}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           placeholder="Microsoft"
//         />
//       </div>
//
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Job Role
//         </label>
//         <input
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           placeholder="Software Development Engineer"
//         />
//       </div>
//
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Minimum CGPA
//         </label>
//         <input
//           type="number"
//           step="0.1"
//           name="minimumCgpa"
//           value={form.minimumCgpa}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           placeholder="8.5"
//         />
//       </div>
//
//       <div className="flex items-center gap-3 pt-8">
//         <input
//           type="checkbox"
//           name="allowBacklog"
//           checked={form.allowBacklog}
//           onChange={handleChange}
//           className="w-5 h-5 text-blue-600 rounded"
//         />
//         <span className="text-slate-700 font-medium">
//           Allow Backlogs
//         </span>
//       </div>
//
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           PPT Date
//         </label>
//         <input
//           type="date"
//           name="pptDate"
//           value={form.pptDate}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />
//       </div>
//
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Assessment Date
//         </label>
//         <input
//           type="date"
//           name="assessmentDate"
//           value={form.assessmentDate}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />
//       </div>
//
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Expected Joining Month
//         </label>
//         <input
//           name="expectedMonth"
//           value={form.expectedMonth}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           placeholder="August 2026"
//         />
//       </div>
//
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Venue
//         </label>
//         <input
//           name="venue"
//           value={form.venue}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           placeholder="Seminar Hall A"
//         />
//       </div>
//
//       <div className="md:col-span-2">
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           WhatsApp / Group Link
//         </label>
//         <input
//           name="groupLink"
//           value={form.groupLink}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           placeholder="https://chat.whatsapp.com/..."
//         />
//       </div>
//
//       <div className="md:col-span-2">
//         <label className="block text-sm font-medium text-slate-700 mb-3">
//           Allowed Branches
//         </label>
//
//         <div className="flex flex-wrap gap-3">
//           {branches.map((branch) => {
//             const selected = form.allowedBranches.includes(branch);
//
//             return (
//               <button
//                 key={branch}
//                 type="button"
//                 onClick={() => toggleBranch(branch)}
//                 className={`px-4 py-2 rounded-full border transition ${
//                   selected
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white text-slate-700 border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 {branch}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//
//       <div className="md:col-span-2 flex items-center justify-between pt-4 border-t">
//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             name="active"
//             checked={form.active}
//             onChange={handleChange}
//             className="w-5 h-5 text-blue-600 rounded"
//           />
//           <span className="text-slate-700 font-medium">
//             Mark drive as active
//           </span>
//         </div>
//
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
//         >
//           Create Drive
//         </button>
//       </div>
//
//     </form>
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
  Building2,
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Link,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  X,
} from "lucide-react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function CreateDrive() {
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    minimumCgpa: "",
    allowBacklog: false,
    pptDate: "",
    assessmentDate: "",
    expectedMonth: "",
    venue: "",
    groupLink: "",
    active: true,
    allowedBranches: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const branches = ["CSE", "ECE", "IT", "AIML", "CSM", "CSD"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear errors when user types
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const toggleBranch = (branch) => {
    const exists = form.allowedBranches.includes(branch);
    setForm({
      ...form,
      allowedBranches: exists
        ? form.allowedBranches.filter((b) => b !== branch)
        : [...form.allowedBranches, branch],
    });
  };

  const validate = () => {
    if (!form.companyName.trim()) {
      setError("Company name is required");
      return false;
    }
    if (!form.role.trim()) {
      setError("Job role is required");
      return false;
    }
    if (!form.minimumCgpa || parseFloat(form.minimumCgpa) < 0 || parseFloat(form.minimumCgpa) > 10) {
      setError("Please enter a valid CGPA (0-10)");
      return false;
    }
    if (!form.pptDate) {
      setError("PPT date is required");
      return false;
    }
    if (!form.assessmentDate) {
      setError("Assessment date is required");
      return false;
    }
    if (form.allowedBranches.length === 0) {
      setError("Please select at least one branch");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.post("/admin/drives", form);
      setSuccess(true);

      // Reset form
      setForm({
        companyName: "",
        role: "",
        minimumCgpa: "",
        allowBacklog: false,
        pptDate: "",
        assessmentDate: "",
        expectedMonth: "",
        venue: "",
        groupLink: "",
        active: true,
        allowedBranches: [],
      });

      // Auto-hide success after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create drive. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Create Recruitment Drive">
      <div className="max-w-5xl mx-auto">
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-xl">
            <PlusCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              New Recruitment Drive
            </h2>
            <p className="text-sm text-slate-500">
              Fill in the details to create a new drive
            </p>
          </div>
        </div>

        {/* Notification */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-start gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">
              Recruitment drive created successfully! 🎉
            </span>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="ml-auto text-emerald-500 hover:text-emerald-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <form onSubmit={submit} className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-slate-200/60">
          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/80"
                  placeholder="Microsoft"
                  required
                />
              </div>
            </div>

            {/* Job Role */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Job Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/80"
                  placeholder="Software Development Engineer"
                  required
                />
              </div>
            </div>

            {/* Minimum CGPA */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Minimum CGPA <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="minimumCgpa"
                  value={form.minimumCgpa}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/80"
                  placeholder="8.5"
                  required
                />
              </div>
            </div>

            {/* Allow Backlog */}
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                name="allowBacklog"
                checked={form.allowBacklog}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-slate-700 font-medium">Allow Backlogs</span>
            </div>

            {/* PPT Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                PPT Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  name="pptDate"
                  value={form.pptDate}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/80"
                  required
                />
              </div>
            </div>

            {/* Assessment Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Assessment Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  name="assessmentDate"
                  value={form.assessmentDate}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/80"
                  required
                />
              </div>
            </div>

            {/* Expected Month */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Expected Joining Month
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="expectedMonth"
                  value={form.expectedMonth}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/80"
                  placeholder="August 2026"
                />
              </div>
            </div>

            {/* Venue */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Venue
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/80"
                  placeholder="Seminar Hall A"
                />
              </div>
            </div>
          </div>

          {/* Group Link (full width) */}
          <div className="mt-6 space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              WhatsApp / Group Link
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                name="groupLink"
                value={form.groupLink}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/80"
                placeholder="https://chat.whatsapp.com/..."
              />
            </div>
          </div>

          {/* Allowed Branches (full width) */}
          <div className="mt-6 space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Allowed Branches <span className="text-red-500">*</span>
              <span className="text-xs font-normal text-slate-400 ml-2">
                ({form.allowedBranches.length} selected)
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {branches.map((branch) => {
                const selected = form.allowedBranches.includes(branch);
                return (
                  <button
                    key={branch}
                    type="button"
                    onClick={() => toggleBranch(branch)}
                    className={`
                      px-4 py-2 rounded-xl border-2 transition-all duration-200 font-medium text-sm
                      ${
                        selected
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                          : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }
                    `}
                  >
                    {branch}
                  </button>
                );
              })}
            </div>
            {form.allowedBranches.length === 0 && (
              <p className="text-xs text-amber-600">Please select at least one branch</p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-slate-700 font-medium">Mark drive as active</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold
                transition-all duration-200 flex items-center justify-center gap-2
                ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
                }
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5" />
                  Create Drive
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
