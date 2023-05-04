import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";


const feature = loadFeature('./features/about.feature');

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

  test('Navegar por la seccion de about', ({ given, when, then }) => {
    given('Estoy en la página principal', async () => {
      await page.goto('https://localhost:3000');
    });

    when('Hago clic en el icono de About', async () => {
      const aboutButton = await page.$('[href="/about"]');
      if (aboutButton !== null) {
        await aboutButton.click();
      }
    });

    then('Debería ir a la pagina de About', async () => {
      const url = await page.url();
      expect(url).toBe('https://localhost:3000/about');
    });

})});