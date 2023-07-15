import { test, expect } from '@playwright/test'
import { TestModelPageUser } from './user'

test.describe('/users/user: new user page', () => {
  test('visual regression', async ({ page }) => {
    const testModel = new TestModelPageUser(page)

    await testModel.load()
    await expect(testModel.labelEmail).toBeVisible()
    await expect(page).toHaveScreenshot()
  })
})
