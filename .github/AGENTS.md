---
name: agents-config
description: "Configuración central de agentes personalizados para Proyecto3"
---

# Agentes Personalizados — Configuración

Este archivo registra los agentes personalizados disponibles para el proyecto Proyecto3.

## Agentes disponibles

### 1. 🎯 Feature Assistant

**Ubicación:** `.github/agents/feature-assistant.agent.md`

**Propósito:** Generar features Gherkin, Page Objects y step definitions de forma consistente.

**Cuándo usarlo:**
```
@feature-assistant Necesito crear un test para...
@feature-assistant Genera un nuevo escenario que valide...
```

**Entrega:**
- ✅ Feature en `tests/features/`
- ✅ Page Object en `tests/pages/`
- ✅ Steps en `tests/steps/`
- ✅ Script en `package.json` (opcional)

---

### 2. 🔍 Web Change Detector

**Ubicación:** `.github/agents/web-change-detector.agent.md`

**Propósito:** Detectar cambios en MercadoPrueba y actualizar tests automáticamente.

**Cuándo usarlo:**
```
@web-change-detector El test falló con timeout en selector '#username'
@web-change-detector Detecta cambios en https://physician-oxygen-literary-classroom.trycloudflare.com
```

**Entrega:**
- ✅ Análisis del error
- ✅ Nuevo selector propuesto
- ✅ Page Object actualizado
- ✅ Tests validados
- ✅ Reporte de cambios

---

## Instrucciones aplicables

### Convenciones BDD

**Archivo:** `.github/instructions/playwright-bdd-conventions.instructions.md`

**Aplica a:** Todos los archivos en `tests/`

**Contiene:**
- Convenciones de nombres
- Patrones de código
- Mejores prácticas
- Checklist pre-commit

---

## Configuración MCP

**Ubicación:** `.mcp/`

**Archivos:**
- `config.json` — Configuración del servidor MCP
- `playwright-mcp-server.js` — Servidor Node que inspecciona Playwright

**Métodos disponibles:**
- `inspectPage()` — Extrae estructura HTML de MercadoPrueba
- `findElement(text)` — Busca elementos por texto
- `detectChanges(previousState)` — Compara estado anterior con actual
- `analyzeError(selector, error)` — Propone selectores válidos
- `generateReport()` — Genera reporte de cambios

---

## Cómo usar los agentes

### Crear un nuevo test

```bash
# 1. En Copilot chat, escribe:
@feature-assistant Necesito crear un test que valide el flujo de checkout

# 2. El agente genera:
#    - tests/features/checkout.feature
#    - tests/pages/CheckoutPage.ts
#    - tests/steps/checkout.steps.ts

# 3. Ejecuta el test:
npm run test:checkout
```

### Actualizar test por cambio de web

```bash
# 1. Ejecutas tests y ves que falla:
npm test

# 2. En Copilot chat:
@web-change-detector 
El test "Login exitoso" falló con:
Error: Timeout waiting for locator('#username')

# 3. El agente:
#    - Inspecciona MercadoPrueba
#    - Encuentra el nuevo selector: input[type="email"]
#    - Actualiza LoginPage.ts
#    - Valida que tests pasen
#    - Genera reporte de cambios

# 4. Verifica los cambios:
git diff tests/pages/LoginPage.ts
```

---

## Flujo recomendado

```mermaid
graph TD
    A["Necesito un nuevo test"] -->|@feature-assistant| B["Genera Feature + POM + Steps"]
    B --> C["Ejecuto: npm test"]
    C -->|✅ Pasa| D["Commit a main"]
    C -->|❌ Falla por cambios web| E["@web-change-detector"]
    E --> F["Detecta y actualiza selectors"]
    F --> C
```

---

## Stack actual

| Componente | Versión | Rol |
|-----------|---------|-----|
| **Playwright** | ^1.59.1 | Automatización del navegador |
| **Cucumber** | ^12.8.3 | Motor BDD (Gherkin → TS) |
| **TypeScript** | ^6.0.3 | Tipado estático |
| **MCP** | Config local | Inspección de web en tiempo real |
| **Custom Agents** | 2 agentes | Generación + Monitoreo |

---

## Próximos pasos

- [ ] Ejecutar `npm run test:all-report` para validar setup
- [ ] Usar `@feature-assistant` para crear primer test personalizado
- [ ] Configurar GitHub Actions con agentes (`.github/workflows/playwright.yml`)
- [ ] Documentar cambios detectados en `.change-log.md`
