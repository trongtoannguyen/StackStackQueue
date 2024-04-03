// import { useState } from 'react'
import './App.scss'
import AdminRoutes from './routes/AdminRoutes';
import AppRoutes from './routes/AppRoutes'
// import { Admin, Resource, CustomRoutes } from 'react-admin';
import { Routes, Route } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)

  return (

    <main className="app-container">
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </main>

  )
}

export default App
