import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";


const feature = loadFeature('./features/friends.feature');

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

  test('Navegar por la seccion de Friends', ({ given, when, then }) => {
    given('Estoy en la página principal', async () => {
      await page.goto('http://localhost:3000');
    });

    when('Hago clic en el icono de Friends', async () => {
      const friendsButton = await page.$('[href="/friends"]');
      if (friendsButton !== null) {
        await friendsButton.click();
      }
    });

    then('Debería ir a la pagina de Friends', async () => {
      const url = await page.url();
      expect(url).toBe('http://localhost:3000/friends');
    });

})});