import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { ErrorData } from './errors'
import type { Event } from './events'

export type LogLevel = 'none' | 'bug' | 'error' | 'warn' | 'info' | 'debug'

export type Log = {
  code: string
  errors?: ErrorData[]
  logLevel?: LogLevel
  message: string
  method: string
  payload?: ObjectLiteral
  source?: string
  sourceNamespace?: string
}

export interface EventLog extends Event {
  target: 'serviceLog'
  type: 'log'
  payload: {
    log: Log
  }
}
