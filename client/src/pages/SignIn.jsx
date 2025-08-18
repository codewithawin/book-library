import { useState } from "react";
import { Link } from "react-router-dom";
import { Library, Mail, Lock } from "lucide-react";

export default function SignIn() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setError("Invalid credentials");
    }, 1500);
  };

  return (
    <div
      data-theme="light"
      className="min-h-screen flex items-center justify-center bg-base-200 px-4"
    >
      <div className="card w-full max-w-md bg-white shadow-lg rounded-xl">
        <div className="card-body">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Library className="w-7 h-7 text-primary" />
            <h2 className="text-2xl font-bold text-primary">Book Library</h2>
          </div>
          <p className="text-center text-sm text-gray-500 mb-6">
            Login to access your bookshelf
          </p>

          {error && (
            <div className="alert alert-error text-sm py-2 mb-2">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset w-full mb-2">
              <label htmlFor="email" className="label mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="input w-full pl-10 z-0"
                  required
                />
              </div>
            </fieldset>

            <fieldset className="fieldset w-full mb-2">
              <label htmlFor="password" className="label mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="input w-full pl-10 z-0"
                  required
                />
              </div>
            </fieldset>

            <div className="text-right mb-4">
              <Link to="/forgot-password" className="link text-sm text-primary">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
