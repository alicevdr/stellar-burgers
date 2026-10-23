import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page, context }) => {
 
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });

    await page.routeFromHAR('tests/hars/user.har', {
      url: '**/api/auth/user',
      update: false,
    });

    await page.routeFromHAR('tests/hars/orders.har', {
      url: '**/api/orders',
      update: false,
    });

  
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

    await page.goto('/');
  });

  test('добавление булки и начинки в конструктор', async ({ page }) => {
    
    const bunCard = page.getByTestId('ingredient-bun-id');
    await expect(bunCard).toBeVisible();
    await bunCard.getByText('Добавить').click();
    await expect(page.getByTestId('constructor-bun-1')).toContainText(
      'Краторная булка N-200i (верх)'
    );
    await expect(page.getByTestId('constructor-bun-2')).toContainText(
      'Краторная булка N-200i (низ)'
    );

    const mainCard = page.getByTestId('ingredient-main-id');
    await expect(mainCard).toBeVisible();
    await mainCard.getByText('Добавить').click();

    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      'Биокотлета из марсианской Магнолии'
    );
  });

  test('открытие модального окна ингредиента', async ({ page }) => {
    const bunCard = page.getByTestId('ingredient-bun-id');
    await expect(bunCard).toBeVisible();
    await bunCard.locator('a').click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Краторная булка N-200i' })
    ).toBeVisible();
  });

  test('закрытие модального окна по крестику', async ({ page }) => {
    const bunCard = page.getByTestId('ingredient-bun-id');
    await expect(bunCard).toBeVisible();
    await bunCard.locator('a').click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await page.getByLabel('Закрыть').click();
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('закрытие модального окна по оверлею', async ({ page }) => {
    const bunCard = page.getByTestId('ingredient-bun-id');
    await expect(bunCard).toBeVisible();
    await bunCard.locator('a').click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await page.getByTestId('modal-overlay').click({ position: { x: 10, y: 10 } });
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('создание заказа', async ({ page }) => {
    const bunCard = page.getByTestId('ingredient-bun-id');
    await expect(bunCard).toBeVisible();
    await bunCard.getByText('Добавить').click();

    const mainCard = page.getByTestId('ingredient-main-id');
    await expect(mainCard).toBeVisible();
    await mainCard.getByText('Добавить').click();

    await expect(page.getByTestId('constructor-bun-1')).toContainText(
      'Краторная булка N-200i (верх)'
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