import type { Repository } from './repositories.main'
import type { RepositoryModuleDefinition } from './repositories.types'

type Configs = {
  dependencies: RepositoryModuleDefinition[]
  preloads: RepositoryModuleDefinition[]
}

type Parameters = {
  repository: Repository
}

export class RepositoryModule {
  protected repository: Repository

  constructor(parameters: Parameters) {
    this.repository = parameters.repository
  }

  async onInit(): Promise<void> {
    return
  }

  async onPrepare(): Promise<Configs> {
    return {
      dependencies: [],
      preloads: [],
    }
  }
}

export class RepositoryService extends RepositoryModule {}

export class RepositoryMFE extends RepositoryModule {}

export class RepositoryStream extends RepositoryModule {}

export class RepositoryResource extends RepositoryModule {}
