import { Locator, Page } from '@playwright/test'

export class TestModelHeader {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/spa/#/tasks')
  }

  get component(): Locator {
    return this.page.getByTestId('spa--layout-header')
  }

  get navRecipes() {
    return this.page.getByRole('link', { name: 'Recipes' })
  }

  get navTasks() {
    return this.page.getByRole('link', { name: 'Tasks' })
  }

  get titleText() {
    return this.page.getByText('Header')
  }
}
