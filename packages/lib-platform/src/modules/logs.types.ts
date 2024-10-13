import { ObjectLiteral } from '@gnowth/lib-utils'

import { ErrorData } from './errors'
import { PlatformEvent } from './events'

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

export type EventLog = {
  payload: {
    log: Log
  }
  target: 'serviceLog'
  type: 'log'
} & PlatformEvent
