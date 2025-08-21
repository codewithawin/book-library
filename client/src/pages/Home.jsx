import { Link } from "react-router-dom";
import { Library, LogIn, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="card w-full max-w-2xl bg-base-200 shadow-xl">
        <div className="card-body text-center">
          <div className="flex justify-center mb-4">
            <Library className="h-16 w-16 text-primary" />
          </div>

          <h1 className="text-4xl font-bold text-base-content mb-2">
            Welcome to Your Book Library
          </h1>

          <p className="text-base text-base-content/70 mb-6">
            Organize, browse, and manage your book collection with ease.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signin" className="btn btn-primary gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-secondary gap-2">
              <UserPlus className="w-4 h-4" />
              Create Account
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-base-content/80">
            <div className="p-3 bg-base-100 rounded-lg shadow-sm">
              <h3 className="font-semibold">📖 Browse</h3>
              <p>Easily explore your personal library collection.</p>
            </div>
            <div className="p-3 bg-base-100 rounded-lg shadow-sm">
              <h3 className="font-semibold">⭐ Organize</h3>
              <p>Sort and manage books with categories and tags.</p>
            </div>
            <div className="p-3 bg-base-100 rounded-lg shadow-sm">
              <h3 className="font-semibold">🔍 Search</h3>
              <p>Find books quickly with smart filtering options.</p>
            </div>
          </div>

          <footer className="mt-8 text-sm text-base-content/70">
            © {new Date().getFullYear()} Your Book Library. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
