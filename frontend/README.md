# HelioSentinel Frontend

Aplicación React profesional para la plataforma HelioSentinel con dashboards interactivos y visualizaciones avanzadas.

## 🏗️ Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/           # Componentes React
│   │   ├── LandingPage.jsx  # Página de inicio
│   │   ├── Dashboard.jsx    # Dashboard principal
│   │   ├── DataUpload.jsx   # Carga de datos
│   │   ├── PredictionCenter.jsx  # Centro de predicciones
│   │   ├── AnomalyMonitor.jsx    # Monitor de anomalías
│   │   ├── OptimizationHub.jsx   # Hub de optimización
│   │   ├── Navigation.jsx   # Navegación
│   │   ├── LoadingScreen.jsx # Pantalla de carga
│   │   └── ui/              # Componentes UI base
│   ├── contexts/
│   │   └── DataContext.jsx  # Contexto global de datos
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos principales
│   └── main.jsx             # Punto de entrada
├── public/                  # Archivos estáticos
├── package.json            # Dependencias y scripts
├── vite.config.js          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind
└── README.md               # Esta documentación
```

## 🚀 Instalación Rápida

```bash
# Instalar dependencias
npm install
# o
pnpm install

# Ejecutar en desarrollo
npm run dev
# o
pnpm run dev

# Construir para producción
npm run build
# o
pnpm run build
```

## 📋 Dependencias Principales

### Core
- **React 18**: Biblioteca de UI
- **React Router DOM**: Navegación SPA
- **Vite**: Build tool y dev server

### UI y Estilos
- **Tailwind CSS**: Framework de estilos
- **Framer Motion**: Animaciones avanzadas
- **Lucide React**: Iconografía moderna
- **shadcn/ui**: Componentes UI profesionales

### Visualización de Datos
- **Recharts**: Gráficos y visualizaciones
- **React**: Componentes interactivos

### Estado y Datos
- **Context API**: Manejo de estado global
- **Fetch API**: Comunicación con backend

## 🎨 Características de Diseño

### Tema Visual
- **Paleta de colores**: Gradientes azul-púrpura
- **Tipografía**: Inter (sistema)
- **Iconografía**: Lucide React
- **Animaciones**: Framer Motion

### Responsive Design
- **Mobile First**: Diseño adaptativo
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Touch Support**: Optimizado para dispositivos táctiles

### Accesibilidad
- **ARIA Labels**: Etiquetas descriptivas
- **Keyboard Navigation**: Navegación por teclado
- **Color Contrast**: Cumple WCAG 2.1 AA
- **Screen Reader**: Compatible con lectores de pantalla

## 🧩 Componentes Principales

### LandingPage
Página de inicio con:
- Hero section animado
- Estadísticas en tiempo real
- Características principales
- Tecnologías utilizadas
- Call-to-action

### Dashboard
Panel de control con:
- Métricas del sistema
- Gráficos de rendimiento
- Condiciones ambientales
- Estado de módulos
- Indicadores de salud

### DataUpload
Interfaz de carga con:
- Drag & drop de archivos
- Validación de formatos
- Progreso de carga
- Resultados de procesamiento

### PredictionCenter
Centro de predicciones con:
- Formulario de entrada
- Visualización de resultados
- Historial de predicciones
- Métricas de confianza

### AnomalyMonitor
Monitor de anomalías con:
- Lista de anomalías activas
- Filtros por severidad
- Detalles de cada anomalía
- Acciones recomendadas

### OptimizationHub
Hub de optimización con:
- Configuración de parámetros
- Resultados de optimización
- Frente de Pareto
- Métricas de mejora

## 🔄 Gestión de Estado

### DataContext
Contexto global que maneja:
- Datos del sistema
- Estado de carga
- Errores y notificaciones
- Comunicación con API

```javascript
const { 
  systemMetrics, 
  loading, 
  error, 
  api 
} = useData();
```

### API Integration
```javascript
// Ejemplo de uso
const prediction = await api.predictPerformance({
  irradiance: 800,
  ambient_temp: 30,
  humidity: 75,
  wind_speed: 2.5
});
```

## 🎯 Rutas de Navegación

- `/` - Landing page
- `/dashboard` - Dashboard principal
- `/upload` - Carga de datos
- `/predictions` - Centro de predicciones
- `/anomalies` - Monitor de anomalías
- `/optimization` - Hub de optimización

## 🔧 Configuración

### Variables de Entorno
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_TITLE=HelioSentinel
VITE_APP_VERSION=1.0.0
```

