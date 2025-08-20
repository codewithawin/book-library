import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Library, Mail, Lock, User } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      valid = false;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      setErrors({ ...newErrors, general: "Registration failed. Try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      data-theme="light"
      className="min-h-screen flex items-center justify-center bg-base-200 px-4"
    >
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Library className="w-9 h-9 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Book Library</h2>
          </div>

          <p className="text-center text-base text-base-content/70 mb-6">
            Create your account to start organizing your books
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
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="input w-full pl-10 z-0 text-base"
                  required
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}

              <div className="relative mt-2">
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
                  className="input w-full pl-10 z-0 text-base"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
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
                  className="input w-full pl-10 z-0 text-base"
                  required
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">{errors.password}</p>
              )}

              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="input w-full pl-10 z-0 text-base"
                  required
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary w-full text-base"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-base-content/70">
            Already have an account?{" "}
            <Link to="/signin" className="link link-primary">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
