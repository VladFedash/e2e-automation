import { test, expect } from '@playwright/test';

test('simple API test @api', async ({ page }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    expect(response.status).toBe(200);
});