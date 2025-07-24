import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, TrendingUp, Play, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useData } from '../contexts/DataContext'

const PredictionCenter = () => {
  const { api, predictions, loading } = useData()
  const [inputData, setInputData] = useState({
    irradiance: 800,
    ambient_temp: 30,
    humidity: 75,
    wind_speed: 2.5,
    cloudiness: 20,
    precipitation: 0
  })
  const [lastPrediction, setLastPrediction] = useState(null)

  const handlePredict = async () => {
    try {
      const result = await api.predictPerformance(inputData)
      setLastPrediction(result)
    } catch (error) {
      console.error('Error en predicción:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Centro de Predicciones
          </h1>
          <p className="text-slate-300 mb-8">
            Predicción de desempeño fotovoltaico usando IA avanzada
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panel de entrada */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-400" />
              Condiciones de Entrada
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Irradiancia (W/m²)
                </label>
                <input
                  type="number"
                  value={inputData.irradiance}
                  onChange={(e) => setInputData({...inputData, irradiance: Number(e.target.value)})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Temperatura Ambiente (°C)
                </label>
                <input
                  type="number"
                  value={inputData.ambient_temp}
                  onChange={(e) => setInputData({...inputData, ambient_temp: Number(e.target.value)})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Humedad (%)
                </label>
                <input
                  type="number"
                  value={inputData.humidity}
                  onChange={(e) => setInputData({...inputData, humidity: Number(e.target.value)})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Velocidad del Viento (m/s)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputData.wind_speed}
                  onChange={(e) => setInputData({...inputData, wind_speed: Number(e.target.value)})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <Button
                onClick={handlePredict}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                <Play className="w-4 h-4 mr-2" />
                Generar Predicción
              </Button>
            </div>
          </motion.div>

          {/* Resultados */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Resultado de Predicción
            </h3>

            {lastPrediction ? (
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {lastPrediction.prediction?.predicted_power} W
                  </div>
                  <div className="text-sm text-slate-300">Potencia Predicha</div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-xl font-bold text-blue-400 mb-2">
                    {(lastPrediction.prediction?.confidence * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-slate-300">Confianza del Modelo</div>
                </div>

                <div className="text-xs text-slate-400">
                  Predicción generada: {new Date(lastPrediction.timestamp).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-8">
                <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Ingresa las condiciones y genera una predicción</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Historial de predicciones */}
        {predictions.length > 0 && (
          <motion.div
            className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
              Historial de Predicciones
            </h3>

            <div className="space-y-3">
              {predictions.slice(0, 5).map((pred, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">
                      {pred.prediction_result?.predicted_power} W
                    </div>
                    <div className="text-sm text-slate-400">
                      {new Date(pred.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-green-400">
                    {(pred.confidence_score * 100).toFixed(1)}% confianza
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

export default PredictionCenter

