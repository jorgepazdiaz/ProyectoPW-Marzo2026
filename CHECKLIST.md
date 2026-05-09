# ✅ Checklist Interactivo — Usar Proyecto3 con Agentes

Copia este checklist y úsalo como guía mientras trabajas.

---

## 🚀 Fase 1: Instalación (5 minutos)

```
□ npm install
  Esperado: "added X packages"

□ npx playwright install --with-deps
  Esperado: "✓ Instalar Chromium, Firefox, WebKit"

□ npm test
  Esperado: "2 scenarios (2 passed)"

✅ Proyecto3 está listo
```

---

## 🎯 Fase 2: Crear primer test con Feature Assistant (10 minutos)

### Paso 1: Abre Copilot

```
□ VS Code abierto
□ Cmd+K (macOS) o Ctrl+Shift+X (Windows)
□ Chat de Copilot visible
```

### Paso 2: Invoca el agente

```
Copia y pega en Copilot:

@feature-assistant Necesito un test que valide que un usuario 
puede navegar a la página de categorías en MercadoPrueba.

Flujo:
1. Usuario abre MercadoPrueba
2. Hace clic en "Categorías"
3. Ve la lista de categorías disponibles
4. Puede hacer clic en una categoría específica

Espera resultado...
```

### Paso 3: Verifica archivos generados

```
□ Archivo feature creado: tests/features/categoria.feature
  Ver contenido:
  cat tests/features/categoria.feature

□ Archivo page object creado: tests/pages/CategoriaPage.ts
  Ver contenido:
  cat tests/pages/CategoriaPage.ts

□ Archivo steps creado: tests/steps/categoria.steps.ts
  Ver contenido:
  cat tests/steps/categoria.steps.ts

□ Script agregado en package.json
  Buscar: "test:categoria"
```

### Paso 4: Ejecuta el test

```
□ En terminal:
  npm run test:categoria

  Resultado esperado:
  ✔ 1 scenario (1 passed)

□ Con navegador visible (opcional):
  HEADLESS=false npm run test:categoria
  
  Verás el navegador ejecutar cada paso en tiempo real
```

✅ **Tu primer test con Feature Assistant funciona**

---

## 🔍 Fase 3: Monitorear cambios (5 minutos)

### Paso 1: Crear snapshot inicial

```
□ En terminal:
  npm run monitor:changes

  Resultado esperado:
  ✓ Snapshot guardado: .mcp/last-snapshot.json
  ✓ Change log actualizado: .mcp/CHANGE-LOG.md
```

### Paso 2: Ver lo que detectó

```
□ Abre el change log:
  cat .mcp/CHANGE-LOG.md

  Deberías ver:
  # Reporte de Cambios — 2026-05-09 ...
  URL: https://physician-oxygen-literary-classroom.trycloudflare.com
  
  ## 🔍 Primera inspección
  
  Elementos detectados:
  - Botones: X
  - Labels: X
  - Inputs: X
```

### Paso 3: Ver snapshot

```
□ Abre el snapshot JSON:
  cat .mcp/last-snapshot.json

  Deberías ver:
  {
    "timestamp": "2026-05-09T...",
    "url": "https://physician-oxygen-literal-classroom.trycloudflare.com",
    "title": "Ingresar | MercadoPrueba",
    "buttons": [...],
    "labels": [...],
    ...
  }
```

✅ **Sistema de monitoreo configurado**

---

## ⚠️ Fase 4: Simular cambio y usar Web Change Detector (15 minutos)

### Paso 1: (Opcional) Simular cambio en MercadoPrueba

```
□ Visita MercadoPrueba manualmente:
  https://physician-oxygen-literary-classroom.trycloudflare.com

□ Observa la estructura:
  - ¿Dónde está el campo de búsqueda?
  - ¿Qué dice el botón de login?
  - ¿Cuáles son los botones principales?

□ Mental note: estructura actual (para comparar después)
```

### Paso 2: Ejecutar test y hacerlo "fallar"

```
□ Ejecuta test:
  npm run test:categoria

  Si pasa ✅ : Sigue adelante
  Si falla ❌ : Perfecto para próximo paso
```

