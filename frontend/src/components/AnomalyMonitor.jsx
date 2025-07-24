import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, Clock, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useData } from '../contexts/DataContext'

const AnomalyMonitor = () => {
  const { anomalies, api, loading } = useData()
  const [selectedAnomaly, setSelectedAnomaly] = useState(null)

  const severityColors = {
    'Baja': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    'Media': 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    'Alta': 'text-red-400 bg-red-400/10 border-red-400/30',
    'Crítica': 'text-red-600 bg-red-600/10 border-red-600/30'
  }

  const mockAnomalies = [
    {
      id: 1,
      module_id: 'PV-001',
      anomaly_type: 'Degradación Gradual',
      severity_level: 'Media',
      confidence: 'Alta',
      description: 'Disminución gradual en la eficiencia del módulo',
      recommended_action: 'Monitoreo continuo y planificación de reemplazo',
      priority: 'Media',
      timeframe: '3-6 meses',
      timestamp: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 2,
      module_id: 'PV-015',
      anomaly_type: 'Sobrecalentamiento',
      severity_level: 'Alta',
      confidence: 'Muy Alta',
      description: 'Temperatura de celda excesivamente alta detectada',
      recommended_action: 'Mejorar ventilación y verificar montaje',
      priority: 'Alta',
      timeframe: '1 semana',
      timestamp: new Date().toISOString(),
      status: 'active'
    }
  ]

  const displayAnomalies = anomalies.length > 0 ? anomalies : mockAnomalies

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Monitor de Anomalías
          </h1>
          <p className="text-slate-300 mb-8">
            Detección temprana y análisis de fallas en módulos solares
          </p>
        </motion.div>

        {/* Resumen de estado */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400">
                {displayAnomalies.filter(a => a.status === 'resolved').length}
              </span>
            </div>
            <div className="text-sm text-slate-300">Resueltas</div>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">
                {displayAnomalies.filter(a => a.severity_level === 'Media').length}
              </span>
            </div>
            <div className="text-sm text-slate-300">Media Prioridad</div>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <span className="text-2xl font-bold text-red-400">
                {displayAnomalies.filter(a => a.severity_level === 'Alta').length}
              </span>
            </div>
            <div className="text-sm text-slate-300">Alta Prioridad</div>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold text-red-600">
                {displayAnomalies.filter(a => a.severity_level === 'Crítica').length}
              </span>
            </div>
            <div className="text-sm text-slate-300">Críticas</div>
          </motion.div>
        </div>

        {/* Lista de anomalías */}
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6">Anomalías Detectadas</h3>

          <div className="space-y-4">
            {displayAnomalies.map((anomaly, index) => (
              <motion.div
                key={anomaly.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setSelectedAnomaly(anomaly)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityColors[anomaly.severity_level]}`}>
                      {anomaly.severity_level}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{anomaly.module_id}</div>
                      <div className="text-sm text-slate-300">{anomaly.anomaly_type}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-slate-400">
                      {new Date(anomaly.timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-500">
                      Confianza: {anomaly.confidence}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-sm text-slate-300">
                  {anomaly.description}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center text-sm text-blue-400">
                    <Wrench className="w-4 h-4 mr-1" />
                    {anomaly.timeframe}
                  </div>
                  <div className="flex items-center text-sm text-orange-400">
                    <Clock className="w-4 h-4 mr-1" />
                    Prioridad {anomaly.priority}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modal de detalles */}
        {selectedAnomaly && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedAnomaly(null)}
          >
            <motion.div
              className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Detalles de Anomalía - {selectedAnomaly.module_id}
                </h3>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedAnomaly(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400">Tipo de Anomalía</label>
                  <div className="text-lg font-semibold text-white">{selectedAnomaly.anomaly_type}</div>
                </div>

                <div>
                  <label className="text-sm text-slate-400">Descripción</label>
                  <div className="text-white">{selectedAnomaly.description}</div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400">Severidad</label>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${severityColors[selectedAnomaly.severity_level]}`}>
                      {selectedAnomaly.severity_level}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Confianza</label>
                    <div className="text-white">{selectedAnomaly.confidence}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400">Acción Recomendada</label>
                  <div className="text-white bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
                    {selectedAnomaly.recommended_action}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAnomaly(null)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Cerrar
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar como Resuelta
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AnomalyMonitor

