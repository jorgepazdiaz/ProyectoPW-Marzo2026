# 🗂️ Índice Completo — Documentación y Recursos

**Generado:** 9 de mayo 2026  
**Proyecto:** Proyecto3 — Automation Framework Playwright + Cucumber BDD  
**Status:** ✅ Inspección completada — Listo para crear tests

---

## 🎯 ¿POR DÓNDE EMPIEZO?

### Si estás aquí por primera vez:
**Lectura recomendada en ESTE orden:**

1. **2 minutos**: [RESUMEN-INSPECCIÓN.md](RESUMEN-INSPECCIÓN.md) ← **EMPIEZA AQUÍ**
   - Qué encontramos en MercadoPrueba
   - Qué tests faltan
   - Plan de acción

2. **5 minutos**: [CAMBIOS-VISUAL.md](CAMBIOS-VISUAL.md)
   - Visualización de la estructura
   - Tabla de cobertura
   - Estado actual vs recomendado

3. **10 minutos**: [PROMPTS-FEATURE-ASSISTANT.md](PROMPTS-FEATURE-ASSISTANT.md) ← **USAR ESTOS PROMPTS**
   - Prompts listos para copiar/pegar
   - Instrucciones paso a paso
   - Tips si algo sale mal

### Si solo quieres empezar YA:
**Ve directo a:** [PROMPTS-FEATURE-ASSISTANT.md](PROMPTS-FEATURE-ASSISTANT.md)
1. Abre Copilot Chat
2. Copia Prompt 1
3. Espera resultados

---

## 📚 DOCUMENTACIÓN DE REFERENCIA

### Para Principiantes (Si es la primera vez)

| Documento | Duración | Contenido |
|-----------|----------|----------|
| [QUICK-START.md](QUICK-START.md) | 2 min | Instalación rápida |
| [WORKFLOW.md](WORKFLOW.md) | 10 min | Flujo completo paso a paso |
| [CHECKLIST.md](CHECKLIST.md) | Mientras trabajas | Lista de verificación interactiva |

### Para Entender lo que Pasó (Inspección)

| Documento | Duración | Contenido |
|-----------|----------|----------|
| [RESUMEN-INSPECCIÓN.md](RESUMEN-INSPECCIÓN.md) | 5 min | **COMIENZA AQUÍ** - Qué encontramos |
| [CAMBIOS-WEB.md](CAMBIOS-WEB.md) | 10 min | Análisis detallado de estructura |
| [CAMBIOS-VISUAL.md](CAMBIOS-VISUAL.md) | 5 min | Visualización gráfica |

### Para Crear los Tests (ACCIÓN)

| Documento | Duración | Contenido |
|-----------|----------|----------|
| [PROMPTS-FEATURE-ASSISTANT.md](PROMPTS-FEATURE-ASSISTANT.md) | 30 min | **USAR PARA CREAR TESTS** - 3 prompts listos |
| [EXAMPLE.md](EXAMPLE.md) | 15 min | Ejemplo real paso a paso |
| [VISUAL-GUIDE.md](VISUAL-GUIDE.md) | 10 min | Qué esperar ver en pantalla |

### Para Entender la Arquitectura (Referencia)

| Documento | Duración | Contenido |
|-----------|----------|----------|
| [README.md](README.md) | 20 min | Documentación completa del proyecto |
| [.github/AGENTS.md](.github/AGENTS.md) | 10 min | Guía de agentes IA |
| [.github/instructions/playwright-bdd-conventions.instructions.md](.github/instructions/playwright-bdd-conventions.instructions.md) | 15 min | Convenciones y patrones BDD |

### Datos Técnicos (JSON/Snapshots)

| Archivo | Contenido |
|---------|----------|
| [.mcp/last-snapshot.json](.mcp/last-snapshot.json) | Estructura HTML actual de MercadoPrueba |
| [.mcp/CHANGE-LOG.md](.mcp/CHANGE-LOG.md) | Historial de cambios detectados |

---

## 🎯 POR OBJETIVO

