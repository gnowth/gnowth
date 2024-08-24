import type { EventObservable } from './events.observables'
import type { PlatformEvent } from './events.types'

import { PlatformConstant, type PlatformParameters } from '../core/platform'

type Parameters = { eventObservable: EventObservable } & PlatformParameters
export class EventService {
  #eventObservable: EventObservable

  constructor(parameters: Parameters) {
    this.#eventObservable = parameters.eventObservable
  }

  static async construct(parameters: PlatformParameters): Promise<EventService> {
    const eventObservable = await parameters.platform.providerGet<EventObservable>({
      name: PlatformConstant.eventObservable,
      type: 'provider',
    })
    return new this({ ...parameters, eventObservable: eventObservable })
  }

  dispatch(event: PlatformEvent): void {
    this.#eventObservable.next(event)
  }

  subscribe(callback: (event: PlatformEvent) => void): () => void {
    const subscription = this.#eventObservable.eventOut.subscribe(callback)
    return () => subscription.unsubscribe()
  }
}
