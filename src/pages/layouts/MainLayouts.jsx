import React from 'react'
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function MainLayouts() {
  return (
    <main className="bg-gray-100 text-gray-800 font-sans">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col w-full overflow-auto">
          <Navbar/>
          <div className="w-full h-[calc(100vh-78px)] overflow-y-auto xl:p-6 p-6 mt-2">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}
