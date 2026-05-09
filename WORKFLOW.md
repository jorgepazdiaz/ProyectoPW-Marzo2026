# 📖 Guía de uso — Workflow Práctico con Agentes IA

Esta guía muestra cómo usar Proyecto3 para automatizar tests en MercadoPrueba y detectar cambios con agentes IA.

**URL bajo prueba:** `https://physician-oxygen-literary-classroom.trycloudflare.com`

---

## 1️⃣ Fase inicial: Preparar el proyecto

### Paso 1: Instalar dependencias

```bash
cd Proyecto3
npm install
```

**¿Qué instala?**
- Playwright (navegador automático)
- Cucumber (framework BDD)
- TypeScript (tipado)
- Generador de reportes

### Paso 2: Instalar navegadores Playwright

```bash
npx playwright install --with-deps
```

**¿Qué hace?**
- Descarga Chromium, Firefox, WebKit
- Instala dependencias del SO (librerías necesarias)

### Paso 3: Verificar que todo funciona

```bash
npm test
```

**Resultado esperado:**
```
✔ 2 scenarios (2 passed)
0m05.234s
```

✅ Si pasa, el proyecto está listo.

---

## 2️⃣ Crear un nuevo test con Feature Assistant

### Paso 1: Abre Copilot en VS Code

Presiona `Cmd+K` en macOS o `Ctrl+Shift+X` en Windows, luego busca "Copilot Chat".

### Paso 2: Invoca el agente Feature Assistant

Escribe en el chat de Copilot:

```
@feature-assistant Necesito crear un test que valide que un usuario 
puede buscar productos en la barra de búsqueda de MercadoPrueba.

El flujo sería:
1. Navega a la página principal
2. Hace clic en la barra de búsqueda
3. Ingresa un término (ej: "laptop")
4. Presiona Enter o click en buscar
5. Valida que aparecen resultados de búsqueda
```

### Paso 3: El agente genera automáticamente

Espera 10-20 segundos. El agente:

1. ✅ Crea `tests/features/search.feature`
   ```gherkin
   Feature: Búsqueda de productos
     @smoke @search
     Scenario: Buscar producto exitosamente
       Given el usuario está en la página principal
       When ingresa "laptop" en la barra de búsqueda
       And presiona Enter
       Then debería ver resultados de búsqueda
   ```

2. ✅ Crea `tests/pages/SearchPage.ts`
   ```typescript
   export class SearchPage {
     async goto() { ... }
     async searchProduct(term: string) { ... }
     async validateResults() { ... }
   }
   ```

3. ✅ Crea `tests/steps/search.steps.ts`
   ```typescript
   Given('el usuario está en la página principal', async function() { ... })
   When('ingresa {string} en la barra...', async function(term) { ... })
   Then('debería ver resultados...', async function() { ... })
   ```

4. ✅ Agrega script a `package.json`
   ```json
   "test:search": "TAGS='@search' cucumber-js --config cucumber.js"
   ```

### Paso 4: Ejecuta el test nuevo

```bash
npm run test:search
```

**Resultado esperado:**
```
✔ Scenario: Buscar producto exitosamente
0m03.456s
```

🎉 **Tu primer test con Feature Assistant funciona!**

---

## 3️⃣ Entender la estructura generada

### Feature (`tests/features/search.feature`)

```gherkin
# ¿QUÉ? Describe lo que hace el test en lenguaje natural
Feature: Búsqueda de productos

  @smoke @search
  Scenario: Buscar producto exitosamente
    Given el usuario está en la página principal      # CONTEXTO inicial
    When ingresa "laptop" en la barra de búsqueda     # ACCIÓN principal
    And presiona Enter                                 # ACCIÓN adicional
    Then debería ver resultados de búsqueda           # RESULTADO esperado
```

### Page Object (`tests/pages/SearchPage.ts`)

```typescript
// ¿CÓMO? Encapsula interacciones con la UI
export class SearchPage {
  constructor(private page: Page) {}

  async goto() {
    // Navega a MercadoPrueba
    await this.page.goto('https://...');
  }

  async searchProduct(term: string) {
    // Busca selectores robustos (getByRole, getByLabel, etc.)
    await this.page.getByRole('textbox', { name: 'Buscar' }).fill(term);
    await this.page.getByRole('button', { name: 'Buscar' }).click();
  }

  async validateResults() {
    // Usa Playwright assertions
    await expect(this.page.getByText(/resultados/i)).toBeVisible();
  }
}
```

### Steps (`tests/steps/search.steps.ts`)

```typescript
// ¿CÓMO CONECTA? Une features con page objects
Given('el usuario está en la página principal', async function () {
  this.searchPage = new SearchPage(this.page);  // Crea instancia
  await this.searchPage.goto();                  // Ejecuta método
});

When('ingresa {string} en la barra de búsqueda', async function (term) {
  await this.searchPage.searchProduct(term);     // Pasa parámetros
});

Then('debería ver resultados de búsqueda', async function () {
  await this.searchPage.validateResults();       // Valida resultado
});
```

