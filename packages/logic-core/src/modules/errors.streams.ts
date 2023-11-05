import { Subject } from 'rxjs'

import type { ErrorModel } from './errors.models'
import type { ErrorData } from './errors.types'

type Parameters = { dependencies: Dependencies }
type Dependencies = { errorModel: ErrorModel }

export class ErrorStream {
  stream = new Subject<ErrorData>()
  #errorModel: ErrorModel
  #parameters: Parameters

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#errorModel = parameters.dependencies.errorModel
  }

  pushErrorUnknown = (error: unknown) => {
    return this.stream.next(this.#errorModel.fromErrorUnknown(error))
  }
}
