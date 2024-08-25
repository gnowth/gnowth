import { expect, test } from '@playwright/test'

import { TestModelLanding } from './landing'

test.describe('/stylesguide/: styleguide landing page', () => {
  test('to contain main elements', async ({ page }) => {
    const testModel = new TestModelLanding(page)
    await testModel.goto()
    await expect(testModel.titleText).toBeVisible()
  })
})
