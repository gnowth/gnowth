import { Subject } from 'rxjs'

interface Event {
  id: string
}

export class StreamEvents {
  stream = new Subject<Event>()
}
