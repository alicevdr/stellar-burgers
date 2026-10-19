import { test, expect } from '@playwright/test';

const mockUser = {
  success: true,
  user: { email: 'test@example.com', name: 'Test User' },
};

const mockOrder = {
  success: true,
  order: {
    _id: 'order-id',
    status: 'done',
    name: 'Test Order',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 12345,
    ingredients: ['bun-id', 'main-id', 'bun-id'],
  },
  name: 'Test Order',
};

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page, context }) => {
    // Перехват запроса на ингредиенты через HAR-файл
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });

    // Перехват запроса на пользователя
    await page.route('**/api/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(mockUser),
      });
    });

    // Перехват запроса на создание заказа
    await page.route('**/api/orders', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(mockOrder),
        });
      } else {
        await route.continue();
      }
    });

    // Подстановка фейковых токенов
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'mock-access-token',
        domain: 'localhost',
        path: '/',
      },
    ]);
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    });

    // Переход на главную страницу
    await page.goto('/');
  });

  test('добавление булки и начинки в конструктор', async ({ page }) => {
    await expect(page.getByText('Краторная булка N-200i')).toBeVisible();

    const bunCard = page
      .locator('li')
      .filter({ hasText: 'Краторная булка N-200i' });
    await bunCard.getByText('Добавить').click();

    await expect(page.getByTestId('constructor-bun-1')).toContainText(
      'Краторная булка N-200i'
    );
    await expect(page.getByTestId('constructor-bun-2')).toContainText(
      'Краторная булка N-200i'
    );

    const mainCard = page
      .locator('li')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' });
    await mainCard.getByText('Добавить').click();

    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      'Биокотлета из марсианской Магнолии'
    );
  });

  test('открытие модального окна ингредиента', async ({ page }) => {
    await page
      .locator('li')
      .filter({ hasText: 'Краторная булка N-200i' })
      .locator('a')
      .click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Краторная булка N-200i' })
    ).toBeVisible();
  });

  test('закрытие модального окна по крестику', async ({ page }) => {
    await page
      .locator('li')
      .filter({ hasText: 'Краторная булка N-200i' })
      .locator('a')
      .click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    
    await page.getByLabel('Закрыть').click();
    
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('закрытие модального окна по оверлею', async ({ page }) => {
    await page
      .locator('li')
      .filter({ hasText: 'Краторная булка N-200i' })
      .locator('a')
      .click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    
    await page
      .getByTestId('modal-overlay')
      .click({ position: { x: 10, y: 10 } });
      
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('создание заказа', async ({ page }) => {
    const bunCard = page
      .locator('li')
      .filter({ hasText: 'Краторная булка N-200i' });
    await bunCard.getByText('Добавить').click();

    const mainCard = page
      .locator('li')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' });
    await mainCard.getByText('Добавить').click();

    await expect(page.getByTestId('constructor-bun-1')).toContainText(
      'Краторная булка N-200i'
    );
    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      'Биокотлета из марсианской Магнолии'
    );

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.getByTestId('order-number')).toBeVisible();
    await expect(page.getByTestId('order-number')).toHaveText('12345');

    await expect(page.getByText('Выберите булки').first()).toBeVisible();
    await expect(page.getByText('Выберите начинку').first()).toBeVisible();

    await page.getByLabel('Закрыть').click();

    await expect(page.getByTestId('order-number')).not.toBeVisible();
  });
});