### Objetivo: Entender qué cambió en MercadoPrueba

**Lectura recomendada:**
```
1. RESUMEN-INSPECCIÓN.md (5 min)
2. CAMBIOS-VISUAL.md (5 min)
3. .mcp/last-snapshot.json (2 min)
4. CAMBIOS-WEB.md (10 min - si necesitas más detalles)
```

### Objetivo: Crear tests nuevos automáticamente

**Lectura recomendada:**
```
1. PROMPTS-FEATURE-ASSISTANT.md ← Empieza aquí
2. Abre Copilot Chat
3. Copia/pega los 3 prompts
4. Ejecuta npm test
```

### Objetivo: Entender cómo funciona todo

**Lectura recomendada:**
```
1. README.md (documentación completa)
2. WORKFLOW.md (flujo práctico)
3. .github/AGENTS.md (cómo funcionan los agentes)
4. VISUAL-GUIDE.md (qué esperar ver)
```

### Objetivo: Monitorear cambios en la web

**Lectura recomendada:**
```
1. WORKFLOW.md - Sección 5: "Monitoreo de cambios"
2. Ejecuta: npm run monitor:changes
3. Ve: .mcp/CHANGE-LOG.md
4. Si algo falla: VISUAL-GUIDE.md - Pantalla 3
```

---

## 📊 MATRIZ DE DECISIÓN

```
┌─────────────────────────────────────────────────────┐
│ ¿Qué necesitas?                                      │
└─────────────────────────────────────────────────────┘

¿Empezar rápido (2 min)?
└─→ QUICK-START.md

¿Entender qué cambió?
└─→ RESUMEN-INSPECCIÓN.md
    → CAMBIOS-VISUAL.md

¿Crear tests nuevos AHORA?
└─→ PROMPTS-FEATURE-ASSISTANT.md ← AQUÍ VA LA ACCIÓN
    → Copilot Chat
    → @feature-assistant
    → npm test

¿Ver qué esperar?
└─→ VISUAL-GUIDE.md
    → EXAMPLE.md

¿Entender toda la arquitectura?
└─→ README.md
    → WORKFLOW.md
    → .github/AGENTS.md

¿Monitorear cambios?
└─→ npm run monitor:changes
    → .mcp/CHANGE-LOG.md

¿Algo no funciona?
└─→ VISUAL-GUIDE.md - "Pantalla 6: Git"
    → Ejecutar con HEADLESS=false
    → Ver .mcp/CHANGE-LOG.md
```

---

## 🚀 RUTA RÁPIDA (30 MINUTOS)

### Minuto 0-5: Leer
```
Abre: RESUMEN-INSPECCIÓN.md
Lee: La sección "Próximos Pasos"
```

### Minuto 5-10: Preparar
```
Abre: Copilot Chat en VS Code
Abre: PROMPTS-FEATURE-ASSISTANT.md en otro editor
```

### Minuto 10-15: Crear
```
Copia: Prompt 1
Pega: En Copilot
Espera: 20 segundos
```

### Minuto 15-20: Crear
```
Copia: Prompt 2
Pega: En Copilot
Espera: 20 segundos
```

### Minuto 20-25: Crear
```
Copia: Prompt 3
Pega: En Copilot
Espera: 20 segundos
```

### Minuto 25-30: Validar
```
Terminal: npm test
Resultado: ✔ 5+ scenarios passed
```

---

## 📈 PROGRESO ESPERADO

### Al inicio (hoy)
```
✅ Tests actuales: 2 escenarios
✅ Coverage: 28%
✅ Documentación: 100% lista
✅ Agentes: Disponibles
```

### Después de seguir PROMPTS-FEATURE-ASSISTANT.md (30 min)
```
✅ Tests nuevos: +3 escenarios
✅ Coverage: 71%+
✅ Reportes: HTML multi-navegador
✅ Git: Todo commiteado
```

