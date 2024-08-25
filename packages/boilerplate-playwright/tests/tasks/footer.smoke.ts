import { expect, test } from '@playwright/test'

import { TestModelFooter } from './footer'

test.describe('/spa/#/tasks: footer in tasks landing page', () => {
  test('to contain main elements', async ({ page }) => {
    const testModel = new TestModelFooter(page)
    await testModel.goto()
    await expect(testModel.component).toBeVisible()
    await expect(testModel.copyrightText).toBeVisible()
  })
})
