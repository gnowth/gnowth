import { Locator, Page } from '@playwright/test'

export class HeaderTestModel {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/users')
  }

  get authLogin() {
    return this.page.getByText('Log in')
  }

  get authSignup() {
    return this.page.getByText('Sign up')
  }

  get component(): Locator {
    return this.page.getByTestId('app-users--section-header')
  }
  get navDashboard() {
    return this.page.getByRole('link', { name: 'Dashboard' })
  }

  get navMembers() {
    return this.page.getByRole('link', { name: 'Members' })
  }

  get navReports() {
    return this.page.getByRole('link', { name: 'Reports' })
  }

  get navTeams() {
    return this.page.getByRole('link', { name: 'Teams' })
  }

  get titleText() {
    return this.page.getByText('Teams App')
  }
}
