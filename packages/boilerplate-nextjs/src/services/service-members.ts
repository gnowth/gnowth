import { faker } from '@faker-js/faker'
import { Factory, Model } from 'miragejs'
import axios from 'axios'
import type { QueryFunctionContext } from 'react-query'

import type { Detail, List } from '../models/model-axios'
import type { Member, MemberSerialized } from '../models/model-member'
import type { MemberFilterSerialized } from '../models/model-member-filter'
import type { ServiceQueryKeyDetail, ServiceQueryKeyList, MockConfigs } from '../types'
import ModelAxios from '../models/model-axios'
import ModelMember from '../models/model-member'
import SerializerRest from '../utils/serializer-rest'
import configs from '../configs'

export const configsMember: MockConfigs = {
  factories: {
    member: Factory.extend<MemberSerialized>({
      avatar: () => faker.internet.avatar(),
      nameFirst: () => faker.name.firstName(),
      nameLast: () => faker.name.lastName(),
      role: () => faker.name.title(),
      status: () => (faker.datatype.number(100) > 20 ? 'active' : 'deactivated'),
      email() {
        // DEBT: dirty ts fix, miragejs typescript is poor
        return faker.internet.email(this.nameFirst as string, this.nameLast as string)
      },
    }),
  },

  models: {
    member: Model.extend<MemberSerialized>({}),
  },

  routes() {
    this.namespace = 'boilerplate/v1'
    this.resource?.('members')

    this.passthrough()

    this.namespace = ''
    this.passthrough('/_next/**')
  },

  seeds(server) {
    server.createList('member', 20)
  },

  serializers: {
    application: SerializerRest,
  },
}

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
