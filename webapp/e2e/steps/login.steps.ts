import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/login.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true, slowMo: 150 });
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
  });

  test('Successful login', ({ given, when, then }) => {
    given('I am on the login page', async () => {
      await page.goto("http://localhost:3000/login");
    });

    when('I click the login button', async () => {
      const idpInput = await page.$("#identityProvider");
        if (idpInput) {
          await idpInput.type('https://login.inrupt.com');
        }

        const loginButton = await page.$("#login");
        if (loginButton !== null) {
          await loginButton.click();
        }
    });

    then('I should be redirected to the dashboard page', async () => {
      await page.waitForNavigation();
      expect(page.url()).toMatch(/^https:\/\/auth\.inrupt\.com\/login.*/);
    });
  });

  
});
