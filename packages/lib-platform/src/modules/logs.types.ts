import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { ErrorData } from './errors'
import type { PlatformEvent } from './events'

export type LogLevel = 'bug' | 'debug' | 'error' | 'info' | 'none' | 'warn'

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

export interface EventLog extends PlatformEvent {
  payload: {
    log: Log
  }
  target: 'serviceLog'
  type: 'log'
}