import type { PlatformModule } from './platform-module.main'

type Parameters = { module: PlatformModule }
type PlatformProvider = object
export interface PlatformProviderConstructor {
  construct(parameters: Parameters): Promise<PlatformProvider>
}

export type PlatformModuleDefinition = {
  modules?: Record<string, typeof PlatformModule>
  name: string
  preload?: PlatformModuleDefinition[]
  url?: string
  version?: string
}

export type PlatformProviderDefinition = {
  name: string
}

export type PlatformComponentDefinition = {
  instance?: string // for loader, to reuse an instance
  name: string
}
