import type { Server } from 'miragejs'
import type { ServerConfig } from 'miragejs/server'
import type { AnyFactories, AnyModels, AnyResponse } from 'miragejs/-types'
import type { ComponentType } from 'react'

// DEBT: move to mock-server file
// DEBT(hack): dirty ts fix
export interface ServerEx extends Server {
  // DEBT: why is this different from the one in boilerplate-nextjs?
  // resource?(endpoint: string): void
  serialize?(primaryResource: unknown, request: unknown): AnyResponse
}

// DEBT(hack): dirty ts fix
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

// eslint-disable-next-line @typescript-eslint/ban-types
export type HigherComponent<Props = {}, Props2 = Props> = (
  Component: ComponentType<Props>,
) => ComponentType<Props2>