### Paso 3: Invocar Web Change Detector

```
Si el test falló, copia en Copilot:

@web-change-detector
El test "Navegación a categorías" falló con error timeout
en el selector getByRole('button', { name: 'Categorías' })

Inspecciona MercadoPrueba y actualiza automáticamente
los selectores necesarios para que el test vuelva a pasar.

Espera resultado...
```

### Paso 4: Verifica cambios

```
□ Abre el archivo modificado:
  cat tests/pages/CategoriaPage.ts

□ Busca cambios (líneas con + o -)
  git diff tests/pages/CategoriaPage.ts

□ El archivo debería tener selectores actualizados
```

### Paso 5: Ejecuta test nuevamente

```
□ npm run test:categoria

  Resultado esperado:
  ✔ 1 scenario (1 passed)
```

### Paso 6: Ver el change log

```
□ cat .mcp/CHANGE-LOG.md

  Deberías ver:
  ## ⚠️ X cambios detectados
  
  ### 🚨 Cambios críticos
  - SELECTOR_UPDATED: getByRole('button', ...)
  
  ### ✅ Recomendaciones
  1. Tests actualizados automáticamente
```

✅ **Web Change Detector funciona**

---

## 📊 Fase 5: Ver reportes (5 minutos)

### Paso 1: Generar reporte multi-navegador

```
□ En terminal:
  npm run test:all-report

  Verás:
  ✓ Ejecutando tests en Chromium...
  ✓ Ejecutando tests en Firefox...
  ✓ Ejecutando tests en WebKit...
  ✓ Generando reporte HTML...
  ✓ Abriendo en navegador...

⏱️ Duración: 10-15 segundos
```

### Paso 2: Inspeccionar reporte HTML

```
El navegador debe abrir automáticamente:
reports/html-report/index.html

Deberías ver:
┌────────────────────────────────┐
│ Reporte Playwright + Cucumber │
├────────────────────────────────┤
│ ✅ X scenarios (X passed)     │
│ Duración total: X segundos    │
│                                │
│ Por navegador:                 │
│ • Chromium:  X passed         │
│ • Firefox:   X passed         │
│ • WebKit:    X passed         │
└────────────────────────────────┘
```

### Paso 3: Explorar el reporte

```
□ En el reporte, haz clic en:
  - "Feature" para ver categorías
  - "Scenario" para expandir pasos
  - "Duration" para ver duración por paso

□ Navega entre navegadores:
  - Chromium, Firefox, WebKit
  - Compara tiempos de ejecución
```

### Paso 4: Descargar/compartir reporte

```
□ Copiar enlace del reporte:
  file:///Users/.../reports/html-report/index.html

□ Compartir con equipo (copiar carpeta html-report/)

□ Ver en navegador en cualquier momento:
  open reports/html-report/index.html
```

✅ **Reportes generados y visualizados**

---

## 🔄 Fase 6: Workflow completo (20 minutos)

### Test 1: Crear flujo de búsqueda

```
□ Copila en Copilot:
  @feature-assistant Necesito un test de búsqueda...
  [seguir el pattern del EXAMPLE.md]

□ Archivos generados:
  ├── tests/features/search.feature ✅
  ├── tests/pages/SearchPage.ts ✅
  └── tests/steps/search.steps.ts ✅

□ Ejecuta:
  npm run test:search

□ Resultado:
  ✔ 1 scenario (1 passed)
```

### Test 2: Monitorear cambios

```
□ npm run monitor:changes

  Salida:
  ✓ Snapshot guardado
  ✓ Change log actualizado

□ cat .mcp/CHANGE-LOG.md
  Deberías ver historial de cambios
```

### Test 3: Generar reporte final

```
□ npm run test:all-report

  Archivos generados:
  reports/
  ├── chromium/cucumber-report.json
  ├── firefox/cucumber-report.json
  ├── webkit/cucumber-report.json
  └── html-report/
      ├── index.html ← Abre aquí
      ├── styles.css
      └── assets/

□ Verifica todos los tests pasan en los 3 navegadores
```

