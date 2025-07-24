import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, TrendingUp, Zap, AlertTriangle, 
  Sun, Thermometer, Droplets, Wind, Activity,
  Battery, Gauge, Shield, Target, RefreshCw
} from 'lucide-react'
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar
} from 'recharts'
import { Button } from '@/components/ui/button'
import { useData } from '../contexts/DataContext'

const Dashboard = () => {
  const { systemMetrics, loading, api } = useData()
  const [timeRange, setTimeRange] = useState('24h')
  const [performanceData, setPerformanceData] = useState([])
  const [environmentalData, setEnvironmentalData] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  // Datos de ejemplo para gráficos
  const samplePerformanceData = [
    { time: '00:00', power: 0, efficiency: 0, temperature: 22 },
    { time: '06:00', power: 150, efficiency: 15, temperature: 25 },
    { time: '09:00', power: 280, efficiency: 18, temperature: 35 },
    { time: '12:00', power: 320, efficiency: 19, temperature: 45 },
    { time: '15:00', power: 290, efficiency: 17, temperature: 42 },
    { time: '18:00', power: 180, efficiency: 16, temperature: 35 },
    { time: '21:00', power: 50, efficiency: 12, temperature: 28 },
    { time: '24:00', power: 0, efficiency: 0, temperature: 24 }
  ]

  const anomalyDistribution = [
    { name: 'Normal', value: 85, color: '#10B981' },
    { name: 'Degradación', value: 8, color: '#F59E0B' },
    { name: 'Fallas', value: 4, color: '#EF4444' },
    { name: 'Crítico', value: 3, color: '#DC2626' }
  ]

  const moduleStatus = [
    { name: 'Activos', value: systemMetrics.modules?.active || 0, color: '#10B981' },
    { name: 'Inactivos', value: systemMetrics.modules?.inactive || 0, color: '#6B7280' },
    { name: 'Mantenimiento', value: 5, color: '#F59E0B' }
  ]

  useEffect(() => {
    setPerformanceData(samplePerformanceData)
    setEnvironmentalData(samplePerformanceData)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await api.getDashboardMetrics()
      await api.getLatestData(20)
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const MetricCard = ({ title, value, unit, icon: Icon, trend, color = "blue" }) => (
    <motion.div
      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
      whileHover={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-${color}-500 to-${color}-600 p-3`}>
          <Icon className="w-full h-full text-white" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
        <span className="text-sm text-slate-400 ml-1">{unit}</span>
      </div>
      <div className="text-sm text-slate-400">{title}</div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Dashboard de Control
            </h1>
            <p className="text-slate-300">
              Monitoreo en tiempo real de tu instalación fotovoltaica
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400"
            >
              <option value="1h">Última hora</option>
              <option value="24h">Últimas 24h</option>
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
            </select>
            
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </div>
        </motion.div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Módulos Activos"
            value={systemMetrics.modules?.active || 0}
            unit={`/${systemMetrics.modules?.total || 0}`}
            icon={Sun}
            trend={2.5}
            color="yellow"
          />
          <MetricCard
            title="Potencia Generada"
            value={systemMetrics.power?.total_generated_24h?.toFixed(1) || '0.0'}
            unit="kWh"
            icon={Zap}
            trend={5.2}
            color="green"
          />
          <MetricCard
            title="Eficiencia Promedio"
            value={systemMetrics.power?.average_efficiency?.toFixed(1) || '0.0'}
            unit="%"
            icon={Gauge}
            trend={-0.8}
            color="blue"
          />
          <MetricCard
            title="Anomalías Activas"
            value={systemMetrics.anomalies?.total_active || 0}
            unit="detectadas"
            icon={AlertTriangle}
            trend={-15.3}
            color="red"
          />
        </div>

        {/* Gráficos principales */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Rendimiento en el tiempo */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Rendimiento Diario</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-slate-300">Potencia (W)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-slate-300">Eficiencia (%)</span>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="power" 
                  stroke="#60A5FA" 
                  strokeWidth={2}
                  dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#34D399" 
                  strokeWidth={2}
                  dot={{ fill: '#34D399', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Condiciones ambientales */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Condiciones Ambientales</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Thermometer className="w-5 h-5 text-red-400 mr-2" />
                  <span className="text-sm text-slate-300">Temperatura</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {systemMetrics.environment?.average_temperature?.toFixed(1) || '0.0'}°C
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Sun className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-sm text-slate-300">Irradiancia</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {systemMetrics.environment?.average_irradiance?.toFixed(0) || '0'} W/m²
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Droplets className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-sm text-slate-300">Humedad</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {systemMetrics.environment?.average_humidity?.toFixed(1) || '0.0'}%
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Wind className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-slate-300">Viento</span>
                </div>
                <div className="text-2xl font-bold text-white">2.3 m/s</div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={environmentalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#F87171" 
                  fill="#F87171" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Gráficos de estado */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Estado de módulos */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Estado de Módulos</h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={moduleStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {moduleStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-2">
              {moduleStatus.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Distribución de anomalías */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Distribución de Anomalías</h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={anomalyDistribution} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Bar dataKey="value" fill="#60A5FA" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Indicadores de salud */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Salud del Sistema</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Rendimiento General</span>
                  <span className="text-sm font-semibold text-green-400">94%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Disponibilidad</span>
                  <span className="text-sm font-semibold text-blue-400">98%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Mantenimiento</span>
                  <span className="text-sm font-semibold text-yellow-400">85%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Seguridad</span>
                  <span className="text-sm font-semibold text-green-400">99%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

