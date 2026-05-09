# 📊 Análisis de Cambios en MercadoPrueba — 9 de mayo 2026

Revisión completa de la estructura actual y features sugeridos.

---

## 🔍 Estructura Actual Detectada

### Página Principal: Login (`/`)

```
Título: "Ingresá a tu cuenta"

Elementos:
├── 🔗 MercadoPrueba (logo/link)
├── 📝 Campos de formulario:
│   ├── Email (#email)
│   │   └── placeholder: "ejemplo@correo.com"
│   └── Contraseña (#password)
│       └── placeholder: "Tu contraseña"
├── 🔘 Botones:
│   └── "Ingresar"
├── 🔗 Links importantes:
│   ├── "Crear cuenta" ← Para nuevos usuarios
│   ├── "¿Olvidaste tu contraseña?" ← Recuperación
│   ├── "Ayuda"
│   └── Footer: Privacidad, Términos, etc.
└── ✨ Otros:
    └── "Conocé MercadoPrueba Business"
```

**Snapshot JSON:** `.mcp/last-snapshot.json` (para referencia)

---

## 📋 Features Existentes

### ✅ Ya implementados:

```
1. tests/features/login.feature
   ├── Scenario: Crear Cuenta
   │   └── Steps: ingresa → clic crear → ingresa datos → validar creación
   │
   └── Scenario: Login exitoso @smoke @login
       └── Steps: ingresa → ingresar usuario/pass → clic ingresar → validar bienvenida
```

---

## 🎯 Features Recomendados para Crear

Basado en la estructura de MercadoPrueba, aquí están los tests que deberían existir:

### 1️⃣ **Login con Credenciales Inválidas** (Alta prioridad)

**Por qué:** Validar que el sistema rechaza credenciales incorrectas

**Prompt para @feature-assistant:**

```
@feature-assistant Necesito crear un test para validar 
que MercadoPrueba rechaza credenciales inválidas.

Flujo:
1. Usuario abre MercadoPrueba
2. Ingresa un email que NO existe
3. Ingresa cualquier contraseña
4. Hace clic en "Ingresar"
5. Valida que aparece un mensaje de error

Mensajes de error esperados: "Credenciales inválidas", 
"Usuario no encontrado", o similar.
```

**Resultado esperado:**
- Feature: `tests/features/login-invalid.feature`
- Page Object: Usa `LoginPage.ts` existente
- Steps: `tests/steps/login-invalid.steps.ts`

---

### 2️⃣ **Recuperación de Contraseña** (Media prioridad)

**Por qué:** Validar que existe el flujo de recuperación

**Prompt para @feature-assistant:**

```
@feature-assistant Necesito un test para el flujo 
de recuperación de contraseña en MercadoPrueba.

Flujo:
1. Usuario está en página de login
2. Hace clic en el link "¿Olvidaste tu contraseña?"
3. Se abre un formulario/página de recuperación
4. Ingresa su email registrado
5. Hace clic en "Enviar instrucciones"
6. Valida que aparece mensaje de confirmación

Busca el link con texto "Olvidaste tu contraseña" 
o similar.
```

**Resultado esperado:**
- Feature: `tests/features/password-recovery.feature`
- Page Object: `tests/pages/PasswordRecoveryPage.ts`
- Steps: `tests/steps/password-recovery.steps.ts`

---

### 3️⃣ **Validación de Campos Vacíos** (Media prioridad)

**Por qué:** Validar validaciones del lado del cliente

**Prompt para @feature-assistant:**

```
@feature-assistant Necesito tests para validar 
que MercadoPrueba valida campos obligatorios.

Escenarios:
1. Email vacío, contraseña rellena → debe mostrar error
2. Email relleno, contraseña vacía → debe mostrar error
3. Ambos campos vacíos → debe mostrar error

Valida que:
- Aparecen mensajes de error antes de enviar
- Los campos tienen atributo "required" o equivalente
- No se envía el formulario incompleto
```

**Resultado esperado:**
- Feature: `tests/features/login-validation.feature`
- Steps: `tests/steps/login-validation.steps.ts`

---

### 4️⃣ **Flujo de Crear Cuenta Completo** (Actualizar existente)

**Por qué:** Mejorar el test de creación que ya existe

**Prompt para @feature-assistant:**

```
@feature-assistant El test de "Crear Cuenta" ya existe,
pero quiero mejorarlo y agregar más validaciones.

Flujo mejorado:
1. Usuario hace clic en "Crear cuenta"
2. Se abre formulario con campos:
   - Nombre completo
   - Email
   - Contraseña
   - Confirmar contraseña
3. Completa todos los campos correctamente
4. Acepta términos y condiciones
5. Hace clic en "Crear cuenta"
6. Valida que la cuenta se creó exitosamente
7. Valida que es redirigido a página principal o dashboard

Usa el Page Object Model existente o crea uno nuevo
si la estructura cambió.
```

