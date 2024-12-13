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
export type PlatformDefinition =
  | PlatformDefinitionClient
  | PlatformDefinitionComponent
  | PlatformDefinitionController
  | PlatformDefinitionModule
  | PlatformDefinitionProvider

export type PlatformDefinitionClient = PlatformDefinitionBase & { type: 'client'; variant?: string }
export type PlatformDefinitionComponent = PlatformDefinitionBase & { instance?: string; type: 'component' }
export type PlatformDefinitionController = PlatformDefinitionBase & { type: 'controller' }
export type PlatformDefinitionModule = Omit<PlatformDefinitionBase, 'module'> & { type: 'module' }
export type PlatformDefinitionProvider = PlatformDefinitionBase & { type: 'provider' }
export type PlatformParameters = {
  constructors?: PlatformConstructors
  platform: Platform
}
type PlatformDefinitionBase = {
  constructors?: PlatformConstructors
  exportName?: string
  module?: PlatformDefinitionModule
  name: string
  preload?: PlatformDefinition[]
  url?: string
  version?: string
}
