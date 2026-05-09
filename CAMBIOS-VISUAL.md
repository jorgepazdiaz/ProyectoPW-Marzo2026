# 📸 Cambios Detectados en MercadoPrueba — Visual

Resumen visual de lo que existe actualmente en MercadoPrueba.

---

## 🌐 Página Principal: Login

### Lo que ves en MercadoPrueba

```
┌─────────────────────────────────────────────────────────────┐
│ MercadoPrueba                                   [← → Menú]  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                                                              │
│              Ingresá a tu cuenta                            │
│                                                              │
│         ┌──────────────────────────────────┐               │
│         │ 📧 Correo electrónico o teléfono │               │
│         │ [ejemplo@correo.com____________] │               │
│         └──────────────────────────────────┘               │
│                                                              │
│         ┌──────────────────────────────────┐               │
│         │ 🔒 Contraseña                     │               │
│         │ [Tu contraseña________________] │               │
│         └──────────────────────────────────┘               │
│                                                              │
│                  ┌──────────────┐                          │
│                  │   Ingresar   │                          │
│                  └──────────────┘                          │
│                                                              │
│         🔗 ¿Olvidaste tu contraseña?                       │
│                                                              │
│         🔗 Crear cuenta                                    │
│         🔗 Ayuda                                           │
│                                                              │
│         ┌──────────────────────────────────┐               │
│         │ Conocé MercadoPrueba Business    │               │
│         └──────────────────────────────────┘               │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Privacidad | Términos y condiciones | Ayuda               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Estructura HTML Detectada

### Elementos encontrados (del snapshot)

```json
{
  "Headings": {
    "count": 1,
    "items": ["Ingresá a tu cuenta"]
  },
  
  "Inputs": {
    "count": 2,
    "items": [
      {
        "id": "email",
        "type": "text",
        "placeholder": "ejemplo@correo.com",
        "label": "Correo electrónico o teléfono"
      },
      {
        "id": "password",
        "type": "password",
        "placeholder": "Tu contraseña",
        "label": "Contraseña"
      }
    ]
  },
  
  "Buttons": {
    "count": 2,
    "items": [
      "Ingresar",
      "[Logo/Botón oculto]"
    ]
  },
  
  "Links": {
    "count": 9,
    "items": [
      "MercadoPrueba",
      "Crear cuenta",
      "Ayuda",
      "¿Olvidaste tu contraseña?",
      "Crear cuenta",
      "Conocé MercadoPrueba Business",
      "Privacidad",
      "Términos y condiciones",
      "Ayuda"
    ]
  }
}
```

---

## ✅ Tests Actuales vs ❌ Tests Faltantes

### Matriz de cobertura

```
┌────────────────────────────────────┬──────┬─────────────────┐
│ Escenario                          │ Test │ Estado          │
├────────────────────────────────────┼──────┼─────────────────┤
│ ✅ Crear cuenta                    │ SI   │ ✓ Implementado  │
├────────────────────────────────────┼──────┼─────────────────┤
│ ✅ Login exitoso                   │ SI   │ ✓ Implementado  │
├────────────────────────────────────┼──────┼─────────────────┤
│ ❌ Login con credenciales inválidas│ NO   │ ✗ FALTA CREAR  │
├────────────────────────────────────┼──────┼─────────────────┤
│ ❌ Recuperación de contraseña      │ NO   │ ✗ FALTA CREAR  │
├────────────────────────────────────┼──────┼─────────────────┤
│ ❌ Validación: Email vacío         │ NO   │ ✗ FALTA CREAR  │
├────────────────────────────────────┼──────┼─────────────────┤
│ ❌ Validación: Contraseña vacía    │ NO   │ ✗ FALTA CREAR  │
├────────────────────────────────────┼──────┼─────────────────┤
│ ❌ Validación: Ambos campos vacíos │ NO   │ ✗ FALTA CREAR  │
└────────────────────────────────────┴──────┴─────────────────┘

Cobertura actual: 2/7 = 28%
Cobertura después de crear los 3 features recomendados: 5/7 = 71%
```

---

## 🎯 Features a Crear (En Orden)

### 1️⃣ Login Inválido

```
Feature: Login Inválido
┌─────────────────────────────────────┐
│ Scenario: Rechazar credenciales     │
├─────────────────────────────────────┤
│ 1. Abre MercadoPrueba               │
│ 2. Ingresa email NO válido          │
│ 3. Ingresa contraseña cualquiera    │
│ 4. Clic en "Ingresar"               │
│ 5. ✓ Aparece: "Credenciales inválid"│
└─────────────────────────────────────┘

