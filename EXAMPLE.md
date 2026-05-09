# 📚 Ejemplo Real — Usando Agentes en Proyecto3

Este archivo muestra un **ejemplo real paso a paso** de cómo los agentes generan y actualizan tests.

---

## Escenario: Crear test de Filtrado de Productos

### Paso 1: Invoke Feature Assistant

**En Copilot Chat:**
```
@feature-assistant Necesito un test que valide el flujo de filtrado en MercadoPrueba:

1. Usuario entra a la página
2. Hace clic en "Electrónica" en el menú de categorías
3. Selecciona el rango de precio "100 - 500"
4. Hace clic en "Aplicar filtros"
5. Valida que los productos mostrados están en ese rango
```

### Paso 2: Feature Assistant genera (automáticamente)

#### Archivo generado: `tests/features/filters.feature`

```gherkin
Feature: Filtrado de productos por categoría y precio

  @smoke @filters
  Scenario: Filtrar productos por categoría y rango de precio
    Given el usuario está en la página principal de MercadoPrueba
    When selecciona la categoría "Electrónica"
    And aplica el filtro de rango de precio "100 - 500"
    And hace clic en "Aplicar filtros"
    Then debería ver solo productos dentro del rango de precio
    And debería ver el filtro aplicado en la barra lateral
```

#### Archivo generado: `tests/pages/FilterPage.ts`

```typescript
import { Page, expect } from '@playwright/test';

export class FilterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://physician-oxygen-literary-classroom.trycloudflare.com');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectCategory(category: string) {
    // Usa getByRole para robustez
    await this.page.getByRole('button', { name: category }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async setPriceRange(range: string) {
    // Busca el input de rango
    const [min, max] = range.split(' - ').map(p => p.trim());
    await this.page.getByLabel('Precio mínimo').fill(min);
    await this.page.getByLabel('Precio máximo').fill(max);
  }

  async applyFilters() {
    await this.page.getByRole('button', { name: 'Aplicar filtros' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async validatePriceRange(minPrice: number, maxPrice: number) {
    // Verifica que todos los productos estén en el rango
    const prices = await this.page
      .locator('[data-testid="product-price"]')
      .allTextContents();

    for (const priceText of prices) {
      const price = parseInt(priceText.replace(/[^0-9]/g, ''));
      await expect(price).toBeGreaterThanOrEqual(minPrice);
      await expect(price).toBeLessThanOrEqual(maxPrice);
    }
  }

  async validateFilterApplied(filterName: string) {
    await expect(
      this.page.getByText(filterName, { exact: true })
    ).toBeVisible();
  }
}
```

#### Archivo generado: `tests/steps/filters.steps.ts`

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { FilterPage } from '../pages/FilterPage';

Given('el usuario está en la página principal de MercadoPrueba', async function () {
  this.filterPage = new FilterPage(this.page);
  await this.filterPage.goto();
});

When('selecciona la categoría {string}', async function (category: string) {
  await this.filterPage.selectCategory(category);
});

When('aplica el filtro de rango de precio {string}', async function (range: string) {
  await this.filterPage.setPriceRange(range);
});

When('hace clic en {string}', async function (buttonText: string) {
  await this.filterPage.applyFilters();
});

Then('debería ver solo productos dentro del rango de precio', async function () {
  await this.filterPage.validatePriceRange(100, 500);
});

Then('debería ver el filtro aplicado en la barra lateral', async function () {
  await this.filterPage.validateFilterApplied('100 - 500');
});
```

#### Script agregado a `package.json`

```json
{
  "scripts": {
    ...
    "test:filters": "TAGS='@filters' cucumber-js --config cucumber.js"
  }
}
```

### Paso 3: Ejecutar el test

```bash
npm run test:filters
```

**Con navegador visible:**
```bash
HEADLESS=false npm run test:filters
```

**Resultado:**
```
✔ Scenario: Filtrar productos por categoría y rango de precio
0m04.123s (executing steps: 0m04.115s)

1 scenario (1 passed)
```

---

## Escenario 2: MercadoPrueba cambió el diseño

### Paso 1: El test falla

Ejecutas:
```bash
npm run test:filters
```

Resultado:
```
✖ When selecciona la categoría "Electrónica"
  Error: Timeout waiting for locator
  getByRole('button', { name: 'Electrónica' })

  Call log:
    - waiting for locator...
