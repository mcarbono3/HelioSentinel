import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Zap, Brain } from 'lucide-react'

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo animado */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sun className="w-24 h-24 text-yellow-400 mx-auto" />
          </motion.div>
          
          {/* Iconos orbitales */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-6 h-6 text-blue-400 absolute -top-2 left-1/2 transform -translate-x-1/2" />
            <Brain className="w-6 h-6 text-purple-400 absolute top-1/2 -right-2 transform -translate-y-1/2" />
          </motion.div>
        </motion.div>

        {/* Título */}
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          HelioSentinel
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-xl text-blue-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Plataforma de IA para Sistemas Fotovoltaicos
        </motion.p>

        {/* Barra de progreso */}
        <motion.div
          className="w-64 h-2 bg-slate-700 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Texto de carga */}
        <motion.p
          className="text-sm text-slate-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Inicializando modelos de IA...
        </motion.p>
      </div>
    </div>
  )
}

export default LoadingScreen

