import { Observable, Subject } from 'rxjs'

import { PlatformParameters } from '../core/platform'
import { PlatformEvent } from './events.types'

export class EventStream {
  eventIn: Subject<PlatformEvent>
  eventOut: Observable<PlatformEvent>

  constructor() {
    this.eventIn = new Subject()
    this.eventOut = this.eventIn
  }

  static async construct(_parameters: PlatformParameters): Promise<EventStream> {
    return new this()
  }

  next(event: PlatformEvent) {
    return this.eventIn.next(event)
  }
}
