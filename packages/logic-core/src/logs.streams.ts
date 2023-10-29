import { Subject } from 'rxjs'

import type { Log } from './logs.types'

export class StreamLogs {
  stream = new Subject<Log>()
}
