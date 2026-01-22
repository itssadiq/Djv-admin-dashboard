import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/auth";
import loginSchema from "./loginSchema";
import { useState } from "react";

function LoginForm({ inputClass, labelClass }) {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [authError, setAuthError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const handleLogin = async (data) => {
    try {
      setAuthError(null);

      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      // Success - navigate to dashboard
      reset();
      navigate("/dashboard");
    } catch (error) {
      // Handle different error types
      if (error.status === "UNAUTHORIZED") {
        setAuthError(
          "You don't have permission to access the admin dashboard.",
        );
      } else if (error.status === "AUTH_ERROR") {
        setAuthError(error.message || "Invalid email or password.");
      } else {
        setAuthError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
      {/* Auth Error Alert */}
      {authError && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 font-medium">{authError}</p>
        </div>
      )}

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
        disabled={isLoading}
        className="w-full py-3.5 rounded-lg text-sm font-bold text-white bg-brand-green hover:bg-brand-hover shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
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
            Signing In...
          </span>
        ) : (
          "Sign In to Dashboard"
        )}
      </button>
    </form>
  );
}

export default LoginForm;
