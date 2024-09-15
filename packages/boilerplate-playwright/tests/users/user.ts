import { Locator, Page } from '@playwright/test'

import { TestModelFooter } from './footer'
import { TestModelHeader } from './header'

interface OptionsInputData {
  email: string
  nameFirst: string
  nameLast: string
  role: string
}

export class TestModelUser {
  #footer: TestModelFooter
  #header: TestModelHeader
  readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.#footer = new TestModelFooter(page)
    this.#header = new TestModelHeader(page)
  }

  async goto() {
    await this.page.goto('/users/user')
  }

  async inputData(options: OptionsInputData) {
    await this.nameFirstInput.fill(options.nameFirst)
    await this.nameLastInput.fill(options.nameLast)
    await this.emailInput.fill(options.email)
    await this.roleInput.fill(options.role)
  }

  async submit() {
    await this.submitButton.click()
  }

  get emailInput(): Locator {
    return this.page.getByLabel('Email')
  }

  get emailLabel(): Locator {
    return this.page.getByText('Email')
  }

  get footerComponent(): Locator {
    return this.#footer.component
  }

  get headerComponent(): Locator {
    return this.#header.component
  }

  get nameFirstInput(): Locator {
    return this.page.getByLabel('First name')
  }

  get nameFirstLabel(): Locator {
    return this.page.getByText('First name')
  }

  get nameLastInput(): Locator {
    return this.page.getByLabel('Last name')
  }

  get nameLastLabel(): Locator {
    return this.page.getByText('Last name')
  }

  get roleInput(): Locator {
    return this.page.getByLabel('Role')
  }

  get roleLabel(): Locator {
    return this.page.getByText('Role')
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign in' })
  }
}
