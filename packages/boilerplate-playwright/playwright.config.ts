import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  outputDir: '../../artifact/test-media-playwright',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  testMatch: '**/*.*(smoke|regression|mock).ts',
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL_TEST,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'mock',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'regresssion-chromium-mobile',
      testIgnore: '**/*.mock.ts',
      use: { ...devices['Pixel 5'] },
    },

    {
      name: 'regression-chromium',
      testIgnore: '**/*.mock.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'regression-firefox-mobile',
      testIgnore: '**/*.mock.ts',
      use: { ...devices['Desktop Firefox'], viewport: { width: 375, height: 667 }, isMobile: true },
    },

    {
      name: 'regression-firefox',
      testIgnore: '**/*.mock.ts',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'regression-webkit-mobile',
      testIgnore: '**/*.mock.ts',
      use: { ...devices['iPhone 12'] },
    },

    {
      name: 'regression-webkit',
      testIgnore: '**/*.mock.ts',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'smoke',
      testMatch: '*/*.*smoke.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
