import { Observable, Subject } from 'rxjs'

import type { Platform } from '../core/platform'
import type { EventModule } from './events.modules'
import type { PlatformEvent } from './events.types'

type Parameters = {
  module: EventModule
  platform: Platform
}
export class EventObservable {
  eventIn: Subject<PlatformEvent>
  eventOut: Observable<PlatformEvent>

  constructor() {
    this.eventIn = new Subject()
    this.eventOut = this.eventIn
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async construct(parameters: Parameters): Promise<EventObservable> {
    return new this()
  }

  next(event: PlatformEvent) {
    return this.eventIn.next(event)
  }
}
