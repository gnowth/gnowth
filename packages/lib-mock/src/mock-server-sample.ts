import type { ModelInstance } from 'miragejs'
import faker from 'faker'
import { Factory, Model, RestSerializer, Server, createServer, hasMany } from 'miragejs'

interface Configs {
  env?: string
}

// TODO: fix types
interface Serv {
  resource: (name: string) => void
}

// TODO: add mock data from faker
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mockServer(_configs: Configs): Server {
  return createServer({
    factories: {
      recipe: Factory.extend({
        afterCreate(recipe: ModelInstance, server: Server) {
          recipe.update({
            ingredients: server.createList('ingredient', 5),
          })
        },

        description() {
          return faker.lorem.paragraph()
        },

        designation() {
          return faker.lorem.sentence()
        },

        name() {
          return faker.lorem.words()
        },

        mediaPrimary() {
          return faker.image.food()
        },
      }),
    },

    models: {
      recipe: Model.extend({
        ingredients: hasMany(),
      }),
      ingredient: Model.extend({}),
    },

    serializers: {
      application: RestSerializer,
      recipe: RestSerializer.extend({
        include: ['ingredients'],
      }),
    },

    routes() {
      this.namespace = '/api/v1/recipes/'
      ;(this as unknown as Serv).resource('ingredients')
      ;(this as unknown as Serv).resource('recipes')
    },

    seeds(server) {
      server.createList('recipe', 10)
      // const t = server.create('recipe');
    },
  })
}

export default mockServer
