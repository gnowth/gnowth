import { PlatformParameters } from '@gnowth/lib-react'

export class AppUserController {
  #routeContext = 'users'

  static async construct(_parameters: PlatformParameters): Promise<AppUserController> {
    return new this()
  }

  get routes() {
    return {
      changelog: () => `/${this.#routeContext}/changelog/`,
      dashboard: () => `/${this.#routeContext}/`,
      generated: (page = 'all') => `/${this.#routeContext}/generated/${page}/`,
      group: (id?: string) =>
        id ? `/${this.#routeContext}/group?id=${id}` : `/${this.#routeContext}/group/`,
      groups: () => `/${this.#routeContext}/groups/`,
      reports: () => `/${this.#routeContext}/reports/`,
      user: (id?: string) => (id ? `/${this.#routeContext}/user/?id=${id}` : `/${this.#routeContext}/user/`),
      users: () => `/${this.#routeContext}/users/`,
    }
  }
}
