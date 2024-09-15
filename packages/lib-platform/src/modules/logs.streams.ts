import { Subject } from 'rxjs'

import { Log } from './logs.types'

export class LogStream {
  stream = new Subject<Log>()
}
