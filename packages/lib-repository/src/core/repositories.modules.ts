import type { Repository } from './repositories.main'
import type { RepositoryModuleDefinition } from './repositories.types'

type Configs = {
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

  static async construct(parameters: Parameters): Promise<RepositoryModule> {
    return new this(parameters)
  }

  static async info(): Promise<Configs> {
    return {
      preloads: [],
    }
  }
}

export class RepositoryService extends RepositoryModule {}

export class RepositoryMFE extends RepositoryModule {}

export class RepositoryStream extends RepositoryModule {}

export class RepositoryResource extends RepositoryModule {}
