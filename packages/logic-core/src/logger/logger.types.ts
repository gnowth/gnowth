import type { ErrorType } from '../errors/errors'
import type { LogLevel } from './logger.utils'

export { LogLevel }

export type Log = {
  data?: unknown
  errors: ErrorType[]
  message: string
  method: string
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
