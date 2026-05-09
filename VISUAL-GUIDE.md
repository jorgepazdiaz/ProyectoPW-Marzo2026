# 👀 Guía Visual — Qué esperar cuando ejecutas los agentes

Esta guía muestra exactamente qué ver en pantalla cuando usas los agentes.

---

## 📺 Pantalla 1: Feature Assistant generando test

### Paso 1: Invocas en Copilot

```
@feature-assistant Necesito crear un test que valide 
que un usuario puede filtrar productos...
```

### Lo que ves en Copilot Chat

```
┌─────────────────────────────────────────────────────┐
│ GitHub Copilot                             [Minimizar]│
├─────────────────────────────────────────────────────┤
│                                                      │
│ Feature Assistant                                   │
│ 🔄 Analizando estructura del proyecto...           │
│                                                      │
│ ✅ Proyecto detectado: Playwright + Cucumber       │
│ ✅ Estructura POM encontrada: 3 pages              │
│ ✅ Hooks configurados: Before/After                │
│                                                      │
│ 📝 Generando feature file...                       │
│ ✅ tests/features/filter.feature creado           │
│                                                      │
│ 📝 Generando page object...                        │
│ ✅ tests/pages/FilterPage.ts creado               │
│                                                      │
│ 📝 Generando steps...                              │
│ ✅ tests/steps/filter.steps.ts creado             │
│                                                      │
│ 📝 Agregando script npm...                         │
│ ✅ package.json actualizado: "test:filter"        │
│                                                      │
│ ✅ Test generado exitosamente                      │
│ Ejecuta: npm run test:filter                       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Archivos creados en VS Code

```
tests/
├── features/
│   └── filter.feature ✨ [NUEVO]
│       ├── Feature: Filtrado de productos
│       ├── @smoke @filter
│       └── Scenario: Filtrar por categoría...
│
├── pages/
│   └── FilterPage.ts ✨ [NUEVO]
│       ├── export class FilterPage
│       ├── async goto()
│       ├── async selectCategory()
│       └── async validateResults()
│
└── steps/
    └── filter.steps.ts ✨ [NUEVO]
        ├── Given('el usuario está...')
        ├── When('selecciona...')
        └── Then('debería ver...')
```

---

## 🌐 Pantalla 2: Test ejecutándose en navegador

### Comando ejecutado

```bash
HEADLESS=false npm run test:filter
```

### Pantalla de Chromium abierta

```
┌─────────────────────────────────────────────────────┐
│ Proyecto3 [Chromium] ← ← → ⭐ 🔄                    │
├─────────────────────────────────────────────────────┤
│ https://physician-oxygen-literary-classroom.trycloudf│
├─────────────────────────────────────────────────────┤
│                                                      │
│ MercadoPrueba                          [🔍 Buscar] │
│ Crear Cuenta | Ingresar                            │
│                                                      │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Categorías ← [CLICK AQUÍ - Paso 1]            │ │
│ │  • Electrónica                                 │ │
│ │  • Ropa                                        │ │
│ │  • Hogar                                       │ │
│ └─────────────────────────────────────────────────┘ │
│                                                      │
│ [Productos mostrados aquí]                         │
│ 🔴 Filtro: Categoría "Electrónica" aplicado       │
│                                                      │
└─────────────────────────────────────────────────────┘

[Terminal con logs]
  ✔ Given el usuario está en la página principal
  ✔ When selecciona la categoría "Electrónica"
  ✔ Then debería ver solo productos de Electrónica
```

### Secuencia de ejecución (lo que ves)

```
Paso 1: Navegador abre
┌─────────────────────┐
│ Cargando...         │
│ [spinner girando]   │
└─────────────────────┘

Paso 2: Página carga
┌─────────────────────┐
│ MercadoPrueba       │
│ Crear Cuenta | ...  │
│ [fade in]           │
└─────────────────────┘

