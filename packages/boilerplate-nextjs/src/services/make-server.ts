import type { AnyResponse } from 'miragejs/-types'
import { faker } from '@faker-js/faker'
import { Factory, Model, createServer } from 'miragejs'
import * as R from 'ramda'

import type { MemberSerialized } from '../models/model-member'
import type { MockConfigs, ServerEx } from '../types'
import ModelMemberFilter from '../models/model-member-filter'
import SerializerRest from '../utils/serializer-rest'
import configs from '../configs'

function makeServer(configsMock: MockConfigs) {
  return createServer({
    environment: configsMock.environment,

    factories: {
      member: Factory.extend<MemberSerialized>({
        avatar: () => faker.internet.avatar(),
        nameFirst: () => faker.name.firstName(),
        nameLast: () => faker.name.lastName(),
        role: () => faker.name.jobTitle(),
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
      this.passthrough('/_next/**')

      this.urlPrefix = configs.apiOrigin
      this.namespace = '/boilerplate/v1'
      this.resource?.('members')
      this.get('/members', function (this: ServerEx, schema, request) {
        // DEBT: dirty ts fix
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const members = schema.members.where(
          R.allPass([
            ModelMemberFilter.filterByEmail(request.queryParams?.email),
            ModelMemberFilter.filterByStatus(request.queryParams?.status),
          ]),
        )

        return this.serialize?.(members, 'application') as AnyResponse
      })

      this.passthrough()
    },

    seeds(server) {
      server.createList('member', 100)
    },

    serializers: { application: SerializerRest },
  } as MockConfigs)
}

export default makeServer
