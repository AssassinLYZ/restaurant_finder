// tests/errorPage.spec.ts
import { PORT } from 'vite.config';
import { test, expect } from '@playwright/test';

test.describe('ErrorPage Component', () => {
    const baseUrl = `http://localhost:${PORT}`;

    test.describe('Default Props', () => {
        test.beforeEach(async ({ page }) => {
            // Mock a 404 page
            await page.goto(`${baseUrl}/non-existent-route`);
        });

        test('should display default error code and message', async ({ page }) => {
            await expect(page.getByTestId('error-code')).toHaveText('404');
            await expect(page.getByTestId('error-message')).toHaveText('Page Not Found');
        });


        test('should have a working home button', async ({ page }) => {
            await page.getByTestId('home-button').click();
            await expect(page).toHaveURL(`${baseUrl}/main`);
        });
    });


    test.describe('Accessibility', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(`${baseUrl}/non-existent-route`);
        });

        test('should be clickabke with keyboard ', async ({ page }) => {

            const button = page.getByTestId('home-button');

            await button.focus();


            await page.keyboard.press('Enter');
            await expect(page).toHaveURL(`${baseUrl}/main`);
        });
    });
});