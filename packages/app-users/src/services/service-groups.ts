import type { Detail, List, ListVerbose, ServiceQueryKeyDetail, ServiceQueryKeyList } from '@app/core'
import type { QueryFunctionContext } from 'react-query'
import { ModelAxios } from '@app/core'
import axios from 'axios'

import type { Group, GroupSerialized } from '../models/model-group'
import type { GroupFilterSerialized } from '../models/model-group-filter'
import ModelGroup from '../models/model-group'
import configs from '../configs'

class ServiceGroups {
  static scope = 'groups'
  static routes = {
    groups: (id = '') => `/${id}`,
  }

  axios = axios.create({
    baseURL: `${configs.apiOrigin}${configs.apiContext}/v1/${ServiceGroups.scope}`,
    withCredentials: true,
  })

  queryKeys = {
    detail: (id: string) => [{ id, entity: 'detail', scope: ServiceGroups.scope }],
    list: (filters: GroupFilterSerialized) => [{ filters, entity: 'list', scope: ServiceGroups.scope }],
  }

  detail = (configs: QueryFunctionContext<ServiceQueryKeyDetail[]>): Promise<Group> => {
    return this.axios
      .get<Detail<GroupSerialized>>(ServiceGroups.routes.groups(configs.queryKey[0].id), {
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.detailDeserializer(ModelGroup.fromGroupSerialized))
  }

  list = (configs: QueryFunctionContext<ServiceQueryKeyList<GroupFilterSerialized>[]>) => {
    return this.axios
      .get<List<GroupSerialized>>(ServiceGroups.routes.groups(), {
        params: configs.queryKey[0].filters,
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.listDeserializer(ModelGroup.fromGroupSerialized))
  }

  listVerbose = (
    configs: QueryFunctionContext<ServiceQueryKeyList<GroupFilterSerialized>[]>,
  ): Promise<ListVerbose<Group>> => {
    return this.axios
      .get<List<GroupSerialized>>(ServiceGroups.routes.groups(), {
        params: configs.queryKey[0].filters,
        signal: configs.signal,
      })
      .then(ModelAxios.toData)
      .then(ModelAxios.listVerboseDeserializer(ModelGroup.fromGroupSerialized))
  }

  save = (group: Group): Promise<Group> => {
    const save = group.id === undefined ? this.axios.post : this.axios.put

    return save<Detail<GroupSerialized>>(
      ServiceGroups.routes.groups(group.id),
      ModelGroup.toGroupSerialized(group),
    )
      .then(ModelAxios.toData)
      .then(ModelAxios.detailDeserializer(ModelGroup.fromGroupSerialized))
  }
}

export default new ServiceGroups()
