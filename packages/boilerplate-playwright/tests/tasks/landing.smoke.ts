import { expect, test } from '@playwright/test'

import { TestModelLanding } from './landing'

test.describe('/spa/#/tasks/landing: tasks landing page', () => {
  test('to contain main elements', async ({ page }) => {
    const testModel = new TestModelLanding(page)
    await testModel.goto()
    await expect(testModel.footerComponent).toBeVisible()
    await expect(testModel.headerComponent).toBeVisible()
    await expect(testModel.titleText).toBeVisible()
  })
})
