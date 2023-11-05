import type { Dependency } from './dependencies.main'
import type { Repository } from './repositories'

export type DependencyType = DependencyTypeMfe | DependencyTypeResource | DependencyTypeService
export type DependencyConstructor = {
  getDependencies: () => DependencyType[]
  getPreloads: () => DependencyType[]
  new (parameters: { repository: Repository }): Dependency
}

type DependencyTypeMfe = {
  name: string
  type: 'mfe'
  url?: string
}

type DependencyTypeResource = {
  name: string
  type: 'resource'
  url?: string
}

export type DependencyTypeService = {
  name: string
  service?: DependencyConstructor
  type: 'service'
  url?: string
}
