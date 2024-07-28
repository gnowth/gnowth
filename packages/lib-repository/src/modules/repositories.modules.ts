import type { Repository } from './repositories.main'
import type { RepositoryModuleDefinition } from './repositories.types'

type Configs = {
  dependencies: RepositoryModuleDefinition[]
  preloads: RepositoryModuleDefinition[]
}

export class RepositoryModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onInit(_repository: Repository): Promise<void> {
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
