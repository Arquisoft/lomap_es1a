import { defineFeature, loadFeature } from "jest-cucumber";
import puppeteer from "puppeteer";


const feature = loadFeature("./features/loginConPod.feature");

defineFeature(feature, (test) => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeEach(async () => {
    jest.setTimeout(60000);
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/login");
  });

  afterAll(async () => {
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

    and("I select solid.community as my Identity Provider", async () => {
      const idpOption = await page.$("#solidcommunity");
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
      expect(page.url()).toMatch(/^https:\/\/solidcommunity\.net\/.*/);
    });

    when("I write my user and password", async () => {
      const usernameInput = await page.$("#username");
      const passwordInput = await page.$("#password");
      await page.waitForTimeout(1000);
      await usernameInput?.type("andresangel2");
      await page.waitForTimeout(1000);
      await passwordInput?.type("Juventud22*");
      await page.waitForTimeout(1000);

      const loginButton = await page.$("#login");
      await page.waitForTimeout(1000);
      await loginButton?.click();
    });

    then("I should be redirected to the home page", async () => {
      await page.waitForNavigation();
      expect(page.url()).toMatch("http://localhost:3000");
    });
    
  });

  
});
