import type { ErrorType } from '../errors/errors'

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'BUG' | 'NONE'
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
}

export interface APILogger {
  bug: (options: OptionsLoggerFn) => Promise<void>
  debug: (options: OptionsLoggerFn) => Promise<void>
  error: (options: OptionsLoggerFn) => Promise<void>
  info: (options: OptionsLoggerFn) => Promise<void>
  warn: (options: OptionsLoggerFn) => Promise<void>
}
