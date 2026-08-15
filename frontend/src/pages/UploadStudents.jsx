// import { useState } from "react";
// import api from "../services/api";
// import Layout from "../components/Layout";
//
// export default function UploadStudents() {
//
// const [file, setFile] = useState(null);
// const [message, setMessage] = useState("");
// const [loading, setLoading] = useState(false);
//
// const upload = async () => {
//
//
// if (!file) {
//   alert("Please select a CSV file");
//   return;
// }
//
// const formData = new FormData();
// formData.append("file", file);
//
// try {
//
//   setLoading(true);
//
//   const res = await api.post(
//     "/admin/students/upload",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
//
//   setMessage(res.data);
//
// } catch (err) {
//
//   console.error(err);
//   setMessage("Upload failed");
//
// } finally {
//
//   setLoading(false);
// }
//
// };
//
// return ( <Layout title="Upload Students">
//
// ```
//   <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
//
//     <h2 className="text-3xl font-bold text-slate-800 mb-2">
//       Bulk Student Upload
//     </h2>
//
//     <p className="text-slate-500 mb-6">
//       Upload a CSV file containing student records.
//     </p>
//
//     <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center bg-blue-50">
//
//       <input
//         type="file"
//         accept=".csv"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="block mx-auto mb-4"
//       />
//
//       {file && (
//         <p className="text-slate-700 font-medium">
//           Selected: {file.name}
//         </p>
//       )}
//
//     </div>
//
//     <button
//       onClick={upload}
//       disabled={loading}
//       className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
//     >
//       {loading ? "Uploading..." : "Upload CSV"}
//     </button>
//
//     {message && (
//       <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium">
//         {message}
//       </div>
//     )}
//
//     <div className="mt-8 border-t pt-6">
//
//       <h3 className="text-lg font-semibold text-slate-800 mb-3">
//         CSV Format
//       </h3>
//
//       <pre className="bg-slate-100 rounded-xl p-4 text-sm overflow-x-auto">
//
//
// {`roll_no,name,cgpa,branch,backlog,password
// 23R21A05D6,Vaishnavi,9.37,CSE,false,vaish123
// 23R21A05D7,Ravi,8.60,ECE,false,ravi123`} </pre>
//
//
//     </div>
//
//   </div>
//
// </Layout>
//
//
// );
// }
import { useState, useRef } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Download,
  X,
  Loader2,
} from "lucide-react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function UploadStudents() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    // Validate file type
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Please select a CSV file.");
      setFile(null);
      return;
    }
    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setError("");
    setMessage("");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    setMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const upload = async () => {
    if (!file) {
      setError("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await api.post("/admin/students/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data?.message || "Upload successful!");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadSample = () => {
    const csvContent = `roll_no,name,cgpa,branch,backlog,password\n23R21A05D6,Vaishnavi,9.37,CSE,false,vaish123\n23R21A05D7,Ravi,8.60,ECE,false,ravi123`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_students.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout title="Upload Students">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <Upload className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Bulk Student Upload</h2>
            <p className="text-sm text-slate-500">
              Upload a CSV file to add multiple students at once.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 md:p-8">
          {/* Drag & Drop Area */}
          <div
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
              isDragging
                ? "border-blue-500 bg-blue-50/50"
                : error
                ? "border-red-300 bg-red-50/30"
                : file
                ? "border-emerald-300 bg-emerald-50/30"
                : "border-slate-300 bg-slate-50/50 hover:bg-slate-100/50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              ref={fileInputRef}
              disabled={loading}
            />
            <div className="flex flex-col items-center gap-3">
              {file ? (
                <>
                  <div className="p-4 bg-emerald-100 rounded-full">
                    <FileSpreadsheet className="h-10 w-10 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">{file.name}</p>
                    <p className="text-sm text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <>
                  <div className="p-4 bg-blue-100 rounded-full">
                    <Upload className="h-10 w-10 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-slate-700">
                      Drop your CSV file here
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      or click to browse &nbsp;•&nbsp; Max 5MB
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Error / Message */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          {message && (
            <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-start gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{message}</span>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <button
              onClick={upload}
              disabled={!file || loading}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                !file || loading
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Upload CSV
                </>
              )}
            </button>
            <button
              onClick={downloadSample}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Sample CSV
            </button>
          </div>
        </div>

        {/* CSV Format Reference */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">CSV Format Reference</h3>
          <div className="bg-slate-50 rounded-xl p-4 overflow-x-auto border border-slate-200/60">
            <pre className="text-sm text-slate-700 font-mono">
{`roll_no,name,cgpa,branch,backlog,password
23R21A05D6,Vaishnavi,9.37,CSE,false,vaish123
23R21A05D7,Ravi,8.60,ECE,false,ravi123`}
            </pre>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            <span className="font-medium">Note:</span> Backlog must be <span className="font-mono">true</span> or <span className="font-mono">false</span>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
