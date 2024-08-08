import type { Locator, Page } from '@playwright/test'

export class TestModelFooter {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/users')
  }

  get component(): Locator {
    return this.page.getByTestId('app-users--section-footer')
  }

  get copyrightText(): Locator {
    return this.page.getByText('Copyright © 2022 Gnowth')
  }

  get versionText(): Locator {
    return this.page.getByText('Current version')
  }
}
