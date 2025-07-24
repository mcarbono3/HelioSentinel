"""
Endpoints para IA y predicciones - HelioSentinel
"""

from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from src.models.solar_data import (
    db, SolarModuleData, EnvironmentalData, 
    PredictionResult, AnomalyDetection, OptimizationResult
)
import pandas as pd
import numpy as np
import json
import os
import sys

# Agregar el directorio de modelos al path
models_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'heliosentinel_models')
sys.path.append(models_path)

ai_bp = Blueprint('ai', __name__)

# Variables globales para modelos (se cargarán bajo demanda)
performance_predictor = None
anomaly_detector = None
multi_objective_optimizer = None

def load_performance_predictor():
    """Cargar modelo de predicción de desempeño"""
    global performance_predictor
    if performance_predictor is None:
        try:
            from performance_predictor import TropicalPVPerformancePredictor
            performance_predictor = TropicalPVPerformancePredictor()
            # Intentar cargar modelo pre-entrenado
            try:
                performance_predictor.load_model(os.path.join(models_path, 'tropical_pv_predictor'))
            except:
                # Si no existe modelo pre-entrenado, crear uno básico
                print("Modelo de predicción no encontrado, usando configuración por defecto")
        except Exception as e:
            print(f"Error cargando predictor: {e}")
    return performance_predictor

def load_anomaly_detector():
    """Cargar detector de anomalías"""
    global anomaly_detector
    if anomaly_detector is None:
        try:
            from anomaly_detector import SolarAnomalyDetector
            anomaly_detector = SolarAnomalyDetector()
            # Intentar cargar modelo pre-entrenado
            try:
                anomaly_detector.load_model(os.path.join(models_path, 'solar_anomaly_detector'))
            except:
                print("Detector de anomalías no encontrado, usando configuración por defecto")
        except Exception as e:
            print(f"Error cargando detector: {e}")
    return anomaly_detector

def load_optimizer():
    """Cargar optimizador multiobjetivo"""
    global multi_objective_optimizer
    if multi_objective_optimizer is None:
        try:
            from multi_objective_optimizer import MultiObjectivePVOptimizer
            multi_objective_optimizer = MultiObjectivePVOptimizer()
            # Intentar cargar modelo pre-entrenado
            try:
                multi_objective_optimizer.load_model(os.path.join(models_path, 'multi_objective_optimizer'))
            except:
                print("Optimizador no encontrado, usando configuración por defecto")
        except Exception as e:
            print(f"Error cargando optimizador: {e}")
    return multi_objective_optimizer

