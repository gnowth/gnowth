import { expect, test } from '@playwright/test'

import { TestModelLanding } from './landing'

test.describe('/users: users dashboard page', () => {
  test('to contain main elements', async ({ page }) => {
    const testModel = new TestModelLanding(page)
    await testModel.goto()
    await expect(page).toHaveURL(/.*users/)
    await expect(testModel.footerComponent).toBeVisible()
    await expect(testModel.headerComponent).toBeVisible()
    await expect(testModel.titleText).toBeVisible()
  })
})
