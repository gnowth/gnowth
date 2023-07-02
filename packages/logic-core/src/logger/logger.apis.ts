import type { APILogger, OptionsLoggerFn } from './logger.types'
import { shouldLog } from './logger.utils'

export class APILoggerConsole implements APILogger {
  async bug(options: OptionsLoggerFn): Promise<void> {
    if (shouldLog(options.logLevel, 'BUG')) {
      console.error(options.log.message)
    }
  }

  async debug(options: OptionsLoggerFn): Promise<void> {
    if (shouldLog(options.logLevel, 'DEBUG')) {
      console.debug(options.log.message)
    }
  }

  async error(options: OptionsLoggerFn): Promise<void> {
    if (shouldLog(options.logLevel, 'ERROR')) {
      console.error(options.log.message)
    }
  }

  async info(options: OptionsLoggerFn): Promise<void> {
    if (shouldLog(options.logLevel, 'INFO')) {
      console.info(options.log.message)
    }
  }

  async warn(options: OptionsLoggerFn): Promise<void> {
    if (shouldLog(options.logLevel, 'WARN')) {
      console.warn(options.log.message)
    }
  }
}
