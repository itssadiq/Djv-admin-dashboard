import { LoginForm } from "../components";

const Login = () => {
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

        <LoginForm inputClass={inputClass} labelClass={labelClass} />
      </div>
    </div>
  );
};

export default Login;
