import { defineFeature, loadFeature } from "jest-cucumber";
import puppeteer from "puppeteer";

const feature = loadFeature("./features/login.feature");

defineFeature(feature, (test) => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/login");
  });

  afterEach(async () => {
    await browser.close();
  });

  test("Successful login", ({ given, when,and, then }) => {
    given("I am on the login page", async () => {
      await page.goto("http://localhost:3000/login");
    });

    when("I click on the providers box", async () => {
      const providersBox = await page.$("#identityProvider");
      await providersBox?.click();
    });

    and("I select login.inrupt as my Identity Provider", async () => {
      const idpOption = await page.$("#podspaces");
      await page.waitForTimeout(1000);
      await idpOption?.click();
    });

    and("I click the login button", async () => {
      const loginButton = await page.$("#login");
      await page.waitForTimeout(1000);
      await loginButton?.click();
    });

    then("I should be redirected to the dashboard page", async () => {
      await page.waitForNavigation();
      expect(page.url()).toMatch(/^https:\/\/auth\.inrupt\.com\/.*/);
    });
  });
});
