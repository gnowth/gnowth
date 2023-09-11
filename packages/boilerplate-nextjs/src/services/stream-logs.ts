import { Subject } from 'rxjs'

interface Log {
  id: string
}

// DEBT(investigation): where do we consume it?
export class StreamLogs {
  stream = new Subject<Log>()
}

export const streamLogs = new StreamLogs()
