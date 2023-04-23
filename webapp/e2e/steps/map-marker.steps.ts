import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

import Map from '../../src/components/Map';

const feature = loadFeature('./features/map-marker.feature');

defineFeature(feature, test => {
  let page: puppeteer.Page;
  let browser: puppeteer.Browser;
  let map: Map;

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

  test('Double clicking on the map should create a marker', ({ given, when, then }) => {
    given('I am on the Map page', async () => {
      await page.goto('http://localhost:3000');
    });

    when('I double click on the map', async () => {
      await page.click('.mapboxgl-map', { clickCount: 2 });
    });

    then('I should see a marker on the map', async () => {
      const marker = await page.waitForSelector('.mapboxgl-marker', { visible: true, timeout: 5000 });
      expect(marker).toBeTruthy();
    });
  });
});