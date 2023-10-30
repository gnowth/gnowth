import type { AxiosInstance } from 'axios'
import axios from 'axios'

import type { ServiceConfigs } from './configs'

type Parameters = { dependencies: Dependencies }
type Dependencies = { serviceConfigs: ServiceConfigs }

// DEBT(investigation): to investigate around using sockets
export class ServiceNotifications {
  static routes = {
    notifications: (id = '') => `/${id}`,
  }

  #axios: AxiosInstance
  #parameters: Parameters
  #serviceConfigs: ServiceConfigs

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#serviceConfigs = parameters.dependencies.serviceConfigs

    const configs = this.#serviceConfigs.getConfigs()
    this.#axios = axios.create({
      baseURL: `${configs.apiOrigin}${configs.apiContextDefault}/notifications`,
      withCredentials: true,
    })
  }
}
