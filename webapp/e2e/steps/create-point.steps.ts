import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

import Map from '../../src/components/Map';

const feature = loadFeature('./features/map-marker.feature');

defineFeature(feature, test => {
  let page: puppeteer.Page;
  let browser: puppeteer.Browser;
  let map: Map;

  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
  
    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle0",
    }).catch(() => {});
  });

  afterAll(async () => {
    browser.close();
  });

  test('The user clicks on the map at a specific location', ({ given, when, then }) => {
    given('I am on the map page', async () => {
      map = map = new Map({lng: 4.34878, lat: 50.85045, zoom: 10, mapWidth: '100%', mapHeight: '100%'});
    });

    when('I click on the map at location {int}, {int}', async (x: number, y: number) => {
      await page.mouse.click(x, y);
    });

    then('a marker should be shown on the map at location {int}, {int}', async (x: number, y: number) => {
      const marker = await page.$('.map-marker');
      const boundingBox = await marker?.boundingBox();
      expect(boundingBox).to.not.be.undefined;
      expect(Math.round(boundingBox?.x || 0)).to.equal(x);
      expect(Math.round(boundingBox?.y || 0)).to.equal(y);
    });
  });
});
