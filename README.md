# Proyecto3 — Playwright + Cucumber BDD

Automatización de pruebas E2E para **MercadoPrueba** usando [Playwright](https://playwright.dev/) + [Cucumber](https://cucumber.io/) en TypeScript con patrón **Page Object Model (POM)** y reportes HTML multi-navegador.

**URL bajo prueba:** `https://physician-oxygen-literary-classroom.trycloudflare.com`

---

## Estructura del proyecto

```
Proyecto3/
│
├── .github/
│   └── workflows/
│       └── playwright.yml        # Pipeline de CI/CD para GitHub Actions
│
├── tests/
│   ├── features/
│   │   └── login.feature         # Escenarios BDD en lenguaje Gherkin (@smoke, @login)
│   │
│   ├── steps/
│   │   ├── crear.steps.ts        # Steps de creación de cuenta
│   │   └── login.steps.ts        # Steps de login (legacy)
│   │
│   ├── pages/
│   │   ├── CrearPage.ts          # Page Object Model para crear cuenta
│   │   └── LoginPage.ts          # Page Object Model para login
│   │
│   ├── hooks/
│   │   └── hooks.ts              # Hooks globales de Cucumber (Before/After, timeout: 60s)
│   │
│   ├── support/
│   │   └── world.ts              # Contexto compartido entre steps (CustomWorld)
│   │
│   └── data/
│       └── users.json            # Datos de prueba (credenciales, etc.)
│
├── reports/
│   ├── cucumber-report.json      # Reporte generado en formato JSON
│   └── html-report/              # Reporte generado en formato HTML
│
├── .gitignore
├── cucumber.js                   # Configuración de Cucumber
├── package.json                  # Dependencias y scripts del proyecto
├── package-lock.json
├── playwright.config.ts          # Configuración global de Playwright
├── tsconfig.json                 # Configuración de TypeScript
└── README.md
```

---

## Tabla de contenidos

1. [Requisitos previos](#1-requisitos-previos)
2. [Instalación paso a paso](#2-instalación-paso-a-paso)
3. [Estructura del proyecto](#3-estructura-del-proyecto)
4. [Archivos de configuración](#4-archivos-de-configuración)
   - [package.json](#41-packagejson)
   - [tsconfig.json](#42-tsconfigjson)
   - [cucumber.js](#43-cucumberjs)
   - [world.ts](#44-worldts)
   - [hooks.ts](#45-hooksts)
   - [generate-report.js](#46-generate-reportjs)
   - [playwright.yml (CI/CD)](#47-playwrightyml-cicd)
5. [Cómo ejecutar los tests](#5-cómo-ejecutar-los-tests)
6. [Cómo agregar nuevos tests](#6-cómo-agregar-nuevos-tests)
7. [Escenarios actuales](#7-escenarios-actuales)
8. [Generación de reportes](#8-generación-de-reportes)
9. [Agentes personalizados](#9-agentes-personalizados)
10. [Configuración MCP (Model Context Protocol)](#10-configuración-mcp)

---

## 1. Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

| Herramienta | Versión mínima | Verificación            |
|-------------|---------------|-------------------------|
| Node.js     | 20.x          | `node --version`        |
| npm         | 9.x           | `npm --version`         |
| Git         | cualquiera    | `git --version`         |

---

## 2. Instalación paso a paso

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd Proyecto3

# 2. Instalar todas las dependencias de Node
npm install

# 3. Instalar los navegadores de Playwright
npx playwright install --with-deps

# 4. Verificar que todo esté correctamente instalado
npx cucumber-js --version
npx playwright --version
```

Con eso el proyecto está listo para ejecutarse.

---

## 3. Estructura del proyecto

```
Proyecto3/
│
├── .github/
│   └── workflows/
│       └── playwright.yml        # Pipeline CI/CD — se ejecuta en cada push/PR
│
├── tests/
│   ├── features/
│   │   └── login.feature         # Escenarios BDD escritos en Gherkin
│   │
│   ├── steps/
│   │   ├── crear.steps.ts        # Pasos del flujo "Crear cuenta"
│   │   └── login.steps.ts        # Pasos del flujo "Login"
│   │
│   ├── pages/
│   │   ├── CrearPage.ts          # Page Object Model — pantalla de registro
│   │   └── LoginPage.ts          # Page Object Model — pantalla de login
│   │
│   ├── hooks/
│   │   └── hooks.ts              # Before/After: abre y cierra browser por escenario
│   │
│   ├── support/
│   │   └── world.ts              # CustomWorld: contexto compartido entre steps
│   │
│   └── data/
│       └── users.json            # Datos de prueba (credenciales, etc.)
│
├── reports/                      # Generado automáticamente al correr los tests
│   ├── chromium/
│   │   └── cucumber-report.json  # JSON del navegador chromium
│   ├── firefox/
│   │   └── cucumber-report.json  # JSON del navegador firefox
│   ├── webkit/
│   │   └── cucumber-report.json  # JSON del navegador webkit
│   └── html-report/              # Reporte HTML unificado multi-navegador
│
├── generate-report.js            # Script que convierte los JSON en HTML
├── cucumber.js                   # Configuración central de Cucumber
├── package.json                  # Scripts, dependencias y metadata
├── playwright.config.ts          # Config de Playwright (no usada en Cucumber directamente)
├── tsconfig.json                 # Configuración del compilador TypeScript
└── README.md
```

---

## 4. Archivos de configuración

### 4.1 `package.json`

Centraliza los scripts de ejecución y las dependencias del proyecto.

```json
{
  "scripts": {
    "test":              "cucumber-js --config cucumber.js",
    "test:smoke":        "TAGS='@smoke' cucumber-js --config cucumber.js",
    "test:login":        "TAGS='@login' cucumber-js --config cucumber.js",
    "test:chromium":     "BROWSER=chromium cucumber-js --config cucumber.js",
    "test:firefox":      "BROWSER=firefox cucumber-js --config cucumber.js",
    "test:webkit":       "BROWSER=webkit cucumber-js --config cucumber.js",
    "clean":             "rimraf reports",
    "test:all-browsers": "npm run clean && npm run test:chromium && npm run test:firefox && npm run test:webkit",
    "report":            "node generate-report.js",
    "test:all-report":   "npm run test:all-browsers && npm run report"
  }
}
```

**Dependencias actuales:**

| Paquete                          | Versión   | Para qué sirve                             |
|----------------------------------|-----------|--------------------------------------------|
| `@playwright/test`               | ^1.59.1   | Automatización del navegador               |
| `@cucumber/cucumber`             | ^12.8.3   | Motor BDD (Gherkin → TypeScript)           |
| `ts-node`                        | ^10.9.2   | Ejecutar TypeScript sin compilar primero   |
| `typescript`                     | ^6.0.3    | Tipado estático                            |
| `multiple-cucumber-html-reporter`| ^3.10.0   | Generar reportes HTML desde JSON           |
| `rimraf`                         | ^6.1.3    | Limpiar la carpeta `reports/` en cualquier SO |
| `@types/node`                    | ^25.6.2   | Tipos de Node.js para TypeScript           |

**¿Cómo agregar un nuevo script de test?**

Si agregas un nuevo tag (`@checkout`, por ejemplo), simplemente añade una línea en `scripts`:

```json
"test:checkout": "TAGS='@checkout' cucumber-js --config cucumber.js"
```

---

### 4.2 `tsconfig.json`

Configura cómo TypeScript compila el código del proyecto.

```json
{
  "compilerOptions": {
    "target": "ES2020",      // Versión JS de salida
    "module": "commonjs",    // Formato de módulos (requerido por ts-node + Cucumber)
    "strict": true,          // Activa todas las verificaciones estrictas
    "esModuleInterop": true, // Permite importar módulos CommonJS con sintaxis ESM
    "skipLibCheck": true,    // Ignora errores en librerías de terceros
    "outDir": "./dist",      // Carpeta de salida (solo si compilas manualmente)
    "rootDir": "./",         // Raíz del proyecto
    "types": ["node"]        // Tipos disponibles globalmente
  },
  "include": ["tests/**/*.ts"],  // Qué archivos TS compila
  "exclude": ["node_modules", "dist"]
}
```

> **Nota:** Al usar `ts-node`, no es necesario compilar manualmente. El `tsconfig.json` lo usa ts-node en tiempo de ejecución.

---

### 4.3 `cucumber.js`

Archivo de configuración central de Cucumber. Define dónde buscar los steps, features y cómo generar reportes.

```js
const browser = process.env.BROWSER || 'chromium'; // Lee la variable de entorno

module.exports = {
  default: {
    requireModule: ['ts-node/register'],  // Habilita TypeScript en tiempo real
    require: [
      'tests/support/**/*.ts',  // 1. Carga primero world.ts
      'tests/hooks/**/*.ts',    // 2. Luego hooks (Before/After)
      'tests/steps/**/*.ts'     // 3. Finalmente los step definitions
    ],
    paths: ['tests/features/**/*.feature'], // Dónde están los escenarios Gherkin
    format: [
      'progress',                                       // Output en consola
      `json:reports/${browser}/cucumber-report.json`    // JSON por navegador
    ],
    tags: process.env.TAGS || ''  // Filtro por tag (vacío = todos los tests)
  }
};
```

**Variables de entorno que acepta:**

| Variable  | Valores posibles              | Efecto                                     |
|-----------|-------------------------------|--------------------------------------------|
| `BROWSER` | `chromium`, `firefox`, `webkit` | Selecciona el navegador para el test     |
| `TAGS`    | `@smoke`, `@login`, etc.      | Filtra qué escenarios ejecutar             |

---

### 4.4 `world.ts`

Define el **contexto compartido** (`CustomWorld`) que está disponible en todos los steps como `this`. Así los steps pueden acceder a `this.page`, `this.browser`, `this.context` y cualquier Page Object.

```typescript
import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

export class CustomWorld {
  browser!: Browser;        // Instancia del navegador
  context!: BrowserContext; // Contexto (permite múltiples tabs/cookies aisladas)
  page!: Page;              // Página activa
  loginPage: any;           // Page Objects (se agregan según se necesiten)
}

setWorldConstructor(CustomWorld);
```

**Para agregar soporte a un nuevo Page Object**, simplemente declara la propiedad:

```typescript
export class CustomWorld {
  // ...propiedades existentes...
  checkoutPage: any;   // ← agrega una línea por cada nuevo POM
}
```

---

### 4.5 `hooks.ts`

Ejecuta código **antes y después de cada escenario**. Se encarga de abrir y cerrar el navegador. Usa la variable de entorno `BROWSER` para elegir el navegador.

```typescript
import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';

setDefaultTimeout(60 * 1000); // Timeout global: 60 segundos por paso

Before(async function () {
  const browserName = process.env.BROWSER || 'chromium';
  // Selecciona el navegador según la variable de entorno
  const browserType = browserName === 'firefox' ? firefox
                    : browserName === 'webkit'   ? webkit
                    : chromium;

  this.browser = await browserType.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page    = await this.context.newPage();
});

After(async function () {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
```

**Para ver el navegador durante la ejecución**, cambia `headless: true` → `headless: false`, o pasa la variable:

```bash
# Ejecutar con navegador visible
HEADLESS=false npm test
```

> Y en hooks.ts ajusta: `headless: process.env.HEADLESS !== 'false'`

---

### 4.6 `generate-report.js`

Script Node.js que toma los archivos JSON de `reports/` y genera un **reporte HTML unificado** con `multiple-cucumber-html-reporter`.

```js
const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports',                 // Busca todos los cucumber-report.json en subdirectorios
  reportPath: 'reports/html-report',  // Carpeta de salida del HTML
  openReportInBrowser: true,          // Abre el reporte automáticamente al terminar
  reportName: 'Reporte Playwright + Cucumber',
  pageTitle: 'Reporte Automatización',
  displayDuration: true,              // Muestra duración de cada paso
  metadata: {
    browser: { name: 'Playwright', version: 'Multi Browser' },
    device: 'Local machine',
    platform: { name: process.platform, version: process.version }
  }
});
```

**Para ejecutar el reporte manualmente:**

```bash
npm run report
```

---

### 4.7 `playwright.yml` (CI/CD)

Pipeline de GitHub Actions que se dispara automáticamente en cada `push` o `pull request` a las ramas `main` o `master`.

```yaml
name: Playwright Cucumber Tests

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Instalar dependencias
        run: npm ci                          # Instala exactamente lo del package-lock.json

      - name: Instalar navegadores Playwright
        run: npx playwright install --with-deps

      - name: Ejecutar tests en todos los navegadores
        run: npm run test:all-browsers       # chromium + firefox + webkit en secuencia

      - name: Generar reporte HTML
        if: always()                         # Se ejecuta aunque los tests fallen
        run: npm run report

      - name: Subir reporte como artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: cucumber-html-report
          path: reports/html-report          # Disponible para descargar en GitHub Actions

      - name: Publicar en GitHub Pages
        if: always()
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: reports/html-report   # El reporte queda accesible como sitio web
```

> **Requisito:** Para que GitHub Pages funcione, ve a **Settings → Pages** en tu repositorio y selecciona la rama `gh-pages` como fuente.

---

## 5. Cómo ejecutar los tests

### Todos los tests (navegador por defecto: chromium)

```bash
npm test
```

### Por tag

```bash
npm run test:smoke   # Solo escenarios con @smoke
npm run test:login   # Solo escenarios con @login
```

### Por navegador específico

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### En todos los navegadores + generar reporte HTML

```bash
npm run test:all-report
```

Este comando ejecuta en secuencia:
1. `npm run clean` — elimina la carpeta `reports/`
2. `npm run test:chromium` — corre todos los tests en Chromium
3. `npm run test:firefox` — corre todos los tests en Firefox
4. `npm run test:webkit` — corre todos los tests en WebKit
5. `npm run report` — genera el HTML unificado y lo abre en el navegador

### Solo generar el reporte (sin correr tests)

```bash
npm run report
```

---

## 6. Cómo agregar nuevos tests

Sigue estos 4 pasos para crear un nuevo flujo de prueba completo:

### Paso 1 — Crear el archivo `.feature`

Crea o edita un archivo en `tests/features/`. Usa Gherkin (Given / When / Then):

```gherkin
# tests/features/checkout.feature
Feature: Checkout

  @smoke @checkout
  Scenario: Realizar compra exitosa
    Given el usuario está logueado
    When agrega un producto al carrito
    And procede al checkout
    Then visualiza la confirmación de compra
```

### Paso 2 — Crear el Page Object Model

Crea el archivo en `tests/pages/`:

```typescript
// tests/pages/CheckoutPage.ts
import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async agregarProducto() {
    await this.page.getByRole('button', { name: 'Agregar al carrito' }).click();
  }

  async irAlCheckout() {
    await this.page.getByRole('link', { name: 'Checkout' }).click();
  }

  async validarConfirmacion() {
    await expect(this.page.getByText('Compra realizada')).toBeVisible();
  }
}
```

### Paso 3 — Crear el archivo de steps

Crea el archivo en `tests/steps/`:

```typescript
// tests/steps/checkout.steps.ts
import { When, Then } from '@cucumber/cucumber';
import { CheckoutPage } from '../pages/CheckoutPage';

When('agrega un producto al carrito', async function () {
  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.agregarProducto();
});

When('procede al checkout', async function () {
  await this.checkoutPage.irAlCheckout();
});

Then('visualiza la confirmación de compra', async function () {
  await this.checkoutPage.validarConfirmacion();
});
```

### Paso 4 — (Opcional) Agregar el script de ejecución en `package.json`

```json
"test:checkout": "TAGS='@checkout' cucumber-js --config cucumber.js"
```

Y ejecutar:

```bash
npm run test:checkout
```

> **No se necesita modificar** `cucumber.js`, `hooks.ts`, `world.ts` ni `tsconfig.json` para nuevos tests: el patrón `**/*.ts` y `**/*.feature` los detecta automáticamente.

---

## 7. Escenarios actuales

**Archivo:** `tests/features/login.feature`  
**URL:** `https://physician-oxygen-literary-classroom.trycloudflare.com`

### Escenario 1: Crear Cuenta

| Paso | Tipo  | Descripción                                        | Step definition      | Page Object  |
|------|-------|----------------------------------------------------|----------------------|--------------|
| 1    | Given | El usuario ingresa a la página de Mercado Prueba   | `crear.steps.ts`     | `CrearPage`  |
| 2    | When  | Da click en crear cuenta                           | `crear.steps.ts`     | `CrearPage`  |
| 3    | And   | Ingresa los datos de cliente                       | `crear.steps.ts`     | `CrearPage`  |
| 4    | Then  | Da click en el botón crear cuenta                  | `crear.steps.ts`     | `CrearPage`  |
| 5    | And   | El usuario visualiza un mensaje de creado con éxito| `crear.steps.ts`     | `CrearPage`  |

### Escenario 2: Login exitoso `@smoke @login`

| Paso | Tipo  | Descripción                                        | Step definition      | Page Object  |
|------|-------|----------------------------------------------------|----------------------|--------------|
| 1    | Given | El usuario ingresa a la página de Mercado Prueba   | `crear.steps.ts`     | `CrearPage`  |
| 2    | When  | Ingresar usuario y contraseña                      | `login.steps.ts`     | `LoginPage`  |
| 3    | And   | Da click en ingresar                               | `login.steps.ts`     | `LoginPage`  |
| 4    | Then  | El usuario visualiza el mensaje de bienvenida      | `login.steps.ts`     | `LoginPage`  |

---

## 8. Generación de reportes

Al ejecutar `npm run test:all-report`, se genera la siguiente estructura:

```
reports/
├── chromium/
│   └── cucumber-report.json
├── firefox/
│   └── cucumber-report.json
├── webkit/
│   └── cucumber-report.json
└── html-report/
    └── index.html   ← Reporte HTML unificado multi-navegador
```

Para abrir el reporte manualmente:

```bash
# macOS
open reports/html-report/index.html

# Linux
xdg-open reports/html-report/index.html

# Windows
start reports/html-report/index.html
```

El reporte incluye:
- Resultados por navegador
- Duración de cada paso
- Estado de cada escenario (passed / failed / pending)
- Metadata del entorno (SO, plataforma, Node version)

---

## CI/CD

El workflow `.github/workflows/playwright.yml` se activa automáticamente en cada `push` o `pull request` a `main`/`master`:

1. Clona el repositorio
2. Instala Node 20 y dependencias (`npm ci`)
3. Instala los navegadores de Playwright
4. Ejecuta `npm run test:all-browsers` (chromium + firefox + webkit)
5. Genera el reporte HTML (`npm run report`)
6. Sube el reporte como artifact descargable en GitHub Actions
7. Publica el reporte en **GitHub Pages**

El reporte quedará disponible en: `https://<usuario>.github.io/<repositorio>/`

---

## 9. Agentes personalizados

Proyecto3 incluye **2 agentes IA personalizados** que automatizan tareas comunes:

### 9.1 Feature Assistant 🎯

**Generación automática de tests BDD**

Agente especializado que genera features Gherkin, Page Objects y steps coherentes y bien estructurados.

**Ubicación:** `.github/agents/feature-assistant.agent.md`

**Cómo usar:**

```
En Copilot chat, escribe:
@feature-assistant Necesito crear un test que valide el flujo de checkout
```

**Entrega automática:**
1. ✅ Feature en `tests/features/checkout.feature`
2. ✅ Page Object en `tests/pages/CheckoutPage.ts`
3. ✅ Steps en `tests/steps/checkout.steps.ts`
4. ✅ Script en `package.json`: `npm run test:checkout`

**Características:**
- Respeta convenciones BDD
- Selectores robustos (getByRole, getByLabel)
- Código TypeScript tipado
- Patrón Page Object Model

---

### 9.2 Web Change Detector 🔍

**Monitoreo y actualización automática de tests**

Agente que detecta cambios en MercadoPrueba y actualiza tests automáticamente.

**Ubicación:** `.github/agents/web-change-detector.agent.md`

**Cómo usar:**

```
Si un test falla por timeout en selector:
@web-change-detector
El test "Login exitoso" falló con:
Error: Timeout waiting for locator('#username')

El agente:
1. ✅ Inspecciona MercadoPrueba en tiempo real
2. ✅ Encuentra el nuevo selector
3. ✅ Actualiza el Page Object
4. ✅ Valida que tests pasen
5. ✅ Genera reporte de cambios
```

**Características:**
- Inspección automática de la web
- Análisis de errores
- Propuesta de selectores válidos
- Validación de cambios
- Reporte documentado

---

## 10. Configuración MCP

**Model Context Protocol** — Integración que permite a los agentes interactuar directamente con Playwright.

**Ubicación:** `.mcp/`

### 10.1 Estructura MCP

```
.mcp/
├── config.json                   # Configuración del servidor
├── playwright-mcp-server.js      # Servidor Node que controla Playwright
├── change-monitor.js             # Script de monitoreo de cambios
├── last-snapshot.json            # Snapshot anterior (generado)
└── CHANGE-LOG.md                 # Historial de cambios (generado)
```

### 10.2 Métodos disponibles

El servidor MCP expone estos métodos para los agentes:

| Método | Parámetros | Retorna | Uso |
|--------|-----------|---------|-----|
| `inspectPage()` | — | Object | Extrae estructura HTML de MercadoPrueba |
| `findElement(text)` | `text: string` | Object | Busca elemento por su contenido de texto |
| `detectChanges(prev)` | `previousState: Object` | Object | Compara estado anterior vs actual |
| `analyzeError(selector, error)` | `selector, errorMsg` | Object | Propone selectores válidos basado en error |
| `generateReport()` | — | String | Genera reporte markdown de cambios |

### 10.3 Cómo iniciar el servidor MCP

```bash
# Inicia el servidor Playwright MCP
npm run mcp:start

# En otra terminal, usa:
@web-change-detector ...
```

---

## 11. Monitoreo automático de cambios

Script que inspecciona MercadoPrueba periódicamente y detecta cambios.

### 11.1 Ejecutar monitoreo manual

```bash
npm run monitor:changes
```

**Flujo:**
1. Se conecta a MercadoPrueba
2. Extrae estructura actual (botones, inputs, labels)
3. La compara con el snapshot anterior
4. Detecta elementos nuevos/removidos
5. Genera reporte en `.mcp/CHANGE-LOG.md`
6. Sugiere pasos siguientes

### 11.2 Reporte de cambios

El monitor genera un archivo `.mcp/CHANGE-LOG.md` con:

```markdown
# Reporte de Cambios — 2026-05-09 14:30:00

**URL:** https://physician-oxygen-literary-classroom.trycloudflare.com
**Título:** Ingresar | MercadoPrueba

## ⚠️ 2 cambios detectados

### 🚨 Cambios críticos
- **BUTTON_REMOVED:** Crear cuenta
- **LABEL_CHANGED:** Email → Correo electrónico

### ✅ Recomendaciones
1. Ejecutar `npm test` para validar tests
2. Usar `@web-change-detector` para actualizar selectores
3. Revisar cambios en `.mcp/CHANGE-LOG.md`
```

### 11.3 Configurar monitoreo periódico (CI)

Agregar a `.github/workflows/playwright.yml`:

```yaml
- name: Monitorear cambios en web
  if: github.event_name == 'schedule'
  run: npm run monitor:changes
```

En `package.json`, agregar schedule:

```yaml
on:
  schedule:
    - cron: '0 */6 * * *'  # Cada 6 horas
```

---

## 12. Instrucciones BDD

Archivo que define convenciones y patrones para todo el código de tests.

**Ubicación:** `.github/instructions/playwright-bdd-conventions.instructions.md`

**Aplica automáticamente a:** Todos los archivos en `tests/`

**Contiene:**
- Convenciones de nombres (camelCase, PascalCase, kebab-case)
- Patrones de código (Page Objects, Steps, Features)
- Selectores robustos (orden de preferencia)
- Manejo de waits y timeouts
- Datos y fixtures
- Checklist pre-commit

---

## 13. Flujo de trabajo recomendado

```mermaid
graph TD
    A["Necesito un nuevo test"] -->|@feature-assistant| B["Genera Feature + POM + Steps"]
    B --> C["npm test"]
    C -->|✅ Pasa| D["git commit & push"]
    C -->|❌ Falla selector| E["@web-change-detector"]
    E --> F["Detecta y actualiza"]
    F --> C
    D --> G["GitHub Actions ejecuta tests"]
    G --> H["Monitor:changes detecta cambios"]
    H --> I["Genera CHANGE-LOG.md"]
    I --> J["Reporte disponible en GitHub Pages"]
```

---

## 14. Comandos rápidos

```bash
# Desarrollo
npm test                          # Ejecutar todos los tests
npm run test:smoke               # Solo tests críticos
npm run test:all-report          # Tests + reporte HTML

# Monitoreo
npm run monitor:changes          # Detectar cambios en web
npm run mcp:start                # Iniciar servidor Playwright MCP

# Reportes
npm run report                   # Generar reporte HTML
open reports/html-report/index.html  # Ver reporte

# Limpieza
npm run clean                    # Eliminar carpeta reports/
```

---

## 15. Stack final

| Componente | Versión | Propósito |
|-----------|---------|----------|
| **Playwright** | ^1.59.1 | Automatización E2E multi-navegador |
| **Cucumber** | ^12.8.3 | Framework BDD (Gherkin → TypeScript) |
| **TypeScript** | ^6.0.3 | Tipado estático y tooling |
| **Custom Agents** | 2 | Feature generation + Web monitoring |
| **MCP Server** | Local | Inspección de web en tiempo real |
| **GitHub Actions** | CI/CD | Tests automáticos + reportes en Pages |

---

## Referencias

- 📖 [Playwright Docs](https://playwright.dev)
- 📖 [Cucumber Gherkin](https://cucumber.io/docs/gherkin/)
- 🎯 [Page Object Model](https://playwright.dev/docs/pom)
- 🤖 [Agent Documentation](.github/AGENTS.md)
- 📝 [BDD Conventions](.github/instructions/playwright-bdd-conventions.instructions.md)