---

## 4️⃣ Ver lo que hace el test en tiempo real

### Opción A: Modo navegador visible

```bash
HEADLESS=false npm run test:search
```

**¿Qué pasa?**
- Se abre el navegador Chromium
- Ves en tiempo real cada paso del test
- El navegador se cierra automáticamente al terminar

**Útil para:**
- Entender qué hace el test
- Debugear si algo falla
- Ver selectores en acción

### Opción B: Screenshot en caso de error

Modifica `SearchPage.ts` para capturar pantalla:

```typescript
async validateResults() {
  try {
    await expect(this.page.getByText(/resultados/i)).toBeVisible();
  } catch (error) {
    await this.page.screenshot({ path: 'error-search.png' });
    throw error;
  }
}
```

Si falla, encontrarás `error-search.png` en la raíz.

---

## 5️⃣ Fase de monitoreo: Detectar cambios en MercadoPrueba

### Paso 1: Ejecutar el monitor de cambios

```bash
npm run monitor:changes
```

**¿Qué hace?**
1. Se conecta a MercadoPrueba
2. Extrae estructura HTML (botones, inputs, labels)
3. La compara con el snapshot anterior
4. Detecta elementos nuevos/eliminados
5. Genera reporte en `.mcp/CHANGE-LOG.md`

**Resultado esperado:**
```
🔍 Iniciando monitoreo de cambios en MercadoPrueba...

✓ Snapshot guardado: .mcp/last-snapshot.json
✓ Change log actualizado: .mcp/CHANGE-LOG.md

# Reporte de Cambios — 2026-05-09 15:30:00

URL: https://physician-oxygen-literary-classroom.trycloudflare.com
Título: Ingresar | MercadoPrueba

## 🔍 Primera inspección

Se creó el primer snapshot de MercadoPrueba.

### Elementos detectados:
- Botones: 5
- Labels: 3
- Inputs: 2
- Headings: 4
```

### Paso 2: Ver el change log

```bash
cat .mcp/CHANGE-LOG.md
```

O abre en editor: `.mcp/CHANGE-LOG.md`

---

## 6️⃣ Cuando MercadoPrueba cambia: Usar Web Change Detector

### Scenario: El test falla por cambios en la web

Ejecutas:
```bash
npm run test:search
```

Y ves error:
```
✖ When ingresa "laptop" en la barra de búsqueda
  Error: Timeout waiting for locator 
  getByRole('textbox', { name: 'Buscar' })
```

### Paso 1: Invoca Web Change Detector en Copilot

```
@web-change-detector
El test "Buscar producto" falló con:
Error: Timeout waiting for locator
getByRole('textbox', { name: 'Buscar' })

Analiza MercadoPrueba y actualiza los selectores.
```

### Paso 2: El agente:

1. ✅ Inspecciona MercadoPrueba en tiempo real
2. ✅ Descubre que el campo de búsqueda ahora tiene id="search-input"
3. ✅ Actualiza `SearchPage.ts`:

   **Antes:**
   ```typescript
   await this.page.getByRole('textbox', { name: 'Buscar' }).fill(term);
   ```

   **Después:**
   ```typescript
   await this.page.locator('#search-input').fill(term);
   ```

4. ✅ Ejecuta los tests para validar
5. ✅ Genera reporte de cambios

### Paso 3: Verificar los cambios

```bash
git diff tests/pages/SearchPage.ts
```

Ver exactamente qué cambió:
```diff
- await this.page.getByRole('textbox', { name: 'Buscar' }).fill(term);
+ await this.page.locator('#search-input').fill(term);
```

### Paso 4: Ejecutar test nuevamente

```bash
npm run test:search
```

✅ Ahora debería pasar con los selectores actualizados.

---

## 7️⃣ Ver los cambios en reportes

### Generar reporte HTML multi-navegador

```bash
npm run test:all-report
```

**¿Qué hace?**
1. Ejecuta tests en Chromium ✅
2. Ejecuta tests en Firefox ✅
3. Ejecuta tests en WebKit (Safari) ✅
4. Genera reporte HTML unificado
5. Abre automáticamente en navegador

**Duración aproximada:** 10-15 segundos

### Ver reporte manualmente

```bash
open reports/html-report/index.html
```

**El reporte muestra:**
- ✅ Escenarios pasados/fallidos por navegador
- ⏱️ Duración de cada paso
- 📊 Gráficos de resultados
- 🌍 Tests por navegador (Chromium, Firefox, WebKit)
- 🛠️ Metadata del entorno

---

## 8️⃣ Workflow completo: De inicio a fin