**Resultado esperado:**
- Mejorar `tests/features/login.feature`
- Mejorar o crear `tests/pages/CrearPage.ts`
- Mejorar `tests/steps/crear.steps.ts`

---

## 🚀 Plan de Acción

### Fase 1: Ejecutar detectores (5 minutos)

```bash
# Ya ejecutado ✅
npm run monitor:changes
cat .mcp/last-snapshot.json
cat .mcp/CHANGE-LOG.md
```

### Fase 2: Generar tests con @feature-assistant (15 minutos)

Copia en Copilot Chat **en este orden:**

```
1️⃣ Ejecuta primero:
@feature-assistant [prompt de Login Inválido]

2️⃣ Luego:
@feature-assistant [prompt de Recuperación de Contraseña]

3️⃣ Luego:
@feature-assistant [prompt de Validación de Campos]

4️⃣ Finalmente (opcional):
@feature-assistant [prompt de Mejorar Crear Cuenta]
```

### Fase 3: Validar tests (10 minutos)

```bash
# Ver archivos generados
ls -la tests/features/
ls -la tests/pages/
ls -la tests/steps/

# Ejecutar todos los tests
npm test

# Con navegador visible
HEADLESS=false npm test

# Generar reporte
npm run test:all-report
```

### Fase 4: Detectar cambios realizados

```bash
# Ver cambios en git
git status
git diff tests/

# Actualizar snapshot
npm run monitor:changes

# Ver change log
cat .mcp/CHANGE-LOG.md
```

---

## 📊 Resumen de Cambios Detectados en Web

### Estructura Actual (9 de mayo 2026)

```
MercadoPrueba/
├── Página Login
│   ├── Heading: "Ingresá a tu cuenta"
│   ├── Email field (#email)
│   ├── Password field (#password)
│   ├── Botón: "Ingresar"
│   ├── Links:
│   │   ├── "Crear cuenta" ✅ (existe)
│   │   ├── "¿Olvidaste tu contraseña?" ⚠️ (no testeado)
│   │   ├── "Ayuda"
│   │   └── Footer links
│   └── Logo MercadoPrueba
│
└── Páginas secundarias (sin detalles aún)
    ├── Crear Cuenta (parcialmente testeado)
    ├── Dashboard (no testeado)
    └── Recuperar Contraseña (no testeado)
```

### Tests Actuales

```
✅ Crear Cuenta (login.feature)
✅ Login exitoso @smoke @login (login.feature)
❌ Login con credenciales inválidas (FALTA CREAR)
❌ Recuperación de contraseña (FALTA CREAR)
❌ Validación de campos vacíos (FALTA CREAR)
```

### Coverage

```
Escenarios totales posibles: 8
Tests implementados: 2
Coverage: 25%

Faltantes:
├── Validaciones de negocio: 3
├── Flujos de error: 2
└── Edge cases: 3
```

---

## 💡 Recomendaciones

### ✅ Hacer ahora:

1. Crear los 3 features recomendados (Inválido, Recovery, Validación)
2. Ejecutar tests en los 3 navegadores
3. Generar reporte HTML
4. Documentar cambios en git

### ⚠️ Considerar después:

1. Tests de Dashboard (una vez que logra login)
2. Tests de edición de perfil
3. Tests de logout
4. Tests de búsqueda de productos
5. Tests de carrito de compras

### 🔍 Monitorear:

- Cambios de UI en MercadoPrueba
- Nuevas funcionalidades agregadas
- Breaking changes en elementos existentes

---

## 📝 Archivos de referencia

| Archivo | Propósito |
|---------|-----------|
| `.mcp/last-snapshot.json` | Estructura actual de MercadoPrueba |
| `.mcp/CHANGE-LOG.md` | Historial de cambios detectados |
| `tests/features/login.feature` | Features actuales |
| `tests/pages/LoginPage.ts` | Página Object existente |
| `tests/pages/CrearPage.ts` | Página Object para crear cuenta |
| `tests/steps/login.steps.ts` | Steps de login |
| `tests/steps/crear.steps.ts` | Steps de crear cuenta |

---

## 🎯 Próximo paso

Copia los prompts de arriba y úsalos en Copilot con `@feature-assistant` para generar automáticamente los tests faltantes. El agente generará:

- Features Gherkin con escenarios claros
- Page Objects con selectores robustos
- Steps conectando todo

**Tiempo estimado:** 15 minutos para generar 3 tests nuevos

---

**Fecha de análisis:** 9 de mayo 2026  
**Versión de Proyecto3:** 1.0.0  
**Tests actuales:** 2 escenarios  
**Tests recomendados:** +3 escenarios
