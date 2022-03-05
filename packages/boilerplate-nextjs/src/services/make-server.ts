import { createServer } from 'miragejs'

import { MockConfigs } from '../types'
import { configsMember } from './service-members'

function makeServer(configs: MockConfigs) {
  return createServer({ ...configs, ...configsMember })
}

export default makeServer
