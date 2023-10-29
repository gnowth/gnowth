type Environment = 'local' | 'dev' | 'sit' | 'uat' | 'sys' | 'test' | 'prod'

// TODO: new service to provider locale/internationalisation
// TODO: allow config from local, environment variable, online config
export class ServiceConfig {
  test() {
    return
  }

  getEnvironment(): Environment {
    return 'local'
  }
}
