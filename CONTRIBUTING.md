# Guía de Contribución - HelioSentinel

¡Gracias por tu interés en contribuir a HelioSentinel! Esta guía te ayudará a entender cómo participar en el desarrollo de la plataforma.

## 🤝 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/heliosentinel.git
cd heliosentinel
```

### 2. Configurar Entorno de Desarrollo

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

### 3. Crear Rama Feature

```bash
git checkout -b feature/nueva-funcionalidad
```

### 4. Desarrollar y Testear

```bash
# Backend tests
cd backend
python -m pytest tests/ -v

# Frontend tests
cd ../frontend
npm test
```

### 5. Commit y Push

```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### 6. Crear Pull Request

- Ve a GitHub y crea un Pull Request
- Describe los cambios realizados
- Incluye tests y documentación

## 📋 Estándares de Código

### Python (Backend)

#### Estilo
- Seguir **PEP 8**
- Usar **Black** para formateo automático
- Máximo 88 caracteres por línea

```bash
# Formatear código
black src/

# Verificar estilo
flake8 src/
```

#### Documentación
```python
def predict_performance(irradiance: float, temperature: float) -> dict:
    """
    Predice el desempeño de un módulo fotovoltaico.
    
    Args:
        irradiance (float): Irradiancia solar en W/m²
        temperature (float): Temperatura ambiente en °C
    
    Returns:
        dict: Predicción con potencia y confianza
    
    Raises:
        ValueError: Si los parámetros están fuera de rango
    """
    pass
```

#### Testing
```python
import pytest
from src.models.predictor import PerformancePredictor

def test_performance_prediction():
    """Test de predicción de desempeño."""
    predictor = PerformancePredictor()
    result = predictor.predict(irradiance=800, temperature=25)
    
    assert 'predicted_power' in result
    assert result['predicted_power'] > 0
    assert 0 <= result['confidence'] <= 1
```

### JavaScript/React (Frontend)

#### Estilo
- Usar **ESLint** y **Prettier**
- Componentes funcionales con hooks
- Props destructuring

```javascript
// ✅ Correcto
const Dashboard = ({ data, loading, onRefresh }) => {
  const [selectedMetric, setSelectedMetric] = useState('power');
  
  return (
    <div className="dashboard">
      {/* contenido */}
    </div>
  );
};

// ❌ Incorrecto
const Dashboard = (props) => {
  return (
    <div className="dashboard">
      {/* contenido */}
    </div>
  );
};
```

#### Documentación
```javascript
/**
 * Componente de dashboard principal
 * @param {Object} props - Props del componente
 * @param {Array} props.data - Datos del sistema
 * @param {boolean} props.loading - Estado de carga
 * @param {Function} props.onRefresh - Callback de actualización
 */
const Dashboard = ({ data, loading, onRefresh }) => {
  // implementación
};
```

#### Testing
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders dashboard with metrics', () => {
  const mockData = { modules: 100, power: 5000 };
  
  render(<Dashboard data={mockData} loading={false} />);
  
  expect(screen.getByText('100')).toBeInTheDocument();
  expect(screen.getByText('5000')).toBeInTheDocument();
});
```

## 🔄 Conventional Commits

Usar el formato de [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[scope opcional]: <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos de Commit

- **feat**: Nueva funcionalidad
- **fix**: Corrección de bug
- **docs**: Cambios en documentación
- **style**: Cambios de formato (no afectan lógica)
- **refactor**: Refactorización de código
- **test**: Agregar o modificar tests
- **chore**: Tareas de mantenimiento

### Ejemplos

```bash
# Nueva funcionalidad
git commit -m "feat(api): agregar endpoint de optimización multiobjetivo"

# Corrección de bug
git commit -m "fix(dashboard): corregir cálculo de eficiencia promedio"

# Documentación
git commit -m "docs(readme): actualizar guía de instalación"

# Refactorización
git commit -m "refactor(predictor): optimizar algoritmo de predicción"
```

## 🧪 Testing

### Cobertura Mínima
- **Backend**: 80% cobertura de código
- **Frontend**: 70% cobertura de componentes

### Tipos de Tests

#### Backend
```bash
# Tests unitarios
python -m pytest tests/unit/ -v

