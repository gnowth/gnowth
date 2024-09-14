import type { PlatformParameters } from '../core/platform'
import type { EventStream } from './events.streams'
import type { PlatformEvent } from './events.types'

import { PlatformConstant } from '../core/platform'

type Parameters = { eventStream: EventStream } & PlatformParameters
export class EventService {
  #eventStream: EventStream

  constructor(parameters: Parameters) {
    this.#eventStream = parameters.eventStream
  }

  static async construct(parameters: PlatformParameters): Promise<EventService> {
    const eventStream = await parameters.platform.providerGet<EventStream>({
      name: PlatformConstant.eventStream,
      type: 'provider',
    })
    return new this({ ...parameters, eventStream })
  }

  dispatch(event: PlatformEvent): void {
    this.#eventStream.next(event)
  }

  subscribe(callback: (event: PlatformEvent) => void): () => void {
    const subscription = this.#eventStream.eventOut.subscribe(callback)
    return () => subscription.unsubscribe()
  }
}
