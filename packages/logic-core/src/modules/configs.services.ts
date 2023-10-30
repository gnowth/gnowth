import type { AxiosInstance } from 'axios'
import axios from 'axios'

type Environment = 'local' | 'dev' | 'sit' | 'uat' | 'sys' | 'test' | 'prod'
type Parameters = { configs: Configs }
export type Configs = {
  apiContextDefault: string
  apiOrigin: string
}

// TODO: new service to provider locale/internationalisation
// TODO: allow config from local, environment variable, online config
export class ServiceConfigs {
  routes = {
    configs: (id: string) => `/${id}`,
  }

  #axios: AxiosInstance
  #configs: Configs
  #parameters: Parameters

  constructor(parameters: Parameters) {
    this.#parameters = parameters
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
