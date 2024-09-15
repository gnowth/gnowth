import axios, { AxiosInstance } from 'axios'

import { ConfigService } from './configs.services-deprecated'

type Parameters = { configService: ConfigService }

// DEBT(investigation): to investigate around using sockets
export class NotificationService {
  static routes = {
    notifications: (id = '') => `/${id}`,
  }

  #axios: AxiosInstance
  #configService: ConfigService
  #parameters: Parameters

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#configService = parameters.configService

    const configs = this.#configService.getConfigs()
    this.#axios = axios.create({
      baseURL: `${configs.apiOrigin}${configs.apiContextDefault}/notifications`,
      withCredentials: true,
    })
  }
}
