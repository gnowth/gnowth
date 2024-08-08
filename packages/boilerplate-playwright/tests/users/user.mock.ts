import { expect, test } from '@playwright/test'

import { TestModelUser } from './user'

test.describe('/users/user: new user page', () => {
  test('input data', async ({ page }) => {
    const data = {
      email: 'firstname.lastname@email.com',
      nameFirst: 'Firstname',
      nameLast: 'Lastname',
      role: 'Role',
    }

    const testModel = new TestModelUser(page)
    await testModel.goto()
    await expect(testModel.emailLabel).toBeVisible()
    await expect(testModel.footerComponent).toBeVisible()
    await expect(testModel.headerComponent).toBeVisible()
    await expect(testModel.nameFirstLabel).toBeVisible()
    await expect(testModel.nameLastLabel).toBeVisible()
    await expect(testModel.roleLabel).toBeVisible()

    await testModel.inputData(data)
    await expect(testModel.emailInput).toHaveValue(data.email)
    await expect(testModel.nameFirstInput).toHaveValue(data.nameFirst)
    await expect(testModel.nameLastInput).toHaveValue(data.nameLast)
    await expect(testModel.roleInput).toHaveValue(data.role)
  })
})
