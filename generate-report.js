const report = require('multiple-cucumber-html-reporter');

report.generate({

  jsonDir: 'reports',

  reportPath: 'reports/html-report',

  openReportInBrowser: true,

  reportName: 'Reporte Playwright + Cucumber',

  pageTitle: 'Reporte Automatización',

  displayDuration: true,

  metadata: {
    browser: {
      name: 'Playwright',
      version: 'Multi Browser'
    },

    device: 'Local machine',

    platform: {
      name: process.platform,
      version: process.version
    }
  }
});