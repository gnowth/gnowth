// import { utils } from '@gnowth/lib-util';
// import { pluralize } from 'inflected';
// import { Factory, Model as MirageModel, createServer } from 'miragejs';

// interface Configs {
//   env?: string;
//   environment: ModelEnvironment;
// }

// function mockServer(configs: Configs) {
//   return createServer({
//     models: utils.compose(
//       utils.mapValues(() => MirageModel),
//       utils.pickBy((model: Model) => model.d),
//     )(configs.environment.models),

//     factories: {
//       recipe: Factory.extend({
//         name(i: string) {
//           return `recipe${i}`;
//         },

//         cuisine: 'Asian',
//       }),

//       movie: Factory.extend({
//         name: 'name',
//         year: 2013,
//       }),
//     },

//     routes() {
//       this.namespace = 'api';

//       utils.compose(
//         utils.mapValues((value, key: string) => pluralize(key)),
//         utils.pickBy((model: Model) => model.d),
//       )(configs.environment.models);
//       // this.resource('recipes');
//       // this.resource('movies');
//     },
//   });
// }

// export default mockServer;

export const mockServer = (): null => null
