import type { Server } from 'miragejs'
import type { ServerConfig } from 'miragejs/server'
import type { AnyFactories, AnyModels } from 'miragejs/-types'

interface ServerEx extends Server {
  resource?(endpoint: string): void
}

// DEBT: dirty ts fix
export interface MockConfigs extends ServerConfig<AnyModels, AnyFactories> {
  routes?: (this: ServerEx) => void
}

export interface ServiceQueryKeyDetail {
  entity: string
  id: string
  scope: string
}

export interface ServiceQueryKeyList<Filters = Record<string, string>> {
  entity: string
  filters: Filters
  scope: string
}