```

### Paso 2: Invoca Web Change Detector

**En Copilot Chat:**
```
@web-change-detector
El test "Filtrar productos" falló:
Error: Timeout waiting for locator
getByRole('button', { name: 'Electrónica' })

MercadoPrueba probablemente cambió el menú de categorías.
Actualiza los selectores automáticamente.
```

### Paso 3: Web Change Detector trabaja

El agente:

1. **Inspecciona MercadoPrueba:**
   ```
   ✓ Conectando a https://physician-oxygen-literary-classroom.trycloudflare.com
   ✓ Extrayendo estructura HTML...
   
   Botones encontrados:
   - Crear cuenta
   - Ingresar
   - Categorías ← (nuevo nombre)
   - Filtros
   - Buscar
   ```

2. **Detecta el cambio:**
   ```
   ❌ Selector antiguo: getByRole('button', { name: 'Electrónica' })
   ✅ Nuevo selector: getByRole('link', { name: 'Electrónica' })
   ⚠️ El botón cambió de <button> a <a>
   ```

3. **Actualiza `FilterPage.ts`:**
   
   **Antes:**
   ```typescript
   async selectCategory(category: string) {
     await this.page.getByRole('button', { name: category }).click();
   }
   ```

   **Después:**
   ```typescript
   async selectCategory(category: string) {
     // Actualizado: Cambió de <button> a <link>
     await this.page.getByRole('link', { name: category }).click();
   }
   ```

4. **Valida los cambios:**
   ```bash
   npm run test:filters
   ```
   
   ```
   ✔ Scenario: Filtrar productos por categoría y rango de precio
   0m04.089s
   ```

5. **Genera reporte:**
   ```
   ✅ Cambios detectados y aplicados
   ✅ Tests validados y pasando
   ✅ Reporte guardado en .mcp/CHANGE-LOG.md
   ```

### Paso 4: Ver los cambios

**En terminal:**
```bash
git diff tests/pages/FilterPage.ts
```

**Resultado:**
```diff
   async selectCategory(category: string) {
-    await this.page.getByRole('button', { name: category }).click();
+    await this.page.getByRole('link', { name: category }).click();
     await this.page.waitForLoadState('networkidle');
   }
```

**En `.mcp/CHANGE-LOG.md`:**
```markdown
# Historial de Cambios en MercadoPrueba

## Cambios detectados: 2026-05-09 16:45:00

### FilterPage.ts
- ❌ Selector antiguo: getByRole('button', { name: 'Electrónica' })
- ✅ Nuevo selector: getByRole('link', { name: 'Electrónica' })
- 🔍 Cambio: <button> → <a> (elemento HTML diferente)
- ✅ Test actualizado y pasando

### BUTTONS_CHANGED
- Detectado: Menú de categorías restructurado
- Recomendación: Revisar si hay más cambios en estilos o estructura
```

---

## Ver resultados en HTML

### Generar reporte multi-navegador

```bash
npm run test:all-report
```

**Proceso:**
```
✓ Ejecutando tests en Chromium...      (3 escenarios)
✓ Ejecutando tests en Firefox...       (3 escenarios)
✓ Ejecutando tests en WebKit...        (3 escenarios)
✓ Generando reporte HTML...
✓ Abriendo en navegador...
```

**Reporte generado: `reports/html-report/index.html`**

### Contenido del reporte

**Vista de Resumen:**
```
┌────────────────────────────────────┐
│ Reporte Playwright + Cucumber     │
│ Reporte Automatización             │
├────────────────────────────────────┤
│ Fecha: 2026-05-09 17:00:00        │
│ Duración total: 45.2s             │
│                                    │
│ Resultados:                        │
│ ✅ 9 passed   ❌ 0 failed  ⏭️ 0 skipped
│                                    │
│ Por navegador:                     │
│ • Chromium:  3 passed             │
│ • Firefox:   3 passed             │
│ • WebKit:    3 passed             │
└────────────────────────────────────┘
```

**Vista de Escenarios:**
```
Feature: Filtrado de productos

  ✅ Scenario: Filtrar por categoría y precio (Chromium)
     ⏱ 4.12s
     ✔ Given el usuario está en la página principal
     ✔ When selecciona la categoría "Electrónica"
     ✔ And aplica el filtro de rango de precio "100 - 500"
     ✔ And hace clic en "Aplicar filtros"
     ✔ Then debería ver solo productos dentro del rango

  ✅ Scenario: Filtrar por categoría y precio (Firefox)
     ⏱ 4.45s
     ✔ Given el usuario está en la página principal
     ...

  ✅ Scenario: Filtrar por categoría y precio (WebKit)
     ⏱ 3.89s
     ...
