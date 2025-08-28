import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Library } from "lucide-react";
import { loginUser, clearError } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      toast.success("Login successful!");
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
    dispatch(loginUser(data));
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
            Login to access your bookshelf
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <fieldset className="fieldset">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="input w-full pl-10 z-0 text-base"
                  {...register("email", { required: "Email is required" })}
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
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary w-full text-base"
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
