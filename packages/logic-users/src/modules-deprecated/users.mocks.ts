// import { AnyResponse, MockConfigs, ServerEx } from '@gnowth/lib-mocks'
// import { RestMockSerializer, Factory, Model, createServer, faker } from '@gnowth/lib-mock'

// import { UserData } from './users.types'
// import { configs } from '../configs'
// import { dependencies } from '../dependencies'

// export function userMock(configsMock: MockConfigs) {
//   return createServer({
//     environment: configsMock.environment,

//     factories: {
//       user: Factory.extend<UserData>({
//         avatar: () => faker.internet.avatar(),
//         email() {
//           // DEBT(hack): dirty ts fix, miragejs typescript is poor
//           return faker.internet.email({
//             firstName: this.nameFirst as string,
//             lastName: this.nameLast as string,
//           })
//         },
//         nameFirst: () => faker.person.firstName(),
//         nameLast: () => faker.person.lastName(),
//         role: () => faker.person.jobTitle(),
//         status: () => (faker.number.int(100) > 20 ? 'active' : 'deactivated'),
//       }),
//     },

//     models: {
//       user: Model.extend<UserData>({}),
//     },

//     routes() {
//       this.passthrough('/_next/**')
//       this.passthrough('http://localhost:3000/**')
//       this.passthrough('http://localhost:4001/**')

//       this.timing = 20
//       this.urlPrefix = configs.apiOrigin
//       this.namespace = '/boilerplate/v1'
//       this.resource?.('users')
//       this.get('/users', function (this: ServerEx, schema, request) {
//         // DEBT(hack): dirty ts fix
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         const users = schema.users.where(
//           dependencies.userFilterModel.filter({ ...request.queryParams, sortBy: [] }),
//         )

//         return this.serialize?.(users, 'application') as AnyResponse
//       })

//       this.passthrough()
//     },

//     seeds(server) {
//       server.createList('user', 100)
//     },

//     serializers: { application: RestMockSerializer },
//   } as MockConfigs)
// }