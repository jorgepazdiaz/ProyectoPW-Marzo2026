# Proyecto3 — Curso Playwright + Cucumber

Proyecto de automatización de pruebas E2E para [MercadoPrueba](https://physician-oxygen-literary-classroom.trycloudflare.com) utilizando [Playwright](https://playwright.dev/) con integración de [Cucumber](https://cucumber.io/) para pruebas BDD (Behavior Driven Development).

**URL objetivo:** `https://physician-oxygen-literary-classroom.trycloudflare.com`

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

## Descripción de carpetas

| Carpeta / Archivo         | Propósito                                                                 |
|---------------------------|---------------------------------------------------------------------------|
| `tests/features/`         | Archivos `.feature` con los escenarios escritos en Gherkin                |
| `tests/steps/`            | Implementación TypeScript de cada paso (`Given`, `When`, `Then`) — **crear.steps.ts** es el principal |
| `tests/pages/`            | Page Object Models — **CrearPage.ts** encapsula la creación de cuenta; LoginPage.ts es legacy |
| `tests/hooks/`            | Hooks de ciclo de vida de Cucumber con timeout de 60 segundos             |
| `tests/support/world.ts`  | Clase `CustomWorld` que comparte `page`, `browser` y `context` entre steps|
| `tests/data/`             | Datos de prueba en JSON                                                    |
| `reports/`                | Reportes generados tras la ejecución de los tests                         |
| `cucumber.js`             | Configuración de rutas, formatos, tags y paralelismo de Cucumber          |
| `tsconfig.json`           | Configuración del compilador TypeScript                                   |

---

## Dependencias

| Paquete              | Versión      | Tipo          |
|----------------------|--------------|---------------|
| `@playwright/test`   | ^1.59.1      | devDependency |
| `@types/node`        | ^25.6.2      | devDependency |
| `@cucumber/cucumber` | ^12.8.3      | devDependency |
| `ts-node`            | ^10.9.2      | devDependency |
| `typescript`         | ^6.0.3       | devDependency |

---

## Scripts disponibles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar solo tests con @smoke tag
npm run test:smoke

# Ejecutar solo tests con @login tag
npm run test:login
```

---

## Configuración de Cucumber (`cucumber.js`)

- **Rutas de features:** `tests/features/**/*.feature`
- **Steps:** `tests/steps/**/*.ts`
- **Soporte:** `tests/support/**/*.ts`, `tests/hooks/**/*.ts`
- **Formato de salida:** progress bar + JSON report + HTML report
- **Paralelismo:** 2 workers

### Tags disponibles

| Tag      | Uso                                  |
|----------|--------------------------------------|
| `@smoke` | Tests de humo rápidos y críticos     |
| `@login` | Tests relacionados con autenticación |

---

## Configuración de Playwright (`playwright.config.ts`)

- **Directorio de tests:** `./tests`
- **Ejecución en paralelo:** habilitada
- **Reporter:** `html`
- **Tracing:** activado en el primer reintento (`on-first-retry`)

### Navegadores configurados

| Proyecto   | Dispositivo            |
|------------|------------------------|
| chromium   | Desktop Chrome         |
| firefox    | Desktop Firefox        |
| webkit     | Desktop Safari (macOS) |

---

## Comandos útiles

```bash
# Instalar todas las dependencias
npm install

# Ejecutar todos los tests
npm test

# Ejecutar solo smoke tests
npm run test:smoke

# Ejecutar en modo headless (navegador visible)
HEADLESS=false npm test

# Ejecutar con verbose output
npm test -- --dry-run

# Abrir reporte HTML (después de ejecutar tests)
open reports/html-report/index.html
```

---

## Escenarios actuales

### Feature: Crear Cuenta en MercadoPrueba

**Tags:** `@smoke` `@login`

1. El usuario ingresa a la página de MercadoPrueba
2. Hace clic en "Crear cuenta"
3. Ingresa sus datos (nombre, email, contraseña, etc.)
4. Hace clic en el botón "Crear cuenta" nuevamente
5. Valida que aparezca el mensaje de éxito

---

## Configuración de hooks

El archivo `tests/hooks/hooks.ts` configura:
- **Timeout global:** 60 segundos
- **Navegador:** Chromium en modo `headless: false` (visible)
- **Ciclo de vida:** Inicia browser/context/page en Before y los cierra en After

---

## CI/CD

El proyecto incluye un workflow de GitHub Actions (`.github/workflows/playwright.yml`) que ejecuta los tests automáticamente en cada push o pull request.
