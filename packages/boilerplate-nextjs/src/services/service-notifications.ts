import axios from 'axios'

import configs from '../configs'

// DEBT: to investigate around using sockets
class ServiceNotifications {
  static routes = {
    notifications: (id = '') => `/${id}`,
  }

  axios = axios.create({
    baseURL: `${configs.apiOrigin}${configs.apiContextDefault}/notifications`,
    withCredentials: true,
  })
}

export default new ServiceNotifications()
