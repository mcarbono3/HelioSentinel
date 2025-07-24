import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Importa tus componentes de página
import LandingPage from './components/LandingPage.jsx'
import Dashboard from './components/Dashboard.jsx'
import AnomalyMonitor from './components/AnomalyMonitor.jsx' // Nuevo
import DataUpload from './components/DataUpload.jsx'         // Nuevo
import OptimizationHub from './components/OptimizationHub.jsx' // Nuevo
import PredictionCenter from './components/PredictionCenter.jsx' // Nuevo
// LoadingScreen no suele ser una ruta, sino un componente para mostrar mientras carga algo.
// Navigation se importará dentro de los layouts de las páginas que lo necesiten, no aquí.

// Importa tu DataProvider
import { DataProvider } from './contexts/DataContext.jsx'

function App() {
  return (
    <Router basename="/">
      <DataProvider>
        <Routes>
          {/* Rutas principales */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/anomalies" element={<AnomalyMonitor />} /> // Nueva Ruta
          <Route path="/upload" element={<DataUpload />} />       // Nueva Ruta
          <Route path="/optimization" element={<OptimizationHub />} /> // Nueva Ruta
          <Route path="/predictions" element={<PredictionCenter />} /> // Nueva Ruta

          {/* Ruta comodín para cualquier otra URL no definida, redirige a la página de inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DataProvider>
    </Router>
  )
}

export default App
