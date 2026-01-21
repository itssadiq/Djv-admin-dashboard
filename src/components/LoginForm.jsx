function LoginForm({ handleLogin, inputClass, labelClass }) {
  return (
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
        <input type="password" placeholder="••••••••" className={inputClass} />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-lg text-sm font-bold text-white bg-brand-green hover:bg-brand-hover shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-0.5"
      >
        Sign In to Dashboard
      </button>
    </form>
  );
}

export default LoginForm;
