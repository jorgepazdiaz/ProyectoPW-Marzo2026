#!/usr/bin/env node

/**
 * Monitor de cambios en MercadoPrueba
 * Se ejecuta periódicamente para detectar cambios en selectores y actualizar tests
 * 
 * Uso:
 *   npm run monitor:changes
 *   node .mcp/change-monitor.js
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

class ChangeMonitor {
  constructor() {
    this.snapshotFile = '.mcp/last-snapshot.json';
    this.changeLogFile = '.mcp/CHANGE-LOG.md';
  }

  /**
   * Carga el snapshot anterior
   */
  loadSnapshot() {
    if (fs.existsSync(this.snapshotFile)) {
      const content = fs.readFileSync(this.snapshotFile, 'utf-8');
      return JSON.parse(content);
    }
    return null;
  }

  /**
   * Guarda el snapshot actual
   */
  saveSnapshot(snapshot) {
    fs.writeFileSync(this.snapshotFile, JSON.stringify(snapshot, null, 2));
    console.log(`✓ Snapshot guardado: ${this.snapshotFile}`);
  }

  /**
   * Inspecciona la página actual
   */
  async inspectPage() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto('https://physician-oxygen-literary-classroom.trycloudflare.com', {
        waitUntil: 'domcontentloaded'
      });

      // Espera un poco para que JavaScript se ejecute
      await page.waitForTimeout(2000);

      const snapshot = {
        timestamp: new Date().toISOString(),
        url: page.url(),
        title: await page.title(),
        buttons: await page.locator('button').allTextContents(),
        labels: await page.locator('label').allTextContents(),
        inputs: await this.extractInputInfo(page),
        headings: await page.locator('h1, h2, h3').allTextContents(),
        links: await page.locator('a').allTextContents()
      };

      return snapshot;
    } finally {
      await browser.close();
    }
  }

  /**
   * Extrae información detallada de inputs
   */
  async extractInputInfo(page) {
    const inputs = await page.locator('input').all();
    const inputInfo = [];

    for (const input of inputs) {
      const type = await input.getAttribute('type') || 'text';
      const placeholder = await input.getAttribute('placeholder') || '';
      const name = await input.getAttribute('name') || '';
      const id = await input.getAttribute('id') || '';

      inputInfo.push({
        type,
        placeholder,
        name,
        id,
        selector: id ? `#${id}` : name ? `input[name="${name}"]` : 'input'
      });
    }

    return inputInfo;
  }

  /**
   * Detecta diferencias entre snapshots
   */
  detectChanges(prevSnapshot, currentSnapshot) {
    const changes = [];

    if (!prevSnapshot) {
      return { changes, isFirstRun: true };
    }

    // Detecta botones nuevos/eliminados
    const prevButtons = new Set(prevSnapshot.buttons);
    const currButtons = new Set(currentSnapshot.buttons);

    currButtons.forEach(btn => {
      if (!prevButtons.has(btn)) {
        changes.push({
          type: 'BUTTON_ADDED',
          value: btn,
          severity: 'info'
        });
      }
    });

    prevButtons.forEach(btn => {
      if (!currButtons.has(btn)) {
        changes.push({
          type: 'BUTTON_REMOVED',
          value: btn,
          severity: 'warning'
        });
      }
    });

    // Detecta labels nuevos/eliminados
    const prevLabels = new Set(prevSnapshot.labels);
    const currLabels = new Set(currentSnapshot.labels);

    currLabels.forEach(lbl => {
      if (!prevLabels.has(lbl)) {
        changes.push({
          type: 'LABEL_ADDED',
          value: lbl,
          severity: 'info'
        });
      }
    });

    prevLabels.forEach(lbl => {
      if (!currLabels.has(lbl)) {
        changes.push({
          type: 'LABEL_REMOVED',
          value: lbl,
          severity: 'warning'
        });
      }
    });

    // Detecta cambios en inputs
    const prevInputs = prevSnapshot.inputs.map(i => i.id + i.name + i.placeholder).join('|');
    const currInputs = currentSnapshot.inputs.map(i => i.id + i.name + i.placeholder).join('|');

    if (prevInputs !== currInputs) {
      changes.push({
        type: 'INPUTS_CHANGED',
        value: 'Estructura de inputs cambió',
        severity: 'warning'
      });
    }

    return { changes, isFirstRun: false };
  }

  /**
   * Genera un reporte markdown de cambios
   */
  generateReport(currentSnapshot, changes, isFirstRun) {
    const timestamp = new Date().toLocaleString('es-AR');
    
    let report = `# Reporte de Cambios — ${timestamp}\n\n`;
    report += `**URL:** ${currentSnapshot.url}\n`;
    report += `**Título:** ${currentSnapshot.title}\n\n`;

    if (isFirstRun) {
      report += `## 🔍 Primera inspección\n\n`;
      report += `Se creó el primer snapshot de MercadoPrueba.\n\n`;
      report += `### Elementos detectados:\n`;
      report += `- **Botones:** ${currentSnapshot.buttons.length}\n`;
      report += `- **Labels:** ${currentSnapshot.labels.length}\n`;
      report += `- **Inputs:** ${currentSnapshot.inputs.length}\n`;
      report += `- **Headings:** ${currentSnapshot.headings.length}\n`;
    } else if (changes.length === 0) {
      report += `## ✅ Sin cambios\n\n`;
      report += `La estructura de MercadoPrueba se mantiene igual.\n`;
    } else {
      report += `## ⚠️ ${changes.length} cambios detectados\n\n`;

      const warnings = changes.filter(c => c.severity === 'warning');
      const infos = changes.filter(c => c.severity === 'info');

      if (warnings.length > 0) {
        report += `### 🚨 Cambios críticos (podrían romper tests)\n\n`;
        warnings.forEach(change => {
          report += `- **${change.type}:** ${change.value}\n`;
        });
        report += `\n`;
      }

      if (infos.length > 0) {
        report += `### ℹ️ Cambios informativos\n\n`;
        infos.forEach(change => {
          report += `- **${change.type}:** ${change.value}\n`;
        });
        report += `\n`;
      }

      report += `### ✅ Recomendaciones\n\n`;
      report += `1. Ejecutar \`npm test\` para validar que los tests aún pasan\n`;
      report += `2. Si hay fallos, usar \`@web-change-detector\` para actualizar selectores\n`;
      report += `3. Revisar los cambios en \`.mcp/CHANGE-LOG.md\`\n`;
    }

    report += `\n---\n`;
    report += `*Generado automáticamente por Change Monitor*\n`;

    return report;
  }

  /**
   * Actualiza el change log
   */
  updateChangeLog(report) {
    const header = `# Historial de Cambios en MercadoPrueba\n\n`;
    const separator = `\n---\n\n`;

    let content = '';
    if (fs.existsSync(this.changeLogFile)) {
      content = fs.readFileSync(this.changeLogFile, 'utf-8');
      // Remove the header to re-add it
      content = content.replace(header, '');
    }

    const newContent = header + report + separator + content;
    fs.writeFileSync(this.changeLogFile, newContent);
    console.log(`✓ Change log actualizado: ${this.changeLogFile}`);
  }

  /**
   * Ejecuta el monitoreo
   */
  async run() {
    console.log('\n🔍 Iniciando monitoreo de cambios en MercadoPrueba...\n');

    try {
      const prevSnapshot = this.loadSnapshot();
      const currentSnapshot = await this.inspectPage();
      const { changes, isFirstRun } = this.detectChanges(prevSnapshot, currentSnapshot);

      // Guarda el snapshot actual
      this.saveSnapshot(currentSnapshot);

      // Genera y actualiza reporte
      const report = this.generateReport(currentSnapshot, changes, isFirstRun);
      this.updateChangeLog(report);

      console.log(report);

      if (changes.length > 0 && !isFirstRun) {
        console.log('\n⚠️ Se detectaron cambios. Considera ejecutar:');
        console.log('  npm test                    # Validar tests\n');
        console.log('  @web-change-detector        # Usar agente para actualizar\n');
      }

    } catch (error) {
      console.error('❌ Error durante monitoreo:', error.message);
      process.exit(1);
    }
  }
}

// Ejecuta el monitor
if (require.main === module) {
  const monitor = new ChangeMonitor();
  monitor.run();
}

module.exports = { ChangeMonitor };