### Después de explorar más (1-2 horas)
```
✅ Tests totales: 5-6 escenarios
✅ Pages: 3-4 Page Objects
✅ Coverage: 71%+
✅ Monitoreo: Configurado
✅ CI/CD: GitHub Actions listo
```

---

## 📁 ESTRUCTURA DE CARPETAS

```
Proyecto3/
│
├── 📄 QUICK-START.md              ← Empieza si tienes 2 min
├── 📄 RESUMEN-INSPECCIÓN.md       ← Empieza si quieres contexto
├── 📄 WORKFLOW.md                 ← Guía completa paso a paso
├── 📄 EXAMPLE.md                  ← Ejemplo real
├── 📄 CHECKLIST.md                ← Usa mientras trabajas
├── 📄 VISUAL-GUIDE.md             ← Qué esperar ver
│
├── 📋 CAMBIOS-WEB.md              ← Análisis web
├── 📋 CAMBIOS-VISUAL.md           ← Visualización
├── 📋 PROMPTS-FEATURE-ASSISTANT.md ← 🔥 USA ESTO PARA CREAR TESTS
│
├── 📄 README.md                   ← Documentación completa
│
├── 🤖 .github/
│   ├── AGENTS.md                  ← Guía de agentes
│   ├── agents/
│   │   ├── feature-assistant.agent.md
│   │   └── web-change-detector.agent.md
│   └── instructions/
│       └── playwright-bdd-conventions.instructions.md
│
├── 📸 .mcp/
│   ├── last-snapshot.json         ← Estructura HTML actual
│   ├── CHANGE-LOG.md              ← Historial de cambios
│   ├── playwright-mcp-server.js
│   └── change-monitor.js
│
├── 🧪 tests/
│   ├── features/
│   │   └── login.feature          ← Tests actuales
│   ├── pages/
│   │   ├── CrearPage.ts
│   │   └── LoginPage.ts
│   ├── steps/
│   │   ├── crear.steps.ts
│   │   └── login.steps.ts
│   ├── hooks/
│   │   └── hooks.ts
│   └── support/
│       └── world.ts
│
├── ⚙️ Configuration Files
│   ├── package.json
│   ├── playwright.config.ts
│   ├── tsconfig.json
│   └── cucumber.js
│
└── 📊 reports/
    └── html-report/               ← Se genera después de npm run test:all-report
```

---

## ✅ CHECKLIST: Qué está listo

### Inspección ✅
```
✅ MercadoPrueba inspeccionada
✅ Estructura capturada en JSON
✅ Snapshot generado
✅ Change log creado
```

### Documentación ✅
```
✅ 10 documentos nuevos creados
✅ Prompts listos para copiar
✅ Guías visuales disponibles
✅ Ejemplos prácticos incluidos
```

### Agentes ✅
```
✅ Feature Assistant configurado
✅ Web Change Detector configurado
✅ MCP Server disponible
✅ Change Monitor activo
```

### Tests ✅
```
✅ 2 tests actuales funcionan
✅ Framework POM implementado
✅ BDD convenciones documentadas
✅ 3+ tests listos para crear
```

### Git ✅
```
✅ Todo commiteado
✅ Todo pusheado a main
✅ Historia limpia
```

---

## 🎓 MAPAS DE APRENDIZAJE

### Path 1: Principiante Rápido (5 min)
```
1. QUICK-START.md
2. npm install
3. npm test
4. ¡Listo!
```

### Path 2: Entender + Crear (45 min)
```
1. RESUMEN-INSPECCIÓN.md
2. PROMPTS-FEATURE-ASSISTANT.md
3. Copilot: 3 prompts
4. npm test
5. npm run test:all-report
6. git push
```

### Path 3: Expert (2 horas)
```
1. README.md
2. WORKFLOW.md
3. .github/AGENTS.md
4. EXAMPLE.md
5. Crear múltiples features
6. Configurar monitoreo
7. Explorar MCP Server
```

### Path 4: Monitoreo Continuo (15 min diarios)
```
1. npm run monitor:changes
2. Ver .mcp/CHANGE-LOG.md
3. Si falla test: @web-change-detector
4. git push
```

