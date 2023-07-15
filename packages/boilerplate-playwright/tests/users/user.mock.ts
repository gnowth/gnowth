import { test, expect } from '@playwright/test'

import { TestModelPageUser } from './user'

test.describe('/users/user: new user page', () => {
  test('input data', async ({ page }) => {
    const testModel = new TestModelPageUser(page)
    const data = {
      email: 'firstname.lastname@email.com',
      nameFirst: 'Firstname',
      nameLast: 'Lastname',
      role: 'Role',
    }

    await testModel.load()
    await expect(testModel.labelEmail).toBeVisible()
    await expect(testModel.labelNameFirst).toBeVisible()
    await expect(testModel.labelNameLast).toBeVisible()
    await expect(testModel.labelRole).toBeVisible()

    await testModel.inputData(data)
    await expect(testModel.fieldEmail).toHaveValue(data.email)
    await expect(testModel.fieldNameFirst).toHaveValue(data.nameFirst)
    await expect(testModel.fieldNameLast).toHaveValue(data.nameLast)
    await expect(testModel.fieldRole).toHaveValue(data.role)
  })
})
