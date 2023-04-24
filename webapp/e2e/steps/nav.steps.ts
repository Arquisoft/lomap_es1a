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
      : await puppeteer.launch({ headless: false, slowMo: 50 });
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
        await page.click('a:contains("Map")');
    });

    then('debería ir a la pagina principal', async () => {
      const url = await page.url();
      expect(url).toBe('http://localhost:3000');
    });

    when('hago clic en account', async () => {
      await page.click('#cuenta');
    });

    then('debería estar en la sección Account', async () => {
        const url = await page.url();
        expect(url).toBe('http://localhost:3000/account');
    });

    when('hago clic en Friends', async () => {
      await page.click('#amigos');
    });

    then('debería estar en la sección Friends', async () => {
        const url = await page.url();
        expect(url).toBe('http://localhost:3000/friends');
    });

    when('hago clic en About', async () => {
      await page.click('#acerca');
    });

    then('debería estar en la sección About', async () => {
        const url = await page.url();
        expect(url).toBe('http://localhost:3000/about');
    });
  });
  
});