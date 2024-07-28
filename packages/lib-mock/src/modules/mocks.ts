import type { Server } from 'miragejs'
import type { AnyFactories, AnyModels, AnyResponse } from 'miragejs/-types'
import type { ServerConfig } from 'miragejs/server'

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

export { Factory as MockFactory, Model as MockModel, createServer as mockServer } from 'miragejs'

export type { AnyResponse as MockResponseAny } from 'miragejs/-types'
