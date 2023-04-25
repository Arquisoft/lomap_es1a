import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";


const feature = loadFeature('./features/nav.feature');

defineFeature(feature, test => {
  let page: puppeteer.Page;
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    jest.setTimeout(60000);
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true, slowMo: 50 });
    page = await browser.newPage();
  
    await page.goto("http://localhost:3000").catch(() => {});
  });

  afterAll(async () => {
    browser.close();
  });

  test('Navegar por las diferentes secciones', ({ given, when, then }) => {
    given('Estoy en la página principal', async () => {
      await page.goto('http://localhost:3000');
    });

    when('hago clic en Map', async () => {
      const loginButton = await page.$('[href="/"]');
      if (loginButton !== null) {
        await loginButton.click();
      }
    });

    then('debería ir a la pagina principal', async () => {
      const url = await page.url();
      expect(url).toBe('http://localhost:3000/');
    });
  });
  
});