import { Link } from "react-router-dom"

export default function Home() {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-xl w-full">
      <div className="text-6xl mb-4">📚</div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Your Book Library</h1>
        <p className="text-xl text-muted-foreground mb-6">Browse and manage your book collection here.</p>

        <div className="space-x-4">
          <Link 
            href="/signin" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/signup" 
            className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}
