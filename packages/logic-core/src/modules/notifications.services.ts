import type { AxiosInstance } from 'axios'
import axios from 'axios'

import type { ConfigService } from './configs'

type Parameters = { dependencies: Dependencies }
type Dependencies = { configService: ConfigService }

// DEBT(investigation): to investigate around using sockets
export class NotificationService {
  static routes = {
    notifications: (id = '') => `/${id}`,
  }

  #axios: AxiosInstance
  #parameters: Parameters
  #configService: ConfigService

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#configService = parameters.dependencies.configService

    const configs = this.#configService.getConfigs()
    this.#axios = axios.create({
      baseURL: `${configs.apiOrigin}${configs.apiContextDefault}/notifications`,
      withCredentials: true,
    })
  }
}
