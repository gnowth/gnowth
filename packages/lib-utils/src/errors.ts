type Type = 'generic-error' | 'internal-error' | 'network-error' | 'not-found-error' | 'validation-error'

type ErrorType = {
  code: string
  contextId?: string
  contextType?: string
  data?: unknown
  description?: string
  message: string
  traces: Trace[]
  type: Type
}

type Trace = {
  context: string
  caller: string
  source: string
  stack?: string
}

type Options = {
  cause?: Error | ErrorCustom | ErrorType
  code: string
  contextId?: string
  contextType?: string
  data?: unknown
  description?: string
  message: string
  trace: Trace
  type: Type
}

export class ErrorCustom extends Error {
  traces: Trace[]

  constructor(options: Options) {
    const cause = options.cause instanceof Error ? options.cause : undefined
    super(options.message, cause)

    this.options = options
    this.traces = ErrorCustom.getTraces(options.trace, options.cause)
  }

  toErrorType(): ErrorType {
    return {
      code: this.options.code,
      contextId: this.options.contextId,
      contextType: this.options.contextType,
      data: this.options.data,
      message: this.options.message,
      traces: this.traces,
      type: this.options.type,
    }
  }

  private static getTraces(trace: Trace, cause?: Error | ErrorCustom | ErrorType): Trace[] {
    if (!cause) {
      return [trace]
    }

    if ('traces' in cause) {
      return cause.traces.concat([trace])
    }

    if (cause instanceof Error) {
      return [{ ...trace, stack: cause.stack }]
    }

    return [trace]
  }

  private options: Options
}
