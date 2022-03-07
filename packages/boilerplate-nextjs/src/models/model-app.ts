class ModelApp {
  static routes = {
    changelogs: () => '/changelog',
    dashboard: () => '/',
    generated: (page = 'all') => `/generated/${page}`,
    member: (id?: string) => (id ? `/member?id=${id}` : '/member'),
    members: () => '/members',
    reports: () => '/reports',
    team: (id?: string) => (id ? `/team?id=${id}` : '/team'),
    teams: () => '/teams',
  }
}

export default ModelApp
