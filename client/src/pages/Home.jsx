import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
        Welcome to <span className="text-blue-600">MyBook Library</span>
      </h2>
      <p className="text-gray-600">
        Browse and manage your book collection here.
      </p>
      <Link className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
        Let's get started...
      </Link>
    </div>
  )
}
