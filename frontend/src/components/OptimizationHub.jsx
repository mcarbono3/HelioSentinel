import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Settings, TrendingUp, Play, BarChart3, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useData } from '../contexts/DataContext'

const OptimizationHub = () => {
  const { api, optimizations, loading } = useData()
  const [optimizationParams, setOptimizationParams] = useState({
    objective: 'multi',
    power_weight: 0.4,
    efficiency_weight: 0.3,
    lifetime_weight: 0.3,
    constraints: {
      max_temperature: 85,
      min_efficiency: 0.15,
      max_degradation: 0.008
    }
  })
  const [lastOptimization, setLastOptimization] = useState(null)

  const handleOptimize = async () => {
    try {
      const result = await api.optimizeSystem(optimizationParams)
      setLastOptimization(result)
    } catch (error) {
      console.error('Error en optimización:', error)
    }
  }

  const mockOptimization = {
    optimization_id: 'OPT-001',
    pareto_solutions: [
      { power: 320, efficiency: 0.19, lifetime: 25, score: 0.92 },
      { power: 315, efficiency: 0.20, lifetime: 27, score: 0.89 },
      { power: 310, efficiency: 0.21, lifetime: 28, score: 0.87 }
    ],
    recommended_solution: {
      power: 318,
      efficiency: 0.195,
      lifetime: 26,
      score: 0.91,
      improvements: {
        power_increase: '+5.2%',
        efficiency_gain: '+2.1%',
        lifetime_extension: '+8.3%'
      }
    },
    timestamp: new Date().toISOString()
  }

  const displayOptimization = lastOptimization || mockOptimization

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Hub de Optimización
          </h1>
          <p className="text-slate-300 mb-8">
            Optimización multiobjetivo para maximizar desempeño y vida útil
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panel de configuración */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-blue-400" />
              Parámetros de Optimización
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-slate-300 mb-3">
                  Función Objetivo
                </label>
                <select
                  value={optimizationParams.objective}
                  onChange={(e) => setOptimizationParams({...optimizationParams, objective: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="multi">Multiobjetivo (NSGA-II)</option>
                  <option value="power">Maximizar Potencia</option>
                  <option value="efficiency">Maximizar Eficiencia</option>
                  <option value="lifetime">Maximizar Vida Útil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-3">
                  Pesos de Objetivos
                </label>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Potencia</span>
                      <span className="text-white">{(optimizationParams.power_weight * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={optimizationParams.power_weight}
                      onChange={(e) => setOptimizationParams({...optimizationParams, power_weight: Number(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Eficiencia</span>
                      <span className="text-white">{(optimizationParams.efficiency_weight * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={optimizationParams.efficiency_weight}
                      onChange={(e) => setOptimizationParams({...optimizationParams, efficiency_weight: Number(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Vida Útil</span>
                      <span className="text-white">{(optimizationParams.lifetime_weight * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={optimizationParams.lifetime_weight}
                      onChange={(e) => setOptimizationParams({...optimizationParams, lifetime_weight: Number(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-3">
                  Restricciones
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Temperatura Máxima (°C)
                    </label>
                    <input
                      type="number"
                      value={optimizationParams.constraints.max_temperature}
                      onChange={(e) => setOptimizationParams({
                        ...optimizationParams,
                        constraints: {...optimizationParams.constraints, max_temperature: Number(e.target.value)}
                      })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Eficiencia Mínima
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={optimizationParams.constraints.min_efficiency}
                      onChange={(e) => setOptimizationParams({
                        ...optimizationParams,
                        constraints: {...optimizationParams.constraints, min_efficiency: Number(e.target.value)}
                      })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleOptimize}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
              >
                <Play className="w-4 h-4 mr-2" />
                Ejecutar Optimización
              </Button>
            </div>
          </motion.div>

          {/* Resultados de optimización */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-400" />
              Solución Recomendada
            </h3>

            {displayOptimization ? (
              <div className="space-y-6">
                {/* Métricas principales */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {displayOptimization.recommended_solution.power}W
                    </div>
                    <div className="text-xs text-slate-300">Potencia</div>
                    <div className="text-xs text-green-400">
                      {displayOptimization.recommended_solution.improvements.power_increase}
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {(displayOptimization.recommended_solution.efficiency * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-slate-300">Eficiencia</div>
                    <div className="text-xs text-green-400">
                      {displayOptimization.recommended_solution.improvements.efficiency_gain}
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      {displayOptimization.recommended_solution.lifetime}
                    </div>
                    <div className="text-xs text-slate-300">Años</div>
                    <div className="text-xs text-green-400">
                      {displayOptimization.recommended_solution.improvements.lifetime_extension}
                    </div>
                  </div>
                </div>

                {/* Score general */}
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-purple-400/30">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Score de Optimización</span>
                    <span className="text-2xl font-bold text-purple-400">
                      {(displayOptimization.recommended_solution.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${displayOptimization.recommended_solution.score * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Soluciones del frente de Pareto */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Frente de Pareto</h4>
                  <div className="space-y-2">
                    {displayOptimization.pareto_solutions.slice(0, 3).map((solution, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                        <div className="flex space-x-4 text-sm">
                          <span className="text-blue-400">{solution.power}W</span>
                          <span className="text-green-400">{(solution.efficiency * 100).toFixed(1)}%</span>
                          <span className="text-purple-400">{solution.lifetime}a</span>
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {(solution.score * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  Optimización generada: {new Date(displayOptimization.timestamp).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-8">
                <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Configura los parámetros y ejecuta la optimización</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Historial de optimizaciones */}
        {optimizations.length > 0 && (
          <motion.div
            className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-orange-400" />
              Historial de Optimizaciones
            </h3>

            <div className="space-y-3">
              {optimizations.slice(0, 5).map((opt, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">
                      Optimización #{opt.optimization_id}
                    </div>
                    <div className="text-sm text-slate-400">
                      {new Date(opt.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-purple-400 font-semibold">
                      Score: {(opt.best_score * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-slate-400">
                      {opt.solutions_count} soluciones
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default OptimizationHub

