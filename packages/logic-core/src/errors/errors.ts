import type { UtilOptional } from '@gnowth/lib-utils'

type ErrorGeneric = { code: 'generic-error'; message: string }
type ErrorInternal = { code: 'internal-error'; message: string }
type ErrorNetwork = { code: 'network-error'; message: string; status: number }
type ErrorNotFound = { code: 'not-found-error'; message: string }
type ErrorValidation = { code: 'validation-error'; message: string }
export type ErrorType = ErrorGeneric | ErrorInternal | ErrorNetwork | ErrorNotFound | ErrorValidation

export class ModelError {
  generate(error: UtilOptional<ErrorType, 'code'>): ErrorType {
    if (!error.message) {
      throw { message: 'f' }
    }

    // TODO: implement proper generate
    return { code: 'generic-error', message: error.message }
  }

  generateForInternal(error: UtilOptional<ErrorInternal, 'code'>): ErrorType {
    return { ...error, code: error.code ?? 'internal-error' }
  }

  generateForNotFound(error?: UtilOptional<ErrorInternal, 'code'>): ErrorType {
    return { ...error, code: error?.code ?? 'not-found-error', message: error?.message ?? 'Page not found' }
  }

  generateForValidation(error: UtilOptional<ErrorValidation, 'code'>): ErrorType {
    return { ...error, code: error.code ?? 'validation-error' }
  }

  generateFromError(error: Error): ErrorType {
    return { code: 'generic-error', message: error.message }
  }
}
