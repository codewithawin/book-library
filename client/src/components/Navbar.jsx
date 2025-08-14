import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className='bg-slate-100 shadow-sm'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className="text-2xl font-bold text-blue-600">📚 MyBook Library</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/login'>
            <li className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>
              Log In
            </li>
          </Link>
          <Link to='/register'>
            <li className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition'>
              Register
            </li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
