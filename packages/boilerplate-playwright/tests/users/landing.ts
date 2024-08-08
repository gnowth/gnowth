import type { Locator, Page } from '@playwright/test'

import { TestModelFooter } from './footer'
import { TestModelHeader } from './header'

export class TestModelLanding {
  #footer: TestModelFooter
  #header: TestModelHeader
  readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.#footer = new TestModelFooter(page)
    this.#header = new TestModelHeader(page)
  }

  async goto() {
    await this.page.goto('/users')
  }

  get footerComponent(): Locator {
    return this.#footer.component
  }

  get headerComponent(): Locator {
    return this.#header.component
  }

  get titleText(): Locator {
    return this.page.getByText('Dashboard page')
  }
}
