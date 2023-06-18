import { Subject } from 'rxjs'

interface Event {
  id: string
}

// DEBT(investigation): where do we consume it?
class StreamEvents {
  stream = new Subject<Event>()
}

const streamEvents = new StreamEvents()

export default streamEvents
