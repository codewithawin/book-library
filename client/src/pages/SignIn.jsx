import { useState } from "react";
import { Link } from "react-router-dom";
import { Library, Mail, Lock } from "lucide-react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: "", password: "", general: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setErrors({
        ...newErrors,
        general: "Invalid email or password",
      });
    }, 1500);
  };

  return (
    <div
      data-theme="light"
      className="min-h-screen flex items-center justify-center bg-base-200 px-4"
    >
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Library className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold text-primary">Book Library</h2>
          </div>
          <p className="text-center text-sm text-base-content/70 mb-6">
            Login to access your bookshelf
          </p>

          {errors.general && (
            <div className="alert alert-error text-sm py-2 mb-2">
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="fieldset">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="input w-full pl-10 z-0"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}

              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="input w-full pl-10 z-0"
                  required
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-base-content/70">
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
