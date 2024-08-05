import type { Repository } from '../core/repositories.main'
import type { EventService } from './events'

import { RepositoryService } from '../core/repositories.modules'
import { TokenService } from '../core/repositories.tokens'
import { scriptImport, scriptInject } from './scripts.utils'

type ScriptParameters = {
  async?: boolean
  container?: HTMLElement
  defer?: boolean
  preload?: boolean
  url: string
}

type Dependencies = {
  eventService: EventService
}

type ConstructParameters = {
  repository: Repository
}

type Parameters = {
  dependencies: Dependencies
  repository: Repository
}

export class ScriptService extends RepositoryService {
  #dependencies: Dependencies

  constructor(parameters: Parameters) {
    super(parameters)
    this.#dependencies = parameters.dependencies
  }

  static async construct(parameters: ConstructParameters): Promise<ScriptService> {
    const eventService = await parameters.repository.serviceGet<EventService>({ name: TokenService.event })
    return new this({ dependencies: { eventService }, repository: parameters.repository })
  }

  async import(parameters: ScriptParameters) {
    return scriptImport(parameters)
  }

  async inject(parameters: ScriptParameters): Promise<Event> {
    return scriptInject(parameters)
  }
}
