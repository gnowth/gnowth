import { Subject } from 'rxjs'

import type { Event } from './events.types'

export class StreamEvents {
  stream = new Subject<Event>()
}
