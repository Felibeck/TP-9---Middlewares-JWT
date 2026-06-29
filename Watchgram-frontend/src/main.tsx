import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "react-router-dom"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './Profile.tsx'
import Login from './pages/Login.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  
  <BrowserRouter>

    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<ProtectedRoute><App/></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
)
