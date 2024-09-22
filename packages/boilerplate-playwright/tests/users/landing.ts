import { Locator, Page } from '@playwright/test'

import { FooterTestModel } from './footer'
import { HeaderTestModel } from './header'

export class LandingTestModel {
  #footer: FooterTestModel
  #header: HeaderTestModel
  readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.#footer = new FooterTestModel(page)
    this.#header = new HeaderTestModel(page)
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
