import { Subject } from 'rxjs'

import { Event } from './events.types'

export class EventStream {
  stream = new Subject<Event>()
}
