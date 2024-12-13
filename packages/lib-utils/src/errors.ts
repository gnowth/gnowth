export enum TokenErrorType {
  api = 'api',
  api400 = 'api-400',
  api401 = 'api-401',
  api403 = 'api-403',
  api404 = 'api-404',
  api500 = 'api-500',
  data = 'data',
  internal = 'internal',
}

type ErrorType = {
  code: string // `${source}--${context}--#`
  contextId?: string
  contextType?: string
  data?: unknown
  description?: string
  message: string
  traces: Trace[]
  type: string | string[]
}

type Parameters = {
  cause?: Error | ErrorCustom | ErrorType
  code: string
  contextId?: string
  contextType?: string
  data?: unknown
  description?: string
  message: string
  trace: Trace
  type?: string | string[]
}

type Trace = {
  caller: string // functionName / class.methodName / componentName
  context: string // moduleName/componentName
  source: string // npm package
  stack?: string
}

export class ErrorCustom extends Error {
  traces: Trace[]

  private parameters: Parameters

  constructor(parameters: Parameters) {
    const cause = parameters.cause instanceof Error ? parameters.cause : undefined
    super(parameters.message, cause)

    this.parameters = { ...parameters, type: parameters.type ?? TokenErrorType.internal }
    this.traces = ErrorCustom.getTraces(parameters.trace, parameters.cause)
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

  toErrorType(): ErrorType {
    return {
      code: this.parameters.code,
      contextId: this.parameters.contextId,
      contextType: this.parameters.contextType,
      data: this.parameters.data,
      message: this.parameters.message,
      traces: this.traces,
      type: this.parameters.type ?? TokenErrorType.internal,
    }
  }
}
