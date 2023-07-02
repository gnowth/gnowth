import type { APILogger, OptionsLoggerFn } from './logger.types'
import { shouldLog } from './logger.utils'

export class APILoggerConsole implements APILogger {
  async bug(options: OptionsLoggerFn): Promise<void> {
    if (shouldLog(options.logLevel, 'BUG')) {
      console.error(`${options.namespace}__${options.name} | BUG | `, options.log)
    }
  }

  async debug(options: OptionsLoggerFn): Promise<void> {
    if (shouldLog(options.logLevel, 'DEBUG')) {
      console.debug(`${options.namespace}__${options.name} | DEBUG | `, options.log)
    }
  }

  async error(options: OptionsLoggerFn): Promise<void> {
    if (shouldLog(options.logLevel, 'ERROR')) {
      console.error(`${options.namespace}__${options.name} | ERROR | `, options.log)
    }
  }

  async info(options: OptionsLoggerFn): Promise<void> {
    if (shouldLog(options.logLevel, 'INFO')) {
      console.info(`${options.namespace}__${options.name} | INFO | `, options.log)
    }
  }

  async warn(options: OptionsLoggerFn): Promise<void> {
    if (shouldLog(options.logLevel, 'WARN')) {
      console.warn(`${options.namespace}__${options.name} | WARN | `, options.log)
    }
  }
}