### Tailwind Config
```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...}
      }
    }
  },
  plugins: []
}
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test
# o
pnpm test

# Tests con cobertura
npm run test:coverage
# o
pnpm run test:coverage

# Tests E2E
npm run test:e2e
# o
pnpm run test:e2e
```

## 📊 Optimización de Rendimiento

### Code Splitting
- Lazy loading de componentes
- Chunks dinámicos por ruta
- Preload de recursos críticos

### Bundle Optimization
- Tree shaking automático
- Minificación de assets
- Compresión gzip/brotli

### Runtime Performance
- Memoización de componentes
- Virtualización de listas largas
- Debounce en inputs de búsqueda

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
# o
pnpm run build
```

### Preview Local
```bash
npm run preview
# o
pnpm run preview
```

### Despliegue Estático
Los archivos generados en `dist/` pueden desplegarse en:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Nginx/Apache

### Docker
```dockerfile
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔒 Seguridad

### CSP Headers
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

### Sanitización
- Escape de HTML en inputs
- Validación de URLs
- Prevención de XSS

### HTTPS
- Forzar HTTPS en producción
- Secure cookies
- HSTS headers

## 📱 PWA Features

### Service Worker
- Cache de recursos estáticos
- Offline fallbacks
- Background sync

### Manifest
```json
{
  "name": "HelioSentinel",
  "short_name": "HelioSentinel",
  "theme_color": "#3B82F6",
  "background_color": "#1E293B",
  "display": "standalone",
  "start_url": "/"
}
```

## 🎨 Guía de Estilos

### Colores
```css
/* Primarios */
--blue-500: #3B82F6;
--purple-500: #8B5CF6;
--cyan-500: #06B6D4;

/* Estados */
--green-400: #4ADE80;  /* Éxito */
--yellow-400: #FACC15; /* Advertencia */
--red-400: #F87171;    /* Error */
```

### Tipografía
```css
/* Títulos */
.text-4xl { font-size: 2.25rem; }
.text-3xl { font-size: 1.875rem; }
.text-2xl { font-size: 1.5rem; }

/* Cuerpo */
.text-lg { font-size: 1.125rem; }
.text-base { font-size: 1rem; }
.text-sm { font-size: 0.875rem; }
```

### Espaciado
```css
/* Márgenes y padding */
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }

.m-4 { margin: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-8 { margin-top: 2rem; }
```

## 🤝 Contribución

### Estándares de Código
- **ESLint**: Linting de JavaScript
- **Prettier**: Formateo de código
- **Conventional Commits**: Formato de commits

### Workflow
1. Fork del repositorio
2. Crear rama feature
3. Desarrollar y testear
4. Crear Pull Request

### Componentes
- Usar TypeScript para nuevos componentes
- Documentar props con JSDoc
- Incluir tests unitarios
- Seguir patrones de diseño establecidos

## 📞 Soporte

Para problemas del frontend:
- Verificar consola del navegador
- Comprobar network requests
- Revisar configuración de Vite
- Validar variables de entorno

## 📈 Métricas

### Performance
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms

### Bundle Size
- **Initial Bundle**: <500KB gzipped
- **Vendor Chunks**: <1MB gzipped
- **Total Assets**: <2MB gzipped

### Lighthouse Score
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 95+

