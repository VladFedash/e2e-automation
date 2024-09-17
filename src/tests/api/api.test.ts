import { test, expect } from '@playwright/test';

test('simple API test @api', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    expect(response.status()).toBe(200);
    
    const users = await response.json();
    expect(users.length).toBeGreaterThan(0);
});