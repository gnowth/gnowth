import type { APIEvent, Event } from './events.types'

interface OptionsEvent {
  namespace: string
  apis?: APIEvent[]
}

// use for audit trail, analytics, communication between mfes
export class ServiceEvent {
  private apis: APIEvent[]
  private options: OptionsEvent

  constructor(options: OptionsEvent) {
    this.apis = options.apis ?? []
    this.options = options
  }

  // must allow to include/exclude event to certain apis
  async event(event: Event): Promise<void> {
    const promises = this.apis.map((api) => api.event({ event, namespace: this.options.namespace }))

    await Promise.allSettled(promises)
  }
}
