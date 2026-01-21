import loginSchema from "./loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

function LoginForm({ inputClass, labelClass }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
      <div>
        <label className={labelClass}>Email Address</label>
        <input
          type="email"
          placeholder="admin@dejob.com"
          className={inputClass}
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className={labelClass}>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className={inputClass}
          {...register("password")}
        />
        {errors.password?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-lg text-sm font-bold text-white bg-brand-green hover:bg-brand-hover shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-0.5"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing In..." : "Sign In to Dashboard"}
      </button>
    </form>
  );
}

export default LoginForm;
