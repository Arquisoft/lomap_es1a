import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";


const feature = loadFeature('./features/account.feature');

defineFeature(feature, test => {
  let page: puppeteer.Page;
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    jest.setTimeout(60000);
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true, slowMo: 50 });
    page = await browser.newPage();
  
    await page.goto("https://localhost:3000").catch(() => {});
  });

  afterAll(async () => {
    browser.close();
  });

  test('Navegar por la seccion de Account', ({ given, when, then }) => {
    given('Estoy en la página principal', async () => {
      await page.goto('https://localhost:3000');
    });

    when('Hago clic en el icono de Account', async () => {
      const accountButton = await page.$('[href="/account"]');
      if (accountButton !== null) {
        await accountButton.click();
      }
    });

    then('Debería ir a la pagina de Account', async () => {
      const url = await page.url();
      expect(url).toBe('https://localhost:3000/account');
    });

})});