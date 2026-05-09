#!/usr/bin/env node

/**
 * MCP Server para Playwright + Detección de Cambios
 * Permite al agente web-change-detector inspeccionar la UI en tiempo real
 * y actualizar tests automáticamente
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

class PlaywrightMCPServer {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.targetUrl = process.env.PLAYWRIGHT_URL || 'https://physician-oxygen-literary-classroom.trycloudflare.com';
  }

  /**
   * Inicia el browser y abre la página bajo prueba
   */
  async initialize() {
    console.log('[MCP] Inicializando Playwright para:', this.targetUrl);
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto(this.targetUrl, { waitUntil: 'domcontentloaded' });
    console.log('[MCP] ✓ Navegador listo');
  }

  /**
   * Inspecciona todos los selectores en la página
   * Retorna: objeto con labels, inputs, buttons, etc.
   */
  async inspectPageStructure() {
    console.log('[MCP] Inspeccionando estructura de página...');
    
    const labels = await this.page.locator('label').allTextContents();
    const buttons = await this.page.locator('button').allTextContents();
    const inputs = await this.page.locator('input').count();
    const textboxes = await this.page.getByRole('textbox').all();
    
    const textboxInfo = await Promise.all(
      textboxes.map(async (tb) => ({
        label: await tb.getAttribute('aria-label') || await tb.getAttribute('placeholder'),
        type: await tb.getAttribute('type'),
        name: await tb.getAttribute('name')
      }))
    );

    const structure = {
      url: this.page.url(),
      title: await this.page.title(),
      labels: labels.filter(Boolean),
      buttons: buttons.filter(Boolean),
      textboxCount: inputs,
      textboxInfo,
      headings: await this.page.locator('h1, h2, h3').allTextContents(),
      formFields: textboxInfo
    };

    return structure;
  }

  /**
   * Busca un elemento por su texto (robusto a cambios menores)
   */
  async findElementByText(text) {
    console.log(`[MCP] Buscando elemento con texto: "${text}"`);
    
    try {
      // Intenta locator por rol/texto
      const element = this.page.getByText(text);
      const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isVisible) {
        const selector = await element.evaluate(el => 
          el.getAttribute('class') || el.id || el.tagName.toLowerCase()
        );
        return {
          found: true,
          selector: `getByText("${text}")`,
          visible: true,
          elementInfo: selector
        };
      }
    } catch (e) {
      console.log(`[MCP] Elemento no encontrado: ${text}`);
    }

    return { found: false, selector: null };
  }

  /**
   * Detecta cambios comparando el estado actual con un estado anterior
   */
  async detectChanges(previousState) {
    const currentState = await this.inspectPageStructure();
    const changes = [];

    if (previousState) {
      // Detecta botones nuevos/eliminados
      const prevButtonsSet = new Set(previousState.buttons);
      const currButtonsSet = new Set(currentState.buttons);

      prevButtonsSet.forEach(btn => {
        if (!currButtonsSet.has(btn)) {
          changes.push({ type: 'button_removed', value: btn });
        }
      });

      currButtonsSet.forEach(btn => {
        if (!prevButtonsSet.has(btn)) {
          changes.push({ type: 'button_added', value: btn });
        }
      });

      // Detecta labels nuevos/eliminados
      const prevLabelsSet = new Set(previousState.labels);
      const currLabelsSet = new Set(currentState.labels);

      prevLabelsSet.forEach(lbl => {
        if (!currLabelsSet.has(lbl)) {
          changes.push({ type: 'label_removed', value: lbl });
        }
      });

      currLabelsSet.forEach(lbl => {
        if (!prevLabelsSet.has(lbl)) {
          changes.push({ type: 'label_added', value: lbl });
        }
      });
    }

    return {
      currentState,
      changes,
      hasChanges: changes.length > 0
    };
  }

  /**
   * Analiza un error de test y propone un selector válido
   */
  async analyzeSelectorError(failedSelector, errorMessage) {
    console.log(`[MCP] Analizando error de selector: ${failedSelector}`);
    
    // Intenta encontrar un selector válido alternativo
    const suggestions = [];

    // Sugerencia 1: Si era CSS, intenta getByRole
    if (failedSelector.startsWith('#') || failedSelector.startsWith('.')) {
      const buttons = await this.page.locator('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent();
        if (text && text.trim()) {
          suggestions.push({
            original: failedSelector,
            suggested: `getByRole('button', { name: '${text.trim()}' })`,
            confidence: 'high'
          });
          break;
        }
      }
    }

    // Sugerencia 2: Si menciona "login" o "ingresar", busca botones relacionados
    if (failedSelector.toLowerCase().includes('login') || failedSelector.toLowerCase().includes('ingresar')) {
      const buttons = await this.page.getByRole('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent();
        if (text && (text.toLowerCase().includes('ingresar') || text.toLowerCase().includes('login'))) {
          suggestions.push({
            original: failedSelector,
            suggested: `getByRole('button', { name: '${text.trim()}' })`,
            confidence: 'high'
          });
        }
      }
    }

    return {
      failedSelector,
      error: errorMessage,
      suggestions: suggestions.length > 0 ? suggestions : [{ error: 'No suggestions found' }]
    };
  }

  /**
   * Genera un reporte de cambios detected
   */
  async generateChangeReport() {
    const inspection = await this.inspectPageStructure();
    const report = `
# Reporte de Cambios Detectados
Fecha: ${new Date().toISOString()}
URL: ${inspection.url}
Título: ${inspection.title}

## Estructura actual
- Botones: ${inspection.buttons.join(', ')}
- Labels: ${inspection.labels.join(', ')}
- Campos de texto: ${inspection.textboxCount}
- Headings: ${inspection.headings.join(', ')}

## Recomendaciones
1. Validar que los selectores en Page Objects coincidan con los elementos actuales
2. Usar getByRole/getByLabel en lugar de selectores CSS cuando sea posible
3. Ejecutar npm test para validar que todo funciona

Generado automáticamente por Playwright MCP Server
    `.trim();

    return report;
  }

  /**
   * Limpia los recursos
   */
  async cleanup() {
    console.log('[MCP] Limpiando recursos...');
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

/**
 * Main — Inicia el servidor MCP
 */
async function main() {
  const server = new PlaywrightMCPServer();
  
  try {
    await server.initialize();

    // Expone las funciones como métodos accesibles
    global.mcp = {
      inspectPage: () => server.inspectPageStructure(),
      findElement: (text) => server.findElementByText(text),
      detectChanges: (prev) => server.detectChanges(prev),
      analyzeError: (selector, error) => server.analyzeSelectorError(selector, error),
      generateReport: () => server.generateChangeReport()
    };

    console.log('[MCP] ✓ Servidor Playwright MCP iniciado');
    console.log('[MCP] Métodos disponibles:');
    console.log('  - mcp.inspectPage()');
    console.log('  - mcp.findElement(text)');
    console.log('  - mcp.detectChanges(previousState)');
    console.log('  - mcp.analyzeError(selector, error)');
    console.log('  - mcp.generateReport()');

    // Mantiene el servidor activo
    process.on('SIGINT', async () => {
      console.log('[MCP] Cerrando servidor...');
      await server.cleanup();
      process.exit(0);
    });

  } catch (error) {
    console.error('[MCP] Error inicializando servidor:', error);
    await server.cleanup();
    process.exit(1);
  }
}

// Exporta para uso como módulo
module.exports = { PlaywrightMCPServer };

// Ejecuta si se llama directamente
if (require.main === module) {
  main();
}
