"""
Modelos de base de datos para datos solares - HelioSentinel
"""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class SolarModuleData(db.Model):
    """Modelo para datos de módulos solares"""
    __tablename__ = 'solar_modules_data'
    
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    module_id = db.Column(db.String(50), nullable=False)
    
    # Parámetros eléctricos
    open_circuit_voltage = db.Column(db.Float, nullable=False)  # Voc
    max_power_voltage = db.Column(db.Float, nullable=False)     # Vmp
    max_power_current = db.Column(db.Float, nullable=False)     # Imp
    short_circuit_current = db.Column(db.Float, nullable=False) # Isc
    max_power = db.Column(db.Float, nullable=False)             # Potencia máxima
    efficiency = db.Column(db.Float, nullable=False)            # Eficiencia
    
    # Parámetros térmicos
    cell_temperature = db.Column(db.Float, nullable=False)      # Temperatura de celda
    
    # Metadatos
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'module_id': self.module_id,
            'open_circuit_voltage': self.open_circuit_voltage,
            'max_power_voltage': self.max_power_voltage,
            'max_power_current': self.max_power_current,
            'short_circuit_current': self.short_circuit_current,
            'max_power': self.max_power,
            'efficiency': self.efficiency,
            'cell_temperature': self.cell_temperature,
            'created_at': self.created_at.isoformat()
        }


class EnvironmentalData(db.Model):
    """Modelo para datos ambientales"""
    __tablename__ = 'environmental_data'
    
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    location_id = db.Column(db.String(50), nullable=False, default='default')
    
    # Variables ambientales
    ambient_temperature = db.Column(db.Float, nullable=False)   # Temperatura ambiente
    irradiance = db.Column(db.Float, nullable=False)            # Irradiancia
    humidity = db.Column(db.Float, nullable=False)              # Humedad
    wind_speed = db.Column(db.Float, nullable=False)            # Velocidad del viento
    precipitation = db.Column(db.Float, nullable=False, default=0)  # Precipitación
    cloudiness = db.Column(db.Float, nullable=False, default=0)     # Nubosidad
    
    # Metadatos
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'location_id': self.location_id,
            'ambient_temperature': self.ambient_temperature,
            'irradiance': self.irradiance,
            'humidity': self.humidity,
            'wind_speed': self.wind_speed,
            'precipitation': self.precipitation,
            'cloudiness': self.cloudiness,
            'created_at': self.created_at.isoformat()
        }


class PredictionResult(db.Model):
    """Modelo para resultados de predicciones"""
    __tablename__ = 'predictions'
    
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    model_type = db.Column(db.String(50), nullable=False)  # 'performance', 'anomaly', 'optimization'
    
    # Datos de entrada y salida
    input_data = db.Column(db.Text, nullable=False)        # JSON con datos de entrada
    prediction_result = db.Column(db.Text, nullable=False) # JSON con resultado
    confidence_score = db.Column(db.Float, nullable=True)  # Puntuación de confianza
    
    # Metadatos
    module_id = db.Column(db.String(50), nullable=True)
    location_id = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'model_type': self.model_type,
            'input_data': json.loads(self.input_data),
            'prediction_result': json.loads(self.prediction_result),
            'confidence_score': self.confidence_score,
            'module_id': self.module_id,
            'location_id': self.location_id,
            'created_at': self.created_at.isoformat()
        }
    
    def set_input_data(self, data):
        """Establecer datos de entrada como JSON"""
        self.input_data = json.dumps(data)
    
    def set_prediction_result(self, result):
        """Establecer resultado de predicción como JSON"""
        self.prediction_result = json.dumps(result)


