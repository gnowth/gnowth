import { Subject } from 'rxjs'

interface Log {
  id: string
}

// DEBT: where do we consume it?
class StreamLogs {
  stream = new Subject<Log>()
}

export default new StreamLogs()
