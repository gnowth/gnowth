import { expect, test } from '@playwright/test'

import { TestModelHeader } from './header'

test.describe('/users: header in users dashboard page', () => {
  test('to contain main elements', async ({ page }) => {
    const testModel = new TestModelHeader(page)
    await testModel.goto()
    await expect(testModel.authLogin).toBeVisible()
    await expect(testModel.authSignup).toBeVisible()
    await expect(testModel.component).toBeVisible()
    await expect(testModel.navDashboard).toBeVisible()
    await expect(testModel.navMembers).toBeVisible()
    await expect(testModel.navReports).toBeVisible()
    await expect(testModel.navTeams).toBeVisible()
    await expect(testModel.titleText).toBeVisible()
  })
})
