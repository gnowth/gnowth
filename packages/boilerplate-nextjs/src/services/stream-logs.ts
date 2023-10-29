import { Subject } from 'rxjs'

interface Log {
  id: string
}

export class StreamLogs {
  stream = new Subject<Log>()
}
