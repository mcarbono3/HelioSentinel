# HelioSentinel Backend

API Flask con modelos de Machine Learning y Deep Learning para sistemas fotovoltaicos.

## 🏗️ Estructura del Proyecto

```
backend/
├── src/
│   ├── main.py                 # Aplicación principal Flask
│   ├── models/
│   │   └── solar_data.py      # Modelos de base de datos
│   └── routes/
│       ├── data_endpoints.py  # Endpoints de datos
│       └── ai_endpoints.py    # Endpoints de IA
├── requirements.txt           # Dependencias Python
├── venv/                     # Entorno virtual
└── README.md                 # Esta documentación
```

## 🚀 Instalación Rápida

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar aplicación
python src/main.py
```

## 📋 Dependencias Principales

- **Flask 3.1.1**: Framework web
- **Flask-SQLAlchemy**: ORM para base de datos
- **Flask-CORS**: Manejo de CORS
- **scikit-learn**: Machine Learning
- **tensorflow**: Deep Learning
- **pandas**: Manipulación de datos
- **numpy**: Computación numérica

## 🔌 Endpoints Disponibles

### Sistema
- `GET /api/health` - Estado del sistema
- `GET /api/info` - Información del sistema
- `GET /api/dashboard/metrics` - Métricas del dashboard

### Datos
- `POST /api/data/solar` - Enviar datos solares
- `POST /api/data/environmental` - Enviar datos ambientales
- `GET /api/data/latest` - Obtener datos recientes
- `POST /api/upload/csv` - Subir archivo CSV
- `POST /api/upload/xlsx` - Subir archivo Excel

### IA y Predicciones
- `POST /api/predict/performance` - Predicción de desempeño
- `POST /api/predict/anomalies` - Detección de anomalías
- `POST /api/optimize/multiobj` - Optimización multiobjetivo

## 🧠 Modelos de IA

### 1. Predictor de Desempeño
- **Algoritmo**: Random Forest + LSTM
- **Entrada**: Condiciones ambientales
- **Salida**: Potencia predicha y confianza

### 2. Detector de Anomalías
- **Algoritmo**: Isolation Forest + Autoencoder
- **Entrada**: Datos de módulos solares
- **Salida**: Anomalías detectadas y severidad

### 3. Optimizador Multiobjetivo
- **Algoritmo**: NSGA-II + Deep Q-Network
- **Entrada**: Parámetros del sistema
- **Salida**: Configuración óptima

## 🗄️ Base de Datos

### Modelo de Datos Solares
```python
class SolarData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    module_id = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    open_circuit_voltage = db.Column(db.Float, nullable=False)
    max_power_voltage = db.Column(db.Float, nullable=False)
    max_power_current = db.Column(db.Float, nullable=False)
    short_circuit_current = db.Column(db.Float, nullable=False)
    max_power = db.Column(db.Float, nullable=False)
    efficiency = db.Column(db.Float, nullable=False)
    cell_temperature = db.Column(db.Float, nullable=False)
```

### Modelo de Datos Ambientales
```python
class EnvironmentalData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    ambient_temperature = db.Column(db.Float, nullable=False)
    irradiance = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float, nullable=False)
    wind_speed = db.Column(db.Float, nullable=False)
    precipitation = db.Column(db.Float, default=0.0)
    cloudiness = db.Column(db.Float, default=0.0)
```

## 🔧 Configuración

### Variables de Entorno
```env
FLASK_ENV=development
DATABASE_URL=sqlite:///heliosentinel.db
SECRET_KEY=tu_clave_secreta
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Configuración de Producción
```python
# Para PostgreSQL
DATABASE_URL=postgresql://usuario:password@localhost/heliosentinel

# Para MySQL
DATABASE_URL=mysql://usuario:password@localhost/heliosentinel
```

## 🧪 Testing

```bash
# Ejecutar tests
python -m pytest tests/ -v

# Con cobertura
python -m pytest tests/ --cov=src --cov-report=html
```

## 📊 Monitoreo

### Logs
Los logs se guardan en `logs/app.log` con rotación automática.

### Métricas
- Tiempo de respuesta por endpoint
- Número de predicciones realizadas
- Errores y excepciones
- Uso de memoria y CPU

## 🚀 Despliegue

### Desarrollo
```bash
python src/main.py
```

### Producción con Gunicorn
```bash
gunicorn -w 4 -b 0.0.0.0:5000 src.main:app
```

### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "src.main:app"]
```

## 🔒 Seguridad

- Validación de entrada en todos los endpoints
- Sanitización de datos SQL
- Rate limiting configurado
- CORS restringido a orígenes específicos
- Logs de auditoría para operaciones críticas

## 📈 Rendimiento

- **Latencia promedio**: <50ms
- **Throughput**: 1000 req/s
- **Memoria**: ~200MB en reposo
- **CPU**: <10% en operación normal

## 🤝 Contribución

1. Seguir PEP 8 para estilo de código
2. Agregar tests para nuevas funcionalidades
3. Documentar cambios en la API
4. Mantener cobertura de tests >80%

## 📞 Soporte

Para problemas específicos del backend:
- Revisar logs en `logs/app.log`
- Verificar configuración de base de datos
- Comprobar dependencias instaladas

