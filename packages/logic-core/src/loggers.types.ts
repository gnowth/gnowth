import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { ErrorType } from './errors'
import type { LogLevel } from './loggers.utils'

export { LogLevel }

export type Log = {
  errors: ErrorType[]
  message: string
  method: string
  payload?: ObjectLiteral
}

export interface OptionsLoggerFn {
  log: Log
  logLevel: LogLevel
  name: string
  namespace: string
}

export interface APILogger {
  bug: (options: OptionsLoggerFn) => Promise<void>
  debug: (options: OptionsLoggerFn) => Promise<void>
  error: (options: OptionsLoggerFn) => Promise<void>
  info: (options: OptionsLoggerFn) => Promise<void>
  warn: (options: OptionsLoggerFn) => Promise<void>
}
