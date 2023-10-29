import type { QueryFunctionContext } from 'react-query'
import axios from 'axios'

import type { Detail, List, ListVerbose } from './axios'
import type { ServiceQueryKeyDetail, ServiceQueryKeyList } from './queries'
import type { Group, GroupData, ModelGroup } from './groups.models'
import type { GroupFilterData } from './group-filters.models'
import { configs } from '../configs'
import { ModelAxios } from './axios'

type Parameters = { dependencies: Dependencies }
type Dependencies = { modelGroup: ModelGroup }

export class ServiceGroups {
  static scope = 'groups'
  static routes = {
    groups: (id = '') => `/${id}`,
  }

  axios = axios.create({
    baseURL: `${configs.apiOrigin}${configs.apiContext}/v1/${ServiceGroups.scope}`,
    withCredentials: true,
  })

  queryKeys = {
    detail: (id: string) => [{ entity: 'detail', id, scope: ServiceGroups.scope }],
    list: (filters: GroupFilterData) => [{ entity: 'list', filters, scope: ServiceGroups.scope }],
  }

  #parameters: Parameters
  #modelGroup: ModelGroup

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#modelGroup = parameters.dependencies.modelGroup
  }

  detail = (configs: QueryFunctionContext<ServiceQueryKeyDetail[]>): Promise<Group> => {
    return this.axios
      .get<Detail<GroupData>>(ServiceGroups.routes.groups(configs.queryKey[0].id), {
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.detailDeserializer(this.#modelGroup.fromData))
  }

  list = (configs: QueryFunctionContext<ServiceQueryKeyList<GroupFilterData>[]>) => {
    return this.axios
      .get<List<GroupData>>(ServiceGroups.routes.groups(), {
        params: configs.queryKey[0].filters,
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.listDeserializer(this.#modelGroup.fromData))
  }

  listVerbose = (
    configs: QueryFunctionContext<ServiceQueryKeyList<GroupFilterData>[]>,
  ): Promise<ListVerbose<Group>> => {
    return this.axios
      .get<List<GroupData>>(ServiceGroups.routes.groups(), {
        params: configs.queryKey[0].filters,
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.listVerboseDeserializer(this.#modelGroup.fromData))
  }

  save = (group: Group): Promise<Group> => {
    const save = group.id === undefined ? this.axios.post : this.axios.put

    return save<Detail<GroupData>>(ServiceGroups.routes.groups(group.id), this.#modelGroup.toData(group))
      .then(ModelAxios.toData)
      .then(ModelAxios.detailDeserializer(this.#modelGroup.fromData))
  }
}
