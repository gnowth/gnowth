import type { AxiosError } from 'axios'
import { v4 as uuid } from 'uuid'
import { isAxiosError } from 'axios'

export interface ErrorData {
  idLocal: string
  message: string
  title: string
}

export class ModelError {
  static fromError = (error: Error): ErrorData => {
    return {
      idLocal: uuid(),
      message: error.message,
      title: error.name,
    }
  }

  static fromErrorUnknown = (error: unknown): ErrorData => {
    if (isAxiosError(error)) return this.fromErrorAxios(error)

    if (error instanceof Error) return this.fromError(error)

    return this.fromError(new Error('unknown error'))
  }

  // DEBT: to implement properly
  static fromErrorAxios = (error: AxiosError): ErrorData => {
    return {
      idLocal: uuid(),
      message: error.message,
      title: 'axios error',
    }
  }

  // DEBT: need a better name for checking if network error can be handled by component
  static isErrorQuery = (error: unknown) => {
    return !isAxiosError(error) || (error.response?.status ?? 0) >= 500
  }

  static toId = (error: ErrorData) => {
    return error.idLocal
  }

  static toString = (error: ErrorData) => {
    return error.message
  }

  static toTitle = (error: ErrorData) => {
    return error.title
  }

  static toToast = (error: ErrorData) => {
    return {
      description: ModelError.toString(error),
      isClosable: true,
      status: 'error' as const,
      title: ModelError.toTitle(error),
    }
  }
}
