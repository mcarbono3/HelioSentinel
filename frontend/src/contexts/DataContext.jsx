import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Estado inicial
const initialState = {
  // Datos del sistema
  systemMetrics: {
    modules: { total: 0, active: 0, inactive: 0 },
    power: { total_generated_24h: 0, average_efficiency: 0 },
    anomalies: { total_active: 0, critical: 0, medium_high: 0 },
    environment: { average_temperature: 0, average_irradiance: 0, average_humidity: 0 }
  },
  
  // Datos de módulos solares
  solarData: [],
  environmentalData: [],
  
  // Predicciones y análisis
  predictions: [],
  anomalies: [],
  optimizations: [],
  
  // Estado de la UI
  loading: false,
  error: null,
  
  // Configuración
  apiBaseUrl: 'http://localhost:5000/api'
}

// Tipos de acciones
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SYSTEM_METRICS: 'SET_SYSTEM_METRICS',
  SET_SOLAR_DATA: 'SET_SOLAR_DATA',
  SET_ENVIRONMENTAL_DATA: 'SET_ENVIRONMENTAL_DATA',
  ADD_PREDICTION: 'ADD_PREDICTION',
  SET_PREDICTIONS: 'SET_PREDICTIONS',
  ADD_ANOMALY: 'ADD_ANOMALY',
  SET_ANOMALIES: 'SET_ANOMALIES',
  ADD_OPTIMIZATION: 'ADD_OPTIMIZATION',
  SET_OPTIMIZATIONS: 'SET_OPTIMIZATIONS',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

// Reducer
function dataReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload }
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false }
    
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null }
    
    case actionTypes.SET_SYSTEM_METRICS:
      return { ...state, systemMetrics: action.payload }
    
    case actionTypes.SET_SOLAR_DATA:
      return { ...state, solarData: action.payload }
    
    case actionTypes.SET_ENVIRONMENTAL_DATA:
      return { ...state, environmentalData: action.payload }
    
    case actionTypes.ADD_PREDICTION:
      return { 
        ...state, 
        predictions: [action.payload, ...state.predictions.slice(0, 99)] // Mantener últimas 100
      }
    
    case actionTypes.SET_PREDICTIONS:
      return { ...state, predictions: action.payload }
    
    case actionTypes.ADD_ANOMALY:
      return { 
        ...state, 
        anomalies: [action.payload, ...state.anomalies.slice(0, 99)]
      }
    
    case actionTypes.SET_ANOMALIES:
      return { ...state, anomalies: action.payload }
    
    case actionTypes.ADD_OPTIMIZATION:
      return { 
        ...state, 
        optimizations: [action.payload, ...state.optimizations.slice(0, 49)]
      }
    
    case actionTypes.SET_OPTIMIZATIONS:
      return { ...state, optimizations: action.payload }
    
    default:
      return state
  }
}

// Contexto
const DataContext = createContext()

// Hook personalizado para usar el contexto
export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData debe ser usado dentro de un DataProvider')
  }
  return context
}

// Proveedor del contexto
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  // Funciones de API
  const api = {
    // Función genérica para hacer peticiones
    async request(endpoint, options = {}) {
      dispatch({ type: actionTypes.SET_LOADING, payload: true })
      dispatch({ type: actionTypes.CLEAR_ERROR })
      
      try {
        const response = await fetch(`${state.apiBaseUrl}${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        })
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        dispatch({ type: actionTypes.SET_LOADING, payload: false })
        return data
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message })
        throw error
      }
    },

    // Obtener métricas del dashboard
    async getDashboardMetrics() {
      try {
        const data = await this.request('/dashboard/metrics')
        dispatch({ type: actionTypes.SET_SYSTEM_METRICS, payload: data })
        return data
      } catch (error) {
        console.error('Error obteniendo métricas:', error)
      }
    },

    // Obtener datos más recientes
    async getLatestData(limit = 10) {
      try {
        const data = await this.request(`/data/latest?limit=${limit}`)
        dispatch({ type: actionTypes.SET_SOLAR_DATA, payload: data.solar_data })
        dispatch({ type: actionTypes.SET_ENVIRONMENTAL_DATA, payload: data.environmental_data })
        return data
      } catch (error) {
        console.error('Error obteniendo datos recientes:', error)
      }
    },

    // Enviar datos solares
    async sendSolarData(solarData) {
      try {
        const data = await this.request('/data/solar', {
          method: 'POST',
          body: JSON.stringify(solarData)
        })
        return data
      } catch (error) {
        console.error('Error enviando datos solares:', error)
        throw error
      }
    },

    // Enviar datos ambientales
    async sendEnvironmentalData(envData) {
      try {
        const data = await this.request('/data/environmental', {
          method: 'POST',
          body: JSON.stringify(envData)
        })
        return data
      } catch (error) {
        console.error('Error enviando datos ambientales:', error)
        throw error
      }
    },

    // Subir archivo CSV
    async uploadFile(file, dataType) {
      dispatch({ type: actionTypes.SET_LOADING, payload: true })
      dispatch({ type: actionTypes.CLEAR_ERROR })
      
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('data_type', dataType)
        
        const response = await fetch(`${state.apiBaseUrl}/upload/csv`, {
          method: 'POST',
          body: formData
        })
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        dispatch({ type: actionTypes.SET_LOADING, payload: false })
        return data
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message })
        throw error
      }
    },

    // Predicción de desempeño
    async predictPerformance(inputData) {
      try {
        const data = await this.request('/predict/performance', {
          method: 'POST',
          body: JSON.stringify(inputData)
        })
        dispatch({ type: actionTypes.ADD_PREDICTION, payload: data })
        return data
      } catch (error) {
        console.error('Error en predicción:', error)
        throw error
      }
    },

    // Detección de anomalías
    async detectAnomalies(moduleData) {
      try {
        const data = await this.request('/predict/anomalies', {
          method: 'POST',
          body: JSON.stringify(moduleData)
        })
        if (data.anomaly_detected) {
          dispatch({ type: actionTypes.ADD_ANOMALY, payload: data })
        }
        return data
      } catch (error) {
        console.error('Error en detección de anomalías:', error)
        throw error
      }
    },

    // Optimización multiobjetivo
    async optimizeSystem(optimizationData) {
      try {
        const data = await this.request('/optimize/multiobj', {
          method: 'POST',
          body: JSON.stringify(optimizationData)
        })
        dispatch({ type: actionTypes.ADD_OPTIMIZATION, payload: data })
        return data
      } catch (error) {
        console.error('Error en optimización:', error)
        throw error
      }
    },

    // Obtener anomalías activas
    async getActiveAnomalies() {
      try {
        const data = await this.request('/anomalies/active')
        dispatch({ type: actionTypes.SET_ANOMALIES, payload: data.anomalies })
        return data
      } catch (error) {
        console.error('Error obteniendo anomalías:', error)
      }
    },

    // Obtener datos para gráficos
    async getPerformanceCharts(days = 7) {
      try {
        const data = await this.request(`/charts/performance?days=${days}`)
        return data
      } catch (error) {
        console.error('Error obteniendo datos de gráficos:', error)
      }
    }
  }

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([
          api.getDashboardMetrics(),
          api.getLatestData(20),
          api.getActiveAnomalies()
        ])
      } catch (error) {
        console.error('Error cargando datos iniciales:', error)
      }
    }

    loadInitialData()
    
    // Actualizar datos cada 30 segundos
    const interval = setInterval(() => {
      api.getDashboardMetrics()
      api.getLatestData(5)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const value = {
    ...state,
    api,
    dispatch
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

