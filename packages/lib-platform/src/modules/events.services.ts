import { PlatformConstant, PlatformParameters } from '../core/platform'
import { EventStream } from './events.streams'
import { PlatformEvent } from './events.types'

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
