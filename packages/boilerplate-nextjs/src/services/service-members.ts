import type { QueryFunctionContext } from 'react-query'
import axios from 'axios'

import type { Detail, List } from '../models/model-axios'
import type { Member } from '../models/model-member'
import type { MemberFilterSerialized } from '../models/model-member-filter'
import type { ServiceQueryKeyDetail, ServiceQueryKeyList } from '../types'
import ModelAxios from '../models/model-axios'
import ModelMember from '../models/model-member'
import configs from '../configs'

class ServiceMembers {
  static routes = {
    members: (id = '') => `/${id}`,
  }

  axios = axios.create({
    baseURL: `${configs.apiOrigin}${configs.apiContextDefault}/members`,
    withCredentials: true,
  })

  queryKeys = {
    detail: (id: string) => [{ id, entity: 'detail', scope: 'members' }],
    list: (filters: MemberFilterSerialized) => [{ filters, entity: 'list', scope: 'members' }],
  }

  detail = (configs: QueryFunctionContext<ServiceQueryKeyDetail[]>) => {
    return this.axios
      .get<Detail<Member>>(ServiceMembers.routes.members(configs.queryKey[0].id), { signal: configs.signal })
      .then(ModelAxios.toData)
      .then(ModelMember.deserialize)
  }

  list = (configs: QueryFunctionContext<ServiceQueryKeyList<MemberFilterSerialized>[]>) => {
    return this.axios
      .get<List<Member>>(ServiceMembers.routes.members(), {
        params: configs.queryKey[0].filters,
        signal: configs.signal,
      })
      .then(ModelAxios.toDataList)
      .then(ModelAxios.listDeserializer(ModelMember.deserialize))
  }

  save = (member: Member) => {
    return this.axios.post(ServiceMembers.routes.members(member.id), ModelMember.serialize(member))
  }
}

export default new ServiceMembers()