### Test 4: Commit a git

```
□ Ver cambios:
  git status

□ Agregar archivos:
  git add tests/ .mcp/

□ Commit:
  git commit -m "feat: agregar tests de búsqueda con Feature Assistant"

□ Push:
  git push origin main
```

✅ **Workflow completo ejecutado**

---

## 🎓 Fase 7: Entender lo que pasó

### Feature Assistant

```
Generó:
□ Feature Gherkin
  ├── Escrito en lenguaje natural
  ├── Pasos Given/When/Then
  └── Tags (@smoke, @login, etc.)

□ Page Object
  ├── Métodos que encapsulan interacciones UI
  ├── Selectores robustos (getByRole, getByLabel)
  ├── Assertions con expect()
  └── Tipado TypeScript

□ Steps
  ├── Conectan feature con page object
  ├── Mapean texto → código
  └── Parámetros entre {{}}
```

### Web Change Detector

```
Detectó:
□ Cambios en selectores
□ Elementos nuevos/eliminados
□ Estructura HTML modificada

Actualizó:
□ Page Objects con nuevos selectores
□ Steps si es necesario
□ Validaciones de elementos

Generó:
□ Reporte de cambios en .mcp/CHANGE-LOG.md
□ Documentación de qué cambió
□ Recomendaciones siguientes
```

### MCP Server

```
Proporciona:
□ inspectPage() — extrae HTML actual
□ findElement() — busca por texto
□ detectChanges() — compara estado anterior/actual
□ analyzeError() — propone selectores válidos
□ generateReport() — documenta cambios
```

---

## 📋 Checklist final: Validar todo funciona

```
□ npm test
  Resultado: ✔ X scenarios (X passed)

□ npm run test:smoke
  Resultado: ✔ X scenarios (X passed)

□ npm run monitor:changes
  Resultado: ✓ Snapshot y change log

□ npm run test:all-report
  Resultado: Abre reports/html-report/index.html

□ git status
  Resultado: Solo archivos de test, sin basura

□ HEADLESS=false npm run test:
  Resultado: Ves el navegador ejecutar tests

□ cat .mcp/CHANGE-LOG.md
  Resultado: Ver historial de cambios
```

✅ **TODO FUNCIONA CORRECTAMENTE**

---

## 🎯 Comandos rápidos para copiar/pegar

```bash
# Instalar
npm install && npx playwright install --with-deps

# Crear test
@feature-assistant [en Copilot]

# Ejecutar
npm test
npm run test:smoke
HEADLESS=false npm test

# Monitorear
npm run monitor:changes

# Actualizar por cambios
@web-change-detector [en Copilot]

# Reportes
npm run test:all-report
open reports/html-report/index.html

# Ver cambios
git diff tests/
git log --oneline
cat .mcp/CHANGE-LOG.md
```

---

## 📚 Documentación de referencia

| Necesitas | Mira |
|-----------|-----|
| Workflow completo | WORKFLOW.md |
| Ejemplo real paso a paso | EXAMPLE.md |
| Documentación completa | README.md |
| Inicio rápido | QUICK-START.md |
| Guía de agentes | .github/AGENTS.md |
| Convenciones BDD | .github/instructions/playwright-bdd-conventions.instructions.md |

---

## ✨ Resumen

**Con Proyecto3 + Agentes IA puedes:**

✅ Crear tests automáticamente con `@feature-assistant`  
✅ Mantener tests sincronizados con `@web-change-detector`  
✅ Ver cambios documentados en `.mcp/CHANGE-LOG.md`  
✅ Generar reportes HTML multi-navegador  
✅ Ejecutar tests en 3 navegadores simultáneamente  
✅ Todo con convenciones BDD consistentes  

**Próximos pasos:**

1. Completa este checklist
2. Crea 2-3 tests con Feature Assistant
3. Ejecuta npm run test:all-report
4. Explora .mcp/CHANGE-LOG.md
5. Usa Web Change Detector si algo falla
6. ¡Listo para producción!

---

**Última actualización:** 2026-05-09  
**Versión:** Proyecto3 v1.0.0 con Agentes IA
