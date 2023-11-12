import faker from 'faker'
import { Factory, Model, RestSerializer, Server, createServer, hasMany } from 'miragejs'

interface Configs {
  env?: string
}

// TODO: fix types
interface Serv {
  namespace: string
  resource: (name: string) => void
}

// TODO: add mock data from faker
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function mockServerDummy(_configs: Configs): Server {
  return createServer({
    factories: {
      recipe: Factory.extend({
        // afterCreate(recipe: ModelInstance, server: Server) {
        //   recipe.update({
        //     ingredients: server.createList('ingredient', 5),
        //   })
        // },

        description() {
          return faker.lorem.paragraph()
        },

        designation() {
          return faker.lorem.sentence()
        },

        mediaPrimary() {
          return faker.image.food()
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
      // const t = server.create('recipe');
    },

    serializers: {
      application: RestSerializer,
      recipe: RestSerializer.extend({
        include: ['ingredients'],
      }),
    },
  })
}
