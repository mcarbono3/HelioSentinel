import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from src.models.solar_data import db
from src.routes.data_endpoints import data_bp
from src.routes.ai_endpoints import ai_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'heliosentinel_secret_key_2024'

# Configurar CORS para permitir todas las conexiones
CORS(app, origins="*")

# Registrar blueprints
app.register_blueprint(data_bp, url_prefix='/api')
app.register_blueprint(ai_bp, url_prefix='/api')

# Configuración de base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'heliosentinel.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Inicializar base de datos
db.init_app(app)
with app.app_context():
    db.create_all()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint de verificación de salud"""
    return jsonify({
        'status': 'healthy',
        'service': 'HelioSentinel Backend',
        'version': '1.0.0',
        'timestamp': db.func.now()
    }), 200

@app.route('/api/info', methods=['GET'])
def get_system_info():
    """Información del sistema HelioSentinel"""
    return jsonify({
        'name': 'HelioSentinel',
        'description': 'Plataforma de IA para sistemas fotovoltaicos',
        'version': '1.0.0',
        'features': [
            'Predicción de desempeño FV para climas tropicales',
            'Detección temprana de anomalías y fallas',
            'Optimización multiobjetivo de sistemas solares',
            'Análisis de datos en tiempo real',
            'Dashboards profesionales',
            'Gemelo digital de sistemas fotovoltaicos'
        ],
        'technologies': [
            'Machine Learning',
            'Deep Learning',
            'XAI (Explainable AI)',
            'Digital Twin',
            'NSGA-II',
            'Deep Q-Network'
        ],
        'endpoints': {
            'data': [
                '/api/data/solar',
                '/api/data/environmental',
                '/api/data/latest',
                '/api/upload/csv',
                '/api/upload/xlsx'
            ],
            'ai': [
                '/api/predict/performance',
                '/api/predict/anomalies',
                '/api/optimize/multiobj'
            ],
            'dashboard': [
                '/api/dashboard/metrics',
                '/api/charts/performance'
            ]
        }
    }), 200

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Servir archivos estáticos del frontend"""
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return jsonify({
            'message': 'HelioSentinel Backend API',
            'status': 'running',
            'note': 'Frontend no configurado. Use /api/info para ver endpoints disponibles.'
        }), 200

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return jsonify({
                'message': 'HelioSentinel Backend API',
                'status': 'running',
                'note': 'Frontend no encontrado. Use /api/info para ver endpoints disponibles.'
            }), 200

@app.errorhandler(404)
def not_found(error):
    """Manejador de errores 404"""
    return jsonify({
        'error': 'Endpoint no encontrado',
        'message': 'Verifique la URL y método HTTP',
        'available_endpoints': '/api/info'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Manejador de errores 500"""
    db.session.rollback()
    return jsonify({
        'error': 'Error interno del servidor',
        'message': 'Contacte al administrador del sistema'
    }), 500

if __name__ == '__main__':
    print("=== HelioSentinel Backend ===")
    print("Iniciando servidor...")
    print("API disponible en: http://0.0.0.0:5000/api/info")
    print("Documentación: http://0.0.0.0:5000/api/info")
    app.run(host='0.0.0.0', port=5000, debug=True)

