import type { Locator, Page } from '@playwright/test'

import { dependencies } from '../dependencies'

interface OptionsInputData {
  nameFirst: string
  nameLast: string
  email: string
  role: string
}

export class TestModelPageUser {
  readonly buttonSubmit: Locator
  readonly fieldEmail: Locator
  readonly fieldNameFirst: Locator
  readonly fieldNameLast: Locator
  readonly fieldRole: Locator
  readonly labelEmail: Locator
  readonly labelNameFirst: Locator
  readonly labelNameLast: Locator
  readonly labelRole: Locator
  readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.buttonSubmit = page.getByRole('button', { name: 'Sign in' })
    this.fieldEmail = page.getByLabel('Email')
    this.fieldNameFirst = page.getByLabel('First name')
    this.fieldNameLast = page.getByLabel('Last name')
    this.fieldRole = page.getByLabel('Role')
    this.labelEmail = page.getByText('Email')
    this.labelNameFirst = page.getByText('First name')
    this.labelNameLast = page.getByText('Last name')
    this.labelRole = page.getByText('Role')
  }

  async load() {
    await this.page.goto(dependencies.routeModel.usersUserNew())
  }

  async inputData(options: OptionsInputData) {
    await this.fieldNameFirst.fill(options.nameFirst)
    await this.fieldNameLast.fill(options.nameLast)
    await this.fieldEmail.fill(options.email)
    await this.fieldRole.fill(options.role)
  }

  async submit() {
    await this.buttonSubmit.click()
  }
}