---

## 🎯 SIGUIENTES PASOS (ORDEN RECOMENDADO)

### Hoy (30-40 min)
```
☐ Lee RESUMEN-INSPECCIÓN.md
☐ Abre PROMPTS-FEATURE-ASSISTANT.md
☐ Invoca @feature-assistant con 3 prompts
☐ Ejecuta npm test
☐ Genera reporte con npm run test:all-report
☐ Haz commit a git
```

### Mañana (1-2 horas)
```
☐ Lee README.md completo
☐ Explora WORKFLOW.md
☐ Crea 2-3 tests adicionales con @feature-assistant
☐ Configura monitoreo automático
```

### Esta semana
```
☐ Agregar tests de Dashboard
☐ Agregar tests de búsqueda
☐ Ejecutar npm run test:all-report periódicamente
☐ Documentar cambios en .mcp/CHANGE-LOG.md
```

---

## 🔗 REFERENCIAS RÁPIDAS

### Comandos principales
```bash
npm test                          # Ejecutar tests
npm run test:smoke               # Solo @smoke
npm run test:all-browsers        # Chromium, Firefox, WebKit
npm run test:all-report          # Generar HTML report
npm run monitor:changes          # Detectar cambios web
HEADLESS=false npm test          # Con navegador visible
```

### URLs importantes
```
MercadoPrueba:  https://physician-oxygen-literary-classroom.trycloudflare.com/
Repo:           https://github.com/jorgepazdiaz/ProyectoPW-Marzo2026
Reports:        reports/html-report/index.html (local)
```

### Agentes IA
```
@feature-assistant              # Crear tests automáticamente
@web-change-detector           # Detectar y actualizar cambios
```

---

## 💬 TABLA DE CONTENIDOS: TODOS LOS DOCUMENTOS

| # | Documento | Tipo | Duración | Objetivo |
|---|-----------|------|----------|----------|
| 1 | QUICK-START.md | 📘 Guía | 2 min | Instalar y empezar |
| 2 | RESUMEN-INSPECCIÓN.md | 📊 Análisis | 5 min | Entender cambios |
| 3 | CAMBIOS-VISUAL.md | 📸 Visual | 5 min | Ver estructura |
| 4 | PROMPTS-FEATURE-ASSISTANT.md | 🤖 Acción | 30 min | **CREAR TESTS** |
| 5 | CAMBIOS-WEB.md | 📋 Análisis | 10 min | Análisis detallado |
| 6 | WORKFLOW.md | 📚 Tutorial | 10 min | Flujo completo |
| 7 | EXAMPLE.md | 💡 Ejemplo | 15 min | Caso real |
| 8 | VISUAL-GUIDE.md | 👀 Visual | 10 min | Qué esperar ver |
| 9 | CHECKLIST.md | ✅ Checklist | Variable | Verificación |
| 10 | README.md | 📖 Referencia | 20 min | Documentación completa |

---

## 🎯 DECISIÓN FINAL: ¿QUÉ HAGO AHORA?

### Opción A: Quiero ver todo rápido (5 min)
```
→ Ve a: RESUMEN-INSPECCIÓN.md
```

### Opción B: Quiero empezar a crear tests (30 min)
```
→ Ve a: PROMPTS-FEATURE-ASSISTANT.md
→ Abre Copilot Chat
→ Copia/pega los 3 prompts
```

### Opción C: Quiero entender la arquitectura (2 horas)
```
→ Ve a: README.md
→ Luego: WORKFLOW.md
→ Luego: .github/AGENTS.md
```

### Opción D: No sé por dónde empezar
```
→ START HERE: RESUMEN-INSPECCIÓN.md
→ Luego te dice exactamente qué hacer
```

---

**Documento generado:** 9 de mayo 2026  
**Para:** Jorge Paz (Usuario Proyecto3)  
**Status:** ✅ TODO LISTO — Empieza por RESUMEN-INSPECCIÓN.md o PROMPTS-FEATURE-ASSISTANT.md

