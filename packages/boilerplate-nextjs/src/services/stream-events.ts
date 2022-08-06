import { Subject } from 'rxjs'

interface Event {
  id: string
}

// DEBT(investigation): where do we consume it?
class StreamEvents {
  stream = new Subject<Event>()
}

export default new StreamEvents()
