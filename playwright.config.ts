import { defineConfig, devices } from '@playwright/test';
import 'tsconfig-paths/register';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    testIdAttribute: 'data-test-id', // Treat data-test-id as a test id
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    baseURL: 'https://www.remotepass.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
