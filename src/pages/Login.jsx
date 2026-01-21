import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate successful login -> Go to Dashboard
    navigate("/dashboard");
  };

  const inputClass =
    "w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 transition-all shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none";
  const labelClass =
    "block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark">
            Dejob<span className="text-brand-green">.</span>
          </h1>
          <p className="text-sm text-slate-500 mt-2">Workspace Admin Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              placeholder="admin@dejob.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-lg text-sm font-bold text-white bg-brand-green hover:bg-brand-hover shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-0.5"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
