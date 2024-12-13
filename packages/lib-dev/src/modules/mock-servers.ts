import type { AnyFactories, AnyModels, AnyResponse } from 'miragejs/-types'
import type { ServerConfig } from 'miragejs/server'

import { Server } from 'miragejs'

// DEBT(hack): dirty ts fix
export type MockConfigs = ServerConfig<AnyModels, AnyFactories> & {
  routes?: (this: MockServer) => void
}

// DEBT: move to mock-server file
// DEBT(hack): dirty ts fix
export type MockServer = Server & {
  // DEBT: why is this different from the one in boilerplate-nextjs?
  // resource?(endpoint: string): void
  serialize?(primaryResource: unknown, request: unknown): AnyResponse
}

export { Factory as MockFactory, Model as MockModel, createServer as mockServer } from 'miragejs'

export type { AnyResponse as MockResponseAny } from 'miragejs/-types'
