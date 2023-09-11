import axios from 'axios'

import { configs } from '../configs'

type Configs = Partial<typeof configs>

export class ServiceConfigs {
  routes = {
    configs: (id: string) => `/${id}`,
  }

  axios = axios.create({
    baseURL: `${configs.apiOrigin}${configs.apiContextDefault}/configs`,
    withCredentials: true,
  })

  getConfigsEnvironment = (): Promise<Configs> => {
    return Promise.resolve({})
  }

  getConfigsUser = (): Promise<Configs> => {
    return Promise.resolve({})
  }
}

export const serviceConfigs = new ServiceConfigs()
