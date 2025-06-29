// tests/errorPage.spec.ts
import { PORT } from 'vite.config';
import { test, expect } from '@playwright/test';

test.describe('Main Page E2E Tests', () => {
    const baseUrl = `http://localhost:${PORT}`;

    test('should be redirected when go to collection page without login', async ({ page }) => {
        await page.goto(`${baseUrl}/collection`);
        await expect(page).toHaveURL(new RegExp('/main'));
    });

    test('should be logged in  with login button', async ({ page }) => {
        await page.goto(`${baseUrl}/main`);
        await page.getByTestId('header-login').click()
        const loginButton = page.getByRole('button', { name: 'Login with default value' })
        await expect(loginButton).toBeVisible();
        await loginButton.click();
        const value = await page.evaluate(() => {
            return localStorage.getItem('accessToken');
        });
        await expect(value).not.toBeNull();
        const userButton = page.getByRole('button', { name: '🦸' })
        await expect(userButton).toBeVisible();
        await userButton.click()
        await expect(page).toHaveURL(new RegExp('/collection'));
    });


    test('should be able to collect restaurants', async ({ page }) => {
        await page.addInitScript(() => {
            window.localStorage.setItem('accessToken', 'AUTH_TOKEN');
        });

        await page.goto(`${baseUrl}/restaurant/BS14DJ`);
        await page.locator('[data-testid="restaurant-card-1"]').click()

        const button = await page.getByRole('button', { name: 'Add to favorites' });
        await button.waitFor({ state: 'visible', timeout: 15000 });
        await button.click()
        await page.goto(`${baseUrl}/collection`);
        const buttonLogout = page.getByRole('button', { name: 'Logout' });
        await buttonLogout.waitFor({ state: 'visible', timeout: 15000 });
        const card = await page.locator('[data-testid="restaurant-card-1"]')
        await card.waitFor({ state: 'visible' });
        await expect(card).toBeVisible()

    });
})  