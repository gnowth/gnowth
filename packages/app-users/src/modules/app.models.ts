export class ModelApp {
  namespace = 'users' as const

  routes = {
    changelog: () => `/${this.namespace}/changelog`,
    dashboard: () => `/${this.namespace}`,
    generated: (page = 'all') => `/${this.namespace}/generated/${page}`,
    group: (id?: string) => (id ? `/${this.namespace}/group?id=${id}` : `/${this.namespace}/group`),
    groups: () => `/${this.namespace}/groups`,
    reports: () => `/${this.namespace}/reports`,
    user: (id?: string) => (id ? `/${this.namespace}/user?id=${id}` : `/${this.namespace}/user`),
    users: () => `/${this.namespace}/users`,
  }
}
