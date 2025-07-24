import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Sun, Zap, Brain, TrendingUp, Shield, Settings, 
  ChevronRight, Play, BarChart3, Activity, Cpu,
  Database, Cloud, Gauge, AlertTriangle, Target,
  ArrowRight, CheckCircle, Star, Users, Award, Menu, X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      id: 'funcionalidades',
      icon: TrendingUp,
      title: "Predicción de Desempeño FV",
      shortDescription: "Modelo predictivo para climas tropicales.",
      longDescription: "Modelo robusto para climas tropicales usando Random Forest + LSTM, ofreciendo alta precisión en la predicción de rendimiento de tus sistemas fotovoltaicos.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 'anomalias',
      icon: Shield,
      title: "Detección de Anomalías",
      shortDescription: "Identificación temprana de fallas en tus sistemas.",
      longDescription: "Sistema temprano de detección usando Isolation Forest + Autoencoder, minimizando tiempos de inactividad y optimizando el mantenimiento predictivo.",
      color: "from-red-500 to-orange-500"
    },
    {
      id: 'optimizacion',
      icon: Target,
      title: "Optimización Multiobjetivo",
      shortDescription: "Maximiza el rendimiento y la vida útil.",
      longDescription: "NSGA-II + Deep Q-Network para control adaptativo",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const technologies = [
    { id: 'tech-ml', name: "Machine Learning", icon: Brain, shortDescription: "Algoritmos avanzados", longDescription: "Algoritmos avanzados de aprendizaje automático (Random Forest, LSTM, Isolation Forest) para patrones complejos y predicciones fiables." },
    { id: 'tech-dl', name: "Deep Learning", icon: Cpu, shortDescription: "Redes neuronales profundas", longDescription: "Redes neuronales profundas (Autoencoder, DQN) para análisis complejo y aprendizaje adaptativo en entornos dinámicos." },
    { id: 'tech-xai', name: "XAI", icon: Brain, shortDescription: "IA Explicable", longDescription: "Inteligencia artificial explicable y transparente (XAI) para entender cómo y por qué nuestras IA toman decisiones, generando confianza y control." },
    { id: 'tech-dt', name: "Digital Twin", icon: Database, shortDescription: "Gemelo digital", longDescription: "Gemelo digital de sistemas fotovoltaicos para simulación, monitoreo en tiempo real y optimización del rendimiento sin riesgos." },
    { id: 'tech-rtp', name: "Real-time Processing", icon: Zap, shortDescription: "Procesamiento en tiempo real", longDescription: "Procesamiento de datos en tiempo real para respuestas inmediatas a cambios operativos y la toma de decisiones ágil." },
    { id: 'tech-ca', name: "Cloud Analytics", icon: Cloud, shortDescription: "Análisis escalable en la nube", longDescription: "Análisis escalable en la nube para gestionar grandes volúmenes de datos, proporcionando acceso seguro y análisis potente desde cualquier lugar." }
  ]

  const benefits = [
    {
      id: 'beneficio-eficiencia',
      icon: TrendingUp,
      title: "Incremento de Eficiencia",
      value: "+15%",
      shortDescription: "Mejora promedio en rendimiento energético.",
      longDescription: "Aumenta la producción de energía en un 15% en promedio, optimizando el rendimiento de cada módulo fotovoltaico y reduciendo pérdidas."
    },
    {
      id: 'beneficio-fallas',
      icon: Shield,
      title: "Reducción de Fallas",
      value: "-80%",
      shortDescription: "Detección temprana previene fallas críticas.",
      longDescription: "Reduce hasta un 80% las fallas críticas gracias a la detección proactiva de anomalías, asegurando la continuidad operativa y minimizando reparaciones costosas."
    },
    {
      id: 'beneficio-optimizacion',
      icon: Settings,
      title: "Optimización Automática",
      value: "24/7",
      shortDescription: "Monitoreo y ajuste continuo del sistema.",
      longDescription: "Monitoreo y ajuste continuo del sistema las 24 horas del día, los 7 días de la semana, garantizando que tu instalación siempre opere en su punto óptimo."
    },
    {
      id: 'beneficio-roi',
      icon: BarChart3,
      title: "ROI Mejorado",
      value: "+25%",
      shortDescription: "Retorno de inversión optimizado.",
      longDescription: "Mejora el retorno de inversión en más de un 25% al maximizar la producción de energía y reducir los costos operativos y de mantenimiento."
    }
  ]

  const newsItems = [
    {
      title: "Las cinco tecnologías que marcarán el futuro de la fotovoltaica",
      source: "Renovables Latam",
      url: "https://www.unef.es/es/comunicacion/comunicacion-post/las-cinco-tecnologias-que-marcaran-el-futuro-de-la-fotovoltaica"
    },
    {
      title: "LONGi marca un nuevo récord mundial de eficiencia de celdas solares",
      source: "SolarDaily",
      url: "https://www.longi.com/es/news/record-mundial-tandem-perovskita-silicio-cristalino/"
    },
    {
      title: "Colombia: más del 10% de la energía consumida en Colombia ya es solar",
      source: "Energía Limpia Hoy",
      url: "https://www.presidencia.gov.co/prensa/Paginas/Avance-en-Transicion-Energetica-mas-del-10-porciento-de-la-energia-consumida-en-Colombia-ya-es-solar-250210.aspx"
    },
    {
      title: "Colombia necesita US$3.300 millones para cumplir meta de energía solar en 2026",
      source: "Global Energy News",
      url: "https://www.elespectador.com/economia/colombia-necesita-us3300-millones-para-cumplir-meta-de-energia-solar-en-2026/"
    }
  ];

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const newsInterval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 5000); // Cambiar noticia cada 5 segundos
    return () => clearInterval(newsInterval);
  }, [newsItems.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking a link
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden text-white">
      {/* Header / Navigation Bar */}
      <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Sun className="w-8 h-8 text-yellow-400 mr-2" />
            <span className="text-2xl font-bold text-white">HelioSentinel</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Button variant="ghost" className="text-white hover:text-blue-300" onClick={() => scrollToSection('funcionalidades-section')}>Funcionalidades</Button>
            <Button variant="ghost" className="text-white hover:text-blue-300" onClick={() => scrollToSection('tecnologias-section')}>Tecnologías</Button>
            <Button variant="ghost" className="text-white hover:text-blue-300" onClick={() => scrollToSection('beneficios-section')}>Beneficios</Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-6"
              onClick={() => navigate('/dashboard')}
            >
              Acceder al Dashboard
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-slate-800 py-4"
          >
            <div className="flex flex-col items-center space-y-4">
              <Button variant="ghost" className="text-white hover:text-blue-300 w-full" onClick={() => scrollToSection('funcionalidades-section')}>Funcionalidades</Button>
              <Button variant="ghost" className="text-white hover:text-blue-300 w-full" onClick={() => scrollToSection('tecnologias-section')}>Tecnologías</Button>
              <Button variant="ghost" className="text-white hover:text-blue-300 w-full" onClick={() => scrollToSection('beneficios-section')}>Beneficios</Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-6 w-full"
                onClick={() => navigate('/dashboard')}
              >
                Acceder al Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
      {/* Spacer for fixed header */}
      <div className="h-20" /> 

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4 pt-20" // Added padding-top to account for fixed header
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

          {/* Carrusel de Métricas y Noticias */}
          <motion.div
            className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Métricas & Noticias del Sector</h3>
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              {/* Métricas */}
              <div className="grid grid-cols-2 gap-4 flex-grow mb-6 md:mb-0 md:mr-6">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-xl font-bold text-blue-400">{stats.modules.toLocaleString()}</div>
                  <div className="text-sm text-slate-300">Módulos Monitoreados</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-xl font-bold text-green-400">{stats.predictions.toFixed(1)}%</div>
                  <div className="text-sm text-slate-300">Precisión IA</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-xl font-bold text-orange-400">{stats.anomalies}</div>
                  <div className="text-sm text-slate-300">Anomalías Detectadas</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-xl font-bold text-purple-400">{stats.efficiency.toFixed(1)}%</div>
                  <div className="text-sm text-slate-300">Eficiencia Sistema</div>
                </div>
              </div>

              {/* Noticias (Carrusel simple) */}
              <div className="relative w-full md:w-1/2 h-32 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                <motion.a
                  key={currentNewsIndex}
                  href={newsItems[currentNewsIndex].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-center p-4 cursor-pointer hover:bg-white/10"
                >
                  <p className="text-sm font-semibold text-blue-300 mb-1">{newsItems[currentNewsIndex].source}</p>
                  <p className="text-lg font-bold text-white leading-snug">{newsItems[currentNewsIndex].title}</p>
                  <ArrowRight className="absolute bottom-2 right-2 w-5 h-5 text-white" />
                </motion.a>
              </div>
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
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="funcionalidades-section" className="py-20 px-4">
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
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 relative group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }} 
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg p-3 mb-4`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.shortDescription}</p> 
                
                {/* Overlay for expanded description on hover/click */}
                <div className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center text-base">{feature.longDescription}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tecnologias-section" className="py-20 px-4 bg-black/20">
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
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 relative group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 mb-4">
                  <tech.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-slate-300 text-sm">{tech.shortDescription}</p>

                {/* Overlay for expanded description on hover/click */}
                <div className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center text-base">{tech.longDescription}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios-section" className="py-20 px-4">
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
                className="text-center bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full p-4 mx-auto mb-4">
                  <benefit.icon className="w-full h-full text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{benefit.value}</div>
                <h3 className="text-xl font-semibold text-blue-200 mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.shortDescription}</p>

                {/* Overlay for expanded description on hover/click */}
                <div className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center text-base">{benefit.longDescription}</p>
                </div>
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
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
