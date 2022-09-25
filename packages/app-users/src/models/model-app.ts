class ModelApp {
  static namespace = 'users' as const

  static routes = {
    changelog: () => `/${ModelApp.namespace}/changelog`,
    dashboard: () => `/${ModelApp.namespace}`,
    generated: (page = 'all') => `/${ModelApp.namespace}/generated/${page}`,
    group: (id?: string) => (id ? `/${ModelApp.namespace}/group?id=${id}` : `/${ModelApp.namespace}/group`),
    groups: () => `/${ModelApp.namespace}/groups`,
    reports: () => `/${ModelApp.namespace}/reports`,
    user: (id?: string) => (id ? `/${ModelApp.namespace}/user?id=${id}` : `/${ModelApp.namespace}/user`),
    users: () => `/${ModelApp.namespace}/users`,
  }
}

export default ModelApp
