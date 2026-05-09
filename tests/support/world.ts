import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage: any;
}

setWorldConstructor(CustomWorld);