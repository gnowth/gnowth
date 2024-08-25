import type { Locator, Page } from '@playwright/test'

export class TestModelLanding {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/styleguide/')
  }

  get titleText(): Locator {
    return this.page.getByRole('link', { name: 'Storybook' })
  }
}