class AnomalyDetection(db.Model):
    """Modelo para detecciones de anomalías"""
    __tablename__ = 'anomalies'
    
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    module_id = db.Column(db.String(50), nullable=False)
    
    # Información de la anomalía
    anomaly_type = db.Column(db.String(50), nullable=False)     # Tipo de anomalía
    severity_level = db.Column(db.String(20), nullable=False)   # Baja, Media, Alta, Crítica
    confidence = db.Column(db.String(20), nullable=False)       # Confianza en la detección
    description = db.Column(db.Text, nullable=False)            # Descripción de la anomalía
    
    # Recomendaciones
    recommended_action = db.Column(db.Text, nullable=True)      # Acción recomendada
    priority = db.Column(db.String(20), nullable=True)          # Prioridad de mantenimiento
    timeframe = db.Column(db.String(50), nullable=True)         # Marco temporal
    
    # Datos técnicos
    isolation_score = db.Column(db.Float, nullable=True)        # Puntuación Isolation Forest
    reconstruction_error = db.Column(db.Float, nullable=True)   # Error de reconstrucción
    
    # Estado
    status = db.Column(db.String(20), default='active')         # active, resolved, ignored
    resolved_at = db.Column(db.DateTime, nullable=True)
    
    # Metadatos
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'module_id': self.module_id,
            'anomaly_type': self.anomaly_type,
            'severity_level': self.severity_level,
            'confidence': self.confidence,
            'description': self.description,
            'recommended_action': self.recommended_action,
            'priority': self.priority,
            'timeframe': self.timeframe,
            'isolation_score': self.isolation_score,
            'reconstruction_error': self.reconstruction_error,
            'status': self.status,
            'resolved_at': self.resolved_at.isoformat() if self.resolved_at else None,
            'created_at': self.created_at.isoformat()
        }


class OptimizationResult(db.Model):
    """Modelo para resultados de optimización"""
    __tablename__ = 'optimization_results'
    
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    location_id = db.Column(db.String(50), nullable=False)
    technology = db.Column(db.String(50), nullable=False)       # Tecnología FV
    
    # Configuración óptima
    optimal_config = db.Column(db.Text, nullable=False)         # JSON con configuración
    
    # Objetivos optimizados
    energy_efficiency = db.Column(db.Float, nullable=False)
    expected_lifespan = db.Column(db.Float, nullable=False)
    total_cost = db.Column(db.Float, nullable=False)
    co2_avoided = db.Column(db.Float, nullable=False)
    
    # Metadatos
    optimization_type = db.Column(db.String(50), default='multi_objective')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'location_id': self.location_id,
            'technology': self.technology,
            'optimal_config': json.loads(self.optimal_config),
            'energy_efficiency': self.energy_efficiency,
            'expected_lifespan': self.expected_lifespan,
            'total_cost': self.total_cost,
            'co2_avoided': self.co2_avoided,
            'optimization_type': self.optimization_type,
            'created_at': self.created_at.isoformat()
        }
    
    def set_optimal_config(self, config):
        """Establecer configuración óptima como JSON"""
        self.optimal_config = json.dumps(config)


class SystemMetrics(db.Model):
    """Modelo para métricas del sistema"""
    __tablename__ = 'system_metrics'
    
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    # Métricas generales
    total_modules = db.Column(db.Integer, default=0)
    active_modules = db.Column(db.Integer, default=0)
    total_power_generated = db.Column(db.Float, default=0)
    average_efficiency = db.Column(db.Float, default=0)
    
    # Métricas de anomalías
    total_anomalies = db.Column(db.Integer, default=0)
    critical_anomalies = db.Column(db.Integer, default=0)
    resolved_anomalies = db.Column(db.Integer, default=0)
    
    # Métricas ambientales
    average_temperature = db.Column(db.Float, default=0)
    average_irradiance = db.Column(db.Float, default=0)
    average_humidity = db.Column(db.Float, default=0)
    
    # Metadatos
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'total_modules': self.total_modules,
            'active_modules': self.active_modules,
            'total_power_generated': self.total_power_generated,
            'average_efficiency': self.average_efficiency,
            'total_anomalies': self.total_anomalies,
            'critical_anomalies': self.critical_anomalies,
            'resolved_anomalies': self.resolved_anomalies,
            'average_temperature': self.average_temperature,
            'average_irradiance': self.average_irradiance,
            'average_humidity': self.average_humidity,
            'created_at': self.created_at.isoformat()
        }

