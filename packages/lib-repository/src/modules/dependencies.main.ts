import type { DependencyType } from './dependencies.types'
import type { Repository } from './repositories.main'

type Parameters = { repository: Repository }

export class Dependency {
  static getDependencies(): DependencyType[] {
    return []
  }

  static getPreloads(): DependencyType[] {
    return []
  }

  repository: Repository

  constructor(parameters: Parameters) {
    this.repository = parameters.repository
  }
}
