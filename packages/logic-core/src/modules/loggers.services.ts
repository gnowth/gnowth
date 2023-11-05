import type { StorageService } from './storages'
import type { APILogger, Log, LogLevel } from './loggers.types'

interface Dependencies {
  storageService?: StorageService
}

interface OptionsLogger {
  dependencies?: Dependencies
  name: string
  namespace: string
  apis?: APILogger[]
}

const storageKeys = {
  LOG_LEVEL: 'service-logger--log-level',
}

// TODO: set up flag to exclude/include specific logs: 'logLevel' | 'name' | 'namespace' | 'method'
export class LoggerService {
  private apis: APILogger[]
  private dependencies: Dependencies
  private options: OptionsLogger

  constructor(options: OptionsLogger) {
    this.apis = options.apis ?? []
    this.dependencies = options.dependencies ?? {}
    this.options = options
  }

  clone(options?: Partial<OptionsLogger>): LoggerService {
    return new LoggerService({ ...this.options, ...options })
  }

  async bug(log: Log): Promise<void> {
    const logLevel =
      this.dependencies.storageService?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) =>
      api.bug({ log, logLevel, name: this.options.name, namespace: this.options.namespace }),
    )
    await Promise.allSettled(promises)
  }

  async bugIfErrors(log: Log): Promise<void> {
    if (log.errors.length > 0) {
      return this.bug(log)
    }
  }

  async debug(log: Log): Promise<void> {
    const logLevel =
      this.dependencies.storageService?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) =>
      api.debug({ log, logLevel, name: this.options.name, namespace: this.options.namespace }),
    )
    await Promise.allSettled(promises)
  }

  async error(log: Log): Promise<void> {
    const logLevel =
      this.dependencies.storageService?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) =>
      api.error({ log, logLevel, name: this.options.name, namespace: this.options.namespace }),
    )
    await Promise.allSettled(promises)
  }

  async info(log: Log): Promise<void> {
    const logLevel =
      this.dependencies.storageService?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) =>
      api.info({ log, logLevel, name: this.options.name, namespace: this.options.namespace }),
    )
    await Promise.allSettled(promises)
  }

  async warn(log: Log): Promise<void> {
    const logLevel =
      this.dependencies.storageService?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) =>
      api.warn({ log, logLevel, name: this.options.name, namespace: this.options.namespace }),
    )
    await Promise.allSettled(promises)
  }
}