Paso 3: Hace clic en Categorías
┌─────────────────────┐
│ Categorías          │
│ [Menú desciende ↓]  │
│ • Electrónica       │
│ • Ropa              │
│ • Hogar             │
└─────────────────────┘

Paso 4: Selecciona "Electrónica"
┌─────────────────────┐
│ [Página actualiza]  │
│ Cargando...         │
│ [spinner girando]   │
└─────────────────────┘

Paso 5: Productos filtrados
┌─────────────────────┐
│ Productos          │
│ Laptop (✓ rango)   │
│ Monitor (✓ rango)  │
│ Mouse (✓ rango)    │
│ [Validación OK ✓]  │
└─────────────────────┘

Resultado:
✔ Test passed: 0m04.567s
```

---

## 🔍 Pantalla 3: Web Change Detector analizando cambios

### Paso 1: Invocas en Copilot

```
@web-change-detector
El test falló:
Error: Timeout waiting for locator
getByRole('button', { name: 'Categorías' })
```

### Lo que ves en Copilot

```
┌─────────────────────────────────────────────────────┐
│ GitHub Copilot                             [Minimizar]│
├─────────────────────────────────────────────────────┤
│                                                      │
│ Web Change Detector                                │
│ 🔄 Conectando a MercadoPrueba...                   │
│                                                      │
│ ✅ Navegador iniciado                              │
│ ✅ Página cargada                                  │
│ 📸 Tomando captura de estructura...                │
│                                                      │
│ 🔍 Analizando cambios:                             │
│                                                      │
│ ❌ Selector anterior:                              │
│    getByRole('button', { name: 'Categorías' })   │
│                                                      │
│ ✅ Nuevo selector encontrado:                      │
│    getByRole('link', { name: 'Categorías' })     │
│    (Cambio: <button> → <a>)                       │
│                                                      │
│ 📝 Actualizando FilterPage.ts...                   │
│ ✅ 1 selector actualizado                          │
│                                                      │
│ ✔ Validando cambios...                            │
│ ✅ Test pasa con nuevo selector                    │
│                                                      │
│ 📊 Generando reporte:                              │
│ ✅ .mcp/CHANGE-LOG.md actualizado                 │
│                                                      │
│ ✅ Cambios aplicados exitosamente                 │
│ Cambios:                                           │
│  • FilterPage.ts: 1 actualización                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Terminal mostrando los cambios

```bash
$ git diff tests/pages/FilterPage.ts

  async selectCategory(category: string) {
-   await this.page.getByRole('button', { name: category }).click();
+   await this.page.getByRole('link', { name: category }).click();
    await this.page.waitForLoadState('networkidle');
  }

Changes: 1 file changed, 1 insertion(+), 1 deletion(-)
```

---

## 📊 Pantalla 4: Reporte HTML generado

### Comando ejecutado

```bash
npm run test:all-report
```

### Navegador abierto automáticamente

