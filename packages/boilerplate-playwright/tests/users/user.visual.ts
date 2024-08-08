import { expect, test } from '@playwright/test'

import { TestModelUser } from './user'

// TODO: https://playwright.dev/docs/test-snapshots
// update snapshot
test.describe('/users/user: new user page', () => {
  test('visual regression', async ({ page }) => {
    const testModel = new TestModelUser(page)

    await testModel.goto()
    await expect(testModel.emailLabel).toBeVisible()
    await expect(page).toHaveScreenshot()
  })
})
