# 🤖 Prompts Listos para @feature-assistant

Copia y pega estos prompts exactamente en Copilot Chat para generar automáticamente los tests.

---

## ✨ Antes de empezar

```
Asegúrate de:
✅ Tener VS Code abierto en Proyecto3
✅ Tener Copilot Chat abierto (Cmd+K en macOS)
✅ Haber ejecutado: npm run monitor:changes
```

---

## 📋 Prompts listos para copiar

### Prompt 1️⃣: Login con Credenciales Inválidas

**Copia todo esto y pégalo en Copilot Chat:**

```
@feature-assistant Necesito crear un test para validar 
que MercadoPrueba rechaza credenciales inválidas.

Flujo:
1. Usuario abre MercadoPrueba
2. Ingresa un email que NO existe (ej: "noexiste@mail.com")
3. Ingresa cualquier contraseña (ej: "password123")
4. Hace clic en "Ingresar"
5. Valida que aparece un mensaje de error indicando que 
   las credenciales son inválidas

Detalles técnicos:
- URL: https://physician-oxygen-literary-classroom.trycloudflare.com/
- Email input: #email
- Password input: #password
- Botón Ingresar: busca por texto "Ingresar"
- El mensaje de error puede ser "Credenciales inválidas", 
  "Usuario no encontrado", "Email o contraseña incorrectos", 
  o similar

Nombre de feature: login-invalid
Tag: @smoke @login-invalid
```

**Resultado esperado:**
- `tests/features/login-invalid.feature`
- `tests/steps/login-invalid.steps.ts`

---

### Prompt 2️⃣: Recuperación de Contraseña

**Copia todo esto y pégalo en Copilot Chat:**

```
@feature-assistant Necesito un test para el flujo 
de recuperación de contraseña en MercadoPrueba.

Flujo:
1. Usuario abre la página de login de MercadoPrueba
2. Ve el link "¿Olvidaste tu contraseña?"
3. Hace clic en el link
4. Se abre una página o modal de recuperación
5. Ingresa su email registrado
6. Hace clic en un botón (probablemente "Enviar instrucciones" 
   o "Recuperar contraseña")
7. Valida que aparece un mensaje de confirmación indicando 
   que se enviaron las instrucciones

Detalles técnicos:
- URL base: https://physician-oxygen-literary-classroom.trycloudflare.com/
- Link a buscar: contiene texto "Olvidaste" O "olvidaste" O 
  "Contraseña" O "recuperar"
- El formulario de recuperación probablemente tiene 
  un campo email
- El mensaje de éxito puede ser "Instrucciones enviadas", 
  "Revisa tu email", etc.

Nombre de feature: password-recovery
Tag: @smoke @recovery
Crear Page Object: PasswordRecoveryPage
```

**Resultado esperado:**
- `tests/features/password-recovery.feature`
- `tests/pages/PasswordRecoveryPage.ts`
- `tests/steps/password-recovery.steps.ts`

---

### Prompt 3️⃣: Validación de Campos Vacíos

**Copia todo esto y pégalo en Copilot Chat:**

```
@feature-assistant Necesito tests para validar 
que MercadoPrueba valida campos obligatorios en login.

Crear dos escenarios:

Escenario 1: "Email vacío con contraseña"
1. Usuario abre MercadoPrueba
2. Deja el campo de email VACÍO
3. Ingresa una contraseña (ej: "password123")
4. Intenta hacer clic en "Ingresar"
5. Valida que aparece un error de validación indicando 
   que el email es requerido

Escenario 2: "Contraseña vacía con email"
1. Usuario abre MercadoPrueba
2. Ingresa un email válido
3. Deja el campo de contraseña VACÍO
4. Intenta hacer clic en "Ingresar"
5. Valida que aparece un error de validación indicando 
   que la contraseña es requerida

Detalles técnicos:
- Email input: #email (placeholder: "ejemplo@correo.com")
- Password input: #password (placeholder: "Tu contraseña")
- Botón: busca por texto "Ingresar"
- Los mensajes pueden ser "Campo requerido", 
  "Este campo es obligatorio", o similar

Nombre de feature: login-validation
Tags: @smoke @validation
Usar LoginPage.ts existente
```

**Resultado esperado:**
- `tests/features/login-validation.feature`
- `tests/steps/login-validation.steps.ts`

---

### Prompt 4️⃣ (Opcional): Mejorar Crear Cuenta

**Copia todo esto y pégalo en Copilot Chat:**

