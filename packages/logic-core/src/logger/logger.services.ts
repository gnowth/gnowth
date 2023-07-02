import type { ServiceStorage } from '../storage/storage.services'
import type { APILogger, Log, LogLevel } from './logger.types'

interface Dependencies {
  serviceStorage?: ServiceStorage
}

interface OptionsLogger {
  dependencies?: Dependencies
  name: string
  apis?: APILogger[]
}

const storageKeys = {
  LOG_LEVEL: 'service-logger--log-level',
}

export class ServiceLogger {
  private apis: APILogger[]
  private dependencies: Dependencies
  private options: OptionsLogger

  constructor(options: OptionsLogger) {
    this.apis = options.apis ?? []
    this.dependencies = options.dependencies ?? {}
    this.options = options
  }

  clone(options?: OptionsLogger): ServiceLogger {
    return new ServiceLogger({ ...this.options, ...options })
  }

  async bug(log: Log): Promise<void> {
    const logLevel =
      this.dependencies.serviceStorage?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) => api.bug({ log, logLevel, name: this.options.name }))
    await Promise.allSettled(promises)
  }

  async bugIfErrors(log: Log): Promise<void> {
    if (log.errors.length > 0) {
      return this.bug(log)
    }
  }

  async debug(log: Log): Promise<void> {
    const logLevel =
      this.dependencies.serviceStorage?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) => api.debug({ log, logLevel, name: this.options.name }))
    await Promise.allSettled(promises)
  }

  async error(log: Log): Promise<void> {
    const logLevel =
      this.dependencies.serviceStorage?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) => api.error({ log, logLevel, name: this.options.name }))
    await Promise.allSettled(promises)
  }

  async info(log: Log): Promise<void> {
    const logLevel =
      this.dependencies.serviceStorage?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) => api.info({ log, logLevel, name: this.options.name }))
    await Promise.allSettled(promises)
  }

  async warn(log: Log): Promise<void> {
    const logLevel =
      this.dependencies.serviceStorage?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) => api.warn({ log, logLevel, name: this.options.name }))
    await Promise.allSettled(promises)
  }
}
