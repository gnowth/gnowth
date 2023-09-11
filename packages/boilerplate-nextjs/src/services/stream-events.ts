import { Subject } from 'rxjs'

interface Event {
  id: string
}

// DEBT(investigation): where do we consume it?
export class StreamEvents {
  stream = new Subject<Event>()
}

export const streamEvents = new StreamEvents()
