import type { Service } from './services'

export type DependencyDefinition =
  | DependencyDefinitionMfe
  | DependencyDefinitionResource
  | DependencyDefinitionService
  | DependencyDefinitionStream

type DependencyDefinitionMfe = {
  name: string
  type: 'mfe'
  url?: string
}

type DependencyDefinitionResource = {
  name: string
  type: 'resource'
  url?: string
}

export type DependencyDefinitionService = {
  Constructor?: { new (): Service }
  name: string
  type: 'service'
  url?: string
}

type DependencyDefinitionStream = {
  name: string
  type: 'stream'
  url?: string
}

export type DependencyRecord = {
  mfes?: Record<string, unknown>
  resources?: Record<string, unknown>
  services?: Record<string, { new (): Service }>
  streams?: Record<string, unknown>
}
