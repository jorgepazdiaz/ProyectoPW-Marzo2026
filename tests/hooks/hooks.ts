import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser } from '@playwright/test';

setDefaultTimeout(60 * 1000); // 60 segundos
Before(async function () {
  const browserName = process.env.BROWSER || 'chromium';

  let browserType;

  if (browserName === 'firefox') {
    browserType = firefox;
  } else if (browserName === 'webkit') {
    browserType = webkit;
  } else {
    browserType = chromium;
  }

  this.browser = await browserType.launch({
    headless: true, // Cambia a false si quieres ver el navegador en acción
  });

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});