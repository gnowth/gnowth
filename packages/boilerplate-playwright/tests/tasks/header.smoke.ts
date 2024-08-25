import { expect, test } from '@playwright/test'

import { TestModelHeader } from './header'

test.describe('/spa/#/tasks: header in tasks landing page', () => {
  test('to contain main elements', async ({ page }) => {
    const testModel = new TestModelHeader(page)
    await testModel.goto()
    await expect(testModel.component).toBeVisible()
    await expect(testModel.navRecipes).toBeVisible()
    await expect(testModel.navTasks).toBeVisible()
    await expect(testModel.titleText).toBeVisible()
  })
})
