import { test, expect } from '@playwright/test';

import { PAGE_SIZE } from 'src/shared/constant/restaurant';

const PORT = process.env.PORT || 5176;
const baseUrl = `http://localhost:${PORT}`;

test.describe('Restaurant Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/restaurant/BS14DJ`);
  });

  test('should display empty state when no restaurants', async ({ page }) => {
    await page.goto(`${baseUrl}/restaurant/nopostcode`);
    await page.reload();
    await expect(page.getByText('No restaurants found')).toBeVisible();
  });

  test(`should display another ${PAGE_SIZE} restaurants after chnange the page of the pagination`, async ({ page }) => {

    await page.getByLabel('Go to page 2').click();
    await expect(page.locator('[data-testid="restaurant-card-19"]')).toBeVisible();
  });

  test('should display the correct restaurants when search title changed', async ({ page }) => {

    await expect(page.locator('[data-testid^="restaurant-card-"]')).toHaveCount(PAGE_SIZE);

    await page.getByPlaceholder('Search by restrauant name ....').fill('pizza');
    await page.waitForTimeout(1000)

    const allRestaurants = await page.locator('[data-testid^="restaurant-card-"] mark').all()
    const allRestaurantsName = await Promise.all(allRestaurants.map(item => item.innerHTML()));

    const allContainPizza = allRestaurantsName.every((name: string) =>
      name.toLowerCase() === 'pizza'
    );
    expect(allContainPizza).toBe(true);
  });

  test('should display the correct restaurants when a filter is clicked', async ({ page }) => {

    await page.click('button:has-text("Free Delivery")');
    const allRestaurants = await page.locator('[data-testid^="restaurant-card-"]').all()
    const allRestaurantsContent = await Promise.all(allRestaurants.map(item => item.innerHTML()));
    const allContainFreeDelivery = allRestaurantsContent.every((content: string) =>
      content.toLowerCase().includes('free delivery')
    );
    expect(allContainFreeDelivery).toBe(true);
  });

  test('should display the correct restaurants when a sorting is selected', async ({ page }) => {

    function isDescendingOrder(values: number[] | string[]) {
      const numbers = values.map(Number);
      for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] < numbers[i + 1]) {
          return false;
        }
      }
      return true
    }
    await page.selectOption('select[id="Sort By:"]', 'reviews');
    await page.waitForTimeout(1000)
    const allRestaurants = await page.locator('[data-testid^="rating"]').all()
    const allRestaurantsRating = await Promise.all(allRestaurants.map(item => item.innerHTML()));
    expect(isDescendingOrder(allRestaurantsRating)).toBe(true);
  });

  test('should display restaurant details', async ({ page }) => {
    await Promise.all([
      page.waitForURL(/\/restaurant\/.+/), // 等待URL变化
      page.locator('[data-testid="restaurant-card-1"]').click()
    ]);

    const map = page.getByTestId('restaurant-detail');
    await map.waitFor({
      state: 'visible',
      timeout: 15000
    });

    await expect(map).toBeVisible();
  });
});