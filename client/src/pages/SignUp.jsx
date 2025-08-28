import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Library, Mail, Lock, User } from "lucide-react";
import { registerUser, clearError } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (user) {
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = (data) => {
    dispatch(clearError());
    dispatch(
      registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Library className="w-9 h-9 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Book Library</h2>
          </div>

          <p className="text-center text-base text-base-content/70 mb-6">
            Create your account to start organizing your books
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <fieldset className="fieldset">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className="input w-full pl-10 z-0 text-base"
                  {...register("username", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}

              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="input w-full pl-10 z-0 text-base"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}

              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="input w-full pl-10 z-0 text-base"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}

              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input w-full pl-10 z-0 text-base"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600">
                  {errors.confirmPassword.message}
                </p>
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
