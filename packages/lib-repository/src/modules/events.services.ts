import type { Repository } from '../core/repositories.main'
import type { RepositoryEvent } from './events.types'

import { RepositoryService } from '../core/repositories.modules'
import { TokenService } from '../core/repositories.tokens'
import { EventEmitterService } from './event-emitters'

const EventConstant = {
  eventName: 'repositoryEventService/event',
} as const

type Dependencies = {
  eventEmitterService: EventEmitterService
}

type ConstructParameters = {
  repository: Repository
}

type Parameters = {
  dependencies: Dependencies
  repository: Repository
}

export class EventService extends RepositoryService {
  #dependencies: Dependencies

  constructor(parameters: Parameters) {
    super(parameters)
    this.#dependencies = parameters.dependencies
  }

  static async construct(parameters: ConstructParameters): Promise<EventService> {
    const eventEmitterService = await parameters.repository.serviceGet<EventEmitterService>({
      name: TokenService.eventEmitter,
    })
    return new this({ dependencies: { eventEmitterService }, repository: parameters.repository })
  }

  dispatch(event: RepositoryEvent): void {
    this.#dependencies.eventEmitterService.dispatch(EventConstant.eventName, event)
  }

  subscribe(callback: (event: RepositoryEvent) => void): () => void {
    return this.#dependencies.eventEmitterService.subscribe(EventConstant.eventName, callback)
  }
}