```
@feature-assistant Quiero mejorar el test de "Crear Cuenta" 
que ya existe. Revisa el estado actual en tests/features/login.feature

Actualiza el scenario "Crear Cuenta" para que:

1. Tenga los pasos más detalles y realistas:
   - Abre MercadoPrueba
   - Hace clic en "Crear cuenta"
   - Se abre un formulario con campos:
     * Nombre completo
     * Email
     * Contraseña
     * Confirmar contraseña
   - Completa todos los campos con datos válidos
   - (Opcional) Acepta términos y condiciones
   - Hace clic en botón "Crear cuenta" o "Registrarse"
   - Valida que:
     * La cuenta se creó exitosamente
     * Aparece mensaje de éxito
     * (Opcional) Es redirigido a página principal o login

2. Mantén compatible con Page Object Model

3. Reutiliza CrearPage.ts existente o mejoralo 
   si la estructura HTML cambió

4. Tags: @smoke @signup

El flujo actual está en: tests/features/login.feature
El Page Object está en: tests/pages/CrearPage.ts
```

**Resultado esperado:**
- Mejorado `tests/features/login.feature`
- Mejorado `tests/steps/crear.steps.ts`

---

## 🎯 Orden recomendado de ejecución

### Paso 1: Abre Copilot

```
VS Code → Cmd+K (macOS) o Ctrl+Shift+X (Windows)
Selecciona "Chat"
```

### Paso 2: Copia y pega Prompt 1️⃣

```
Copia el texto del "Prompt 1: Login con Credenciales Inválidas"
Pégalo en Copilot
Presiona Enter
Espera ~20 segundos a que genere los archivos
```

### Paso 3: Copia y pega Prompt 2️⃣

```
Una vez que termina Prompt 1, copia Prompt 2
Pégalo en Copilot
Presiona Enter
Espera ~20 segundos
```

### Paso 4: Copia y pega Prompt 3️⃣

```
Una vez que termina Prompt 2, copia Prompt 3
Pégalo en Copilot
Presiona Enter
Espera ~20 segundos
```

### Paso 5 (Opcional): Copia y pega Prompt 4️⃣

```
Si quieres mejorar el test de crear cuenta:
Copia Prompt 4
Pégalo en Copilot
Presiona Enter
Espera ~20 segundos
```

---

## ✅ Validar que los archivos se crearon

### En terminal:

```bash
# Ver features creadas
ls -la tests/features/

# Resultado esperado:
# -rw-r--r-- login.feature          ← original
# -rw-r--r-- login-invalid.feature  ← NUEVO
# -rw-r--r-- password-recovery.feature ← NUEVO
# -rw-r--r-- login-validation.feature ← NUEVO

# Ver pages creadas/actualizadas
ls -la tests/pages/

# Resultado esperado:
# CrearPage.ts      ← original
# LoginPage.ts      ← original
# PasswordRecoveryPage.ts ← NUEVO (si se creó)

# Ver steps creados
ls -la tests/steps/

# Resultado esperado:
# crear.steps.ts           ← original
# login.steps.ts           ← original
# login-invalid.steps.ts   ← NUEVO
# password-recovery.steps.ts ← NUEVO
# login-validation.steps.ts ← NUEVO
```

---

## 🚀 Ejecutar los tests nuevos

### Una vez creados todos los tests:

```bash
# Ejecutar todos
npm test

# Resultado esperado (si todo funciona):
# ✔ 5+ scenarios passed

# Con navegador visible (para debugging)
HEADLESS=false npm test

# Con reporte HTML multi-navegador
npm run test:all-report
```

---

## 🔄 Si un test falla:

### Opción 1: Usar Web Change Detector

```
Copia en Copilot:

@web-change-detector
El test "nombre del test" está fallando con:
[pega el error completo del terminal]

MercadoPrueba probablemente cambió. 
Detecta y actualiza automáticamente los selectores.
```

### Opción 2: Ver con navegador visible

```bash
# Ejecuta solo un test con navegador visible
HEADLESS=false npm run test:login-invalid
```

---

## 📊 Después de crear los tests

### Actualizar snapshot

```bash
npm run monitor:changes
```

### Ver cambios en git

```bash
git status
git diff tests/
```

### Generar change log

```bash
cat .mcp/CHANGE-LOG.md
```

### Hacer commit

```bash
git add tests/
git commit -m "feat: agregar tests de login inválido, recuperación y validación"
git push origin main
```

---

## 💡 Tips

### ✅ Hacer:
- Espera a que cada prompt termine antes de copiar el siguiente
- Mira la terminal para ver qué archivos se creen
- Ejecuta tests después de cada grupo de prompts

### ❌ Evitar:
- No pases múltiples prompts a la vez
- No modifiques manualmente los archivos generados (déjalo al agente)
- No hagas push antes de validar que los tests pasan

---

## 📞 Si algo sale mal

### Paso 1: Verificar la web

```bash
# Abre en navegador
https://physician-oxygen-literary-classroom.trycloudflare.com/
```

### Paso 2: Ver el snapshot

```bash
cat .mcp/last-snapshot.json | jq .
```

### Paso 3: Ejecutar con debugging

```bash
HEADLESS=false npm test
```

### Paso 4: Invocar Web Change Detector

```
@web-change-detector Error: [pega error aquí]
```

---

**Archivo generado:** 9 de mayo 2026  
**Para usar con:** Copilot Chat + @feature-assistant  
**Tiempo estimado:** 20-30 minutos para todos los prompts
