import { Subject } from 'rxjs'

import type { Log } from './logs.types'

export class LogStream {
  stream = new Subject<Log>()
}
