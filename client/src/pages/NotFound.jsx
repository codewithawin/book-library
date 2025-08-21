import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-6">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-base-content">
        Page Not Found
      </h2>
      <p className="mt-2 text-base-content/70 text-center max-w-md">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <div className="mt-6 flex gap-3">
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