```

---

## Workflow completo: Antes → Después

### Estado inicial

```
tests/pages/FilterPage.ts (original)
├── selectCategory() → getByRole('button', ...)
├── setPriceRange() → working ✅
├── applyFilters() → working ✅
└── validatePriceRange() → working ✅

npm test
✔ 1 passed
```

### Cambio en MercadoPrueba

```
MercadoPrueba actualizado:
├── Menú de categorías ahora son <a> (links) en lugar de <button>
├── Estructura CSS cambió
└── selectCategory() no encuentra el elemento ❌
```

### Con Web Change Detector

```
npm run test:filters
❌ FALLA: selectCategory() timeout

@web-change-detector [activado]

✓ Inspecciona MercadoPrueba
✓ Detecta: <button> → <a>
✓ Propone: getByRole('link', ...)
✓ Actualiza: FilterPage.ts
✓ Valida: npm test
✔ PASA nuevamente ✅

npm run test:all-report
✔ 9 escenarios en 3 navegadores (27 total)
```

### Resultado final

```
tests/pages/FilterPage.ts (actualizado)
├── selectCategory() → getByRole('link', ...) ✅ ACTUALIZADO
├── setPriceRange() → working ✅
├── applyFilters() → working ✅
└── validatePriceRange() → working ✅

.mcp/CHANGE-LOG.md (documentado)
├── Cambio detectado: 2026-05-09 16:45:00
├── FilterPage.ts actualizado
├── Selector anterior: getByRole('button', ...)
└── Selector nuevo: getByRole('link', ...)

npm test
✔ 1 passed (con selectores actualizados)
```

---

## Comparación: Manual vs Con Agentes

### Flujo manual (sin agentes)

```
1. Escribes feature a mano
2. Escribes page object a mano
3. Escribes steps a mano
4. Ejecutas
5. Falla por cambio en web
6. Debugeas manualmente
7. Buscas los selectores nuevos
8. Actualizas el código
9. Ejecutas de nuevo
⏱️ TIEMPO: 30-45 minutos
```

### Flujo con agentes (Feature Assistant + Web Change Detector)

```
1. @feature-assistant [genera todo automáticamente]
   ✅ Feature
   ✅ Page Object
   ✅ Steps
2. Ejecutas
3. Falla por cambio en web
4. @web-change-detector [detecta y actualiza automáticamente]
   ✅ Analiza web
   ✅ Propone selectores
   ✅ Actualiza código
   ✅ Valida tests
⏱️ TIEMPO: 2-3 minutos
```

**Ganancia:** 15x más rápido ⚡

---

## Comandos usados en este ejemplo

```bash
# Crear test
@feature-assistant en Copilot

# Ejecutar
npm run test:filters
HEADLESS=false npm run test:filters

# Cuando falla
@web-change-detector en Copilot

# Ver cambios
git diff tests/pages/FilterPage.ts
cat .mcp/CHANGE-LOG.md

# Reporte final
npm run test:all-report
open reports/html-report/index.html
```

---

## Próximas acciones

- ✅ Crear más tests con `@feature-assistant`
- ✅ Ejecutar `npm run monitor:changes` periódicamente
- ✅ Usar `@web-change-detector` cuando algo falle
- ✅ Revisar reportes en `reports/html-report/`
- ✅ Documentar cambios en `.mcp/CHANGE-LOG.md`
- ✅ Hacer commit de cambios a git

---

**Archivo de referencia:** WORKFLOW.md  
**Más detalles:** README.md, QUICK-START.md
