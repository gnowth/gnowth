import type { DependencyMain } from './dependencies.main'

type Parameters = { dependencyMain: DependencyMain }

export class ResourceManager {
  #dependencyMain: DependencyMain
  #resources: Map<string, unknown> = new Map()

  constructor(parameters: Parameters) {
    this.#dependencyMain = parameters.dependencyMain
  }
}
