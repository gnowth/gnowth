import { Locator, Page } from '@playwright/test'

import { TestModelFooter } from './footer'
import { TestModelHeader } from './header'

export class TestModelLanding {
  readonly page: Page
  get footerComponent(): Locator {
    return this.#footer.component
  }
  get headerComponent(): Locator {
    return this.#header.component
  }

  get titleText(): Locator {
    return this.page.getByText('Landing')
  }

  #footer: TestModelFooter

  #header: TestModelHeader

  constructor(page: Page) {
    this.page = page
    this.#footer = new TestModelFooter(page)
    this.#header = new TestModelHeader(page)
  }

  async goto() {
    await this.page.goto('/spa/#/tasks')
  }
}
