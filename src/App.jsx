import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login'
import Register from './pages/auth/Register'
import MainLayouts from './pages/layouts/MainLayouts'
import ProtectRoute from './pages/auth/ProtectRoute'
import Mangas from './pages/mangas/Mangas'
import MangaDetail from './pages/mangas/MangaDetail'
import Dashboard from './pages/dashboard/Dashboard'
import SlipPayment from './pages/slipPayment/SlipPayment'
import Favorite from './pages/favorite/Favorite'
import Publisher from './pages/publisher/Publisher'
import SlipDetail from './pages/slipPayment/SlipDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route element={<MainLayouts />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/publisher" element={<Publisher />} />
            <Route path="/mangas" element={<Mangas />} />
            <Route path="/manga/:id" element={<MangaDetail />} />
            <Route path="/slip" element={<SlipPayment />} />
            <Route path="/slip/:id" element={<SlipDetail />} />
          </Route>
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </>
  )
}

export default App
