import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { PlatformEvent } from './events'

// TODO: Get type from error module
type ErrorData = {
  code: string
  message: string
  method?: string
  source?: string
  sourceNamespace?: string
}

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
