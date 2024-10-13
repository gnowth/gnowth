import { APILogger, Log } from './loggers.types'
import { LogLevel } from './loggers.utils'
import { StorageService } from './storages'

type OptionsLogger = {
  apis?: APILogger[]
  name: string
  namespace: string
  storageService?: StorageService
}

const storageKeys = {
  LOG_LEVEL: 'service-logger--log-level',
}

// TODO: set up flag to exclude/include specific logs: 'logLevel' | 'name' | 'namespace' | 'method'
export class LoggerService {
  #storageService?: StorageService
  private apis: APILogger[]
  private options: OptionsLogger

  constructor(options: OptionsLogger) {
    this.apis = options.apis ?? []
    this.options = options
    this.#storageService = options.storageService
  }

  async bug(log: Log): Promise<void> {
    const logLevel = this.#storageService?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

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

  clone(options?: Partial<OptionsLogger>): LoggerService {
    return new LoggerService({ ...this.options, ...options })
  }

  async debug(log: Log): Promise<void> {
    const logLevel = this.#storageService?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) =>
      api.debug({ log, logLevel, name: this.options.name, namespace: this.options.namespace }),
    )
    await Promise.allSettled(promises)
  }

  async error(log: Log): Promise<void> {
    const logLevel = this.#storageService?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) =>
      api.error({ log, logLevel, name: this.options.name, namespace: this.options.namespace }),
    )
    await Promise.allSettled(promises)
  }

  async info(log: Log): Promise<void> {
    const logLevel = this.#storageService?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) =>
      api.info({ log, logLevel, name: this.options.name, namespace: this.options.namespace }),
    )
    await Promise.allSettled(promises)
  }

  async warn(log: Log): Promise<void> {
    const logLevel = this.#storageService?.getItem<LogLevel>({ key: storageKeys.LOG_LEVEL }) ?? 'NONE'

    const promises = this.apis.map((api) =>
      api.warn({ log, logLevel, name: this.options.name, namespace: this.options.namespace }),
    )
    await Promise.allSettled(promises)
  }
}
