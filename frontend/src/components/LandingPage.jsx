import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Sun, Zap, Brain, TrendingUp, Shield, Settings, 
  ChevronRight, Play, BarChart3, Activity, Cpu,
  Database, Cloud, Gauge, AlertTriangle, Target,
  ArrowRight, CheckCircle, Star, Users, Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const LandingPage = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    modules: 1247,
    predictions: 98.7,
    anomalies: 23,
    efficiency: 94.2
  })

  // Animación de estadísticas
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        modules: prev.modules + Math.floor(Math.random() * 3),
        predictions: Math.min(99.9, prev.predictions + Math.random() * 0.1),
        anomalies: Math.max(0, prev.anomalies + Math.floor(Math.random() * 3) - 1),
        efficiency: Math.min(99, prev.efficiency + Math.random() * 0.5 - 0.25)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: TrendingUp,
      title: "Predicción de Desempeño FV",
      description: "Modelo robusto para climas tropicales usando Random Forest + LSTM",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Detección de Anomalías",
      description: "Sistema temprano de detección usando Isolation Forest + Autoencoder",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Optimización Multiobjetivo",
      description: "NSGA-II + Deep Q-Network para control adaptativo",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const technologies = [
    { name: "Machine Learning", icon: Brain, description: "Algoritmos avanzados de aprendizaje automático" },
    { name: "Deep Learning", icon: Cpu, description: "Redes neuronales profundas para análisis complejo" },
    { name: "XAI", icon: Brain, description: "Inteligencia artificial explicable y transparente" },
    { name: "Digital Twin", icon: Database, description: "Gemelo digital de sistemas fotovoltaicos" },
    { name: "Real-time Processing", icon: Zap, description: "Procesamiento de datos en tiempo real" },
    { name: "Cloud Analytics", icon: Cloud, description: "Análisis escalable en la nube" }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Incremento de Eficiencia",
      value: "+15%",
      description: "Mejora promedio en el rendimiento energético"
    },
    {
      icon: Shield,
      title: "Reducción de Fallas",
      value: "-80%",
      description: "Detección temprana previene fallas críticas"
    },
    {
      icon: Settings,
      title: "Optimización Automática",
      value: "24/7",
      description: "Monitoreo y ajuste continuo del sistema"
    },
    {
      icon: BarChart3,
      title: "ROI Mejorado",
      value: "+25%",
      description: "Retorno de inversión optimizado"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Logo principal */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative inline-block">
              <motion.div
                className="w-32 h-32 mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sun className="w-full h-full text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              HelioSentinel
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            className="text-2xl md:text-3xl text-blue-200 mb-8 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Plataforma de IA para Sistemas Fotovoltaicos
          </motion.p>

          {/* Descripción */}
          <motion.p
            className="text-lg text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            Revoluciona tu instalación solar con inteligencia artificial avanzada. 
            Predicción de desempeño, detección temprana de anomalías y optimización 
            multiobjetivo para climas tropicales.
          </motion.p>

          {/* Estadísticas en tiempo real */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-blue-400">{stats.modules.toLocaleString()}</div>
              <div className="text-sm text-slate-300">Módulos Monitoreados</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-green-400">{stats.predictions.toFixed(1)}%</div>
              <div className="text-sm text-slate-300">Precisión IA</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-orange-400">{stats.anomalies}</div>
              <div className="text-sm text-slate-300">Anomalías Detectadas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-purple-400">{stats.efficiency.toFixed(1)}%</div>
              <div className="text-sm text-slate-300">Eficiencia Sistema</div>
            </div>
          </motion.div>

          {/* Botones de acción */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/dashboard')}
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Acceder al Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-lg"
              onClick={() => navigate('/upload')}
            >
              <Play className="mr-2 h-5 w-5" />
              Subir Datos
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Funcionalidades Principales
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Tres módulos de IA especializados para maximizar el rendimiento de tu instalación solar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg p-3 mb-4`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tecnologías Avanzadas
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Impulsado por las últimas innovaciones en inteligencia artificial y análisis de datos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 mb-4">
                  <tech.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-slate-300">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Beneficios Comprobados
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Resultados reales que transforman tu operación solar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full p-4 mx-auto mb-4">
                  <benefit.icon className="w-full h-full text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{benefit.value}</div>
                <h3 className="text-xl font-semibold text-blue-200 mb-2">{benefit.title}</h3>
                <p className="text-slate-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para Revolucionar tu Instalación Solar?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a la nueva era de la energía solar inteligente con HelioSentinel
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/dashboard')}
              >
                <Gauge className="mr-2 h-5 w-5" />
                Comenzar Ahora
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl"
                onClick={() => navigate('/upload')}
              >
                <Database className="mr-2 h-5 w-5" />
                Subir Datos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

