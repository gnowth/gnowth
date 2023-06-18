import axios from 'axios'

import configs from '../configs'

// DEBT(investigation): to investigate around using sockets
class ServiceNotifications {
  static routes = {
    notifications: (id = '') => `/${id}`,
  }

  axios = axios.create({
    baseURL: `${configs.apiOrigin}${configs.apiContextDefault}/notifications`,
    withCredentials: true,
  })
}

const serviceNotifications = new ServiceNotifications()

export default serviceNotifications
