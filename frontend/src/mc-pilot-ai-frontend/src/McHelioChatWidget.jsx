import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  Send, 
  Bot, 
  User, 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Sun,
  Zap,
  BarChart3,
  Settings
} from 'lucide-react'
import './App.css'

// Configuración de la API
const API_BASE_URL = 'http://localhost:5001/api/agent'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      content: '¡Hola! Soy McHelio Agent, tu asesor experto en sistemas fotovoltaicos para climas tropicales. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date().toISOString(),
      tools_used: []
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [agentLog, setAgentLog] = useState([])
  const [proactiveInsights, setProactiveInsights] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef(null)

  // Verificar conexión con el backend
  useEffect(() => {
    checkConnection()
  }, [])

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const checkConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      if (response.ok) {
        setIsConnected(true)
      }
    } catch (error) {
      console.error('Error checking connection:', error)
      setIsConnected(false)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          user_id: 'frontend_user'
        })
      })

      const data = await response.json()

      if (data.success) {
        const agentMessage = {
          id: Date.now() + 1,
          type: 'agent',
          content: data.response,
          timestamp: data.timestamp,
          tools_used: data.tools_used || []
        }
        setMessages(prev => [...prev, agentMessage])
        
        // Actualizar log del agente
        if (data.log_entries) {
          setAgentLog(prev => [...prev, ...data.log_entries])
        }
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          type: 'agent',
          content: data.response || 'Lo siento, ocurrió un error al procesar tu consulta.',
          timestamp: new Date().toISOString(),
          tools_used: [],
          isError: true
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'agent',
        content: 'Error de conexión. Por favor, verifica que el backend esté funcionando.',
        timestamp: new Date().toISOString(),
        tools_used: [],
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getToolIcon = (toolName) => {
    switch (toolName) {
      case 'prevision_fotovoltaica':
        return <Sun className="w-4 h-4" />
      case 'deteccion_anomalias':
        return <AlertTriangle className="w-4 h-4" />
      case 'web_search':
        return <BarChart3 className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Mc-Pilot AI
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Asesor Experto en Sistemas Fotovoltaicos
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isConnected ? "default" : "destructive"}>
                <Activity className="w-3 h-3 mr-1" />
                {isConnected ? 'Conectado' : 'Desconectado'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Principal */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>Chat con Mc-Pilot AI</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : message.isError
                              ? 'bg-red-50 border border-red-200 text-red-800'
                              : 'bg-gray-50 border border-gray-200 text-gray-800'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.type === 'agent' && (
                              <Bot className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            )}
                            {message.type === 'user' && (
                              <User className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="whitespace-pre-wrap">{message.content}</p>
                              
                              {/* Herramientas utilizadas */}
                              {message.tools_used && message.tools_used.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {message.tools_used.map((tool, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {getToolIcon(tool)}
                                      <span className="ml-1">{tool}</span>
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs opacity-70">
                                  {formatTimestamp(message.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-5 h-5" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
                
                <Separator className="my-4" />
                
                {/* Input de mensaje */}
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu consulta sobre sistemas fotovoltaicos..."
                    disabled={isLoading || !isConnected}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={isLoading || !isConnected || !inputMessage.trim()}
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel Lateral - Log y Notificaciones */}
          <div className="space-y-6">
            {/* Log del Agente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Activity className="w-4 h-4" />
                  <span>Log del Agente (XAI)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {agentLog.slice(-10).map((entry, index) => (
                      <div key={index} className="text-xs p-2 bg-gray-50 rounded border">
                        <div className="flex items-center space-x-1 mb-1">
                          <Clock className="w-3 h-3" />
                          <span className="font-mono">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="font-medium">{entry.action}</div>
                        {entry.tool_name && (
                          <div className="text-blue-600">
                            Herramienta: {entry.tool_name}
                          </div>
                        )}
                        <div className="text-gray-600 mt-1">
                          {entry.reasoning}
                        </div>
                      </div>
                    ))}
                    {agentLog.length === 0 && (
                      <p className="text-xs text-gray-500 text-center py-4">
                        El log aparecerá aquí cuando interactúes con el agente
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Notificaciones Proactivas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Insights Proactivos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {proactiveInsights.length === 0 && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Los insights proactivos aparecerán aquí cuando el agente detecte patrones o oportunidades de optimización.
                      </AlertDescription>
                    </Alert>
                  )}
                  {proactiveInsights.map((insight, index) => (
                    <Alert key={index}>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        {insight.message}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estado de Conexión */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Settings className="w-4 h-4" />
                  <span>Estado del Sistema</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Backend:</span>
                    <Badge variant={isConnected ? "default" : "destructive"} className="text-xs">
                      {isConnected ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Mensajes:</span>
                    <span>{messages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Log entradas:</span>
                    <span>{agentLog.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

