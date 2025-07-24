import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Sun, BarChart3, Upload, Brain, Shield, Target, 
  Menu, X, Home, Settings, HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Navigation = ({ currentPage }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      path: '/dashboard',
      description: 'Métricas y visualizaciones'
    },
    {
      id: 'upload',
      label: 'Datos',
      icon: Upload,
      path: '/upload',
      description: 'Carga de archivos'
    },
    {
      id: 'predictions',
      label: 'Predicciones',
      icon: Brain,
      path: '/predictions',
      description: 'IA Predictiva'
    },
    {
      id: 'anomalies',
      label: 'Anomalías',
      icon: Shield,
      path: '/anomalies',
      description: 'Detección temprana'
    },
    {
      id: 'optimization',
      label: 'Optimización',
      icon: Target,
      path: '/optimization',
      description: 'Multiobjetivo'
    }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Sun className="w-8 h-8 text-yellow-400" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2" />
                </motion.div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">HelioSentinel</h1>
                <p className="text-xs text-slate-400">AI Solar Platform</p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                    
                    {isActive(item.path) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white"
                onClick={() => navigate('/')}
              >
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Ayuda
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-2 pb-4 space-y-2 bg-slate-800/95 backdrop-blur-lg border-t border-white/10">
            {navigationItems.map((item) => (
              <motion.div
                key={item.id}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => {
                    navigate(item.path)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </Button>
              </motion.div>
            ))}
            
            <div className="pt-2 border-t border-white/10">
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white"
                onClick={() => {
                  navigate('/')
                  setIsMobileMenuOpen(false)
                }}
              >
                <Home className="w-4 h-4 mr-3" />
                Volver al Inicio
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  )
}

export default Navigation