```
┌─────────────────────────────────────────────────────────────┐
│ Reporte Playwright + Cucumber [↶][⟳] file:///.../index.html│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ╔═══════════════════════════════════════════════════════╗  │
│ ║                REPORTE DE AUTOMATIZACIÓN               ║  │
│ ║                                                        ║  │
│ ║  Duración: 2026-05-09T17:00:00Z                      ║  │
│ ║  Total: 45.2 segundos                                ║  │
│ ╚═══════════════════════════════════════════════════════╝  │
│                                                              │
│ ┌──────────────┬──────────────┬──────────────┐             │
│ │ ✅ PASSED    │ ❌ FAILED    │ ⏭️ SKIPPED   │             │
│ │   9/9 (100%)│   0/9 (0%)   │   0/9 (0%)   │             │
│ └──────────────┴──────────────┴──────────────┘             │
│                                                              │
│ RESULTADOS POR NAVEGADOR:                                 │
│                                                              │
│ 🌍 CHROMIUM                                               │
│ ├─ ✅ Scenario: Filtrar por categoría (0m04.123s)        │
│ ├─ ✅ Scenario: Buscar producto (0m03.456s)              │
│ └─ ✅ Scenario: Crear cuenta (0m05.234s)                 │
│                                                              │
│ 🌍 FIREFOX                                                │
│ ├─ ✅ Scenario: Filtrar por categoría (0m04.345s)        │
│ ├─ ✅ Scenario: Buscar producto (0m03.678s)              │
│ └─ ✅ Scenario: Crear cuenta (0m05.456s)                 │
│                                                              │
│ 🌍 WEBKIT (Safari)                                        │
│ ├─ ✅ Scenario: Filtrar por categoría (0m03.876s)        │
│ ├─ ✅ Scenario: Buscar producto (0m03.234s)              │
│ └─ ✅ Scenario: Crear cuenta (0m04.987s)                 │
│                                                              │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ 📈 Duración promedio por paso:                      │  │
│ │                                                     │  │
│ │ Given: 1.2s                                        │  │
│ │ When:  1.5s                                        │  │
│ │ Then:  0.8s                                        │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                              │
│ [Features ▼] [Scenarios ▼] [Steps ▼]                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Expandir un Feature

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│ Feature: Filtrado de productos                             │
│ ├─ @smoke @filter                                          │
│ │  └─ Scenario: Filtrar por categoría y precio            │
│ │     ├─ ⏱️ 4.123 segundos                                │
│ │     ├─ ✅ Given el usuario está en página principal    │
│ │     │  └─ ⏱️ 1.2s                                      │
│ │     ├─ ✅ When selecciona "Electrónica"                │
│ │     │  └─ ⏱️ 1.5s                                      │
│ │     ├─ ✅ And aplica rango "100 - 500"                 │
│ │     │  └─ ⏱️ 0.9s                                      │
│ │     ├─ ✅ And hace clic "Aplicar"                      │
│ │     │  └─ ⏱️ 0.4s                                      │
│ │     └─ ✅ Then debería ver productos en rango         │
│ │        └─ ⏱️ 0.1s                                      │
│ │                                                          │
│ └─ Scenario: Filtrar sin resultados                       │
│    └─ ⏱️ 2.3 segundos                                     │
│       ├─ ✅ Given ...                                     │
│       └─ ✅ Then ...                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Pantalla 5: Change Log actualizado

### Archivo `.mcp/CHANGE-LOG.md`

```markdown
# Historial de Cambios — MercadoPrueba

## 📊 Resumen
- Última inspección: 2026-05-09 17:00:00
- URL: https://physician-oxygen-literary-classroom.trycloudflare.com
- Título: MercadoPrueba

---

## 🔍 Primera inspección (2026-05-09 14:00:00)

Se creó el primer snapshot de MercadoPrueba.

### Elementos detectados:
- 5 Botones
- 3 Labels
- 2 Inputs
- 4 Headings

### Estructura completa:
```json
{
  "buttons": ["Crear Cuenta", "Ingresar", "Categorías", "Buscar", "Filtrar"],
  "labels": ["Email", "Contraseña", "Precio"],
  "inputs": ["search-box", "email-input"],
  "headings": ["MercadoPrueba", "Productos", "Categorías", "Filtros"]
}
```

---

## ⚠️ Cambios detectados (2026-05-09 17:00:00)

### 🚨 CAMBIOS CRÍTICOS

#### 1. Menú de Categorías restructurado
- ❌ Antes: `<button role="button">Categorías</button>`
- ✅ Ahora: `<a role="link">Categorías</a>`
- 🔧 Acción: Selector actualizado en FilterPage.ts
- ✅ Tests actualizados y pasando

#### 2. Nuevo elemento agregado: Filtro de rango
- ✨ Nuevo: `<input id="price-range" type="range" />`
- 🔧 Acción: Agregado a FilterPage.validatePriceRange()
- ✅ Método creado para validar rango

### 🟡 CAMBIOS MENORES

#### 3. Botón "Buscar" reposicionado
- 📍 Antes: Esquina superior derecha
- 📍 Ahora: Dentro del navbar
- ✨ No requiere cambios en tests (selector sigue siendo válido)

