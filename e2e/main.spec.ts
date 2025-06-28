import { PORT } from 'vite.config';
import { test, expect } from '@playwright/test';

import { POSTCODE } from 'src/shared/constant/restaurant';

test.describe('Main Page E2E Tests', () => {
  const baseUrl = `http://localhost:${PORT}`;
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/main`);
  });

  test('should correctly render main page elements', async ({ page }) => {
    // Verify basic elements exist
    await expect(page.getByPlaceholder('Enter postcode')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(page.getByText('You could select one postcode from the list below')).toBeVisible();
  });

  test('should display all postcode buttons', async ({ page }) => {
    // Get expected count from actual data
    const expectedCount = POSTCODE.length;
    const postcodeButtons = page.locator('[data-testid="postcode-button"]');

    await expect(postcodeButtons).toHaveCount(expectedCount);

    // Verify first and last postcodes
    await expect(postcodeButtons.first()).toHaveText(POSTCODE[0]);
    await expect(postcodeButtons.last()).toHaveText(POSTCODE[POSTCODE.length - 1]);
  });

  test('clicking postcode button should update input field', async ({ page }) => {
    const samplePostcode = 'CT12EH'; // Select a test postcode

    await page.getByRole('button', { name: samplePostcode }).click();
    await expect(page.getByPlaceholder('Enter postcode')).toHaveValue(samplePostcode);
  });

  test('submitting valid postcode should navigate to restaurant page', async ({ page }) => {
    const samplePostcode = 'W1A';

    // Method 1: Enter via input field and submit
    await page.getByPlaceholder('Enter postcode').fill(samplePostcode);
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify correct navigation
    await page.waitForURL(`**/restaurant/${samplePostcode}`);
    await expect(page).toHaveURL(new RegExp(`/restaurant/${samplePostcode}$`));
  });

  test('submitting empty postcode should not navigate', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page).toHaveURL(`${baseUrl}/main`); // Should stay on same page
  });

  test('should support keyboard submission', async ({ page }) => {
    const samplePostcode = 'NW1';

    await page.getByPlaceholder('Enter postcode').fill(samplePostcode);
    await page.getByPlaceholder('Enter postcode').press('Enter');

    await page.waitForURL(`**/restaurant/${samplePostcode}`);
  });
});