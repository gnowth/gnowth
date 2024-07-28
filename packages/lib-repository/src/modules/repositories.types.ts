import type { RepositoryModule, RepositoryService } from './repositories.modules'

export type RepositoryModuleDefinition = {
  Constructor?: typeof RepositoryModule
  name: string
  preload?: RepositoryModuleDefinition[]
  url?: string
}

// TODO: check if this is right
export type DependencyRecord = {
  mfes?: Record<string, unknown>
  resources?: Record<string, unknown>
  services?: Record<string, typeof RepositoryService>
  streams?: Record<string, unknown>
}
