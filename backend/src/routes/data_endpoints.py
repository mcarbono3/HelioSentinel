"""
Endpoints para manejo de datos solares y ambientales - HelioSentinel
"""

from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from src.models.solar_data import (
    db, SolarModuleData, EnvironmentalData, 
    SystemMetrics, AnomalyDetection
)
import pandas as pd
import io
import json

data_bp = Blueprint('data', __name__)

@data_bp.route('/data/solar', methods=['POST'])
def receive_solar_data():
    """Recibir datos de módulos solares en tiempo real"""
    try:
        data = request.get_json()
        
        # Validar datos requeridos
        required_fields = [
            'module_id', 'open_circuit_voltage', 'max_power_voltage',
            'max_power_current', 'short_circuit_current', 'max_power',
            'efficiency', 'cell_temperature'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Campo requerido faltante: {field}'}), 400
        
        # Crear registro
        solar_data = SolarModuleData(
            module_id=data['module_id'],
            open_circuit_voltage=float(data['open_circuit_voltage']),
            max_power_voltage=float(data['max_power_voltage']),
            max_power_current=float(data['max_power_current']),
            short_circuit_current=float(data['short_circuit_current']),
            max_power=float(data['max_power']),
            efficiency=float(data['efficiency']),
            cell_temperature=float(data['cell_temperature']),
            timestamp=datetime.fromisoformat(data.get('timestamp', datetime.utcnow().isoformat()))
        )
        
        db.session.add(solar_data)
        db.session.commit()
        
        return jsonify({
            'message': 'Datos solares recibidos exitosamente',
            'id': solar_data.id,
            'timestamp': solar_data.timestamp.isoformat()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@data_bp.route('/data/environmental', methods=['POST'])
def receive_environmental_data():
    """Recibir datos ambientales en tiempo real"""
    try:
        data = request.get_json()
        
        # Validar datos requeridos
        required_fields = [
            'ambient_temperature', 'irradiance', 'humidity', 'wind_speed'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Campo requerido faltante: {field}'}), 400
        
        # Crear registro
        env_data = EnvironmentalData(
            location_id=data.get('location_id', 'default'),
            ambient_temperature=float(data['ambient_temperature']),
            irradiance=float(data['irradiance']),
            humidity=float(data['humidity']),
            wind_speed=float(data['wind_speed']),
            precipitation=float(data.get('precipitation', 0)),
            cloudiness=float(data.get('cloudiness', 0)),
            timestamp=datetime.fromisoformat(data.get('timestamp', datetime.utcnow().isoformat()))
        )
        
        db.session.add(env_data)
        db.session.commit()
        
        return jsonify({
            'message': 'Datos ambientales recibidos exitosamente',
            'id': env_data.id,
            'timestamp': env_data.timestamp.isoformat()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@data_bp.route('/data/latest', methods=['GET'])
def get_latest_data():
    """Obtener los últimos datos disponibles"""
    try:
        # Parámetros de consulta
        limit = int(request.args.get('limit', 10))
        module_id = request.args.get('module_id')
        location_id = request.args.get('location_id')
        
        # Consultar datos solares
        solar_query = SolarModuleData.query
        if module_id:
            solar_query = solar_query.filter_by(module_id=module_id)
        
        latest_solar = solar_query.order_by(SolarModuleData.timestamp.desc()).limit(limit).all()
        
        # Consultar datos ambientales
        env_query = EnvironmentalData.query
        if location_id:
            env_query = env_query.filter_by(location_id=location_id)
        
        latest_env = env_query.order_by(EnvironmentalData.timestamp.desc()).limit(limit).all()
        
        return jsonify({
            'solar_data': [data.to_dict() for data in latest_solar],
            'environmental_data': [data.to_dict() for data in latest_env],
            'count': {
                'solar': len(latest_solar),
                'environmental': len(latest_env)
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@data_bp.route('/data/range', methods=['GET'])
def get_data_range():
    """Obtener datos en un rango de fechas"""
    try:
        # Parámetros de consulta
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        module_id = request.args.get('module_id')
        location_id = request.args.get('location_id')
        
        if not start_date or not end_date:
            return jsonify({'error': 'start_date y end_date son requeridos'}), 400
        
        start_dt = datetime.fromisoformat(start_date)
        end_dt = datetime.fromisoformat(end_date)
        
        # Consultar datos solares
        solar_query = SolarModuleData.query.filter(
            SolarModuleData.timestamp >= start_dt,
            SolarModuleData.timestamp <= end_dt
        )
        if module_id:
            solar_query = solar_query.filter_by(module_id=module_id)
        
        solar_data = solar_query.order_by(SolarModuleData.timestamp.asc()).all()
        
        # Consultar datos ambientales
        env_query = EnvironmentalData.query.filter(
            EnvironmentalData.timestamp >= start_dt,
            EnvironmentalData.timestamp <= end_dt
        )
        if location_id:
            env_query = env_query.filter_by(location_id=location_id)
        
        env_data = env_query.order_by(EnvironmentalData.timestamp.asc()).all()
        
        return jsonify({
            'solar_data': [data.to_dict() for data in solar_data],
            'environmental_data': [data.to_dict() for data in env_data],
            'period': {
                'start': start_date,
                'end': end_date
            },
            'count': {
                'solar': len(solar_data),
                'environmental': len(env_data)
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@data_bp.route('/upload/csv', methods=['POST'])
def upload_csv():
    """Cargar datos desde archivo CSV"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No se encontró archivo'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No se seleccionó archivo'}), 400
        
        data_type = request.form.get('data_type', 'solar')  # 'solar' o 'environmental'
        
        # Leer CSV
        stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
        df = pd.read_csv(stream)
        
        records_created = 0
        errors = []
        
        if data_type == 'solar':
            # Procesar datos solares
            required_columns = [
                'module_id', 'open_circuit_voltage', 'max_power_voltage',
                'max_power_current', 'short_circuit_current', 'max_power',
                'efficiency', 'cell_temperature'
            ]
            
            # Verificar columnas
            missing_columns = [col for col in required_columns if col not in df.columns]
            if missing_columns:
                return jsonify({'error': f'Columnas faltantes: {missing_columns}'}), 400
            
            for index, row in df.iterrows():
                try:
                    solar_data = SolarModuleData(
                        module_id=str(row['module_id']),
                        open_circuit_voltage=float(row['open_circuit_voltage']),
                        max_power_voltage=float(row['max_power_voltage']),
                        max_power_current=float(row['max_power_current']),
                        short_circuit_current=float(row['short_circuit_current']),
                        max_power=float(row['max_power']),
                        efficiency=float(row['efficiency']),
                        cell_temperature=float(row['cell_temperature']),
                        timestamp=pd.to_datetime(row.get('timestamp', datetime.utcnow())).to_pydatetime()
                    )
                    
                    db.session.add(solar_data)
                    records_created += 1
                    
                except Exception as e:
                    errors.append(f'Fila {index + 1}: {str(e)}')
        
        elif data_type == 'environmental':
            # Procesar datos ambientales
            required_columns = [
                'ambient_temperature', 'irradiance', 'humidity', 'wind_speed'
            ]
            
            # Verificar columnas
            missing_columns = [col for col in required_columns if col not in df.columns]
            if missing_columns:
                return jsonify({'error': f'Columnas faltantes: {missing_columns}'}), 400
            
            for index, row in df.iterrows():
                try:
                    env_data = EnvironmentalData(
                        location_id=str(row.get('location_id', 'default')),
                        ambient_temperature=float(row['ambient_temperature']),
                        irradiance=float(row['irradiance']),
                        humidity=float(row['humidity']),
                        wind_speed=float(row['wind_speed']),
                        precipitation=float(row.get('precipitation', 0)),
                        cloudiness=float(row.get('cloudiness', 0)),
                        timestamp=pd.to_datetime(row.get('timestamp', datetime.utcnow())).to_pydatetime()
                    )
                    
                    db.session.add(env_data)
                    records_created += 1
                    
                except Exception as e:
                    errors.append(f'Fila {index + 1}: {str(e)}')
        
        else:
            return jsonify({'error': 'Tipo de datos no válido'}), 400
        
        db.session.commit()
        
        return jsonify({
            'message': f'Archivo procesado exitosamente',
            'records_created': records_created,
            'errors': errors[:10],  # Mostrar solo los primeros 10 errores
            'total_errors': len(errors)
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@data_bp.route('/upload/xlsx', methods=['POST'])
def upload_xlsx():
    """Cargar datos desde archivo Excel"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No se encontró archivo'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No se seleccionó archivo'}), 400
        
        data_type = request.form.get('data_type', 'solar')
        sheet_name = request.form.get('sheet_name', 0)  # Primera hoja por defecto
        
        # Leer Excel
        df = pd.read_excel(file, sheet_name=sheet_name)
        
        # Convertir a CSV en memoria y procesar
        csv_buffer = io.StringIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        
        # Simular request de CSV
        records_created = 0
        errors = []
        
        if data_type == 'solar':
            required_columns = [
                'module_id', 'open_circuit_voltage', 'max_power_voltage',
                'max_power_current', 'short_circuit_current', 'max_power',
                'efficiency', 'cell_temperature'
            ]
            
            missing_columns = [col for col in required_columns if col not in df.columns]
            if missing_columns:
                return jsonify({'error': f'Columnas faltantes: {missing_columns}'}), 400
            
            for index, row in df.iterrows():
                try:
                    solar_data = SolarModuleData(
                        module_id=str(row['module_id']),
                        open_circuit_voltage=float(row['open_circuit_voltage']),
                        max_power_voltage=float(row['max_power_voltage']),
                        max_power_current=float(row['max_power_current']),
                        short_circuit_current=float(row['short_circuit_current']),
                        max_power=float(row['max_power']),
                        efficiency=float(row['efficiency']),
                        cell_temperature=float(row['cell_temperature']),
                        timestamp=pd.to_datetime(row.get('timestamp', datetime.utcnow())).to_pydatetime()
                    )
                    
                    db.session.add(solar_data)
                    records_created += 1
                    
                except Exception as e:
                    errors.append(f'Fila {index + 1}: {str(e)}')
        
        elif data_type == 'environmental':
            required_columns = [
                'ambient_temperature', 'irradiance', 'humidity', 'wind_speed'
            ]
            
            missing_columns = [col for col in required_columns if col not in df.columns]
            if missing_columns:
                return jsonify({'error': f'Columnas faltantes: {missing_columns}'}), 400
            
            for index, row in df.iterrows():
                try:
                    env_data = EnvironmentalData(
                        location_id=str(row.get('location_id', 'default')),
                        ambient_temperature=float(row['ambient_temperature']),
                        irradiance=float(row['irradiance']),
                        humidity=float(row['humidity']),
                        wind_speed=float(row['wind_speed']),
                        precipitation=float(row.get('precipitation', 0)),
                        cloudiness=float(row.get('cloudiness', 0)),
                        timestamp=pd.to_datetime(row.get('timestamp', datetime.utcnow())).to_pydatetime()
                    )
                    
                    db.session.add(env_data)
                    records_created += 1
                    
                except Exception as e:
                    errors.append(f'Fila {index + 1}: {str(e)}')
        
        db.session.commit()
        
        return jsonify({
            'message': f'Archivo Excel procesado exitosamente',
            'records_created': records_created,
            'errors': errors[:10],
            'total_errors': len(errors)
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@data_bp.route('/dashboard/metrics', methods=['GET'])
def get_dashboard_metrics():
    """Obtener métricas para el dashboard"""
    try:
        # Calcular métricas en tiempo real
        now = datetime.utcnow()
        last_24h = now - timedelta(hours=24)
        last_week = now - timedelta(days=7)
        
        # Métricas de módulos solares
        total_modules = db.session.query(SolarModuleData.module_id).distinct().count()
        
        # Módulos activos (con datos en las últimas 24h)
        active_modules = db.session.query(SolarModuleData.module_id).filter(
            SolarModuleData.timestamp >= last_24h
        ).distinct().count()
        
        # Potencia total generada (últimas 24h)
        total_power = db.session.query(db.func.sum(SolarModuleData.max_power)).filter(
            SolarModuleData.timestamp >= last_24h
        ).scalar() or 0
        
        # Eficiencia promedio
        avg_efficiency = db.session.query(db.func.avg(SolarModuleData.efficiency)).filter(
            SolarModuleData.timestamp >= last_24h
        ).scalar() or 0
        
        # Anomalías
        total_anomalies = AnomalyDetection.query.filter(
            AnomalyDetection.status == 'active'
        ).count()
        
        critical_anomalies = AnomalyDetection.query.filter(
            AnomalyDetection.status == 'active',
            AnomalyDetection.severity_level == 'Crítica'
        ).count()
        
        # Condiciones ambientales promedio
        env_metrics = db.session.query(
            db.func.avg(EnvironmentalData.ambient_temperature),
            db.func.avg(EnvironmentalData.irradiance),
            db.func.avg(EnvironmentalData.humidity)
        ).filter(EnvironmentalData.timestamp >= last_24h).first()
        
        avg_temp = env_metrics[0] or 0
        avg_irradiance = env_metrics[1] or 0
        avg_humidity = env_metrics[2] or 0
        
        # Crear o actualizar métricas del sistema
        system_metrics = SystemMetrics(
            total_modules=total_modules,
            active_modules=active_modules,
            total_power_generated=total_power,
            average_efficiency=avg_efficiency,
            total_anomalies=total_anomalies,
            critical_anomalies=critical_anomalies,
            average_temperature=avg_temp,
            average_irradiance=avg_irradiance,
            average_humidity=avg_humidity
        )
        
        return jsonify({
            'modules': {
                'total': total_modules,
                'active': active_modules,
                'inactive': total_modules - active_modules
            },
            'power': {
                'total_generated_24h': round(total_power, 2),
                'average_efficiency': round(avg_efficiency * 100, 2)
            },
            'anomalies': {
                'total_active': total_anomalies,
                'critical': critical_anomalies,
                'medium_high': total_anomalies - critical_anomalies
            },
            'environment': {
                'average_temperature': round(avg_temp, 1),
                'average_irradiance': round(avg_irradiance, 1),
                'average_humidity': round(avg_humidity, 1)
            },
            'timestamp': now.isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@data_bp.route('/charts/performance', methods=['GET'])
def get_performance_charts():
    """Obtener datos para gráficos de rendimiento"""
    try:
        # Parámetros
        days = int(request.args.get('days', 7))
        module_id = request.args.get('module_id')
        
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Consulta base
        query = db.session.query(
            SolarModuleData.timestamp,
            SolarModuleData.max_power,
            SolarModuleData.efficiency,
            SolarModuleData.cell_temperature,
            SolarModuleData.module_id
        ).filter(
            SolarModuleData.timestamp >= start_date,
            SolarModuleData.timestamp <= end_date
        )
        
        if module_id:
            query = query.filter(SolarModuleData.module_id == module_id)
        
        data = query.order_by(SolarModuleData.timestamp.asc()).all()
        
        # Formatear datos para gráficos
        chart_data = {
            'timestamps': [d.timestamp.isoformat() for d in data],
            'power': [d.max_power for d in data],
            'efficiency': [d.efficiency * 100 for d in data],
            'temperature': [d.cell_temperature for d in data],
            'modules': list(set([d.module_id for d in data]))
        }
        
        return jsonify(chart_data), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

