import type { Optional } from '@gnowth/utils-lib'

type ErrorGeneric = { code: 'generic-error'; message: string }
type ErrorInternal = { code: 'internal-error'; message: string }
type ErrorNetwork = { code: 'network-error'; message: string; status: number }
type ErrorValidation = { code: 'validation-error'; message: string }
export type ErrorType = ErrorGeneric | ErrorInternal | ErrorNetwork | ErrorValidation

export class ModelError {
  generate(error: Optional<ErrorType, 'code'>): ErrorType {
    if (!error.message) {
      throw { message: 'f' }
    }

    // TODO: implement proper generate
    return { code: 'generic-error', message: error.message }
  }

  generateForInternal(error: Optional<ErrorInternal, 'code'>): ErrorType {
    return { ...error, code: error.code ?? 'internal-error' }
  }

  generateForValidation(error: Optional<ErrorValidation, 'code'>): ErrorType {
    return { ...error, code: error.code ?? 'validation-error' }
  }

  generateFromError(error: Error): ErrorType {
    return { code: 'generic-error', message: error.message }
  }
}
