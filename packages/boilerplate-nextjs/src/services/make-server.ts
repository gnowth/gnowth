import { createServer } from 'miragejs'

import { MockConfigs } from '../types'
import { configsMember } from './service-members'

// function mergeConfigs() {

// }

// function server() {
//   return createServer({
//     factories: {
//       ...configsMember.factories,
//     },
//     models: {
//       ...configsMember.models,
//     },
//   })
// }

function makeServer(configs: MockConfigs) {
  return createServer({ ...configs, ...configsMember })
}

export default makeServer