```
┌─────────────────────────────────────┐
│ 1. CREAR TEST                       │
│ @feature-assistant Necesito un test │
│ para validar búsqueda...            │
└──────────────┬──────────────────────┘
               │
        ✅ Genera automáticamente:
        ├── Feature (Gherkin)
        ├── Page Object
        ├── Steps
        └── Script npm
               │
┌──────────────▼──────────────────────┐
│ 2. EJECUTAR TEST                    │
│ npm run test:search                 │
└──────────────┬──────────────────────┘
               │
        ✅ Conecta a MercadoPrueba
        ├── Abre navegador
        ├── Ejecuta pasos
        └── Valida resultados
               │
┌──────────────▼──────────────────────┐
│ 3. MONITOREAR CAMBIOS               │
│ npm run monitor:changes             │
└──────────────┬──────────────────────┘
               │
        ✅ Detecta cambios en web
        ├── Compara estructura actual
        ├── Identifica nuevos elementos
        └── Genera CHANGE-LOG.md
               │
        ┌─────▼─────────────────┐
        │ ¿Cambios detectados?  │
        └─────┬───────────┬─────┘
          NO ✅│           │ SÍ ⚠️
              │           │
              │    ┌──────▼──────────────┐
              │    │ 4. ACTUALIZAR TESTS │
              │    │ @web-change-detector│
              │    │ El test falló...    │
              │    └──────┬──────────────┘
              │           │
              │    ✅ Analiza web
              │    ├── Encuentra nuevo selector
              │    ├── Actualiza Page Object
              │    ├── Valida tests
              │    └── Genera reporte
              │           │
┌─────────────▼───────────▼─────────────────┐
│ 5. VER RESULTADOS                         │
│ npm run test:all-report                   │
│ open reports/html-report/index.html       │
└───────────────────────────────────────────┘
       │
    ✅ Reporte HTML con:
    ├── Todos los navegadores
    ├── Duración de pasos
    ├── Gráficos de resultados
    └── Metadata del entorno
```

---

## 9️⃣ Comparar estado antes y después

### Antes (tests en MercadoPrueba original)

```bash
npm test
# ✔ 2 scenarios (2 passed)
```

### Después (con cambios detectados)

```bash
npm run test:search
# ✔ Scenario: Buscar producto exitosamente
# (actualizado automáticamente por web-change-detector)

npm run test:all-report
# ✔ Chromium: 1 passed
# ✔ Firefox: 1 passed
# ✔ WebKit: 1 passed
# 📊 Reporte disponible en reports/html-report/
```

### Cambios documentados

```bash
cat .mcp/CHANGE-LOG.md
```

Muestra:
```markdown
# Historial de Cambios en MercadoPrueba

## Cambios detectados: 2026-05-09

### SearchPage.ts
- ❌ Selector antiguo: getByRole('textbox', { name: 'Buscar' })
- ✅ Nuevo selector: locator('#search-input')
- ✅ Test actualizado y pasando

### Elementos nuevos
- ✅ Botón "Filtrar" agregado
- ✅ Campo de "Categoría" agregado
```

---

## 🔟 Tips y buenas prácticas

### ✅ Usar Feature Assistant para:
- Crear tests nuevos desde cero
- Mantener consistencia en Gherkin
- Generar Page Objects bien estructurados
- Asegurar tipado TypeScript

### ✅ Usar Web Change Detector para:
- Actualizar selectores rápidamente
- No perder tests por cambios de web
- Generar documentación de cambios
- Mantener sincronización web ↔ tests

### ✅ Ejecutar tests:
- **Local:** `npm test` (solo verificación)
- **Con reporte:** `npm run test:all-report` (HTML visual)
- **Monitoreo:** `npm run monitor:changes` (periódico)

### ✅ Ver cambios:
- En la web: Abre MercadoPrueba manualmente
- En los tests: `git diff tests/`
- En el reporte: `reports/html-report/index.html`
- En el log: `.mcp/CHANGE-LOG.md`

---

## 📋 Checklist: Tu primer workflow completo

- [ ] Instalar `npm install`
- [ ] Instalar navegadores `npx playwright install --with-deps`
- [ ] Verificar tests `npm test`
- [ ] Crear test con `@feature-assistant` en Copilot
- [ ] Ejecutar `npm run test:search`
- [ ] Ejecutar `npm run monitor:changes` (crear snapshot)
- [ ] Ejecutar `npm run test:all-report` para ver HTML
- [ ] Revisar `reports/html-report/index.html`
- [ ] Simular cambio en MercadoPrueba (opcional)
- [ ] Usar `@web-change-detector` si falla
- [ ] Ver cambios en `.mcp/CHANGE-LOG.md`

---

## 🎓 Referencias

| Recurso | Ubicación |
|---------|-----------|
| Documentación completa | [README.md](README.md) |
| Inicio rápido | [QUICK-START.md](QUICK-START.md) |
| Guía de agentes | [.github/AGENTS.md](.github/AGENTS.md) |
| Convenciones BDD | [.github/instructions/playwright-bdd-conventions.instructions.md](.github/instructions/playwright-bdd-conventions.instructions.md) |
| Este archivo | WORKFLOW.md |

---

**Última actualización:** 2026-05-09  
**Versión:** Proyecto3 v1.0.0
