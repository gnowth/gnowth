import type { AnyFactories, AnyModels, AnyResponse } from 'miragejs/-types'
import type { ServerConfig } from 'miragejs/server'

import { Server } from 'miragejs'

// DEBT: move to mock-server file
// DEBT(hack): dirty ts fix
export type MockServer = {
  // DEBT: why is this different from the one in boilerplate-nextjs?
  // resource?(endpoint: string): void
  serialize?(primaryResource: unknown, request: unknown): AnyResponse
} & Server

// DEBT(hack): dirty ts fix
export type MockConfigs = {
  routes?: (this: MockServer) => void
} & ServerConfig<AnyModels, AnyFactories>

export { Factory as MockFactory, Model as MockModel, createServer as mockServer } from 'miragejs'

export type { AnyResponse as MockResponseAny } from 'miragejs/-types'
