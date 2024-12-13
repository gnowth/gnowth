import { Locator, Page } from '@playwright/test'

export class TestModelFooter {
  readonly page: Page

  get component(): Locator {
    return this.page.getByTestId('spa--layout-footer')
  }

  get copyrightText(): Locator {
    return this.page.getByText('© Copyright GNOWTH 2021')
  }

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/spa/#/tasks')
  }
}
