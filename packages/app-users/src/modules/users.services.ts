import type { QueryFunctionContext } from 'react-query'
import axios from 'axios'

import type { Detail, List, ListVerbose } from './axios'
import type { ServiceQueryKeyDetail, ServiceQueryKeyList } from './queries'
import type { User, UserData } from './users.models'
import type { UserFilterData } from './user-filters.models'
import { ModelAxios } from './axios'
import { ModelUser } from './users.models'
import { configs } from '../configs'

export class ServiceUsers {
  static scope = 'users'

  static routes = {
    users: (id = '') => `/${id}`,
  }

  axios = axios.create({
    baseURL: `${configs.apiOrigin}${configs.apiContext}/v1/${ServiceUsers.scope}`,
    withCredentials: true,
  })

  queryKeys = {
    detail: (id: string) => [{ entity: 'detail', id, scope: ServiceUsers.scope }],
    list: (filters: UserFilterData) => [{ entity: 'list', filters, scope: ServiceUsers.scope }],
  }

  detail = (configs: QueryFunctionContext<ServiceQueryKeyDetail[]>): Promise<User> => {
    return this.axios
      .get<Detail<UserData>>(ServiceUsers.routes.users(configs.queryKey[0].id), {
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.detailDeserializer(ModelUser.fromData))
  }

  list = (configs: QueryFunctionContext<ServiceQueryKeyList<UserFilterData>[]>): Promise<User[]> => {
    return this.axios
      .get<List<UserData>>(ServiceUsers.routes.users(), {
        params: configs.queryKey[0].filters,
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.listDeserializer(ModelUser.fromData))
  }

  listVerbose = (
    configs: QueryFunctionContext<ServiceQueryKeyList<UserFilterData>[]>,
  ): Promise<ListVerbose<User>> => {
    return this.axios
      .get<List<UserData>>(ServiceUsers.routes.users(), {
        params: configs.queryKey[0].filters,
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.listVerboseDeserializer(ModelUser.fromData))
  }

  save = (user: User): Promise<User> => {
    const save = ModelUser.getIdServer(user) === undefined ? this.axios.post : this.axios.put

    return save<Detail<UserData>>(ServiceUsers.routes.users(user.id), ModelUser.toData(user))
      .then(ModelAxios.toData)
      .then(ModelAxios.detailDeserializer(ModelUser.fromData))
  }
}

export const serviceUsers = new ServiceUsers()
