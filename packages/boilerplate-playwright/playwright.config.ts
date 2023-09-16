import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: '../../artifact/test-media-playwright',
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
      use: { ...devices['Desktop Firefox'], isMobile: true, viewport: { height: 667, width: 375 } },
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
  reporter: 'list',
  retries: process.env.CI ? 2 : 0,
  testDir: './tests',
  testMatch: '**/*.*(smoke|regression|mock).ts',
  use: {
    baseURL: process.env.BASE_URL_TEST,
    trace: 'on-first-retry',
  },
  workers: process.env.CI ? 1 : undefined,
})
