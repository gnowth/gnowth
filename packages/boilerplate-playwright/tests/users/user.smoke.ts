import { expect, test } from '@playwright/test'

import { TestModelUser } from './user'

test.describe('/users/user: new user page', () => {
  test('to contain main elements', async ({ page }) => {
    const testModel = new TestModelUser(page)
    await testModel.goto()
    await expect(page).toHaveURL(/.*users\/user/)
    await expect(testModel.emailInput).toBeVisible()
    await expect(testModel.emailLabel).toBeVisible()
    await expect(testModel.footerComponent).toBeVisible()
    await expect(testModel.headerComponent).toBeVisible()
    await expect(testModel.nameFirstInput).toBeVisible()
    await expect(testModel.nameFirstLabel).toBeVisible()
    await expect(testModel.nameLastInput).toBeVisible()
    await expect(testModel.nameLastLabel).toBeVisible()
    await expect(testModel.roleInput).toBeVisible()
    await expect(testModel.roleLabel).toBeVisible()
  })
})
