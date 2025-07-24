import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Database, CheckCircle, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useData } from '../contexts/DataContext'

const DataUpload = () => {
  const { api, loading } = useData()
  const [dragActive, setDragActive] = useState(false)
  const [uploadResults, setUploadResults] = useState([])
  const [dataType, setDataType] = useState('solar')
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = async (files) => {
    const file = files[0]
    
    if (!file) return
    
    // Validar tipo de archivo
    const validTypes = ['.csv', '.xlsx', '.txt']
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    
    if (!validTypes.includes(fileExtension)) {
      setUploadResults(prev => [...prev, {
        id: Date.now(),
        filename: file.name,
        status: 'error',
        message: 'Tipo de archivo no válido. Use CSV, XLSX o TXT.'
      }])
      return
    }

    try {
      const result = await api.uploadFile(file, dataType)
      setUploadResults(prev => [...prev, {
        id: Date.now(),
        filename: file.name,
        status: 'success',
        message: `${result.records_created} registros creados exitosamente`,
        details: result
      }])
    } catch (error) {
      setUploadResults(prev => [...prev, {
        id: Date.now(),
        filename: file.name,
        status: 'error',
        message: error.message
      }])
    }
  }

  const removeResult = (id) => {
    setUploadResults(prev => prev.filter(result => result.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Carga de Datos
          </h1>
          <p className="text-slate-300 mb-8">
            Sube archivos CSV, XLSX o TXT con datos solares y ambientales
          </p>
        </motion.div>

        {/* Selector de tipo de datos */}
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Tipo de Datos</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                dataType === 'solar' 
                  ? 'border-blue-400 bg-blue-400/10' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => setDataType('solar')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-2">
                <Database className="w-5 h-5 text-blue-400 mr-2" />
                <span className="font-semibold text-white">Datos Solares</span>
              </div>
              <p className="text-sm text-slate-300">
                Voltajes, corrientes, potencia, eficiencia y temperatura de módulos
              </p>
            </motion.div>

            <motion.div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                dataType === 'environmental' 
                  ? 'border-green-400 bg-green-400/10' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => setDataType('environmental')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-2">
                <Database className="w-5 h-5 text-green-400 mr-2" />
                <span className="font-semibold text-white">Datos Ambientales</span>
              </div>
              <p className="text-sm text-slate-300">
                Temperatura, irradiancia, humedad, viento y precipitación
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Zona de carga */}
        <motion.div
          className={`relative bg-white/5 backdrop-blur-lg rounded-xl p-8 border-2 border-dashed transition-all duration-300 ${
            dragActive 
              ? 'border-blue-400 bg-blue-400/10' 
              : 'border-white/20 hover:border-white/40'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.txt"
            onChange={handleChange}
            className="hidden"
          />

          <div className="text-center">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 text-blue-400"
              animate={{ y: dragActive ? -5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Upload className="w-full h-full" />
            </motion.div>

            <h3 className="text-xl font-semibold text-white mb-2">
              Arrastra archivos aquí o haz clic para seleccionar
            </h3>
            <p className="text-slate-300 mb-6">
              Formatos soportados: CSV, XLSX, TXT (máximo 16MB)
            </p>

            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              <FileText className="w-4 h-4 mr-2" />
              Seleccionar Archivo
            </Button>
          </div>
        </motion.div>

        {/* Resultados de carga */}
        {uploadResults.length > 0 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Resultados de Carga</h3>
            <div className="space-y-3">
              {uploadResults.map((result) => (
                <motion.div
                  key={result.id}
                  className={`bg-white/5 backdrop-blur-lg rounded-lg p-4 border ${
                    result.status === 'success' 
                      ? 'border-green-400/50' 
                      : 'border-red-400/50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {result.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                      )}
                      <div>
                        <div className="font-semibold text-white">{result.filename}</div>
                        <div className={`text-sm ${
                          result.status === 'success' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {result.message}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeResult(result.id)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Información de formato */}
        <motion.div
          className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Formato de Datos</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Datos Solares (Requeridos)</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• module_id: ID del módulo</li>
                <li>• open_circuit_voltage: Voltaje de circuito abierto (V)</li>
                <li>• max_power_voltage: Voltaje de máxima potencia (V)</li>
                <li>• max_power_current: Corriente de máxima potencia (A)</li>
                <li>• short_circuit_current: Corriente de cortocircuito (A)</li>
                <li>• max_power: Potencia máxima (W)</li>
                <li>• efficiency: Eficiencia (0-1)</li>
                <li>• cell_temperature: Temperatura de celda (°C)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Datos Ambientales (Requeridos)</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• ambient_temperature: Temperatura ambiente (°C)</li>
                <li>• irradiance: Irradiancia (W/m²)</li>
                <li>• humidity: Humedad relativa (%)</li>
                <li>• wind_speed: Velocidad del viento (m/s)</li>
                <li>• precipitation: Precipitación (mm) [opcional]</li>
                <li>• cloudiness: Nubosidad (%) [opcional]</li>
                <li>• location_id: ID de ubicación [opcional]</li>
                <li>• timestamp: Marca de tiempo [opcional]</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DataUpload

