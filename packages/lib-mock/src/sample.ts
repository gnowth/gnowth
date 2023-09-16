import { Factory, Model, createServer } from 'miragejs'

export function mockServer(): unknown {
  return createServer({
    factories: {
      movie: Factory.extend({
        name: 'name',
        year: 2013,
      }),
      recipe: Factory.extend({
        cuisine: 'Asian',
        name(i: string) {
          return `recipe${i}`
        },
      }),
    },

    models: {
      movie: Model,
      recipe: Model,
    },

    routes() {
      this.namespace = 'api'
      this.timing = 200

      // this.get('/api/users', () => [
      //   { id: '1', name: 'Luke' },
      //   { id: '2', name: 'Leia' },
      //   { id: '3', name: 'Anakin' },
      // ]);

      // this.resource('recipes');
      // this.resource('movies');
      this.get('/recipes')
      this.get('/recipes/:id')
      this.post('/recipes')
      this.patch('/recipes/:id')
      this.del('/recipes/:id')

      // Responding to a POST request
      // this.post('/movies', (schema, request) => {
      //   const attrs = JSON.parse(request.requestBody);
      //   attrs.id = Math.floor(Math.random() * 100);

      //   return { movie: attrs };
      // });

      // Using the `timing` option to slow down the response
      // this.delete('/movies/:id', (schema, request) =>
      //   schema.movies.find(request.params.id).destroy(),
      // );
      // this.get('/movies', (schema) => schema.movies.all(), { timing: 4000 });
      // this.get('/movies/:id', (schema, request) => schema.movies.find(request.params.id));
      // this.patch('/movies/:id', (schema, request) => {
      //   const newAttrs = JSON.parse(request.requestBody);
      //   const movie = schema.movies.find(request.params.id);

      //   return movie.update(newAttrs);
      // });
      // this.post('/movies', (schema, request) => {
      //   const attrs = JSON.parse(request.requestBody);

      //   return schema.movies.create(attrs);
      // });

      // // Using the `Response` class to return a 500
      // this.delete('/films/1', () => {
      //   const headers = {};
      //   const data = { errors: ['Server did not respond'] };

      //   return new Response(500, headers, data);
      // });
    },

    seeds(server) {
      server.create('movie', { name: 'Inception', year: 2010 })
      server.create('movie', { name: 'Interstellar', year: 2014 })
      server.create('movie', { name: 'Dunkirk', year: 2017 })
      server.create('recipe', { cuisine: 'Mex' })
      server.createList('recipe', 10)
    },
  })
}