# Tests de integración
python -m pytest tests/integration/ -v

# Tests de API
python -m pytest tests/api/ -v

# Cobertura
python -m pytest tests/ --cov=src --cov-report=html
```

#### Frontend
```bash
# Tests unitarios
npm test

# Tests de componentes
npm run test:components

# Tests E2E
npm run test:e2e

# Cobertura
npm run test:coverage
```

## 📝 Documentación

### README Updates
- Mantener README.md actualizado
- Incluir ejemplos de uso
- Documentar nuevas APIs

### Comentarios en Código
- Explicar lógica compleja
- Documentar algoritmos de IA
- Incluir referencias científicas

### API Documentation
```python
@app.route('/api/predict/performance', methods=['POST'])
def predict_performance():
    """
    Predice el desempeño de módulos fotovoltaicos.
    
    Request Body:
        {
            "irradiance": 800,      # W/m²
            "temperature": 25,      # °C
            "humidity": 60,         # %
            "wind_speed": 2.5       # m/s
        }
    
    Response:
        {
            "predicted_power": 320.5,
            "confidence": 0.95,
            "timestamp": "2024-01-01T12:00:00Z"
        }
    """
    pass
```

## 🐛 Reportar Bugs

### Template de Issue
```markdown
## Descripción del Bug
Descripción clara y concisa del problema.

## Pasos para Reproducir
1. Ir a '...'
2. Hacer clic en '...'
3. Ver error

## Comportamiento Esperado
Descripción de lo que debería pasar.

## Screenshots
Si aplica, agregar screenshots.

## Entorno
- OS: [e.g. Ubuntu 20.04]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]
```

## ✨ Solicitar Features

### Template de Feature Request
```markdown
## Descripción del Feature
Descripción clara de la funcionalidad solicitada.

## Problema que Resuelve
¿Qué problema resuelve este feature?

## Solución Propuesta
Descripción de la solución.

## Alternativas Consideradas
Otras soluciones evaluadas.

## Información Adicional
Contexto adicional o screenshots.
```

## 🔍 Code Review

### Checklist del Reviewer

#### Funcionalidad
- [ ] El código hace lo que dice hacer
- [ ] Los tests pasan
- [ ] No hay regresiones

#### Calidad
- [ ] Código legible y mantenible
- [ ] Sigue estándares del proyecto
- [ ] Documentación adecuada

#### Seguridad
- [ ] No hay vulnerabilidades obvias
- [ ] Validación de entrada apropiada
- [ ] Manejo seguro de datos sensibles

#### Performance
- [ ] No hay problemas de rendimiento
- [ ] Uso eficiente de recursos
- [ ] Optimizaciones apropiadas

### Proceso de Review

1. **Autor** crea Pull Request
2. **Reviewer** asignado automáticamente
3. **Review** de código y tests
4. **Feedback** y solicitud de cambios
5. **Aprobación** y merge

## 🚀 Release Process

### Versionado Semántico
- **MAJOR**: Cambios incompatibles
- **MINOR**: Nuevas funcionalidades compatibles
- **PATCH**: Correcciones de bugs

### Proceso de Release

1. **Feature Freeze**: No nuevas funcionalidades
2. **Testing**: Tests exhaustivos
3. **Documentation**: Actualizar docs
4. **Tagging**: Crear tag de versión
5. **Deploy**: Desplegar a producción

## 🏆 Reconocimientos

### Contributors
Todos los contribuidores son reconocidos en:
- README.md principal
- Página de créditos
- Release notes

### Tipos de Contribución
- 💻 Código
- 📖 Documentación
- 🐛 Bug reports
- 💡 Ideas y features
- 🎨 Diseño
- 🧪 Testing

## 📞 Contacto

### Canales de Comunicación
- **GitHub Issues**: Para bugs y features
- **GitHub Discussions**: Para preguntas generales
- **Email**: dev@heliosentinel.com

### Tiempo de Respuesta
- **Issues críticos**: 24 horas
- **Pull Requests**: 48 horas
- **Preguntas generales**: 72 horas

---

¡Gracias por contribuir a HelioSentinel! 🌞⚡

