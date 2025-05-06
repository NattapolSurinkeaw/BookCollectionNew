import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate('/login')
  }
  return (
    <nav className="w-full bg-gradient-to-r from-green-600 to-green-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div></div>

          {/* User/Logout Section */}
          <div className="ml-4 flex items-center md:ml-6">
            {/* User Profile (optional) */}
            <div className="ml-3 relative">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src="/images/user.jpg"
                  alt="User profile"
                />
                <span className="ml-2 text-white text-sm font-medium hidden md:inline">Admin</span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logOut}
              className="ml-4 flex items-center text-white bg-green-700 hover:bg-green-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