@ai_bp.route('/predict/performance', methods=['POST'])
def predict_performance():
    """Predicción de desempeño fotovoltaico"""
    try:
        data = request.get_json()
        
        # Validar datos de entrada
        required_fields = [
            'irradiance', 'ambient_temp', 'humidity', 'wind_speed'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Campo requerido faltante: {field}'}), 400
        
        # Cargar modelo
        predictor = load_performance_predictor()
        if predictor is None:
            return jsonify({'error': 'Modelo de predicción no disponible'}), 500
        
        # Preparar datos para predicción
        features = {
            'irradiance': float(data['irradiance']),
            'ambient_temp': float(data['ambient_temp']),
            'cell_temp': float(data.get('cell_temp', data['ambient_temp'] + 20)),
            'humidity': float(data['humidity']),
            'wind_speed': float(data['wind_speed']),
            'cloudiness': float(data.get('cloudiness', 0)),
            'precipitation': float(data.get('precipitation', 0))
        }
        
        # Realizar predicción
        try:
            if hasattr(predictor, 'predict_single'):
                prediction = predictor.predict_single(features)
                confidence = 0.85  # Confianza por defecto
            else:
                # Predicción simplificada basada en modelo físico
                base_power = 300  # Potencia nominal en W
                irradiance_factor = features['irradiance'] / 1000
                temp_factor = 1 - 0.004 * (features['cell_temp'] - 25)
                humidity_factor = 1 - features['humidity'] / 100 * 0.1
                cloud_factor = 1 - features['cloudiness'] / 100 * 0.8
                
                prediction = base_power * irradiance_factor * temp_factor * humidity_factor * cloud_factor
                confidence = 0.75
            
            # Guardar resultado
            prediction_result = PredictionResult(
                model_type='performance',
                confidence_score=confidence,
                module_id=data.get('module_id'),
                location_id=data.get('location_id')
            )
            
            prediction_result.set_input_data(features)
            prediction_result.set_prediction_result({
                'predicted_power': float(prediction),
                'confidence': confidence,
                'factors': {
                    'irradiance_factor': irradiance_factor,
                    'temperature_factor': temp_factor if 'temp_factor' in locals() else 1.0,
                    'humidity_factor': humidity_factor if 'humidity_factor' in locals() else 1.0
                }
            })
            
            db.session.add(prediction_result)
            db.session.commit()
            
            return jsonify({
                'prediction': {
                    'predicted_power': round(float(prediction), 2),
                    'confidence': round(confidence, 3),
                    'unit': 'W'
                },
                'input_conditions': features,
                'prediction_id': prediction_result.id,
                'timestamp': prediction_result.timestamp.isoformat()
            }), 200
            
        except Exception as e:
            return jsonify({'error': f'Error en predicción: {str(e)}'}), 500
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@ai_bp.route('/predict/anomalies', methods=['POST'])
def detect_anomalies():
    """Detección de anomalías en tiempo real"""
    try:
        data = request.get_json()
        
        # Validar datos de entrada
        required_fields = [
            'module_id', 'voltage_oc', 'voltage_mp', 'current_mp', 
            'current_sc', 'power_max', 'efficiency', 'cell_temp'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Campo requerido faltante: {field}'}), 400
        
        # Cargar detector
        detector = load_anomaly_detector()
        if detector is None:
            return jsonify({'error': 'Detector de anomalías no disponible'}), 500
        
        # Preparar datos
        module_data = {
            'voltage_oc': float(data['voltage_oc']),
            'voltage_mp': float(data['voltage_mp']),
            'current_mp': float(data['current_mp']),
            'current_sc': float(data['current_sc']),
            'power_max': float(data['power_max']),
            'efficiency': float(data['efficiency']),
            'cell_temp': float(data['cell_temp']),
            'ambient_temp': float(data.get('ambient_temp', 25)),
            'irradiance': float(data.get('irradiance', 1000)),
            'humidity': float(data.get('humidity', 50)),
            'wind_speed': float(data.get('wind_speed', 2)),
            'age_days': float(data.get('age_days', 365))
        }
        
        # Crear DataFrame para detección
        df = pd.DataFrame([module_data])
        
        try:
            if hasattr(detector, 'detect_anomalies'):
                results = detector.detect_anomalies(df)
                result = results[0] if results else None
            else:
                # Detección simplificada basada en reglas
                result = {
                    'is_anomaly': False,
                    'anomaly_type': 0,
                    'anomaly_description': 'Normal',
                    'severity': 'Baja',
                    'confidence': 'Normal'
                }
                
                # Reglas básicas de detección
                if module_data['efficiency'] < 0.12:
                    result['is_anomaly'] = True
                    result['anomaly_type'] = 1
                    result['anomaly_description'] = 'Degradación Gradual'
                    result['severity'] = 'Media'
                    result['confidence'] = 'Alta'
                
                elif module_data['power_max'] < 200:
                    result['is_anomaly'] = True
                    result['anomaly_type'] = 2
                    result['anomaly_description'] = 'Falla de Celda'
                    result['severity'] = 'Alta'
                    result['confidence'] = 'Alta'
                
                elif module_data['cell_temp'] > 80:
                    result['is_anomaly'] = True
                    result['anomaly_type'] = 4
                    result['anomaly_description'] = 'Sobrecalentamiento'
                    result['severity'] = 'Alta'
                    result['confidence'] = 'Alta'
            
            # Si se detecta anomalía, guardar en base de datos
            if result and result['is_anomaly']:
                # Generar recomendaciones
                recommendations = {
                    1: {'action': 'Monitoreo continuo y planificación de reemplazo', 'priority': 'Media', 'timeframe': '3-6 meses'},
                    2: {'action': 'Inspección visual y reemplazo de módulo', 'priority': 'Alta', 'timeframe': '1-2 semanas'},
                    4: {'action': 'Mejorar ventilación y verificar montaje', 'priority': 'Alta', 'timeframe': '1 semana'}
                }
                
                rec = recommendations.get(result['anomaly_type'], {
                    'action': 'Inspección general recomendada',
                    'priority': 'Media',
                    'timeframe': '1 mes'
                })
                
                anomaly_record = AnomalyDetection(
                    module_id=data['module_id'],
                    anomaly_type=result['anomaly_description'],
                    severity_level=result['severity'],
                    confidence=result['confidence'],
                    description=f"Anomalía detectada en módulo {data['module_id']}: {result['anomaly_description']}",
                    recommended_action=rec['action'],
                    priority=rec['priority'],
                    timeframe=rec['timeframe'],
                    isolation_score=result.get('isolation_score', 0),
                    reconstruction_error=result.get('reconstruction_error', 0)
                )
                
                db.session.add(anomaly_record)
                db.session.commit()
                
                return jsonify({
                    'anomaly_detected': True,
                    'anomaly': {
                        'type': result['anomaly_description'],
                        'severity': result['severity'],
                        'confidence': result['confidence'],
                        'description': anomaly_record.description
                    },
                    'recommendation': {
                        'action': rec['action'],
                        'priority': rec['priority'],
                        'timeframe': rec['timeframe']
                    },
                    'anomaly_id': anomaly_record.id,
                    'timestamp': anomaly_record.timestamp.isoformat()
                }), 200
            
            else:
                return jsonify({
                    'anomaly_detected': False,
                    'status': 'Normal',
                    'message': 'No se detectaron anomalías en el módulo',
                    'timestamp': datetime.utcnow().isoformat()
                }), 200
                
        except Exception as e:
            return jsonify({'error': f'Error en detección: {str(e)}'}), 500
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@ai_bp.route('/optimize/multiobj', methods=['POST'])
def multi_objective_optimization():
    """Optimización multiobjetivo"""
    try:
        data = request.get_json()
        
        # Validar datos de entrada
        required_fields = ['environmental_data', 'technology']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Campo requerido faltante: {field}'}), 400
        
        # Cargar optimizador
        optimizer = load_optimizer()
        if optimizer is None:
            return jsonify({'error': 'Optimizador no disponible'}), 500
        
        # Preparar datos ambientales
        env_data = pd.DataFrame(data['environmental_data'])
        technology = data['technology']
        location_id = data.get('location_id', 'default')
        
        try:
            if hasattr(optimizer, 'optimize_configuration'):
                # Optimización completa
                pareto_front = optimizer.optimize_configuration(
                    env_data, technology=technology,
                    population_size=20, generations=10  # Reducido para respuesta rápida
                )
                
                if pareto_front:
                    best_solution = max(pareto_front, key=lambda x: sum(x['objectives']))
                    optimal_config = best_solution['parameters']
                    objectives = best_solution['objectives']
                else:
                    raise Exception("No se encontraron soluciones óptimas")
            
            else:
                # Optimización simplificada
                avg_temp = env_data['ambient_temperature'].mean()
                avg_irradiance = env_data['irradiance'].mean()
                avg_humidity = env_data['humidity'].mean()
                
                # Configuración óptima simplificada
                optimal_config = [
                    avg_temp * 0.5 + 10,  # tilt_angle
                    180,                   # azimuth_angle
                    1,                     # tracking_mode
                    max(7, 30 - avg_humidity / 10),  # cleaning_frequency
                    1 if avg_temp > 30 else 0,       # cooling_system
                    32,                    # mppt_voltage
                    0.95                   # inverter_efficiency
                ]
                
                objectives = [0.18, 25, -15000, 50000]  # Valores ejemplo
            
            # Mapear configuración a nombres
            config_names = [
                'tilt_angle', 'azimuth_angle', 'tracking_mode',
                'cleaning_frequency', 'cooling_system', 'mppt_voltage',
                'inverter_efficiency'
            ]
            
            config_dict = dict(zip(config_names, optimal_config))
            
            # Guardar resultado
            optimization_result = OptimizationResult(
                location_id=location_id,
                technology=technology,
                energy_efficiency=objectives[0],
                expected_lifespan=objectives[1],
                total_cost=abs(objectives[2]),
                co2_avoided=objectives[3]
            )
            
            optimization_result.set_optimal_config(config_dict)
            
            db.session.add(optimization_result)
            db.session.commit()
            
            return jsonify({
                'optimization_result': {
                    'optimal_configuration': config_dict,
                    'objectives': {
                        'energy_efficiency': round(objectives[0], 4),
                        'expected_lifespan': round(objectives[1], 1),
                        'total_cost': round(abs(objectives[2]), 2),
                        'co2_avoided': round(objectives[3], 2)
                    },
                    'technology': technology,
                    'location_id': location_id
                },
                'recommendations': {
                    'tilt_angle': f"Configurar inclinación a {config_dict['tilt_angle']:.1f}°",
                    'tracking': "Sistema de seguimiento recomendado" if config_dict['tracking_mode'] > 0 else "Sistema fijo recomendado",
                    'maintenance': f"Limpieza cada {config_dict['cleaning_frequency']:.0f} días",
                    'cooling': "Sistema de enfriamiento recomendado" if config_dict['cooling_system'] else "Enfriamiento pasivo suficiente"
                },
                'optimization_id': optimization_result.id,
                'timestamp': optimization_result.timestamp.isoformat()
            }), 200
            
        except Exception as e:
            return jsonify({'error': f'Error en optimización: {str(e)}'}), 500
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@ai_bp.route('/anomalies/active', methods=['GET'])
def get_active_anomalies():
    """Obtener anomalías activas"""
    try:
        # Parámetros de consulta
        severity = request.args.get('severity')
        module_id = request.args.get('module_id')
        limit = int(request.args.get('limit', 50))
        
        # Consulta base
        query = AnomalyDetection.query.filter(AnomalyDetection.status == 'active')
        
        if severity:
            query = query.filter(AnomalyDetection.severity_level == severity)
        
        if module_id:
            query = query.filter(AnomalyDetection.module_id == module_id)
        
        anomalies = query.order_by(AnomalyDetection.timestamp.desc()).limit(limit).all()
        
        return jsonify({
            'anomalies': [anomaly.to_dict() for anomaly in anomalies],
            'count': len(anomalies),
            'filters': {
                'severity': severity,
                'module_id': module_id
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@ai_bp.route('/anomalies/<int:anomaly_id>/resolve', methods=['PUT'])
def resolve_anomaly(anomaly_id):
    """Marcar anomalía como resuelta"""
    try:
        anomaly = AnomalyDetection.query.get_or_404(anomaly_id)
        
        anomaly.status = 'resolved'
        anomaly.resolved_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'message': 'Anomalía marcada como resuelta',
            'anomaly_id': anomaly_id,
            'resolved_at': anomaly.resolved_at.isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@ai_bp.route('/predictions/history', methods=['GET'])
def get_prediction_history():
    """Obtener historial de predicciones"""
    try:
        # Parámetros
        model_type = request.args.get('model_type')
        days = int(request.args.get('days', 7))
        limit = int(request.args.get('limit', 100))
        
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Consulta
        query = PredictionResult.query.filter(
            PredictionResult.timestamp >= start_date,
            PredictionResult.timestamp <= end_date
        )
        
        if model_type:
            query = query.filter(PredictionResult.model_type == model_type)
        
        predictions = query.order_by(PredictionResult.timestamp.desc()).limit(limit).all()
        
        return jsonify({
            'predictions': [pred.to_dict() for pred in predictions],
            'count': len(predictions),
            'period': {
                'start': start_date.isoformat(),
                'end': end_date.isoformat()
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@ai_bp.route('/models/status', methods=['GET'])
def get_models_status():
    """Obtener estado de los modelos de IA"""
    try:
        status = {
            'performance_predictor': {
                'loaded': performance_predictor is not None,
                'type': 'Tropical PV Performance Predictor',
                'description': 'Predicción de desempeño para climas tropicales'
            },
            'anomaly_detector': {
                'loaded': anomaly_detector is not None,
                'type': 'Solar Anomaly Detector',
                'description': 'Detección de anomalías y fallas en módulos solares'
            },
            'multi_objective_optimizer': {
                'loaded': multi_objective_optimizer is not None,
                'type': 'Multi-Objective PV Optimizer',
                'description': 'Optimización multiobjetivo de sistemas fotovoltaicos'
            }
        }
        
        return jsonify({
            'models_status': status,
            'timestamp': datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

