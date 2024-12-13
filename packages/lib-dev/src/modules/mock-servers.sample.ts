import { faker } from '@faker-js/faker'
import { createServer, Factory, hasMany, Model, RestSerializer, Server } from 'miragejs'

type Configs = {
  env?: string
}

// TODO: fix types
type Serv = {
  namespace: string
  resource: (name: string) => void
}

// TODO: add mock data from faker
export function mockServerDummy(_configs: Configs): Server {
  return createServer({
    factories: {
      recipe: Factory.extend({
        description() {
          return faker.lorem.paragraph()
        },

        designation() {
          return faker.lorem.sentence()
        },

        mediaPrimary() {
          return faker.image.urlLoremFlickr({ category: 'food' })
        },
        name() {
          return faker.lorem.words()
        },
      }),
    },

    models: {
      ingredient: Model.extend({}),
      recipe: Model.extend({
        ingredients: hasMany(),
      }),
    },

    routes() {
      const self = this as unknown as Serv
      self.namespace = '/api/v1/recipes/'
      self.resource('ingredients')
      self.resource('recipes')
    },

    seeds(server) {
      server.createList('recipe', 10)
    },

    serializers: {
      application: RestSerializer,
      recipe: RestSerializer.extend({
        include: ['ingredients'],
      }),
    },
  })
}
