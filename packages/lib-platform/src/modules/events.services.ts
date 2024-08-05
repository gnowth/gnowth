import type { Platform } from '../core/platform.main'
import type { PlatformEvent } from './events.types'

import { PlatformService } from '../core/platform.modules'
import { TokenService } from '../core/platform.tokens'
import { EventEmitterService } from './event-emitters'

const EventConstant = {
  eventName: 'platformEventService/event',
} as const

type Dependencies = {
  eventEmitterService: EventEmitterService
}

type ConstructParameters = {
  platform: Platform
}

type Parameters = {
  dependencies: Dependencies
  platform: Platform
}

export class EventService extends PlatformService {
  #dependencies: Dependencies

  constructor(parameters: Parameters) {
    super(parameters)
    this.#dependencies = parameters.dependencies
  }

  static async construct(parameters: ConstructParameters): Promise<EventService> {
    const eventEmitterService = await parameters.platform.serviceGet<EventEmitterService>({
      name: TokenService.eventEmitter,
    })
    return new this({ dependencies: { eventEmitterService }, platform: parameters.platform })
  }

  dispatch(event: PlatformEvent): void {
    this.#dependencies.eventEmitterService.dispatch(EventConstant.eventName, event)
  }

  subscribe(callback: (event: PlatformEvent) => void): () => void {
    return this.#dependencies.eventEmitterService.subscribe(EventConstant.eventName, callback)
  }
}
