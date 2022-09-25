import type { MockConfigs, ServerEx } from '@app/core'
import type { AnyResponse } from 'miragejs/-types'
import { SerializerRest } from '@app/core'
import { faker } from '@faker-js/faker/locale/en'
import { Factory, Model, createServer } from 'miragejs'
import * as R from 'ramda'

import type { UserSerialized } from '../models/model-user'
import ModelUserFilter from '../models/model-user-filter'
import configs from '../configs'

function mockUsers(configsMock: MockConfigs) {
  return createServer({
    environment: configsMock.environment,

    factories: {
      user: Factory.extend<UserSerialized>({
        avatar: () => faker.internet.avatar(),
        nameFirst: () => faker.name.firstName(),
        nameLast: () => faker.name.lastName(),
        role: () => faker.name.jobTitle(),
        status: () => (faker.datatype.number(100) > 20 ? 'active' : 'deactivated'),
        email() {
          // DEBT(hack): dirty ts fix, miragejs typescript is poor
          return faker.internet.email(this.nameFirst as string, this.nameLast as string)
        },
      }),
    },

    models: {
      user: Model.extend<UserSerialized>({}),
    },

    routes() {
      this.passthrough('/_next/**')
      this.passthrough('http://localhost:4001/**')

      this.timing = 20
      this.urlPrefix = configs.apiOrigin
      this.namespace = '/boilerplate/v1'
      this.resource?.('users')
      this.get('/users', function (this: ServerEx, schema, request) {
        // DEBT(hack): dirty ts fix
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const users = schema.users.where(
          R.allPass([
            ModelUserFilter.filterByEmail(request.queryParams?.email),
            ModelUserFilter.filterByStatus(request.queryParams?.status),
          ]),
        )

        return this.serialize?.(users, 'application') as AnyResponse
      })

      this.passthrough()
    },

    seeds(server) {
      server.createList('user', 100)
    },

    serializers: { application: SerializerRest },
  } as MockConfigs)
}

export default mockUsers
