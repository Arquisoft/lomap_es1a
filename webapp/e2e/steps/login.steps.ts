import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';

const feature = loadFeature('./features/login.feature');

let browser: puppeteer.Browser;
let page: puppeteer.Page;

defineFeature(feature, (test) => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Cambiar a false si se quiere ver la ejecución de la prueba
      args: ['--no-sandbox'],
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  });

  test('Inicio de sesión exitoso con credenciales válidas', ({ given, when, then }) => {
    let username: string;
    let password: string;

    given('El usuario se encuentra en la página de inicio de sesión', async () => {
      expect(await page.title()).toMatch('Iniciar sesión');
    });

    when('El usuario ingresa sus credenciales válidas y presiona el botón de inicio de sesión', async () => {
      username = 'ejemplo@ejemplo.com';
      password = 'ejemplo123';
      await page.type('input[name="username"]', username);
      await page.type('input[name="password"]', password);
      await page.click('button[type="submit"]');
    });

    then('El usuario debe ser redirigido a la página de inicio', async () => {
      expect(await page.title()).toMatch('Inicio');
    });
  });

  test('Inicio de sesión fallido con credenciales inválidas', ({ given, when, then }) => {
    let username: string;
    let password: string;

    given('El usuario se encuentra en la página de inicio de sesión', async () => {
      expect(await page.title()).toMatch('Iniciar sesión');
    });

    when('El usuario ingresa sus credenciales inválidas y presiona el botón de inicio de sesión', async () => {
      username = 'ejemplo@ejemplo.com';
      password = 'contraseñaincorrecta';
      await page.type('input[name="username"]', username);
      await page.type('input[name="password"]', password);
      await page.click('button[type="submit"]');
    });

    then('El usuario debe ver un mensaje de error', async () => {
      const errorMessage = await page.$eval('.error-message', (el) => el.textContent);
      expect(errorMessage).toMatch('Credenciales incorrectas');
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});
