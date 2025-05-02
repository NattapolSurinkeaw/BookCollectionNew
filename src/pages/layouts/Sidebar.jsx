import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
  <aside className="max-sm:fixed w-full md:w-64 bg-[#2c3e50] text-white bottom-0 md:top-0 md:left-0 md:h-screen z-50">
  <div className="hidden md:flex items-center p-5 border-b border-[#34495e]">
    <i className="fas fa-book-open text-2xl mr-3"></i>
    <h1 className="text-lg font-semibold">MangaAdmin</h1>
  </div>
  
  <nav className="mt-0 md:mt-5">
    <ul className="flex md:block overflow-x-auto">
      <li className="active bg-[#3498db] flex-1 md:flex-none">
        <Link to="/" className="flex flex-col md:flex-row items-center justify-start p-3 md:p-4 hover:bg-[#34495e] transition text-xs md:text-base">
          <i className="fas fa-home mb-1 md:mb-0 md:mr-3"></i> 
          <span>Dashboard</span>
        </Link>
      </li>
      <li className="flex-1 md:flex-none">
        <Link to="/publisher" className="flex flex-col md:flex-row items-center justify-start p-3 md:p-4 hover:bg-[#34495e] transition text-xs md:text-base">
          <i className="fas fa-list mb-1 md:mb-0 md:mr-3"></i> 
          <span>Publisher</span>
        </Link>
      </li>
      <li className="flex-1 md:flex-none">
        <Link to="/favorite" className="flex flex-col md:flex-row items-center justify-start p-3 md:p-4 hover:bg-[#34495e] transition text-xs md:text-base">
          <i className="fas fa-book mb-1 md:mb-0 md:mr-3"></i> 
          <span>Favorite</span>
        </Link>
      </li>
      <li className="flex-1 md:flex-none">
        <Link to="/mangas" className="flex flex-col md:flex-row items-center justify-start p-3 md:p-4 hover:bg-[#34495e] transition text-xs md:text-base">
          <i className="fas fa-users mb-1 md:mb-0 md:mr-3"></i> 
          <span>Manga</span>
        </Link>
      </li>
      <li className="flex-1 md:flex-none">
        <Link to="/slip" className="flex flex-col md:flex-row items-center justify-start p-3 md:p-4 hover:bg-[#34495e] transition text-xs md:text-base">
          <i className="fas fa-flag mb-1 md:mb-0 md:mr-3"></i> 
          <span>SlipPayment</span>
        </Link>
      </li>
    </ul>
  </nav>
</aside>
  )
}
