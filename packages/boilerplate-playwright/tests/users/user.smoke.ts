import { test, expect } from '@playwright/test'
import { TestModelPageUser } from './user'

test.describe('/users/user: new user page', () => {
  test('to contain main elements', async ({ page }) => {
    const testModel = new TestModelPageUser(page)

    await testModel.load()
    await expect(page).toHaveURL(/.*users\/user/)
    await expect(testModel.fieldEmail).toBeVisible()
    await expect(testModel.fieldNameFirst).toBeVisible()
    await expect(testModel.fieldNameLast).toBeVisible()
    await expect(testModel.fieldRole).toBeVisible()
    await expect(testModel.labelEmail).toBeVisible()
    await expect(testModel.labelNameFirst).toBeVisible()
    await expect(testModel.labelNameLast).toBeVisible()
    await expect(testModel.labelRole).toBeVisible()
  })
})
