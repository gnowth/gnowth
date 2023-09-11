import axios from 'axios'

import { configs } from '../configs'

// DEBT(investigation): to investigate around using sockets
export class ServiceNotifications {
  static routes = {
    notifications: (id = '') => `/${id}`,
  }

  axios = axios.create({
    baseURL: `${configs.apiOrigin}${configs.apiContextDefault}/notifications`,
    withCredentials: true,
  })
}

export const serviceNotifications = new ServiceNotifications()