Status: ❌ NO EXISTE
Priority: 🔴 ALTA (test de seguridad)
Impacto: Valida que el login rechaza intrusos
```

### 2️⃣ Recuperación de Contraseña

```
Feature: Recuperación de Contraseña
┌─────────────────────────────────────┐
│ Scenario: Flujo de recuperación     │
├─────────────────────────────────────┤
│ 1. Abre MercadoPrueba               │
│ 2. Clic en "¿Olvidaste contraseña?" │
│ 3. Ingresa email registrado         │
│ 4. Clic en "Enviar instrucciones"   │
│ 5. ✓ Aparece: confirmación enviada  │
└─────────────────────────────────────┘

Status: ❌ NO EXISTE
Priority: 🟡 MEDIA (flujo alternativo)
Impacto: Usuarios pueden recuperar acceso
```

### 3️⃣ Validación de Campos Vacíos

```
Feature: Validación de Campos
┌─────────────────────────────────────┐
│ Scenario: Email vacío               │
├─────────────────────────────────────┤
│ 1. Email: [VACÍO]                   │
│ 2. Pass: [válida]                   │
│ 3. Clic Ingresar → ✓ Error mostrado │
├─────────────────────────────────────┤
│ Scenario: Contraseña vacía          │
├─────────────────────────────────────┤
│ 1. Email: [válida]                  │
│ 2. Pass: [VACÍO]                    │
│ 3. Clic Ingresar → ✓ Error mostrado │
└─────────────────────────────────────┘

Status: ❌ NO EXISTE
Priority: 🟡 MEDIA (validación básica)
Impacto: Mejora UX con validación temprana
```

---

## 📊 Estadísticas

### Antes

```
┌────────────────────┐
│ Features: 1        │
│ Scenarios: 2       │
│ Steps: ~8          │
│ Pages: 2           │
│ Coverage: 28%      │
└────────────────────┘
```

### Después (predicción)

```
┌────────────────────┐
│ Features: 4        │
│ Scenarios: 5-6     │
│ Steps: ~20+        │
│ Pages: 3-4         │
│ Coverage: 71%+     │
└────────────────────┘

Incremento:
├── Features: +300% (1→4)
├── Scenarios: +200% (2→5-6)
├── Coverage: +253% (28→71%)
└── Tiempo: ~30 minutos
```

---

## 🔍 Cambios Detectados en Última Inspección

### Timestamp
```
9 de mayo 2026, 01:28:15 (UTC)
```

### URL
```
https://physician-oxygen-literary-classroom.trycloudflare.com/
```

### Elementos Detectados
```
Botones:           2
Labels:            2
Inputs:            2
Headings:          1
Links:             9
```

### Cambios desde inspección anterior
```
Primera inspección: Baseline establecido
Cambios detectados: NINGUNO (estructura estable)
```

---

## 📁 Archivos Generados

### Ya existen:
```
✅ tests/features/login.feature
✅ tests/pages/CrearPage.ts
✅ tests/pages/LoginPage.ts
✅ tests/steps/crear.steps.ts
✅ tests/steps/login.steps.ts
```

### Se crearán:
```
✨ tests/features/login-invalid.feature
✨ tests/features/password-recovery.feature
✨ tests/features/login-validation.feature
✨ tests/pages/PasswordRecoveryPage.ts (opcional)
✨ tests/steps/login-invalid.steps.ts
✨ tests/steps/password-recovery.steps.ts
✨ tests/steps/login-validation.steps.ts
```

---

## 🎬 Flujo Visual: Crear los Tests

```
┌─────────────────────────────────┐
│ 1. TÚ                           │
│ Copias prompt en Copilot        │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ 2. @feature-assistant           │
│ Analiza MercadoPrueba           │
│ Genera Feature + Page + Steps   │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ 3. ARCHIVOS CREADOS             │
│ ✨ Feature file                 │
│ ✨ Page Object (si falta)       │
│ ✨ Steps                        │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ 4. TÚ                           │
│ npm test                        │
│ Ejecuta los nuevos tests        │
└────────────┬────────────────────┘
             │
      ✅ PASAN ✓
             │
             ▼
┌─────────────────────────────────┐
│ 5. git                          │
│ Hace commit de cambios          │
│ git push origin main            │
└─────────────────────────────────┘
```

---

## 📋 Checklist Antes de Empezar

```
□ VS Code abierto
□ Proyecto3 abierto
□ Copilot Chat disponible
□ npm run monitor:changes ejecutado
□ .mcp/last-snapshot.json disponible
□ Terminal lista para ejecutar npm test
```

---

## ✨ Resumen

| Item | Valor |
|------|-------|
| **Tests actuales** | 2 escenarios |
| **Tests a crear** | 3+ escenarios |
| **Tiempo estimado** | 20-30 minutos |
| **Herramienta** | @feature-assistant en Copilot |
| **Resultado** | Cobertura 71% + HTML report |

---

**Siguiente paso:** Ver [PROMPTS-FEATURE-ASSISTANT.md](PROMPTS-FEATURE-ASSISTANT.md)
