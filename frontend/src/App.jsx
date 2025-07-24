import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

// Componente básico de landing page
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            HelioSentinel
          </span>
        </h1>
        <p className="text-2xl text-blue-200 mb-8">
          Plataforma de IA para Sistemas Fotovoltaicos
        </p>
        <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
          Revoluciona tu instalación solar con inteligencia artificial avanzada. 
          Predicción de desempeño, detección temprana de anomalías y optimización 
          multiobjetivo para climas tropicales.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-blue-400">1,247</div>
            <div className="text-sm text-slate-300">Módulos Monitoreados</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-green-400">98.7%</div>
            <div className="text-sm text-slate-300">Precisión IA</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-orange-400">23</div>
            <div className="text-sm text-slate-300">Anomalías Detectadas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-purple-400">94.2%</div>
            <div className="text-sm text-slate-300">Eficiencia Sistema</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl"
          >
            Acceder al Dashboard
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl"
          >
            Subir Datos
          </Button>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Predicción de Desempeño</h3>
            <p className="text-slate-300">Modelo robusto para climas tropicales usando Random Forest + LSTM</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Detección de Anomalías</h3>
            <p className="text-slate-300">Sistema temprano usando Isolation Forest + Autoencoder</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Optimización Multiobjetivo</h3>
            <p className="text-slate-300">NSGA-II + Deep Q-Network para control adaptativo</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente básico de dashboard
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard de Control</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Módulos Activos</h3>
            <div className="text-3xl font-bold text-yellow-400">1,247</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Potencia Generada</h3>
            <div className="text-3xl font-bold text-green-400">2,847 kWh</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Eficiencia Promedio</h3>
            <div className="text-3xl font-bold text-blue-400">94.2%</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Anomalías Activas</h3>
            <div className="text-3xl font-bold text-red-400">23</div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Sistema HelioSentinel</h3>
          <p className="text-slate-300 mb-4">
            Plataforma de IA para monitoreo y optimización de sistemas fotovoltaicos en tiempo real.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Funcionalidades Principales</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Predicción de desempeño FV para climas tropicales</li>
                <li>• Detección temprana de anomalías y fallas</li>
                <li>• Optimización multiobjetivo de sistemas solares</li>
                <li>• Análisis de datos en tiempo real</li>
                <li>• Dashboards profesionales</li>
                <li>• Gemelo digital de sistemas fotovoltaicos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Tecnologías Utilizadas</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Machine Learning (Random Forest, LSTM)</li>
                <li>• Deep Learning (Autoencoder, DQN)</li>
                <li>• XAI (Explainable AI)</li>
                <li>• Digital Twin</li>
                <li>• NSGA-II</li>
                <li>• Isolation Forest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

