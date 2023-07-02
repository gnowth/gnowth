import type { ErrorType } from './errors/errors'

interface OptionsFaker<Type> {
  seed?: string
  value?: Type
}

interface OptionsFakerEmail<Type> extends OptionsFaker<Type> {
  firstName?: string
  lastName?: string
}

export type ServiceFaker = {
  internet: {
    email: (options: OptionsFakerEmail<string>) => string
  }
  person: {
    firstName: (options: OptionsFaker<string>) => string
    lastName: (options: OptionsFaker<string>) => string
  }
  string: {
    uuid: (options: OptionsFaker<string>) => string
  }
}

export type ServiceFlag = ''

type Log = {
  data?: unknown
  errors: ErrorType[]
  message: string
  method: string
}

interface ServiceLoggerContext {
  name: string
}

// TODO: set up flag to mute specific logs: 'logLevel' | 'context' | 'method'
export type ServiceLogger = {
  bug: (log: Log) => Promise<void>
  bugIfErrors: (log: Log) => Promise<void>
  debug: (log: unknown) => Promise<void>
  error: (log: Log) => Promise<void>
  fromContext: (context: ServiceLoggerContext) => ServiceLogger
  log: (log: unknown) => Promise<void>
}
