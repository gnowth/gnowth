import { ObjectLiteral } from '@gnowth/lib-utils'

import { ErrorData } from './errors'
import { LogLevel } from './loggers.utils'

export type Log = {
  errors: ErrorData[]
  message: string
  method: string
  payload?: ObjectLiteral
}

export type OptionsLoggerFn = {
  log: Log
  logLevel: LogLevel
  name: string
  namespace: string
}

export type APILogger = {
  bug: (options: OptionsLoggerFn) => Promise<void>
  debug: (options: OptionsLoggerFn) => Promise<void>
  error: (options: OptionsLoggerFn) => Promise<void>
  info: (options: OptionsLoggerFn) => Promise<void>
  warn: (options: OptionsLoggerFn) => Promise<void>
}
