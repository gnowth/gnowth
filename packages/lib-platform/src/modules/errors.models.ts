import { AxiosError, isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { PlatformParameters } from '../core/platform'
import { ErrorData } from './errors.types'

export class ErrorModel {
  static async construct(_parameters: PlatformParameters): Promise<ErrorModel> {
    return new this()
  }

  fromError = (error: Error): ErrorData => {
    return {
      code: error.name,
      message: error.message,
    }
  }

  // DEBT: to implement properly
  fromErrorAxios = (error: AxiosError): ErrorData => {
    return {
      code: 'lib-platform--errors--model-error-01',
      message: error.message,
    }
  }

  fromErrorUnknown = (error: unknown): ErrorData[] => {
    if (isAxiosError(error)) return [this.fromErrorAxios(error)]
    if (this.isErrorZod(error)) return this.fromErrorZod(error)
    if (error instanceof Error) return [this.fromError(error)]
    return [this.fromError(new Error('unknown error'))]
  }

  fromErrorZod = (error: ZodError): ErrorData[] => {
    return error.issues.map((issue) => ({
      code: 'lib-platform--errors--model-error-02',
      message: `${issue.message} for ${issue.path.join('.')}`,
    }))
  }

  getId = (error: ErrorData): string => {
    return error.code
  }

  // DEBT: need a better name for checking if network error can be handled by component
  isErrorQuery = (error: unknown): boolean => {
    return !isAxiosError(error) || (error.response?.status ?? 0) >= 500
  }

  isErrorZod = (error: unknown): error is ZodError => {
    return error instanceof ZodError
  }

  toString = (error: ErrorData): string => {
    return error.message
  }

  toToast = (error: ErrorData) => {
    return {
      message: this.toString(error),
      type: 'error' as const,
    }
  }
}
