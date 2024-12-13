import { Locator, Page } from '@playwright/test'

export class DevTestModel {
  readonly page: Page

  get simulateErrorButton(): Locator {
    return this.page.getByRole('button', { name: 'Fire error' })
  }

  get simulateErrorText(): Locator {
    return this.page.getByText('Simulate error in app')
  }

  get simulateNotificationButton(): Locator {
    return this.page.getByRole('button', { name: 'Fire notification' })
  }

  get simulateNotificationText(): Locator {
    return this.page.getByText('Simulate notification in app')
  }

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/pages/dev')
  }
}
