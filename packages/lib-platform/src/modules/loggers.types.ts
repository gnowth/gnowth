import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { LogLevel } from './loggers.utils'

// TODO: Get type from error module
type ErrorData = {
  code: string
  message: string
  method?: string
  source?: string
  sourceNamespace?: string
}

export { LogLevel }

export type Log = {
  errors: ErrorData[]
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