### 📋 RECOMENDACIONES

1. **Revisar estructura HTML completa**
   - Los cambios de `<button>` a `<a>` sugieren refactoring de componentes
   - Considerar auditar toda la navegación

2. **Validar diseño responsivo**
   - Repositionamiento del botón Buscar puede afectar mobile
   - Probar en diferentes tamaños de pantalla

3. **Documentar cambios en equipo**
   - Notificar a devs sobre cambios en elementos interactivos

---

## ✅ Estado actual

- Tests en Chromium: 3/3 ✅
- Tests en Firefox: 3/3 ✅
- Tests en WebKit: 3/3 ✅
- Total: 9/9 pasando ✅

---

**Generado automáticamente por Web Change Detector**
**Próxima inspección: Según configuración de monitoreo**
```

---

## 🎯 Pantalla 6: Git mostrando cambios

### Terminal con git diff

```bash
$ git diff

diff --git a/tests/pages/FilterPage.ts b/tests/pages/FilterPage.ts
index 1234567..abcdefg 100644
--- a/tests/pages/FilterPage.ts
+++ b/tests/pages/FilterPage.ts
@@ -10,7 +10,7 @@ export class FilterPage {
   async selectCategory(category: string) {
-    await this.page.getByRole('button', { name: category }).click();
+    await this.page.getByRole('link', { name: category }).click();
     await this.page.waitForLoadState('networkidle');
   }
```

### Commit de cambios

```bash
$ git add .
$ git commit -m "fix: actualizar selectores de categoría (detectado por Web Change Detector)"
$ git log --oneline -5

a1b2c3d fix: actualizar selectores de categoría
4d5e6f7 feat: agregar test de filtrado
8g9h0i1 feat: agregar Feature Assistant agent
jk2l3m4 feat: setup inicial proyecto
op5q6r7 initial commit
```

---

## 📋 Resumen visual

### De inicio a fin

```
INICIO
  ↓
npm install, npx playwright install --with-deps
  ↓
npm test (✔ 2 passed)
  ↓
@feature-assistant "necesito test de filtrado"
  ↓
✨ VISUAL: Copilot genera archivos automáticamente
  ↓
npm run test:filter (✔ 1 passed)
  ↓
HEADLESS=false npm run test:filter
  ↓
🌐 VISUAL: Navegador ejecuta test, ves cada paso
  ↓
npm run monitor:changes
  ↓
✅ Snapshot guardado, change log creado
  ↓
[MercadoPrueba cambia en producción]
  ↓
npm run test:filter (❌ FALLA)
  ↓
@web-change-detector "El test falló porque..."
  ↓
✨ VISUAL: Copilot actualiza selectores automáticamente
  ↓
✅ git diff muestra cambios
  ↓
npm run test:filter (✔ 1 passed)
  ↓
npm run test:all-report
  ↓
📊 VISUAL: Navegador abre reporte HTML bonito
  ↓
git add . && git commit -m "fix: ..."
  ↓
✅ COMPLETO
```

---

## 🎯 Cheat Sheet: Lo que esperar ver

| Paso | Comando | ¿Qué ves? |
|------|---------|----------|
| 1 | `@feature-assistant` | Copilot genera feature, page, steps ✨ |
| 2 | `npm run test:X` | Terminal: ✔ 1 passed ✔ |
| 3 | `HEADLESS=false npm test` | Navegador abierto ejecutando pasos 🌐 |
| 4 | `npm run monitor:changes` | `.mcp/CHANGE-LOG.md` creado 📝 |
| 5 | `@web-change-detector` | Copilot actualiza selectores ✨ |
| 6 | `git diff` | Terminal: cambios en rojo/verde 🎨 |
| 7 | `npm run test:all-report` | Navegador: reporte HTML bonito 📊 |

---

**Próxima paso:** [WORKFLOW.md](WORKFLOW.md) para flujo completo  
**Tiempo total:** ~30 minutos de inicio a fin
