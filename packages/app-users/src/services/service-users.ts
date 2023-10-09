import type { Detail, List, ListVerbose, ServiceQueryKeyDetail, ServiceQueryKeyList } from '@gnowth/app-core'
import type { QueryFunctionContext } from 'react-query'
import { ModelAxios } from '@gnowth/app-core'
import axios from 'axios'

import type { User, UserSerialized } from '../models/model-user'
import type { UserFilterSerialized } from '../models/model-user-filter'
import { ModelUser } from '../models/model-user'
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
    list: (filters: UserFilterSerialized) => [{ entity: 'list', filters, scope: ServiceUsers.scope }],
  }

  detail = (configs: QueryFunctionContext<ServiceQueryKeyDetail[]>): Promise<User> => {
    return this.axios
      .get<Detail<UserSerialized>>(ServiceUsers.routes.users(configs.queryKey[0].id), {
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.detailDeserializer(ModelUser.fromUserSerialized))
  }

  list = (configs: QueryFunctionContext<ServiceQueryKeyList<UserFilterSerialized>[]>): Promise<User[]> => {
    return this.axios
      .get<List<UserSerialized>>(ServiceUsers.routes.users(), {
        params: configs.queryKey[0].filters,
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.listDeserializer(ModelUser.fromUserSerialized))
  }

  listVerbose = (
    configs: QueryFunctionContext<ServiceQueryKeyList<UserFilterSerialized>[]>,
  ): Promise<ListVerbose<User>> => {
    return this.axios
      .get<List<UserSerialized>>(ServiceUsers.routes.users(), {
        params: configs.queryKey[0].filters,
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.listVerboseDeserializer(ModelUser.fromUserSerialized))
  }

  save = (user: User): Promise<User> => {
    const save = ModelUser.getIdServer(user) === undefined ? this.axios.post : this.axios.put

    return save<Detail<UserSerialized>>(ServiceUsers.routes.users(user.id), ModelUser.toUserSerialized(user))
      .then(ModelAxios.toData)
      .then(ModelAxios.detailDeserializer(ModelUser.fromUserSerialized))
  }
}

export const serviceUsers = new ServiceUsers()
