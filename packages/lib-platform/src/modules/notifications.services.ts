import axios, { AxiosInstance } from 'axios'

import { ConfigService } from './configs.services-deprecated'

type Parameters = { configService: ConfigService }

// DEBT(investigation): to investigate around using sockets
export class NotificationService {
  static readonly routes = {
    notifications: (id = '') => `/${id}`,
  }

  #axios: AxiosInstance
  #configService: ConfigService

  constructor(parameters: Parameters) {
    this.#configService = parameters.configService

    const configs = this.#configService.getConfigs()
    this.#axios = axios.create({
      baseURL: `${configs.apiOrigin}${configs.apiContextDefault}/notifications`,
      withCredentials: true,
    })
  }
}
