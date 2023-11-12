import type { Server } from 'miragejs'
import type { ServerConfig } from 'miragejs/server'
import type { AnyFactories, AnyModels, AnyResponse } from 'miragejs/-types'

// DEBT: move to mock-server file
// DEBT(hack): dirty ts fix
export interface MockServer extends Server {
  // DEBT: why is this different from the one in boilerplate-nextjs?
  // resource?(endpoint: string): void
  serialize?(primaryResource: unknown, request: unknown): AnyResponse
}

// DEBT(hack): dirty ts fix
export interface MockConfigs extends ServerConfig<AnyModels, AnyFactories> {
  routes?: (this: MockServer) => void
}

export type { AnyResponse as MockResponseAny } from 'miragejs/-types'

export { Factory as MockFactory, Model as MockModel, createServer as mockServer } from 'miragejs'
