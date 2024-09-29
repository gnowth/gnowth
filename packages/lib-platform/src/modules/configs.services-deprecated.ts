import axios, { AxiosInstance } from 'axios'

type Environment = 'dev' | 'local' | 'prod' | 'sit' | 'sys' | 'test' | 'uat'
type Parameters = { configs: Configs }
export type Configs = {
  apiContextDefault: string
  apiOrigin: string
}

// TODO: new service to provider locale/internationalisation
// TODO: allow config from local, environment variable, online config
export class ConfigService {
  #axios: AxiosInstance

  #configs: Configs
  routes = {
    configs: (id: string) => `/${id}`,
  }

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

// const SERVER_LOCAL_PORT = 3000

// interface Window {
//   location: {
//     hostname: string
//   }
// }

// // DEBT(hack): if we are doing server side rendering, setting the host this way won't be right
// function getWindow(): Window | undefined {
//   if (typeof window === 'undefined') return undefined
//   return window
// }

// const hostname = getWindow()?.location.hostname ?? 'localhost'

// export const configs = {
//   apiContextDefault: '/boilerplate/v1',
//   apiOrigin: hostname === 'localhost' ? `http://${hostname}:${SERVER_LOCAL_PORT}` : `https://api.${hostname}`,
//   webContext: '',
//   webHostname: hostname,
// }
