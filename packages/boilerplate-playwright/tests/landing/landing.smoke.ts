import { expect, test } from '@playwright/test'

import { TestModelLanding } from './landing.testModel'

test.describe('/: landing page', () => {
  test('to contain main elements', async ({ page }) => {
    const testModel = new TestModelLanding(page)
    await testModel.goto()
    await expect(testModel.simulateErrorButton).toBeVisible()
    await expect(testModel.simulateErrorText).toBeVisible()
    await expect(testModel.simulateNotificationButton).toBeVisible()
    await expect(testModel.simulateNotificationText).toBeVisible()
  })
})
