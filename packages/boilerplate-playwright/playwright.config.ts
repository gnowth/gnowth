import { defineConfig, devices } from '@playwright/test'

const Constant = {
  device: { chromeDesktop: 'Desktop Chrome' },
  glob: { mockTs: '**/*.mock.ts' },
}
export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: '../../artifact/test-media-playwright',
  projects: [
    {
      name: 'mock',
      use: { ...devices[Constant.device.chromeDesktop] },
    },
    {
      name: 'regression-chromium-mobile',
      testIgnore: Constant.glob.mockTs,
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'regression-chromium',
      testIgnore: Constant.glob.mockTs,
      use: { ...devices[Constant.device.chromeDesktop] },
    },
    {
      name: 'regression-firefox-mobile',
      testIgnore: Constant.glob.mockTs,
      use: { ...devices['Desktop Firefox'], isMobile: true, viewport: { height: 667, width: 375 } },
    },
    {
      name: 'regression-firefox',
      testIgnore: Constant.glob.mockTs,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'regression-webkit-mobile',
      testIgnore: Constant.glob.mockTs,
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'regression-webkit',
      testIgnore: Constant.glob.mockTs,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'smoke',
      testMatch: '*/*.*smoke.ts',
      use: { ...devices[Constant.device.chromeDesktop] },
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
