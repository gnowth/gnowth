import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { ErrorType } from './errors'
import type { Event } from './events'

export type LogLevel = 'none' | 'bug' | 'error' | 'warn' | 'info' | 'debug'

export type Log = {
  code: string
  errors?: ErrorType[]
  logLevel?: LogLevel
  messages?: Record<string, string>
  method: string
  payload?: ObjectLiteral
  source?: string
  sourceNamespace?: string
  values?: Record<string, string>
}

export interface EventLog extends Event {
  target: 'serviceLog'
  type: 'log'
  payload: {
    log: Log
  }
}
