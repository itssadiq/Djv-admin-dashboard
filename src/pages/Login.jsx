import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, validation and API calls go here.
    // For now, we redirect to dashboard.
    navigate("/");
  };

  // Consistent Input Styles from Dashboard
  const inputClass =
    "w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 transition-all shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none";
  const labelClass =
    "block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10 animate-fade-in">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark">
            Dejob<span className="text-brand-green">.</span>
          </h1>
          <p className="text-sm text-slate-500 mt-2">Workspace Admin Access</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dejob.com"
              className={inputClass}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="text-xs font-bold text-slate-600 uppercase tracking-wide"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs font-medium text-brand-green hover:text-brand-hover transition"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-brand-green border-slate-300 rounded focus:ring-brand-green cursor-pointer accent-brand-green"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-slate-600 cursor-pointer"
            >
              Keep me signed in
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-lg text-sm font-bold text-white bg-brand-green hover:bg-brand-hover shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green"
          >
            Sign In to Dashboard
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Protected by Dejob Secure Systems © 2024
        </p>
      </div>
    </div>
  );
};

export default Login;
