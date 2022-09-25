import type { AxiosError } from 'axios'
import { v4 as uuid } from 'uuid'
import axios from 'axios'

export interface ErrorType {
  idLocal: string
  message: string
  title: string
}

class ModelError {
  static fromError = (error: Error): ErrorType => {
    return {
      idLocal: uuid(),
      message: error.message,
      title: error.name,
    }
  }

  static fromErrorUnknown = (error: unknown): ErrorType => {
    if (axios.isAxiosError(error)) return this.fromErrorAxios(error)

    if (error instanceof Error) return this.fromError(error)

    return this.fromError(new Error('unknown error'))
  }

  // DEBT: to implement properly
  static fromErrorAxios = (error: AxiosError): ErrorType => {
    return {
      idLocal: uuid(),
      message: error.message,
      title: 'axios error',
    }
  }

  // DEBT: need a better name for checking if network error can be handled by component
  static isErrorQuery = (error: unknown) => {
    return !axios.isAxiosError(error) || (error.response?.status ?? 0) >= 500
  }

  static toId = (error: ErrorType) => {
    return error.idLocal
  }

  static toString = (error: ErrorType) => {
    return error.message
  }

  static toTitle = (error: ErrorType) => {
    return error.title
  }

  static toToast = (error: ErrorType) => {
    return {
      description: ModelError.toString(error),
      isClosable: true,
      status: 'error' as const,
      title: ModelError.toTitle(error),
    }
  }
}

export default ModelError
