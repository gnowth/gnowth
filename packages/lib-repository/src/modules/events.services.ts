import type { RepositoryEvent } from './events.types'
import { EventEmitterService } from './event-emitters.exports'
import { RepositoryService } from './repositories.modules'
import { TokenService } from './repositories.tokens'

const EventConstant = {
  eventName: 'repositoryEventService/event',
} as const

export class EventService extends RepositoryService {
  #eventEmitterService!: EventEmitterService

  async onInit(): Promise<void> {
    this.#eventEmitterService = await this.repository.serviceGet({ name: TokenService.eventEmitter })
  }

  dispatch(event: RepositoryEvent): void {
    this.#eventEmitterService.dispatch(EventConstant.eventName, event)
  }

  subscribe(callback: (event: RepositoryEvent) => void): () => void {
    return this.#eventEmitterService.subscribe(EventConstant.eventName, callback)
  }
}
