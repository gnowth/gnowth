import { Subject } from 'rxjs'

import type { Event } from './events.types'

export class EventStream {
  stream = new Subject<Event>()
}
