import type { LogLevel } from './logger.types'

export const shouldLog = (current: LogLevel, aim: LogLevel): boolean => {
  return current === aim
}
