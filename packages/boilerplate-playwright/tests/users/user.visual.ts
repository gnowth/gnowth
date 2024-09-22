import { expect, test } from '@playwright/test'

import { UserTestModel } from './user'

// TODO: https://playwright.dev/docs/test-snapshots
// update snapshot
test.describe('/users/user: new user page', () => {
  test('visual regression', async ({ page }) => {
    const testModel = new UserTestModel(page)

    await testModel.goto()
    await expect(testModel.emailLabel).toBeVisible()
    await expect(page).toHaveScreenshot()
  })
})
