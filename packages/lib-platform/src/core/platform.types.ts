import type { PlatformModule, PlatformService } from './platform.modules'

export type PlatformModuleDefinition = {
  Constructor?: typeof PlatformModule
  name: string
  preload?: PlatformModuleDefinition[]
  url?: string
}

// TODO: check if this is right
export type DependencyRecord = {
  mfes?: Record<string, unknown>
  resources?: Record<string, unknown>
  services?: Record<string, typeof PlatformService>
  streams?: Record<string, unknown>
}
