import { AxiosError, isAxiosError } from 'axios'

import { ErrorData } from './errors.types'

export class ErrorModel {
  fromError = (error: Error): ErrorData => {
    return {
      code: error.name,
      message: error.message,
    }
  }

  // DEBT: to implement properly
  fromErrorAxios = (error: AxiosError): ErrorData => {
    return {
      code: 'logic-core--model-error--from-error-axios-01',
      message: error.message,
    }
  }

  fromErrorUnknown = (error: unknown): ErrorData => {
    if (isAxiosError(error)) return this.fromErrorAxios(error)

    if (error instanceof Error) return this.fromError(error)

    return this.fromError(new Error('unknown error'))
  }

  // DEBT: need a better name for checking if network error can be handled by component
  isErrorQuery = (error: unknown) => {
    return !isAxiosError(error) || (error.response?.status ?? 0) >= 500
  }

  toId = (error: ErrorData) => {
    return error.code
  }

  toString = (error: ErrorData) => {
    return error.message
  }

  toToast = (error: ErrorData) => {
    return {
      description: this.toString(error),
      isClosable: true,
      status: 'error' as const,
      title: error.code,
    }
  }
}
