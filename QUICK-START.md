# 🚀 Guía de inicio rápido — Proyecto3 + Agentes AI

Proyecto3 es un framework **BDD + Playwright + Cucumber** con **agentes IA integrados** que automatizan la generación y mantenimiento de tests.

## ⚡ 30 segundos: Primeros pasos

```bash
# 1. Instala dependencias
npm install

# 2. Ejecuta los tests
npm test

# 3. Ver reporte
npm run test:all-report

# 4. Abre GitHub Pages con el reporte HTML
open reports/html-report/index.html
```

---

## 🤖 Usa los agentes IA

### Crear un nuevo test

Abre **Copilot chat** en VS Code y escribe:

```
@feature-assistant Necesito un test que valide que puedo crear una nueva cuenta en MercadoPrueba
```

El agente genera automáticamente:
- ✅ `tests/features/nueva-feature.feature`
- ✅ `tests/pages/NuevaPage.ts`
- ✅ `tests/steps/nueva.steps.ts`
- ✅ Script en `package.json`

Ejecuta: `npm run test:nueva`

### Actualizar tests por cambios en la web

Si un test falla porque MercadoPrueba cambió:

```
@web-change-detector El test "Login" falló con: Error: Timeout waiting for locator('#username')
```

El agente:
1. Inspecciona MercadoPrueba
2. Encuentra el nuevo selector
3. Actualiza automáticamente `LoginPage.ts`
4. Valida que los tests pasen
5. Genera reporte de cambios

---

## 📁 Estructura clave

```
Proyecto3/
├── tests/
│   ├── features/      ← Escenarios Gherkin (describe qué hace el test)
│   ├── pages/         ← Page Objects (cómo interactúa con la UI)
│   ├── steps/         ← Step definitions (conecta features con pages)
│   └── hooks/         ← Setup/teardown (abre/cierra navegador)
│
├── .github/
│   ├── agents/        ← Agentes IA personalizados
│   ├── instructions/  ← Convenciones BDD (auto-aplicadas)
│   └── workflows/     ← CI/CD (tests en GitHub)
│
├── .mcp/
│   ├── playwright-mcp-server.js    ← Servidor que controla Playwright
│   └── change-monitor.js           ← Monitorea cambios en MercadoPrueba
│
└── README.md          ← Documentación completa
```

---

## 📋 Scripts disponibles

```bash
# Tests
npm test                          # Todos los tests
npm run test:smoke               # Solo tests críticos (@smoke)
npm run test:login               # Solo tests de login (@login)
npm run test:all-report          # Tests en 3 navegadores + reporte HTML

# Por navegador específico
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Monitoreo
npm run monitor:changes          # Detecta cambios en MercadoPrueba
npm run mcp:start                # Inicia servidor Playwright MCP

# Reportes
npm run report                   # Genera HTML desde JSON
npm run clean                    # Limpia carpeta reports/
```

---

## 🔍 Agentes disponibles

### 1. `@feature-assistant`

Genera features Gherkin + Page Objects + Steps automáticamente.

**Cuándo usarlo:**
- Necesitas escribir un nuevo test
- Quieres que sea coherente con convenciones

**Ejemplo:**
```
@feature-assistant Crea un test que valide el flujo de checkout:
1. Usuario agrega producto al carrito
2. Va a checkout
3. Ingresa datos de envío
4. Paga
5. Ve confirmación de compra
```

### 2. `@web-change-detector`

Detecta cambios en MercadoPrueba y actualiza tests.

**Cuándo usarlo:**
- Tests fallan por selectores que cambiaron
- MercadoPrueba fue rediseñada
- Necesitas sincronizar tests con cambios de UI

**Ejemplo:**
```
@web-change-detector 
El test "Login exitoso" falló con:
Error: Timeout waiting for locator('#username')
Analiza la página actual y actualiza los selectores.
```

---

## 📚 Documentación

| Archivo | Contenido |
|---------|----------|
| [README.md](README.md) | Documentación completa del proyecto |
| [.github/AGENTS.md](.github/AGENTS.md) | Guía de agentes IA |
| [.github/instructions/playwright-bdd-conventions.instructions.md](.github/instructions/playwright-bdd-conventions.instructions.md) | Convenciones BDD |

---

## 🌍 URL bajo prueba

```
https://physician-oxygen-literary-classroom.trycloudflare.com
```

Tests actuales: **Login** y **Crear Cuenta**

---

## 🎯 Flujo típico de trabajo

```
┌─────────────────────┐
│ Necesito un test    │
└──────────┬──────────┘
           │
           ├─→ @feature-assistant ──→ Feature generada
           │                          ↓
           │                    npm test ✅ Pasa
           │                          ↓
           │                    git commit & push
           │                          ↓
           └─ npm test ❌ Falla
                  │
                  ├─→ @web-change-detector ──→ Selectores actualizados
                  │                                    ↓
                  └─────────────────┬─────────────────┘
                                   ↓
                            npm test ✅ Pasa
                                   ↓
                            git commit & push
```

---

## 💡 Tips

- **Convenciones:** Revisa [BDD Conventions](.github/instructions/playwright-bdd-conventions.instructions.md) para código consistente
- **Monitoreo:** Ejecuta `npm run monitor:changes` para detectar cambios en la web automáticamente
- **Reportes:** Los reportes HTML están en `reports/html-report/index.html` (generados tras correr tests)
- **CI/CD:** GitHub Actions ejecuta tests en cada push (`.github/workflows/playwright.yml`)

---

## ❓ FAQ

**P: ¿Cómo creo un test nuevo?**
R: Usa `@feature-assistant` en Copilot — genera features, pages y steps automáticamente.

**P: ¿Qué hacer si un test falla?**
R: Ejecuta `npm test` para ver el error. Si es por selector, usa `@web-change-detector`.

**P: ¿En qué navegadores se ejecutan tests?**
R: Por defecto Chromium. Usa `npm run test:all-report` para Firefox + WebKit también.

**P: ¿Cómo ejecuto solo tests críticos?**
R: `npm run test:smoke` (ejecuta tests con tag `@smoke`)

**P: ¿Dónde están los reportes?**
R: `reports/html-report/index.html` (multi-navegador)

---

## 📞 Soporte

- 📖 Lee [README.md](README.md) para documentación completa
- 🤖 Lee [.github/AGENTS.md](.github/AGENTS.md) para guía de agentes
- 📝 Lee [Convenciones BDD](.github/instructions/playwright-bdd-conventions.instructions.md)

---

**Última actualización:** 2026-05-09  
**Versión:** Proyecto3 v1.0.0 con Agentes IA + MCP
