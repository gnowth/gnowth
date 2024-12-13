import axios, { AxiosInstance } from 'axios'

export type Configs = {
  apiContextDefault: string
  apiOrigin: string
}
type Environment = 'dev' | 'local' | 'prod' | 'sit' | 'sys' | 'test' | 'uat'
type Parameters = { configs: Configs }

// TODO: new service to provider locale/internationalisation
// TODO: allow config from local, environment variable, online config
export class ConfigService {
  routes = {
    configs: (id: string) => `/${id}`,
  }

  #axios: AxiosInstance
  #configs: Configs

  constructor(parameters: Parameters) {
    this.#configs = parameters.configs
    this.#axios = axios.create({
      baseURL: `${this.#configs.apiOrigin}${this.#configs.apiContextDefault}/configs`,
      withCredentials: true,
    })
  }

  getConfigs() {
    return this.#configs
  }

  getConfigsEnvironment(): Promise<Configs> {
    return Promise.resolve({ apiContextDefault: '', apiOrigin: '' })
  }

  getConfigsUser(): Promise<Configs> {
    return Promise.resolve({ apiContextDefault: '', apiOrigin: '' })
  }

  getEnvironment(): Environment {
    return 'local'
  }
}
