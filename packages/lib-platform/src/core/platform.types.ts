import { Platform } from './platform'

export type PlatformConstructor = {
  construct(parameters: PlatformParameters): Promise<object>
}
export type PlatformConstructors = {
  clients?: Record<string, Record<string, PlatformConstructor>>
  components?: Record<string, PlatformConstructor>
  controllers?: Record<string, PlatformConstructor>
  modules?: Record<string, PlatformConstructor>
  providers?: Record<string, PlatformConstructor>
}
export type PlatformParameters = {
  constructors?: PlatformConstructors
  platform: Platform
}

export type PlatformDefinition =
  | PlatformDefinitionClient
  | PlatformDefinitionComponent
  | PlatformDefinitionController
  | PlatformDefinitionModule
  | PlatformDefinitionProvider
type PlatformDefinitionBase = {
  constructors?: PlatformConstructors
  exportName?: string
  module?: PlatformDefinitionModule
  name: string
  preload?: PlatformDefinition[]
  url?: string
  version?: string
}
export type PlatformDefinitionComponent = { instance?: string; type: 'component' } & PlatformDefinitionBase
export type PlatformDefinitionClient = { type: 'client'; variant?: string } & PlatformDefinitionBase
export type PlatformDefinitionController = { type: 'controller' } & PlatformDefinitionBase
export type PlatformDefinitionModule = { type: 'module' } & Omit<PlatformDefinitionBase, 'module'>
export type PlatformDefinitionProvider = { type: 'provider' } & PlatformDefinitionBase
