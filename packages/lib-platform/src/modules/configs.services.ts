import { ConfigEnvironment } from './configs.types'

export class ConfigService {
  #environmentFromHostname(hostname: string): ConfigEnvironment {
    if (hostname === 'localhost') {
      return 'local'
    }

    const environmentMaybe = hostname.split('.').at(0)
    if (this.#guardConfigEnvironment(environmentMaybe)) {
      return environmentMaybe
    }

    if (environmentMaybe?.startsWith('preview')) {
      return 'preview'
    }

    return 'prod'
  }

  #guardConfigEnvironment(environment?: string): environment is ConfigEnvironment {
    const environments = ['dev', 'local', 'preview', 'prod', 'sit', 'sys', 'test', 'uat']
    return !!environment && environments.includes(environment)
  }

  async detail<Configs>(): Promise<Configs> {
    return {
      env: 'prd',
    } as Configs
  }
}
