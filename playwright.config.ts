import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 3 : undefined,
  use: {
    headless: true,
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'Desktop Chrome',
      grep: /@desktop/,
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Mobile Chrome',
      grep: /@mobile/,
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'API Tests',
      grep: /@api/,
      use: {
        headless: true,
      },
    }
  ],

  reporter: [
    ['json', { outputFile: 'test-results.json' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
});
