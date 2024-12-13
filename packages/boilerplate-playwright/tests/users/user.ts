import { Locator, Page } from '@playwright/test'

import { FooterTestModel } from './footer'
import { HeaderTestModel } from './header'

type OptionsInputData = {
  email: string
  nameFirst: string
  nameLast: string
  role: string
}

export class UserTestModel {
  readonly page: Page
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

  #footer: FooterTestModel

  #header: HeaderTestModel

  constructor(page: Page) {
    this.page = page
    this.#footer = new FooterTestModel(page)
    this.#header = new HeaderTestModel(page)
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
}
