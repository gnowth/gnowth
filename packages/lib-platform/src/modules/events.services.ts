import type { EventModule } from './events.modules'
import type { EventObservable } from './events.observables'
import type { PlatformEvent } from './events.types'

type Parameters = {
  eventObservable?: EventObservable
  module: EventModule
}

export class EventService {
  #eventObservable: EventObservable

  constructor(parameters: Required<Parameters>) {
    this.#eventObservable = parameters.eventObservable
  }

  static async construct(parameters: Parameters): Promise<EventService> {
    const eventObservable = await parameters.module.providerGet<EventObservable>({
      name: parameters.module.providerToken.observable,
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
