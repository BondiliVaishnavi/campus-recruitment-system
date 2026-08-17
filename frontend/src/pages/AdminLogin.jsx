import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn, Building2 } from "lucide-react";
import api from "../services/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      console.log("Sending admin login request...");
      console.log("Username:", username);

      const response = await api.post("/auth/admin/login", {
        username: username.trim(),
        password: password,
      });

      console.log("LOGIN RESPONSE:", response);
      console.log("LOGIN DATA:", response.data);
      console.log("LOGIN STATUS:", response.status);

      if (response.data.role === "ADMIN") {
        localStorage.setItem("role", "ADMIN");

        console.log("Admin login successful. Navigating to dashboard...");

        navigate("/admin");
      } else {
        console.log("Unexpected role:", response.data.role);

        setError("Access denied. Admin role required.");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      console.log("MESSAGE:", err.message);

      if (err.response) {
        setError(
          err.response.data?.message ||
            `Login failed (${err.response.status})`
        );
      } else if (err.request) {
        setError(
          "Unable to reach the server. Please check your connection."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Decorative circles */}
      <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md animate-fade-in-up">

        <form
          onSubmit={login}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 space-y-6 border border-white/20"
        >

          {/* Branding */}
          <div className="text-center">

            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
                <Building2 className="h-8 w-8" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              CampusRecruit
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Admin Panel
            </p>

          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="relative">

            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

            <input
              type="text"
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/80"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

          </div>

          {/* Password */}
          <div className="relative">

            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

            <input
              type="password"
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/80"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">

              <input
                type="checkbox"
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />

              Remember me

            </label>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </a>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
            }`}
          >

            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>

                Logging in...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Login
              </>
            )}

          </button>

          <p className="text-center text-xs text-slate-400 mt-2">
            Secure admin access • © {new Date().getFullYear()} CampusRecruit
          </p>

        </form>

      </div>

    </div>
  );
}